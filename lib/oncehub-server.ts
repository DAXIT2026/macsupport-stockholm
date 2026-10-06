import type {
  BookingSupportType,
} from "./booking";

import type {
  BookingCategory,
} from "./booking-category";

function readEnv(
  name: string
) {
  return process.env[name]?.trim() || null;
}

export function getOnceHubCalendarId(
  support: BookingSupportType
) {
  const calendars: Record<
    BookingSupportType,
    string | null
  > = {
    hembesok:
      readEnv(
        "ONCEHUB_CALENDAR_HEMBESOK"
      ),

    distans:
      readEnv(
        "ONCEHUB_CALENDAR_DISTANS"
      ),

    foretag:
      readEnv(
        "ONCEHUB_CALENDAR_FORETAG"
      ),
  };

  return calendars[support];
}

export function getOnceHubCalendarIdForBooking(
  booking: BookingCategory,
  support: BookingSupportType
) {
  // Support mode is authoritative.
  // Prevent remote bookings from using a home-visit calendar.
  return getOnceHubCalendarId(support);
}

export function getOnceHubApiKey() {
  return readEnv(
    "ONCEHUB_API_KEY"
  );
}
