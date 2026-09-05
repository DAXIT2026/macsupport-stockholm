import type { BookingSupportType } from "./booking";

export function getOnceHubCalendarId(
  support: BookingSupportType
) {
  const calendars: Record<
    BookingSupportType,
    string | undefined
  > = {
    hembesok:
      process.env.ONCEHUB_CALENDAR_HEMBESOK,

    distans:
      process.env.ONCEHUB_CALENDAR_DISTANS,

    foretag:
      process.env.ONCEHUB_CALENDAR_FORETAG,
  };

  const calendarId =
    calendars[support]?.trim();

  if (!calendarId) {
    return null;
  }

  return calendarId;
}

export function getOnceHubApiKey() {
  const apiKey =
    process.env.ONCEHUB_API_KEY?.trim();

  return apiKey || null;
}
