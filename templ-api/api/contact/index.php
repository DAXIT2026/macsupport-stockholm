<?php

declare(strict_types=1);

/**
 * MacSupport Stockholm - Contact API
 *
 * Production: /api/contact/
 * Runtime: PHP 8.4+
 *
 * Does not interact with booking or OnceHub.
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

const CONTACT_RECIPIENT = 'kontakt@macsupportstockholm.se';
const CONTACT_SENDER = 'kontakt@macsupportstockholm.se';
const CONTACT_ORIGIN = 'https://www.macsupportstockholm.se';
const CONTACT_MAX_BODY = 12000;

function respond(int $status, string $code, bool $success = false): never
{
    http_response_code($status);

    echo json_encode(
        [
            'success' => $success,
            'code' => $code,
        ],
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );

    exit;
}

function cleanText(mixed $value, int $maxLength): ?string
{
    if (!is_string($value)) {
        return null;
    }

    $value = trim($value);

    if (
        $value === '' ||
        strlen($value) > $maxLength * 4 ||
        preg_match('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', $value)
    ) {
        return null;
    }

    if (!preg_match('//u', $value)) {
        return null;
    }

    if (mb_strlen($value, 'UTF-8') > $maxLength) {
        return null;
    }

    return $value;
}

function singleLine(mixed $value, int $maxLength): ?string
{
    $value = cleanText($value, $maxLength);

    if ($value === null || preg_match('/[\r\n]/', $value)) {
        return null;
    }

    return $value;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, 'METHOD_NOT_ALLOWED');
}

$contentType = strtolower(trim(explode(
    ';',
    $_SERVER['CONTENT_TYPE'] ?? ''
)[0]));

if ($contentType !== 'application/json') {
    respond(415, 'UNSUPPORTED_MEDIA_TYPE');
}

/**
 * Same-origin protection.
 *
 * The frontend and PHP endpoint must share the same origin.
 */
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if ($origin !== CONTACT_ORIGIN) {
    respond(403, 'INVALID_ORIGIN');
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);

if ($contentLength > CONTACT_MAX_BODY) {
    respond(413, 'REQUEST_TOO_LARGE');
}

$raw = file_get_contents(
    'php://input',
    false,
    null,
    0,
    CONTACT_MAX_BODY + 1
);

if ($raw === false || strlen($raw) > CONTACT_MAX_BODY) {
    respond(413, 'REQUEST_TOO_LARGE');
}

try {
    $data = json_decode(
        $raw,
        true,
        16,
        JSON_THROW_ON_ERROR
    );
} catch (JsonException) {
    respond(400, 'INVALID_JSON');
}

if (!is_array($data) || array_is_list($data)) {
    respond(400, 'INVALID_DATA');
}

/**
 * Honeypot: silently accept automated submissions
 * without sending an email.
 */
$website = $data['website'] ?? '';

if (!is_string($website)) {
    respond(400, 'INVALID_DATA');
}

if ($website !== '') {
    respond(200, 'ACCEPTED', true);
}

$firstName = singleLine($data['firstName'] ?? null, 80);
$lastName = singleLine($data['lastName'] ?? null, 80);
$email = singleLine($data['email'] ?? null, 254);
$message = cleanText($data['message'] ?? null, 5000);

$phoneInput = $data['phone'] ?? '';

if (!is_string($phoneInput)) {
    respond(422, 'INVALID_PHONE');
}

$phone = trim($phoneInput);

if (
    $firstName === null ||
    $lastName === null ||
    $email === null ||
    $message === null
) {
    respond(422, 'INVALID_FIELDS');
}

if (
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    strlen($email) > 254
) {
    respond(422, 'INVALID_EMAIL');
}

if (
    $phone !== '' &&
    (
        strlen($phone) > 30 ||
        !preg_match('/^[+0-9()\s-]{6,30}$/D', $phone)
    )
) {
    respond(422, 'INVALID_PHONE');
}

if (mb_strlen($message, 'UTF-8') < 10) {
    respond(422, 'MESSAGE_TOO_SHORT');
}

/**
 * Lightweight rate limiting and duplicate protection.
 *
 * State is stored in a private system temporary directory,
 * not in the publicly accessible website directory.
 *
 * A shared persistent store is preferable if the site
 * later runs on multiple application servers.
 */
$stateDirectory = sys_get_temp_dir()
    . '/macsupport-contact-rate-v1';

if (!is_dir($stateDirectory)) {
    if (
        !@mkdir($stateDirectory, 0700, true) &&
        !is_dir($stateDirectory)
    ) {
        respond(503, 'TEMPORARILY_UNAVAILABLE');
    }
}

