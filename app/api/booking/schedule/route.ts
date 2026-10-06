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

type ScheduleRequest = {
  support?: unknown;
  booking?: unknown;
  startTime?: unknown;
  timeZone?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  customerType?: unknown;
  company?: unknown;
  organisationNumber?: unknown;
  address?: unknown;
  postcode?: unknown;
  city?: unknown;
  message?: unknown;
  smsConsent?: unknown;
  emailConsent?: unknown;

  location?: {
    type?: unknown;
    value?: unknown;
  } | null;
};

export async function POST(
  request: NextRequest
) {
  let body: ScheduleRequest;

  try {
    body =
      (await request.json()) as ScheduleRequest;
  }
  catch {
    return NextResponse.json(
      {
        error: "Ogiltig förfrågan.",
      },
      {
        status: 400,
      }
    );
  }

  if (
    !isBookingSupportType(body.support)
  ) {
    return NextResponse.json(
      {
        error:
          "Supporttyp saknas.",
      },
      {
        status: 400,
      }
    );
  }

  if (
    !isBookingCategory(body.booking)
  ) {
    return NextResponse.json(
      {
        error:
          "Bokningskategori saknas.",
      },
      {
        status: 400,
      }
    );
  }
  if (
    typeof body.startTime !== "string" ||
    typeof body.timeZone !== "string" ||
    typeof body.name !== "string" ||
    typeof body.email !== "string"
  ) {
    return NextResponse.json(
      {
        error:
          "Fyll i namn, e-post och bokningstid.",
      },
      {
        status: 400,
      }
    );
  }

  const name =
    body.name.trim();

  const email =
    body.email.trim();

  const phone =
    typeof body.phone === "string"
      ? body.phone.trim()
      : "";

  if (!name || !email) {
    return NextResponse.json(
      {
        error:
          "Namn och e-post är obligatoriska.",
      },
      {
        status: 400,
      }
    );
  }
  const customerType =
    typeof body.customerType === "string"
      ? body.customerType.trim()
      : "";

  const company =
    typeof body.company === "string"
      ? body.company.trim()
      : "";

  const organisationNumber =
    typeof body.organisationNumber === "string"
      ? body.organisationNumber.trim()
      : "";

  const address =
    typeof body.address === "string"
      ? body.address.trim()
      : "";

  const postcode =
    typeof body.postcode === "string"
      ? body.postcode.trim()
      : "";

  const city =
    typeof body.city === "string"
      ? body.city.trim()
      : "";

  const message =
    typeof body.message === "string"
      ? body.message.trim()
      : "";

  if (
    customerType !== "privat" &&
    customerType !== "senior" &&
    customerType !== "foretag"
  ) {
    return NextResponse.json(
      {
        error:
          "Välj vem supporten gäller.",
      },
      {
        status: 400,
      }
    );
  }

  if (!phone) {
    return NextResponse.json(
      {
        error:
          "Telefonnummer är obligatoriskt.",
      },
      {
        status: 400,
      }
    );
  }

  if (
    body.support === "hembesok" &&
    (
      !address ||
      !postcode ||
      !city
    )
  ) {
    return NextResponse.json(
      {
        error:
          "Gatuadress, postnummer och ort är obligatoriska för hembesök.",
      },
      {
        status: 400,
      }
    );
  }

  if (
    customerType === "foretag" &&
    !company
  ) {
    return NextResponse.json(
      {
        error:
          "Företagsnamn är obligatoriskt.",
      },
      {
        status: 400,
      }
    );
  }

  if (
    customerType === "foretag" &&
    !organisationNumber
  ) {
    return NextResponse.json(
      {
        error:
          "Organisationsnummer är obligatoriskt.",
      },
      {
        status: 400,
      }
    );
  }

  if (!message) {
    return NextResponse.json(
      {
        error:
          "Beskriv problemet kort.",
      },
      {
        status: 400,
      }
    );
  }

  if (
    typeof body.smsConsent !== "boolean" ||
    typeof body.emailConsent !== "boolean"
  ) {
    return NextResponse.json(
      {
        error:
          "Ogiltigt val för bokningsbekräftelse.",
      },
      {
        status: 400,
      }
    );
  }

  if (
    !body.smsConsent &&
    !body.emailConsent
  ) {
    return NextResponse.json(
      {
        error:
          "Välj SMS, e-post eller båda för bokningsbekräftelsen.",
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
      body.booking,
      body.support
    );

  if (!apiKey || !calendarId) {
    return NextResponse.json(
      {
        error:
          "OnceHub är inte färdigkonfigurerat.",
      },
      {
        status: 503,
      }
    );
  }

  const payload: {
    start_time: string;
    guest_time_zone: string;

    booking_form: {
      name: string;
      email: string;
      phone?: string;
    };

    location?: {
      type: string;
      value: string | null;
    };
  } = {
    start_time:
      body.startTime,

    guest_time_zone:
      body.timeZone,

    booking_form: {
      name,
      email,
    },
  };

  if (phone) {
    payload.booking_form.phone =
      phone;
  }

  if (
    body.location &&
    typeof body.location.type === "string"
  ) {
    payload.location = {
      type:
        body.location.type,

      value:
        typeof body.location.value ===
        "string"
          ? body.location.value
          : null,
    };
  }

  try {
    const response =
      await fetch(
        `https://api.oncehub.com/v2/booking-calendars/${encodeURIComponent(
          calendarId
        )}/schedule`,
        {
          method: "POST",

          headers: {
            Accept:
              "application/json",

            "Content-Type":
              "application/json",

            "API-Key":
              apiKey,
          },

          body:
            JSON.stringify(payload),

          cache:
            "no-store",
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      console.error(
        "OnceHub schedule error:",
        data
      );

      return NextResponse.json(
        {
          error:
            data?.message ??
            "Bokningen kunde inte genomföras.",
        },
        {
          status:
            response.status,
        }
      );
    }

    return NextResponse.json({
      success: true,
      bookingId: data.id,
    });
  }
  catch (error) {
    console.error(
      "OnceHub schedule request failed:",
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
