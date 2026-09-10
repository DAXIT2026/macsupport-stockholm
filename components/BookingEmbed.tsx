"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type SupportType =
  | "hembesok"
  | "distans"
  | "foretag";

type CalendarDay = {
  date: Date;
  day: number;
  currentMonth: boolean;
  isToday: boolean;
};

type BookingSlot = {
  start_time: string;
  locations?: Array<{
    type: string;
    value: string | null;
    id?: string | null;
  }>;
};

type SlotsResponse = {
  configured?: boolean;
  slots?: BookingSlot[];
  error?: string;
};

type ScheduleResponse = {
  success?: boolean;
  bookingId?: string;
  error?: string;
};

const supportLabels: Record<SupportType, string> = {
  hembesok: "Hembesök",
  distans: "Support på distans",
  foretag: "Företagssupport",
};
const customerLabels: Record<string, string> = {
  privat: "Privatperson",
  senior: "Senior / pensionär",
  foretag: "Företag",
};

const serviceLabels: Record<string, string> = {
  general: "Allmän IT-support",
  mac: "Mac / dator",
  wifi: "WiFi / nätverk",
  "network-cable": "Dra nätverkskabel",
  "unifi-camera": "UniFi / kamera",
  email: "E-post",
  microsoft365: "Microsoft 365",
  security: "Säkerhet",
  device: "Ny enhet",
  other: "Annat",
};

const modeLabels: Record<string, string> = {
  hembesok: "Hembesök",
  distans: "Support på distans",
  telefon: "Telefonsupport",
};

function isSupportType(
  value: string | null
): value is SupportType {

  return (
    value === "hembesok" ||
    value === "distans" ||
    value === "foretag"
  );
}

function buildMonth(date: Date): CalendarDay[] {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const mondayIndex = (firstDay.getDay() + 6) % 7;

  const startDate = new Date(
    year,
    month,
    1 - mondayIndex
  );

  const today = new Date();

  return Array.from({ length: 42 }, (_, index) => {
    const current = new Date(startDate);

    current.setDate(
      startDate.getDate() + index
    );

    return {
      date: current,
      day: current.getDate(),
      currentMonth:
        current.getMonth() === month,
      isToday:
        current.toDateString() ===
        today.toDateString(),
    };
  });
}