$ip = $_SERVER['REMOTE_ADDR'] ?? '';

if (!filter_var($ip, FILTER_VALIDATE_IP)) {
    respond(503, 'TEMPORARILY_UNAVAILABLE');
}

$rateKey = hash('sha256', $ip);
$stateFile = $stateDirectory . '/' . $rateKey . '.json';

$handle = @fopen($stateFile, 'c+');

if ($handle === false) {
    respond(503, 'TEMPORARILY_UNAVAILABLE');
}

if (!flock($handle, LOCK_EX)) {
    fclose($handle);
    respond(503, 'TEMPORARILY_UNAVAILABLE');
}

$now = time();

rewind($handle);
$stored = stream_get_contents($handle);

if ($stored === false) {
    flock($handle, LOCK_UN);
    fclose($handle);
    respond(503, 'TEMPORARILY_UNAVAILABLE');
}

$state = json_decode($stored !== '' ? $stored : '{}', true);

if (
    !is_array($state) ||
    !isset($state['attempts']) && array_key_exists('attempts', $state) ||
    (isset($state['attempts']) && !is_array($state['attempts']))
) {
    flock($handle, LOCK_UN);
    fclose($handle);
    respond(503, 'TEMPORARILY_UNAVAILABLE');
}

$attempts = array_values(array_filter(
    $state['attempts'] ?? [],
    static fn (mixed $timestamp): bool =>
        is_int($timestamp) && $timestamp > $now - 3600
));

if (count($attempts) >= 5) {
    flock($handle, LOCK_UN);
    fclose($handle);

    header('Retry-After: 3600');
    respond(429, 'RATE_LIMITED');
}

$fingerprint = hash(
    'sha256',
    strtolower($email)
    . "\n"
    . $firstName
    . "\n"
    . $lastName
    . "\n"
    . $phone
    . "\n"
    . $message
);

$lastFingerprint = $state['lastFingerprint'] ?? '';
$lastSent = (int) ($state['lastSent'] ?? 0);

if (
    hash_equals((string) $lastFingerprint, $fingerprint) &&
    $lastSent > $now - 600
) {
    flock($handle, LOCK_UN);
    fclose($handle);

    respond(200, 'ALREADY_ACCEPTED', true);
}

/**
 * Reserve an attempt before invoking the mail transport.
 * Keep the lock until the operation completes to prevent
 * simultaneous duplicate submissions from the same IP.
 */
$attempts[] = $now;

$state['attempts'] = $attempts;

function saveState($handle, array $state): bool
{
    $encoded = json_encode($state);

    if (!is_string($encoded)) {
        return false;
    }

    rewind($handle);

    if (!ftruncate($handle, 0)) {
        return false;
    }

    $length = strlen($encoded);
    $offset = 0;

    while ($offset < $length) {
        $written = fwrite($handle, substr($encoded, $offset));

        if ($written === false || $written === 0) {
            return false;
        }

        $offset += $written;
    }

    return fflush($handle);
}

if (!saveState($handle, $state)) {
    flock($handle, LOCK_UN);
    fclose($handle);

    respond(503, 'TEMPORARILY_UNAVAILABLE');
}

$subject = 'Ny kontaktförfrågan - MacSupport Stockholm';

$body = implode("\n", [
    'Ny kontaktförfrågan via macsupportstockholm.se',
    '',
    'Förnamn: ' . $firstName,
    'Efternamn: ' . $lastName,
    'E-postadress: ' . $email,
    'Telefonnummer: ' . ($phone !== '' ? $phone : 'Ej angivet'),
    '',
    'Meddelande:',
    $message,
    '',
    '---',
    'Skickat via kontaktformuläret på webbplatsen.',
]);

$headers = [
    'From' => 'MacSupport Stockholm <' . CONTACT_SENDER . '>',
    'Reply-To' => $email,
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/plain; charset=UTF-8',
    'X-Mailer' => 'MacSupport Contact Form',
];

$accepted = false;

try {
    $accepted = mail(
        CONTACT_RECIPIENT,
        $subject,
        $body,
        $headers
    );
} catch (Throwable) {
    $accepted = false;
}

if ($accepted) {
    $state['lastFingerprint'] = $fingerprint;
    $state['lastSent'] = $now;

    if (!saveState($handle, $state)) {
        flock($handle, LOCK_UN);
        fclose($handle);

        // The mail transport already accepted this message.
        // Avoid prompting the user to resend it.
        respond(200, 'ACCEPTED', true);
    }
}

flock($handle, LOCK_UN);
fclose($handle);

if (!$accepted) {
    respond(503, 'MAIL_UNAVAILABLE');
}

respond(200, 'ACCEPTED', true);
