<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    jsonResponse(['error' => 'Metoden är inte tillåten.'], 405);
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
$booking = $body['booking'] ?? null;

if (!is_string($support) || !isBookingSupportType($support)) {
    jsonResponse(['error' => 'Supporttyp saknas.'], 400);
}

if (!is_string($booking) || !isBookingCategory($booking)) {
    jsonResponse(['error' => 'Bokningskategori saknas.'], 400);
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
$calendarId = getOnceHubCalendarIdForBooking($booking, $support);

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

$url =
    'https://api.oncehub.com/v2/booking-calendars/' .
    rawurlencode($calendarId) .
    '/schedule';

$ch = curl_init($url);

curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Accept: application/json',
        'Content-Type: application/json',
        'API-Key: ' . $apiKey,
    ],
    CURLOPT_POSTFIELDS => json_encode(
        $payload,
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    ),
    CURLOPT_TIMEOUT => 30,
]);

$responseBody = curl_exec($ch);

if ($responseBody === false) {
    error_log('OnceHub schedule request failed: ' . curl_error($ch));
    curl_close($ch);

    jsonResponse([
        'error' => 'Bokningssystemet kunde inte nås.',
    ], 502);
}

$status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
curl_close($ch);

$data = json_decode($responseBody, true);

if ($status < 200 || $status >= 300) {
    error_log(
        'OnceHub schedule error. HTTP status: ' . $status
    );

    $message =
        is_array($data) &&
        isset($data['message']) &&
        is_string($data['message'])
            ? $data['message']
            : 'Bokningen kunde inte genomföras.';

    jsonResponse([
        'error' => $message,
    ], $status > 0 ? $status : 502);
}

jsonResponse([
    'success' => true,
    'bookingId' =>
        is_array($data) && isset($data['id'])
            ? $data['id']
            : null,
]);
