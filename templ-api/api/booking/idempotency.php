<?php
declare(strict_types=1);

/**
 * Returns a configured private directory for booking idempotency.
 * The directory must exist outside the public document root.
 */
function getBookingIdempotencyDirectory(): ?string
{
    $directory = getenv('BOOKING_IDEMPOTENCY_DIR');

    if (!is_string($directory) || trim($directory) === '') {
        return null;
    }

    $directory = realpath(trim($directory));

    if ($directory === false || !is_dir($directory)) {
        return null;
    }

    if (!is_writable($directory)) {
        return null;
    }

    $documentRoot = $_SERVER['DOCUMENT_ROOT'] ?? null;

    if (is_string($documentRoot) && $documentRoot !== '') {
        $publicRoot = realpath($documentRoot);

        if ($publicRoot === false) {
            return null;
        }

        $publicRoot = rtrim($publicRoot, DIRECTORY_SEPARATOR);
        $storageRoot = rtrim($directory, DIRECTORY_SEPARATOR);

        if (
            $storageRoot === $publicRoot ||
            str_starts_with(
                $storageRoot . DIRECTORY_SEPARATOR,
                $publicRoot . DIRECTORY_SEPARATOR
            )
        ) {
            return null;
        }
    } else {
        return null;
    }

    return $directory;
}

/**
 * Validates a client-generated idempotency key.
 */
function isValidBookingIdempotencyKey(?string $key): bool
{
    return is_string($key)
        && preg_match('/^[a-f0-9]{32}$/D', $key) === 1;
}

/**
 * Returns a storage filename without exposing the raw key.
 */
function getBookingIdempotencyFile(
    string $directory,
    string $key
): string {
    return rtrim($directory, DIRECTORY_SEPARATOR)
        . DIRECTORY_SEPARATOR
        . hash('sha256', $key)
        . '.json';
}
/**
 * Opens and exclusively locks a private idempotency record.
 * Caller must keep the handle open until the operation finishes.
 */
function acquireBookingIdempotencyLock(
    string $directory,
    string $key
) {
    $file = getBookingIdempotencyFile($directory, $key);

    $handle = @fopen($file, 'r+b');

    if ($handle === false) {
        return false;
    }

    if (!flock($handle, LOCK_EX | LOCK_NB)) {
        fclose($handle);
        return false;
    }

    return $handle;
}

/**
 * Reads an existing record while its exclusive lock is held.
 * Empty files are treated as new records.
 */
function readBookingIdempotencyRecord($handle): ?array
{
    rewind($handle);
    $contents = stream_get_contents($handle);

    if ($contents === false) {
        throw new RuntimeException('Unable to read idempotency record.');
    }

    if ($contents === '') {
        throw new RuntimeException(
            'Empty idempotency record. Booking status is unknown.'
        );
    }

    $record = json_decode($contents, true);

    if (!is_array($record) || json_last_error() !== JSON_ERROR_NONE) {
        throw new RuntimeException('Invalid idempotency record.');
    }

    return $record;
}

/**
 * Writes a record while its exclusive lock is held.
 */
function writeBookingIdempotencyRecord(
    $handle,
    array $record
): void {
    $encoded = json_encode(
        $record,
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR
    );

    rewind($handle);

    $length = strlen($encoded);
    $written = 0;

    while ($written < $length) {
        $bytes = fwrite($handle, substr($encoded, $written));

        if ($bytes === false || $bytes === 0) {
            throw new RuntimeException('Unable to write idempotency record.');
        }

        $written += $bytes;
    }

    if (!ftruncate($handle, strlen($encoded))) {
        throw new RuntimeException('Unable to truncate idempotency record.');
    }

    if (!fflush($handle)) {
        throw new RuntimeException('Unable to flush idempotency record.');
    }

    if (!fsync($handle)) {
        throw new RuntimeException('Unable to sync idempotency record.');
    }
}

/**
 * Releases a previously acquired lock.
 */
function releaseBookingIdempotencyLock($handle): void
{
    if (is_resource($handle)) {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}
/**
 * Atomically creates a new idempotency record.
 * Returns false when the key already exists or creation fails.
 */
function createBookingIdempotencyRecord(
    string $directory,
    string $key,
    string $requestHash
) {
    $file = getBookingIdempotencyFile($directory, $key);

    $previousUmask = umask(0077);

    try {
        $handle = @fopen($file, 'x+b');
    } finally {
        umask($previousUmask);
    }

    if ($handle === false) {
        return false;
    }

    if (!flock($handle, LOCK_EX | LOCK_NB)) {
        fclose($handle);
        return false;
    }

    try {
        writeBookingIdempotencyRecord($handle, [
            'requestHash' => $requestHash,
            'status' => 'processing',
            'createdAt' => gmdate('c'),
        ]);

        return $handle;
    } catch (Throwable $exception) {
        releaseBookingIdempotencyLock($handle);
        throw $exception;
    }
}