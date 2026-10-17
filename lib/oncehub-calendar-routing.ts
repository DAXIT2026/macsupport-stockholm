export type BookingCustomerType =
  | "privat"
  | "senior"
  | "foretag";

export type BookingServiceKind =
  | "it-visit"
  | "it-remote"
  | "wifi"
  | "cable-2h"
  | "cable-8h"
  | "offert";

const calendarEnvironmentKeys = {
  "it-visit": {
    privat: "ONCEHUB_CALENDAR_IT_VISIT_PRIVAT",
    senior: "ONCEHUB_CALENDAR_IT_VISIT_SENIOR",
    foretag: "ONCEHUB_CALENDAR_IT_VISIT_FORETAG",
  },
  "it-remote": {
    privat: "ONCEHUB_CALENDAR_IT_REMOTE_PRIVAT",
    senior: "ONCEHUB_CALENDAR_IT_REMOTE_SENIOR",
    foretag: "ONCEHUB_CALENDAR_IT_REMOTE_FORETAG",
  },
  wifi: {
    privat: "ONCEHUB_CALENDAR_WIFI_PRIVAT",
    senior: "ONCEHUB_CALENDAR_WIFI_SENIOR",
    foretag: "ONCEHUB_CALENDAR_WIFI_FORETAG",
  },
  "cable-2h": {
    privat: "ONCEHUB_CALENDAR_CABLE_2H_PRIVAT",
    senior: "ONCEHUB_CALENDAR_CABLE_2H_SENIOR",
    foretag: "ONCEHUB_CALENDAR_CABLE_2H_FORETAG",
  },
  "cable-8h": {
    privat: "ONCEHUB_CALENDAR_CABLE_8H_PRIVAT",
    senior: "ONCEHUB_CALENDAR_CABLE_8H_SENIOR",
    foretag: "ONCEHUB_CALENDAR_CABLE_8H_FORETAG",
  },
  offert: {
    privat: "ONCEHUB_CALENDAR_OFFERT_PRIVAT",
    senior: "ONCEHUB_CALENDAR_OFFERT_SENIOR",
    foretag: "ONCEHUB_CALENDAR_OFFERT_FORETAG",
  },
} as const satisfies Record<
  BookingServiceKind,
  Record<BookingCustomerType, string>
>;

export function isBookingCustomerType(
  value: unknown
): value is BookingCustomerType {
  return (
    value === "privat" ||
    value === "senior" ||
    value === "foretag"
  );
}

export function isBookingServiceKind(
  value: unknown
): value is BookingServiceKind {
  return (
    value === "it-visit" ||
    value === "it-remote" ||
    value === "wifi" ||
    value === "cable-2h" ||
    value === "cable-8h" ||
    value === "offert"
  );
}

export function getCalendarIdForService(
  customer: BookingCustomerType,
  service: BookingServiceKind
): string | null {
  const environmentKey =
    calendarEnvironmentKeys[service][customer];

  return process.env[environmentKey]?.trim() || null;
}

export function isServiceCompatibleWithSupport(
  service: BookingServiceKind,
  support: "hembesok" | "distans"
): boolean {
  if (service === "it-remote") {
    return support === "distans";
  }

  return support === "hembesok";
}