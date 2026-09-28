<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
    jsonResponse(['error' => 'Metoden är inte tillåten.'], 405);
}

$support = isset($_GET['support']) ? (string) $_GET['support'] : null;
$booking = isset($_GET['booking']) ? (string) $_GET['booking'] : null;
$start   = isset($_GET['start']) ? (string) $_GET['start'] : null;
$end     = isset($_GET['end']) ? (string) $_GET['end'] : null;

if (!isBookingSupportType($support)) {
    jsonResponse(['error' => 'Ogiltig supporttyp.'], 400);
}

if (!isBookingCategory($booking)) {
    jsonResponse(['error' => 'Ogiltig bokningskategori.'], 400);
}

if (!$start || !$end) {
    jsonResponse(['error' => 'Start- och slutdatum saknas.'], 400);
}

$apiKey = getOnceHubApiKey();
$calendarId = getOnceHubCalendarIdForBooking($booking, $support);

if (!$apiKey || !$calendarId) {
    jsonResponse([
        'configured' => false,
        'slots' => [],
    ]);
}

$url =
    'https://api.oncehub.com/v2/booking-calendars/' .
    rawurlencode($calendarId) .
    '/time-slots?' .
    http_build_query([
        'start_time' => $start,
        'end_time' => $end,
    ]);

$ch = curl_init($url);

curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Accept: application/json',
        'API-Key: ' . $apiKey,
    ],
    CURLOPT_TIMEOUT => 30,
]);

$responseBody = curl_exec($ch);

if ($responseBody === false) {
    error_log('OnceHub slots request failed: ' . curl_error($ch));
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
        'OnceHub slots error. HTTP status: ' . $status
    );

    jsonResponse([
        'error' => 'Lediga tider kunde inte hämtas.',
    ], $status > 0 ? $status : 502);
}

$slots = [];

if (is_array($data)) {
    if (array_is_list($data)) {
        $slots = $data;
    } elseif (isset($data['data']) && is_array($data['data'])) {
        $slots = $data['data'];
    }
}

jsonResponse([
    'configured' => true,
    'slots' => $slots,
]);
