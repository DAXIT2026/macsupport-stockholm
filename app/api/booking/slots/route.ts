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