function formatTime(iso: string) {
  return new Intl.DateTimeFormat(
    "sv-SE",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(new Date(iso));
}

export default function BookingEmbed() {
  const searchParams = useSearchParams();

  const supportParam =
    searchParams.get("support");

  const supportType: SupportType | null =
    isSupportType(supportParam)
      ? supportParam
      : null;

  const initialName =
    searchParams.get("name") ?? "";

  const initialEmail =
    searchParams.get("email") ?? "";

  const initialPhone =
    searchParams.get("phone") ?? "";

  const initialCompany =
    searchParams.get("company") ?? "";

  const initialPostcode =
    searchParams.get("postcode") ?? "";

  const initialMessage =
    searchParams.get("message") ?? "";

  const initialCustomer =
    searchParams.get("customer") ?? "";

  const initialService =
    searchParams.get("service") ?? "";

  const initialMode =
    searchParams.get("mode") ?? "";
  const hasPrefilledContact =
    Boolean(
      initialName.trim() &&
      initialEmail.trim() &&
      initialPhone.trim()
    );
  const [visibleMonth, setVisibleMonth] =
    useState(() => {
      const now = new Date();

      return new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      );
    });

  const [selectedDate, setSelectedDate] =
    useState<Date | null>(null);

  const [slots, setSlots] =
    useState<BookingSlot[]>([]);

  const [slotsLoading, setSlotsLoading] =
    useState(false);

  const [slotsError, setSlotsError] =
    useState<string | null>(null);

  const [notConfigured, setNotConfigured] =
    useState(false);

  const [selectedSlot, setSelectedSlot] =
    useState<BookingSlot | null>(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const [name, setName] =
    useState(initialName);

  const [email, setEmail] =
    useState(initialEmail);

  const [phone, setPhone] =
    useState(initialPhone);

  const [bookingLoading, setBookingLoading] =
    useState(false);

  const [bookingError, setBookingError] =
    useState<string | null>(null);

  const [bookingId, setBookingId] =
    useState<string | null>(null);

  const calendarDays = useMemo(
    () => buildMonth(visibleMonth),
    [visibleMonth]
  );

  const monthLabel =
    new Intl.DateTimeFormat(
      "sv-SE",
      {
        month: "long",
        year: "numeric",
      }
    ).format(visibleMonth);

  const selectedDateLabel =
    selectedDate
      ? new Intl.DateTimeFormat(
          "sv-SE",
          {
            weekday: "long",
            day: "numeric",
            month: "long",
          }
        ).format(selectedDate)
      : null;

  function changeMonth(offset: number) {
    setVisibleMonth((current) => {
      return new Date(
        current.getFullYear(),
        current.getMonth() + offset,
        1
      );
    });

    setSelectedDate(null);
    setSelectedSlot(null);
    setSlots([]);
    setSlotsError(null);
    setShowDetails(false);
  }

  async function selectDay(date: Date) {
    setSelectedDate(date);
    setSelectedSlot(null);
    setShowDetails(false);
    setSlots([]);
    setSlotsError(null);
    setNotConfigured(false);

    if (!supportType) {
      setSlotsError(
        "Välj supportform innan du väljer tid."
      );
      return;
    }

    setSlotsLoading(true);

    const start = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      0,
      0,
      0,
      0
    );

    const end = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59,
      999
    );

    try {
      const response = await fetch(
        `/api/booking/slots?support=${encodeURIComponent(
          supportType
        )}&start=${encodeURIComponent(
          start.toISOString()
        )}&end=${encodeURIComponent(
          end.toISOString()
        )}`,
        {
          cache: "no-store",
        }
      );

      const data =
        (await response.json()) as SlotsResponse;

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Lediga tider kunde inte hämtas."
        );
      }

      if (data.configured === false) {
        setNotConfigured(true);
        return;
      }

      setSlots(
        Array.isArray(data.slots)
          ? data.slots
          : []
      );
    }
    catch (error) {
      setSlotsError(
        error instanceof Error
          ? error.message
          : "Ett tekniskt fel uppstod."
      );
    }
    finally {
      setSlotsLoading(false);
    }
  }

  function selectSlot(slot: BookingSlot) {
    setSelectedSlot(slot);
    setShowDetails(true);
    setBookingError(null);
  }

  async function submitBooking(
    event?: React.FormEvent<HTMLFormElement>
  ) {
    event?.preventDefault();

    if (
      !supportType ||
      !selectedSlot ||
      !name.trim() ||
      !email.trim()
    ) {
      setBookingError(
        "Kontrollera att support, tid, namn och e-post är ifyllda."
      );
      return;
    }

    setBookingLoading(true);
    setBookingError(null);

    const firstLocation =
      selectedSlot.locations?.[0];

    try {
      const response = await fetch(
        "/api/booking/schedule",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            support: supportType,
            startTime:
              selectedSlot.start_time,

            timeZone:
              Intl.DateTimeFormat()
                .resolvedOptions()
                .timeZone,

            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),

            location:
              firstLocation
                ? {
                    type:
                      firstLocation.type,
                    value:
                      firstLocation.value,
                  }
                : null,
          }),
        }
      );

      const data =
        (await response.json()) as ScheduleResponse;

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Bokningen kunde inte genomföras."
        );
      }

      setBookingId(
        data.bookingId ?? "bekräftad"
      );
    }
    catch (error) {
      setBookingError(
        error instanceof Error
          ? error.message
          : "Ett tekniskt fel uppstod."
      );
    }
    finally {
      setBookingLoading(false);
    }
  }

  return (
    <div className="booking-flow-v4">

      <header className="booking-flow-v4-brand">
        <div
          className="booking-flow-v4-planet"
          aria-hidden="true"
        >
          <span className="booking-flow-v4-glow" />

          <div className="booking-flow-v4-orbit">
            <span className="booking-flow-v4-core" />
            <span className="ring ring-one" />
            <span className="ring ring-two" />
            <span className="ring ring-three" />

            <i className="node node-one" />
            <i className="node node-two" />
            <i className="node node-three" />
          </div>
        </div>

        <Image
          src="/logos/logo-light.png"
          alt="Macsupport Stockholm"
          width={220}
          height={92}
          priority
        />

        <div className="booking-flow-v4-heading">
          <span>ONLINEBOKNING</span>

          <strong>
            Välj datum och tid
          </strong>

          <p>
            Lediga tider visas direkt från vårt bokningssystem.
          </p>
        </div>

        <div className="booking-flow-v4-secure">
          <i />
          Säker bokning
        </div>
      </header>


      <div className="booking-flow-v4-context">
        <div>
          <span>VALD SUPPORT</span>

          <strong>
            {supportType
              ? supportLabels[supportType]
              : "Ingen support vald"}
          </strong>
        </div>

        {!supportType && (
          <a href="/support?intent=booking#support-form">
            Välj support →
          </a>
        )}
      </div>


      {!bookingId ? (
        <>
          <div className="booking-flow-v4-main">

            <section className="booking-flow-v4-calendar">

              <div className="booking-flow-v4-calendar-head">
                <div>
                  <span>VÄLJ DATUM</span>

                  <h3>
                    {monthLabel}
                  </h3>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() =>
                      changeMonth(-1)
                    }
                    aria-label="Föregående månad"
                  >
                    ←
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      changeMonth(1)
                    }
                    aria-label="Nästa månad"
                  >
                    →
                  </button>
                </div>
              </div>


              <div className="booking-flow-v4-weekdays">
                <span>Mån</span>
                <span>Tis</span>
                <span>Ons</span>
                <span>Tor</span>
                <span>Fre</span>
                <span>Lör</span>
                <span>Sön</span>
              </div>


              <div className="booking-flow-v4-days">
                {calendarDays.map((item) => {
                  const isSelected =
                    selectedDate?.toDateString() ===
                    item.date.toDateString();

                  return (
                    <button
                      key={item.date.toISOString()}
                      type="button"
                      disabled={!item.currentMonth}
                      aria-current={
                        item.isToday
                          ? "date"
                          : undefined
                      }
                      onClick={() =>
                        selectDay(item.date)
                      }
                      className={[
                        "booking-flow-v4-day",
                        item.isToday
                          ? "is-today"
                          : "",
                        isSelected
                          ? "is-selected"
                          : "",
                        !item.currentMonth
                          ? "is-outside"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <strong>
                        {item.day}
                      </strong>

                      {item.isToday && (
                        <small>
                          Idag
                        </small>
                      )}
                    </button>
                  );
                })}
              </div>


              <div className="booking-flow-v4-legend">
                <span>
                  <i className="today" />
                  Idag
                </span>

                <span>
                  <i className="available" />
                  Lediga tider
                </span>

                <span>
                  <i className="full" />
                  Fullbokad
                </span>
              </div>

            </section>


            <aside className="booking-flow-v4-times">

              {!selectedDate && (
                <div className="booking-flow-v4-empty">
                  <span>1</span>

                  <strong>
                    Välj ett datum
                  </strong>

                  <p>
                    Klicka på önskad dag för att se lediga tider.
                  </p>
                </div>
              )}


              {selectedDate && (
                <>
                  <div className="booking-flow-v4-times-head">
                    <span>
                      LEDIGA TIDER
                    </span>

                    <h3>
                      {selectedDateLabel}
                    </h3>

                    <p>
                      {supportType
                        ? supportLabels[supportType]
                        : "Support"}
                    </p>
                  </div>


                  {slotsLoading && (
                    <div className="booking-flow-v4-loading">
                      <span />

                      <strong>
                        Hämtar lediga tider
                      </strong>

                      <p>
                        Ett ögonblick...
                      </p>
                    </div>
                  )}


                  {!slotsLoading &&
                    slotsError && (
                      <div className="booking-flow-v4-message is-error">
                        <strong>
                          Något gick fel
                        </strong>

                        <p>
                          {slotsError}
                        </p>
                      </div>
                    )}


                  {!slotsLoading &&
                    notConfigured && (
                      <div className="booking-flow-v4-message">
                        <strong>
                          Bokningskalendern ansluts
                        </strong>

                        <p>
                          OnceHub behöver färdigkonfigureras innan live-tider kan visas.
                        </p>
                      </div>
                    )}


                  {!slotsLoading &&
                    !slotsError &&
                    !notConfigured &&
                    slots.length === 0 && (
                      <div className="booking-flow-v4-full">
                        <span>
                          FULLBOKAD
                        </span>

                        <strong>
                          Inga lediga tider denna dag
                        </strong>

                        <p>
                          Välj en annan dag i kalendern.
                        </p>
                      </div>
                    )}


                  {!slotsLoading &&
                    slots.length > 0 && (
                      <div className="booking-flow-v4-slots">
                        {slots.map((slot) => {
                          const selected =
                            selectedSlot
                              ?.start_time ===
                            slot.start_time;

                          return (
                            <button
                              key={slot.start_time}
                              type="button"
                              className={
                                selected
                                  ? "is-selected"
                                  : ""
                              }
                              onClick={() =>
                                selectSlot(slot)
                              }
                            >
                              <span>
                                {formatTime(
                                  slot.start_time
                                )}
                              </span>

                              <small>
                                Ledig
                              </small>
                            </button>
                          );
                        })}
                      </div>
                    )}

                </>
              )}

            </aside>

          </div>


          {showDetails &&
            selectedSlot &&
            (hasPrefilledContact ? (
                <div className="booking-flow-v4-prefill">
                  <div className="booking-flow-v4-prefill-head">
                    <div>
                      <span>DINA UPPGIFTER</span>

                      <h3>
                        Kontrollera innan du bokar
                      </h3>
                    </div>

                    <a
                      href="/support?intent=booking#support-form"
                      className="booking-flow-v4-prefill-edit"
                    >
                      Ändra
                    </a>
                  </div>

                  <div className="booking-flow-v4-prefill-grid">
                    <div>
                      <span>Namn</span>
                      <strong>{name}</strong>
                    </div>

                    <div>
                      <span>E-post</span>
                      <strong>{email}</strong>
                    </div>

                    <div>
                      <span>Telefon</span>
                      <strong>{phone}</strong>
                    </div>

                    {initialCompany && (
                      <div>
                        <span>Företag</span>
                        <strong>
                          {initialCompany}
                        </strong>
                      </div>
                    )}

                    {initialPostcode && (
                      <div>
                        <span>Postnummer / ort</span>
                        <strong>
                          {initialPostcode}
                        </strong>
                      </div>
                    )}

                    {initialCustomer && (
                      <div>
                        <span>Kundtyp</span>
                        <strong>
                          {customerLabels[initialCustomer] ??
                            initialCustomer}
                        </strong>
                      </div>
                    )}

                    {initialService && (
                      <div>
                        <span>Tjänst</span>
                        <strong>
                          {serviceLabels[initialService] ??
                            initialService}
                        </strong>
                      </div>
                    )}

                    {initialMode && (
                      <div>
                        <span>Supportform</span>
                        <strong>
                          {modeLabels[initialMode] ??
                            initialMode}
                        </strong>
                      </div>
                    )}
                  </div>

                  {initialMessage && (
                    <div className="booking-flow-v4-prefill-message">
                      <span>Beskrivning</span>

                      <p>
                        {initialMessage}
                      </p>
                    </div>
                  )}

                  <div className="booking-flow-v4-confirm">
                    <div>
                      <span>VALD SUPPORT</span>

                      <strong>
                        {supportType
                          ? supportLabels[supportType]
                          : "—"}
                      </strong>
                    </div>

                    <button
                      type="button"
                      disabled={
                        bookingLoading ||
                        !selectedSlot
                      }
                      onClick={() => {
                        void submitBooking();
                      }}
                    >
                      {bookingLoading
                        ? "Bokar..."
                        : "Bekräfta bokning"}
                    </button>
                  </div>
                </div>
              ) : (
              <form
                className="booking-flow-v4-details"
                onSubmit={submitBooking}
              >
                <div className="booking-flow-v4-details-head">
                  <span>
                    DINA UPPGIFTER
                  </span>

                  <h3>
                    Slutför bokningen
                  </h3>

                  <p>
                    Kontrollera tid och fyll sedan i dina kontaktuppgifter.
                  </p>
                </div>


                <div className="booking-flow-v4-fields">

                  <label>
                    <span>Namn *</span>

                    <input
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(event) =>
                        setName(
                          event.target.value
                        )
                      }
                      placeholder="Ditt namn"
                      required
                    />
                  </label>


                  <label>
                    <span>E-post *</span>

                    <input
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(
                          event.target.value
                        )
                      }
                      placeholder="namn@exempel.se"
                      required
                    />
                  </label>


                  <label>
                    <span>
                      Telefonnummer
                    </span>

                    <input
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(event) =>
                        setPhone(
                          event.target.value
                        )
                      }
                      placeholder="07X-XXX XX XX"
                    />
                  </label>

                </div>


                {bookingError && (
                  <div className="booking-flow-v4-booking-error">
                    {bookingError}
                  </div>
                )}


                <div className="booking-flow-v4-confirm">

                  <div>
                    <span>
                      SUPPORT
                    </span>

                    <strong>
                      {supportType
                        ? supportLabels[supportType]
                        : "—"}
                    </strong>
                  </div>

                  <div>
                    <span>DATUM</span>

                    <strong>
                      {selectedDateLabel}
                    </strong>
                  </div>

                  <div>
                    <span>TID</span>

                    <strong>
                      {formatTime(
                        selectedSlot.start_time
                      )}
                    </strong>
                  </div>

                  <button
                    type="submit"
                    disabled={bookingLoading}
                  >
                    {bookingLoading
                      ? "Bokar..."
                      : "Bekräfta bokning"}

                    {!bookingLoading && (
                      <span
                        aria-hidden="true"
                      >
                        →
                      </span>
                    )}
                  </button>

                </div>

              </form>
              ))}
        </>
      ) : (
        <div className="booking-flow-v4-success">

          <div className="booking-flow-v4-success-icon">
            ✓
          </div>

          <span>
            BOKNING BEKRÄFTAD
          </span>

          <h3>
            Tack! Din tid är bokad.
          </h3>

          <p>
            En bekräftelse skickas till den e-postadress du angav.
          </p>

          <div className="booking-flow-v4-success-summary">

            <div>
              <span>Support</span>

              <strong>
                {supportType
                  ? supportLabels[supportType]
                  : "—"}
              </strong>
            </div>

            <div>
              <span>Datum</span>

              <strong>
                {selectedDateLabel}
              </strong>
            </div>

            <div>
              <span>Tid</span>

              <strong>
                {selectedSlot
                  ? formatTime(
                      selectedSlot.start_time
                    )
                  : "—"}
              </strong>
            </div>

          </div>

          <small>
            Bokningsnummer: {bookingId}
          </small>

        </div>
      )}

    </div>
  );
}
