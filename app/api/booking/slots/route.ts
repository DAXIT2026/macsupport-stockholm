import { NextRequest, NextResponse } from "next/server";

import {
  isBookingSupportType,
} from "../../../../lib/booking";

import {
  getOnceHubApiKey,
} from "../../../../lib/oncehub-server";

import {
  getCalendarIdForService,
  isBookingCustomerType,
  isBookingServiceKind,
  isServiceCompatibleWithSupport,
} from "../../../../lib/oncehub-calendar-routing";

export const dynamic = "force-dynamic";

type OnceHubLocation = {
  type:
    | "physical"
    | "virtual"
    | "virtual_static"
    | "guest_phone"
    | "in_person_by_guest";

  value: string | null;

  id?: string | null;
};

type OnceHubSlot = {
  start_time: string;
  locations?: OnceHubLocation[];
};

export async function GET(
  request: NextRequest
) {
  const searchParams =
    request.nextUrl.searchParams;

  const support =
    searchParams.get("support");

  const customerType =
    searchParams.get("customerType");

  const serviceKind =
    searchParams.get("serviceKind");

  const start =
    searchParams.get("start");

  const end =
    searchParams.get("end");

  if (!isBookingSupportType(support)) {
    return NextResponse.json(
      {
        error: "Ogiltig supporttyp.",
      },
      {
        status: 400,
      }
    );
  }

  if (
    !isBookingCustomerType(customerType) ||
    !isBookingServiceKind(serviceKind)
  ) {
    return NextResponse.json(
      {
        error: "Ogiltig bokningskategori.",
      },
      {
        status: 400,
      }
    );
  }

  if (!start || !end) {
    return NextResponse.json(
      {
        error:
          "Start- och slutdatum saknas.",
      },
      {
        status: 400,
      }
    );
  }

  if (
    support === "foretag" ||
    !isServiceCompatibleWithSupport(serviceKind, support)
  ) {
    return NextResponse.json(
      {
        error: "Tjänsten är inte tillgänglig för vald supportform.",
      },
      { status: 400 }
    );
  }

  const apiKey =
    getOnceHubApiKey();

  const calendarId =
    getCalendarIdForService(
      customerType,
      serviceKind
    );

  if (!apiKey || !calendarId) {
    return NextResponse.json(
      {
        configured: false,
        slots: [],
      }
    );
  }

  const url =
    new URL(
      `https://api.oncehub.com/v2/booking-calendars/${encodeURIComponent(
        calendarId
      )}/time-slots`
    );

    // Convert Stockholm calendar dates to UTC timestamps for OnceHub.
  const stockholmDateToUtc = (date: string): string => {
    // Normalize ISO timestamps to Stockholm calendar dates.
    if (/^\d{4}-\d{2}-\d{2}T/.test(date)) {
      const parsed = new Date(date);

      if (Number.isNaN(parsed.getTime())) {
        throw new Error("Invalid ISO timestamp.");
      }

      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Stockholm",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).formatToParts(parsed);

      const year = parts.find((part) => part.type === "year")?.value;
      const month = parts.find((part) => part.type === "month")?.value;
      const day = parts.find((part) => part.type === "day")?.value;

      if (!year || !month || !day) {
        throw new Error("Could not determine Stockholm calendar date.");
      }

      date = `${year}-${month}-${day}`;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new Error("Invalid calendar date format.");
    }

    const [year, month, day] = date.split("-").map(Number);
    const utcMidnight = Date.UTC(year, month - 1, day);

    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Stockholm",
      timeZoneName: "longOffset",
    });

    const offsetPart = formatter
      .formatToParts(new Date(utcMidnight))
      .find((part) => part.type === "timeZoneName")?.value;

    const match = offsetPart?.match(/^GMT([+-])(\d{2}):(\d{2})$/);

    if (!match) {
      throw new Error("Could not determine Stockholm timezone offset.");
    }

    const sign = match[1] === "+" ? 1 : -1;
    const offsetMinutes =
      sign * (Number(match[2]) * 60 + Number(match[3]));

    return new Date(utcMidnight - offsetMinutes * 60_000).toISOString();
  };

  // Preserve precise ISO timestamps and avoid querying past availability.
  const normalizeSlotBoundary = (
    value: string,
    isStart: boolean
  ): string => {
    const isIsoTimestamp =
      /^\d{4}-\d{2}-\d{2}T/.test(value);

    const normalized = isIsoTimestamp
      ? new Date(value)
      : new Date(stockholmDateToUtc(value));

    if (Number.isNaN(normalized.getTime())) {
      throw new Error("Invalid booking date.");
    }

    if (isStart) {
      const minimumStart = new Date(Date.now() + 5 * 60_000);

      if (normalized < minimumStart) {
        return minimumStart.toISOString();
      }
    }

    return normalized.toISOString();
  };

  url.searchParams.set(
    "start_time",
    normalizeSlotBoundary(start, true)
  );

  url.searchParams.set(
    "end_time",
    normalizeSlotBoundary(end, false)
  );

  try {
    const response =
      await fetch(url, {
        method: "GET",

        headers: {
          Accept: "application/json",
          "API-Key": apiKey,
        },

        cache: "no-store",
      });

    const data =
      await response.json();

    if (!response.ok) {
      console.error("OnceHub slots HTTP status:", response.status);

      return NextResponse.json(
        {
          error:
            "Lediga tider kunde inte hämtas.",
        },
        {
          status: response.status,
        }
      );
    }

    const slots: OnceHubSlot[] =
      Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : [];

    return NextResponse.json({
      configured: true,
      slots,
    });
  }
  catch (error) {
    console.error(
      "OnceHub slots request failed:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Bokningssystemet kunde inte nås.",
      },
      {
        status: 502,
      }
    );
  }
}
