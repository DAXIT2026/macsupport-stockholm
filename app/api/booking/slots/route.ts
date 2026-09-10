import { NextRequest, NextResponse } from "next/server";

import {
  isBookingSupportType,
} from "../../../../lib/booking";

import {
  getOnceHubApiKey,
  getOnceHubCalendarIdForBooking,
} from "../../../../lib/oncehub-server";

import {
  isBookingCategory,
} from "../../../../lib/booking-category";

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

  const booking =
    searchParams.get("booking");

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

  if (!isBookingCategory(booking)) {
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

  const apiKey =
    getOnceHubApiKey();

  const calendarId =
    getOnceHubCalendarIdForBooking(
      booking,
      support
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

  url.searchParams.set(
    "start_time",
    start
  );

  url.searchParams.set(
    "end_time",
    end
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
      console.error(
        "OnceHub slots error:",
        data
      );

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
