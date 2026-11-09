<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/idempotency.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    jsonResponse(['error' => 'Metoden är inte tillåten.'], 405);
}

$idempotencyKey = $_SERVER['HTTP_IDEMPOTENCY_KEY'] ?? null;

if (
    !is_string($idempotencyKey) ||
    !isValidBookingIdempotencyKey($idempotencyKey)
) {
    jsonResponse([
        'error' => 'En giltig bokningsnyckel saknas. Uppdatera sidan och försök igen.',
    ], 400);
}

$idempotencyDirectory = getBookingIdempotencyDirectory();

if ($idempotencyDirectory === null) {
    error_log('Booking idempotency storage is unavailable.');

    jsonResponse([
        'error' => 'Bokningen är tillfälligt otillgänglig. Försök igen senare.',
    ], 503);
}

$rawBody = file_get_contents('php://input');

if ($rawBody === false) {
    jsonResponse(['error' => 'Ogiltig förfrågan.'], 400);
}

$body = json_decode($rawBody, true);

if (!is_array($body) || json_last_error() !== JSON_ERROR_NONE) {
    jsonResponse(['error' => 'Ogiltig förfrågan.'], 400);
}

$support = $body['support'] ?? null;
$customerType = $body['customerType'] ?? null;
$serviceKind = $body['serviceKind'] ?? null;

if (!is_string($support) || !isBookingSupportType($support)) {
    jsonResponse(['error' => 'Supporttyp saknas.'], 400);
}

if (
    !isBookingCustomerType($customerType) ||
    !isBookingServiceKind($serviceKind)
) {
    jsonResponse(['error' => 'Ogiltig kundtyp eller tjänst.'], 400);
}

if (!isServiceCompatibleWithSupport($serviceKind, $support)) {
    jsonResponse(['error' => 'Tjänsten är inte tillgänglig för vald supporttyp.'], 400);
}

$startTime = $body['startTime'] ?? null;
$timeZone  = $body['timeZone'] ?? null;
$name      = $body['name'] ?? null;
$email     = $body['email'] ?? null;
$phone     = $body['phone'] ?? '';

if (
    !is_string($startTime) ||
    !is_string($timeZone) ||
    !is_string($name) ||
    !is_string($email)
) {
    jsonResponse([
        'error' => 'Fyll i namn, e-post och bokningstid.',
    ], 400);
}

$name = trim($name);
$email = trim($email);
$phone = is_string($phone) ? trim($phone) : '';

if ($name === '' || $email === '') {
    jsonResponse([
        'error' => 'Namn och e-post är obligatoriska.',
    ], 400);
}

$apiKey = getOnceHubApiKey();
$calendarId = getOnceHubCalendarIdForService($customerType, $serviceKind);

if (!$apiKey || !$calendarId) {
    jsonResponse([
        'error' => 'OnceHub är inte färdigkonfigurerat.',
    ], 503);
}

$payload = [
    'start_time' => $startTime,
    'guest_time_zone' => $timeZone,
    'booking_form' => [
        'name' => $name,
        'email' => $email,
    ],
];

if ($phone !== '') {
    $payload['booking_form']['phone'] = $phone;
}

$location = $body['location'] ?? null;

if (
    is_array($location) &&
    isset($location['type']) &&
    is_string($location['type'])
) {
    $payload['location'] = [
        'type' => $location['type'],
        'value' =>
            isset($location['value']) && is_string($location['value'])
                ? $location['value']
                : null,
    ];
}

$requestHash = hash('sha256', $rawBody);
$idempotencyHandle = null;
$isNewRecord = false;
$result = null;

