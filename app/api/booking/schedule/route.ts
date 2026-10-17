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

type ScheduleRequest = {
  support?: unknown;

  serviceKind?: unknown;
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
    !isBookingCustomerType(customerType) ||
    !isBookingServiceKind(body.serviceKind) ||
    body.support === "foretag" ||
    !isServiceCompatibleWithSupport(body.serviceKind, body.support)
  ) {
    return NextResponse.json(
      {
        error: "Ogiltig kombination av kundtyp, tjänst och supportform.",
      },
      { status: 400 }
    );
  }

  const apiKey =
    getOnceHubApiKey();

  const calendarId =
    getCalendarIdForService(
      customerType,
      body.serviceKind
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
      mobile_phone?: string;
      street_address?: string;
      post_code?: string;
      city?: string;
      company?: string;
      beskriv_problemet?: string;
      organisationsnummer?: string;
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
    payload.booking_form.mobile_phone =
      phone;
  }

  if (body.support === "hembesok") {
    payload.booking_form.street_address =
      address;

    payload.booking_form.post_code =
      postcode;

    payload.booking_form.city =
      city;
  }

  if (
    customerType === "foretag"
  ) {
    payload.booking_form.company =
      company;
  }

  payload.booking_form.beskriv_problemet =
    message;

  if (
    customerType === "foretag"
  ) {
    payload.booking_form.organisationsnummer =
      organisationNumber;
  }

  if (
    body.location &&
    typeof body.location.type === "string" &&
    typeof body.location.value === "string" &&
    body.location.value.trim()
  ) {
    payload.location = {
      type: body.location.type,
      value: body.location.value.trim(),
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
      console.error("OnceHub schedule HTTP status:", response.status);
      console.error("OnceHub error diagnostics:", {
        code: typeof data?.code === "string" ? data.code : undefined,
        errorCode: typeof data?.error_code === "string" ? data.error_code : undefined,
        responseFields:
          data && typeof data === "object"
            ? Object.keys(data)
            : [],
        validationFields:
          data?.errors && typeof data.errors === "object"
            ? Object.keys(data.errors)
            : [],
      });

      return NextResponse.json(
        {
          error:
            "Bokningen kunde inte genomföras. Försök igen eller välj en annan tid.",
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
