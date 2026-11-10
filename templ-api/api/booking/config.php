<?php
declare(strict_types=1);

function jsonResponse(array $data, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function envValue(string $name): ?string
{
    $value = getenv($name);

    if ($value === false) {
        return null;
    }

    $value = trim($value);

    return $value !== '' ? $value : null;
}

function isBookingSupportType(?string $value): bool
{
    return in_array($value, ['hembesok', 'distans', 'foretag'], true);
}

function isBookingCategory(?string $value): bool
{
    return in_array(
        $value,
        ['general', 'support', 'senior', 'networkCable', 'network'],
        true
    );
}

function getOnceHubCalendarId(string $support): ?string
{
    $calendars = [
        'hembesok' => envValue('ONCEHUB_CALENDAR_HEMBESOK'),
        'distans'  => envValue('ONCEHUB_CALENDAR_DISTANS'),
        'foretag'  => envValue('ONCEHUB_CALENDAR_FORETAG'),
    ];

    return $calendars[$support] ?? null;
}

function getOnceHubCalendarIdForBooking(
    string $booking,
    string $support
): ?string {
    $calendars = [
        'general'      => envValue('ONCEHUB_CALENDAR_GENERAL'),
        'support'      => envValue('ONCEHUB_CALENDAR_SUPPORT'),
        'senior'       => envValue('ONCEHUB_CALENDAR_SENIOR'),
        'networkCable' => envValue('ONCEHUB_CALENDAR_NETWORK_CABLE'),
        'network'      => envValue('ONCEHUB_CALENDAR_NETWORK'),
    ];

    return ($calendars[$booking] ?? null)
        ?? getOnceHubCalendarId($support);
}


function isBookingCustomerType(?string $value): bool
{
    return in_array($value, ['privat', 'senior', 'foretag'], true);
}

function isBookingServiceKind(?string $value): bool
{
    return in_array(
        $value,
        ['it-visit', 'it-remote', 'wifi', 'cable-2h', 'cable-8h', 'offert'],
        true
    );
}

function isServiceCompatibleWithSupport(
    string $service,
    string $support
): bool {
    if ($service === 'it-remote') {
        return $support === 'distans';
    }

    return $support === 'hembesok';
}

function getOnceHubCalendarIdForService(
    string $customerType,
    string $serviceKind
): ?string {
    if (
        !isBookingCustomerType($customerType) ||
        !isBookingServiceKind($serviceKind)
    ) {
        return null;
    }

    $serviceKeys = [
        'it-visit'  => 'IT_VISIT',
        'it-remote' => 'IT_REMOTE',
        'wifi'      => 'WIFI',
        'cable-2h'  => 'CABLE_2H',
        'cable-8h'  => 'CABLE_8H',
        'offert'    => 'OFFERT',
    ];

    $environmentKey = 'ONCEHUB_CALENDAR_' .
        $serviceKeys[$serviceKind] .
        '_' .
        strtoupper($customerType);

    return envValue($environmentKey);
}
function getOnceHubApiKey(): ?string
{
    return envValue('ONCEHUB_API_KEY');
}