try {
    $recordPath = getBookingIdempotencyFile($idempotencyDirectory, $idempotencyKey);
    if (!file_exists($recordPath)) {
        $idempotencyHandle = createBookingIdempotencyRecord(
            $idempotencyDirectory,
            $idempotencyKey,
            $requestHash
        );
        $isNewRecord = is_resource($idempotencyHandle);
    }
    if (!$isNewRecord) {
        $idempotencyHandle = acquireBookingIdempotencyLock(
            $idempotencyDirectory,
            $idempotencyKey
        );
    }
    if (!is_resource($idempotencyHandle)) {
        $result = [
            'status' => 409,
            'body' => ['error' => 'Bokningen behandlas redan eller kan inte kontrolleras. Kontakta supporten innan du försöker igen.'],
        ];
    } else {
        $record = readBookingIdempotencyRecord($idempotencyHandle);
        if (!isset($record['requestHash']) || !is_string($record['requestHash']) ||
            !hash_equals($record['requestHash'], $requestHash)) {
            $result = [
                'status' => 409,
                'body' => ['error' => 'Bokningsnyckeln används redan för en annan förfrågan.'],
            ];
        } elseif (($record['status'] ?? null) === 'confirmed' &&
                  isset($record['bookingId']) && is_string($record['bookingId']) &&
                  trim($record['bookingId']) !== '') {
            $result = [
                'status' => 200,
                'body' => ['success' => true, 'bookingId' => trim($record['bookingId'])],
            ];
        } elseif (!$isNewRecord) {
            // Existing processing/unknown/invalid state: never send another POST.
            $result = [
                'status' => 409,
                'body' => ['error' => 'Bokningens status kan inte bekräftas. Kontakta supporten innan du försöker boka igen.'],
            ];
        } else {
            // New processing record is durable and exclusively locked before POST.
            $url = 'https://api.oncehub.com/v2/booking-calendars/' .
                rawurlencode($calendarId) . '/schedule';
            $ch = curl_init($url);
            if ($ch === false) {
                throw new RuntimeException('OnceHub curl initialization failed.');
            }
            try {
                $encodedPayload = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
                if (!curl_setopt_array($ch, [
                    CURLOPT_POST => true,
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_HTTPHEADER => [
                        'Accept: application/json',
                        'Content-Type: application/json',
                        'API-Key: ' . $apiKey,
                    ],
                    CURLOPT_POSTFIELDS => $encodedPayload,
                    CURLOPT_TIMEOUT => 30,
                ])) {
                    throw new RuntimeException('OnceHub curl setup failed.');
                }
                $responseBody = curl_exec($ch);
                $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
            } finally {
                curl_close($ch);
            }
            if ($responseBody === false) {
                error_log('OnceHub schedule transport failed; booking outcome unknown.');
                $record['status'] = 'unknown';
                $record['updatedAt'] = gmdate('c');
                writeBookingIdempotencyRecord($idempotencyHandle, $record);
                $result = [
                    'status' => 502,
                    'body' => ['error' => 'Bokningens status kunde inte bekräftas. Kontakta supporten innan du försöker boka igen.'],
                ];
            } else {
                $data = json_decode($responseBody, true);
                $bookingId = is_array($data) ? ($data['id'] ?? null) : null;
                if ($status >= 200 && $status < 300 && is_string($bookingId) && trim($bookingId) !== '') {
                    $record['status'] = 'confirmed';
                    $record['bookingId'] = trim($bookingId);
                    $record['updatedAt'] = gmdate('c');
                    writeBookingIdempotencyRecord($idempotencyHandle, $record);
                    $result = [
                        'status' => 200,
                        'body' => ['success' => true, 'bookingId' => trim($bookingId)],
                    ];
                } else {
                    // Conservative: do not retry automatically, even on HTTP errors.
                    error_log('OnceHub schedule outcome not confirmed. HTTP status: ' . $status);
                    $record['status'] = 'unknown';
                    $record['updatedAt'] = gmdate('c');
                    writeBookingIdempotencyRecord($idempotencyHandle, $record);
                    $result = [
                        'status' => 502,
                        'body' => ['error' => 'Bokningens status kunde inte bekräftas. Kontakta supporten innan du försöker boka igen.'],
                    ];
                }
            }
        }
    }
} catch (Throwable $exception) {
    // A processing record remains fail-closed if persistence or transport fails.
    error_log('Booking idempotency or scheduling failed; manual review required.');
    $result = [
        'status' => 503,
        'body' => ['error' => 'Bokningen kunde inte bekräftas. Kontakta supporten innan du försöker boka igen.'],
    ];
} finally {
    if (is_resource($idempotencyHandle)) {
        releaseBookingIdempotencyLock($idempotencyHandle);
    }
}
jsonResponse($result['body'], $result['status']);