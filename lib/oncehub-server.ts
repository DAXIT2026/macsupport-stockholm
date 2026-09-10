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
  const categoryCalendars: Record<
    BookingCategory,
    string | null
  > = {
    general:
      readEnv(
        "ONCEHUB_CALENDAR_GENERAL"
      ),

    support:
      readEnv(
        "ONCEHUB_CALENDAR_SUPPORT"
      ),

    senior:
      readEnv(
        "ONCEHUB_CALENDAR_SENIOR"
      ),

    networkCable:
      readEnv(
        "ONCEHUB_CALENDAR_NETWORK_CABLE"
      ),

    network:
      readEnv(
        "ONCEHUB_CALENDAR_NETWORK"
      ),
  };

  return (
    categoryCalendars[booking] ??
    getOnceHubCalendarId(support)
  );
}

export function getOnceHubApiKey() {
  return readEnv(
    "ONCEHUB_API_KEY"
  );
}
