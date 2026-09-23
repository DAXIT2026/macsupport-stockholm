"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

export type BookingPickerSupport =
  | "hembesok"
  | "distans"
  | "foretag";

type BookingLocation = {
  type: string;
  value: string | null;
  id?: string | null;
};

type BookingSlot = {
  start_time: string;
  locations?: BookingLocation[];
};

type SlotsResponse = {
  configured?: boolean;
  slots?: BookingSlot[];
  error?: string;
};

export type BookingSelection = {
  startTime: string;
  dateLabel: string;
  timeLabel: string;
  location: BookingLocation | null;
};

export type BookingPickerCategory =
  | "general"
  | "support"
  | "senior"
  | "networkCable"
  | "network";

type Props = {
  support: BookingPickerSupport | null;
  booking: BookingPickerCategory | null;
  onChange: (
    selection: BookingSelection | null
  ) => void;
};

type CalendarDay = {
  date: Date;
  currentMonth: boolean;
};

const REAL_BOOKING_URL =
  "https://go.oncehub.com/daxit-bokatid";

function buildMonth(
  visibleMonth: Date
): CalendarDay[] {
  const year =
    visibleMonth.getFullYear();

  const month =
    visibleMonth.getMonth();

  const first =
    new Date(
      year,
      month,
      1
    );

  const mondayOffset =
    (first.getDay() + 6) % 7;

  const start =
    new Date(
      year,
      month,
      1 - mondayOffset
    );

  return Array.from(
    {
      length: 42,
    },
    (_, index) => {
      const date =
        new Date(start);

      date.setDate(
        start.getDate() + index
      );

      return {
        date,
        currentMonth:
          date.getMonth() === month,
      };
    }
  );
}

function dateKey(
  date: Date
) {
  return date.toLocaleDateString(
    "sv-SE",
    {
      timeZone:
        "Europe/Stockholm",
    }
  );
}

function slotDateKey(
  iso: string
) {
  return new Date(
    iso
  ).toLocaleDateString(
    "sv-SE",
    {
      timeZone:
        "Europe/Stockholm",
    }
  );
}

function formatTime(
  iso: string
) {
  return new Intl.DateTimeFormat(
    "sv-SE",
    {
      hour: "2-digit",
      minute: "2-digit",
      timeZone:
        "Europe/Stockholm",
    }
  ).format(
    new Date(iso)
  );
}

function formatDate(
  date: Date
) {
  return new Intl.DateTimeFormat(
    "sv-SE",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
    }
  ).format(date);
}

function formatMonth(
  date: Date
) {
  return new Intl.DateTimeFormat(
    "sv-SE",
    {
      month: "long",
      year: "numeric",
    }
  ).format(date);
}

function stockholmIso(
  date: Date,
  hour: number
) {
  const copy =
    new Date(date);

  copy.setHours(
    hour,
    0,
    0,
    0
  );

  return copy.toISOString();
}

function buildPreviewSlots(
  visibleMonth: Date
): BookingSlot[] {
  const slots: BookingSlot[] = [];

  const today =
    new Date();

  const minimumDate =
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

  const year =
    visibleMonth.getFullYear();

  const month =
    visibleMonth.getMonth();

  const daysInMonth =
    new Date(
      year,
      month + 1,
      0
    ).getDate();

  for (
    let day = 1;
    day <= daysInMonth;
    day += 1
  ) {
    const date =
      new Date(
        year,
        month,
        day
      );

    if (
      date < minimumDate
    ) {
      continue;
    }

    const weekDay =
      date.getDay();

    if (
      weekDay === 0 ||
      weekDay === 6
    ) {
      continue;
    }

    let hours: number[] = [];

    if (
      weekDay === 1 ||
      weekDay === 3
    ) {
      hours = [
        9,
        11,
        13,
        15,
        17,
      ];
    }
    else if (
      weekDay === 2
    ) {
      hours = [
        10,
        13,
        16,
      ];
    }
    else if (
      weekDay === 4
    ) {
      hours = [
        9,
        14,
      ];
    }
    else if (
      weekDay === 5
    ) {
      hours = [
        10,
      ];
    }

    for (
      const hour of hours
    ) {
      slots.push({
        start_time:
          stockholmIso(
            date,
            hour
          ),
      });
    }
  }

  return slots;
}

export default function BookingCalendarPicker({
  support,
  booking,
  onChange,
}: Props) {
  const [
    visibleMonth,
    setVisibleMonth,
  ] =
    useState(() => {
      const now =
        new Date();

      return new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      );
    });

  const [
    selectedDate,
    setSelectedDate,
  ] =
    useState<Date | null>(
      null
    );

  const [
    selectedSlot,
    setSelectedSlot,
  ] =
    useState<BookingSlot | null>(
      null
    );

  const [
    slots,
    setSlots,
  ] =
    useState<BookingSlot[]>(
      []
    );

  const [
    loading,
    setLoading,
  ] =
    useState(false);

  const [
    error,
    setError,
  ] =
    useState<string | null>(
      null
    );

  const [
    configured,
    setConfigured,
  ] =
    useState(true);

  const days =
    useMemo(
      () =>
        buildMonth(
          visibleMonth
        ),
      [
        visibleMonth,
      ]
    );

  const previewSlots =
    useMemo(
      () =>
        buildPreviewSlots(
          visibleMonth
        ),
      [
        visibleMonth,
      ]
    );

  const displaySlots =
    configured
      ? slots
      : previewSlots;

  const slotsByDate =
    useMemo(() => {
      const map =
        new Map<
          string,
          BookingSlot[]
        >();

      for (
        const slot of displaySlots
      ) {
        const key =
          slotDateKey(
            slot.start_time
          );

        const current =
          map.get(key) ?? [];

        current.push(
          slot
        );

        map.set(
          key,
          current
        );
      }

      return map;
    }, [
      displaySlots,
    ]);

  const selectedSlots =
    selectedDate
      ? slotsByDate.get(
          dateKey(
            selectedDate
          )
        ) ?? []
      : [];

  useEffect(() => {
    onChange(null);

    if (
      !support ||
      !booking
    ) {
      return;
    }

    const currentSupport =
      support;

    const currentBooking =
      booking;

    const controller =
      new AbortController();

    async function loadMonth() {
      setLoading(true);
      setError(null);

      const start =
        new Date(
          visibleMonth.getFullYear(),
          visibleMonth.getMonth(),
          1,
          0,
          0,
          0,
          0
        );

      const end =
        new Date(
          visibleMonth.getFullYear(),
          visibleMonth.getMonth() + 1,
          0,
          23,
          59,
          59,
          999
        );

      try {
        const url =
          `/api/booking/slots?support=${encodeURIComponent(
            currentSupport
          )}&booking=${encodeURIComponent(
            currentBooking
          )}&start=${encodeURIComponent(
            start.toISOString()
          )}&end=${encodeURIComponent(
            end.toISOString()
          )}`;

        const response =
          await fetch(
            url,
            {
              signal:
                controller.signal,
            }
          );

        const data =
          (
            await response.json()
          ) as SlotsResponse;

        if (
          !response.ok
        ) {
          throw new Error(
            data.error ??
              "Lediga tider kunde inte hämtas."
          );
        }

        const isConfigured =
          data.configured !== false;

        setConfigured(
          isConfigured
        );

        setSlots(
          isConfigured
            ? data.slots ?? []
            : []
        );
      }
      catch (requestError) {
        if (
          controller.signal.aborted
        ) {
          return;
        }

        setConfigured(
          false
        );

        setSlots([]);

        setError(
          requestError instanceof Error
            ? requestError.message
            : "Kalendern kunde inte ansluta till bokningssystemet."
        );
      }
      finally {
        if (
          !controller.signal.aborted
        ) {
          setLoading(
            false
          );
        }
      }
    }

    void loadMonth();

    return () => {
      controller.abort();
    };
  }, [
    support,
    booking,
    visibleMonth,
    onChange,
  ]);

  function changeMonth(
    offset: number
  ) {
    setVisibleMonth(
      (current) =>
        new Date(
          current.getFullYear(),
          current.getMonth() +
            offset,
          1
        )
    );

    setSelectedDate(
      null
    );

    setSelectedSlot(
      null
    );

    onChange(null);
  }

  function chooseDate(
    date: Date
  ) {
    setSelectedDate(
      date
    );

    setSelectedSlot(
      null
    );

    onChange(null);
  }

  function chooseSlot(
    slot: BookingSlot
  ) {
    if (
      !selectedDate
    ) {
      return;
    }

    setSelectedSlot(
      slot
    );

    if (
      !configured
    ) {
      onChange(null);
      return;
    }

    onChange({
      startTime:
        slot.start_time,

      dateLabel:
        formatDate(
          selectedDate
        ),

      timeLabel:
        formatTime(
          slot.start_time
        ),

      location:
        slot.locations?.[0] ??
        null,
    });
  }

  if (
    !support ||
    !booking
  ) {
    return (
      <div className="booking-picker-v1-empty">
        <strong>
          Välj supportform först
        </strong>

        <p>
          När du har valt hur du vill få hjälp visas kalendern här.
        </p>
      </div>
    );
  }

  const today =
    new Date();

  return (
    <div
      className={[
        "booking-picker-v1",
        !configured
          ? "is-preview"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {!configured && (
        <div className="booking-picker-v1-preview-notice">
          <div>
            <span className="booking-picker-v1-preview-dot" />

            <div>
              <strong>
                Förhandsvisning av kalendern
              </strong>

              <p>
                Du kan prova datum och tider här. Exakta lediga tider bekräftas i vårt ordinarie bokningssystem.
              </p>
            </div>
          </div>

          <span>
            DEMO
          </span>
        </div>
      )}

      <div className="booking-picker-v1-layout">
        <div className="booking-picker-v1-calendar">
          <div className="booking-picker-v1-head">
            <button
              type="button"
              aria-label="Föregående månad"
              onClick={() =>
                changeMonth(-1)
              }
            >
              ←
            </button>

            <strong>
              {formatMonth(
                visibleMonth
              )}
            </strong>

            <button
              type="button"
              aria-label="Nästa månad"
              onClick={() =>
                changeMonth(1)
              }
            >
              →
            </button>
          </div>

          <div
            className="booking-picker-v1-legend"
            aria-label="Tillgänglighet"
          >
            <span className="is-open">
              <i />
              Gott om tider
            </span>

            <span className="is-low">
              <i />
              Få tider kvar
            </span>

            <span className="is-full">
              <i />
              Fullbokad
            </span>
          </div>

          <div className="booking-picker-v1-week">
            <span>Mån</span>
            <span>Tis</span>
            <span>Ons</span>
            <span>Tor</span>
            <span>Fre</span>
            <span>Lör</span>
            <span>Sön</span>
          </div>

          <div className="booking-picker-v1-days">
            {days.map(
              ({
                date,
                currentMonth,
              }) => {
                const key =
                  dateKey(
                    date
                  );

                const count =
                  slotsByDate.get(
                    key
                  )?.length ?? 0;

                const isSelected =
                  selectedDate
                    ? dateKey(
                        selectedDate
                      ) === key
                    : false;

                const isToday =
                  dateKey(
                    today
                  ) === key;

                const beginningToday =
                  new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate()
                  );

                const isPast =
                  date <
                  beginningToday;

                const disabled =
                  !currentMonth ||
                  isPast ||
                  count === 0;

                return (
                  <button
                    key={key}
                    type="button"
                    disabled={
                      disabled
                    }
                    aria-pressed={
                      isSelected
                    }
                    onClick={() =>
                      chooseDate(
                        date
                      )
                    }
                    className={[
                      "booking-picker-v1-day",

                      isSelected
                        ? "is-selected"
                        : "",

                      isToday
                        ? "is-today"
                        : "",

                      count >= 4
                        ? "is-open"
                        : "",

                      count > 0 &&
                      count <= 3
                        ? "is-low"
                        : "",

                      currentMonth &&
                      !isPast &&
                      count === 0
                        ? "is-empty"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <strong>
                      {date.getDate()}
                    </strong>

                    {currentMonth &&
                      !isPast && (
                        <small>
                          {count >= 4
                            ? `Gott om tider · ${count}`
                            : count > 0
                              ? `Få tider · ${count}`
                              : "Fullbokad"}
                        </small>
                      )}

                    {isSelected && (
                      <span
                        className="booking-picker-v1-day-check"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                    )}
                  </button>
                );
              }
            )}
          </div>

          {loading && (
            <div className="booking-picker-v1-status">
              Hämtar lediga tider…
            </div>
          )}

          {error &&
            configured && (
              <div className="booking-picker-v1-status is-error">
                {error}
              </div>
            )}
        </div>

        <div className="booking-picker-v1-times">
          {!selectedDate ? (
            <div className="booking-picker-v1-times-empty">
              <span>
                LEDIGA TIDER
              </span>

              <strong>
                Välj ett datum
              </strong>

              <p>
                Klicka på en tillgänglig dag så visas tiderna här.
              </p>
            </div>
          ) : (
            <>
              <div className="booking-picker-v1-times-head">
                <span>
                  LEDIGA TIDER
                </span>

                <strong>
                  {formatDate(
                    selectedDate
                  )}
                </strong>

                <small>
                  {selectedSlots.length}
                  {" "}
                  {selectedSlots.length ===
                  1
                    ? "tid kvar"
                    : "tider kvar"}
                </small>
              </div>

              {selectedSlots.length >
              0 ? (
                <div className="booking-picker-v1-slots">
                  {selectedSlots.map(
                    (slot) => {
                      const active =
                        selectedSlot
                          ?.start_time ===
                        slot.start_time;

                      return (
                        <button
                          key={
                            slot.start_time
                          }
                          type="button"
                          className={
                            active
                              ? "is-selected"
                              : ""
                          }
                          aria-pressed={
                            active
                          }
                          onClick={() =>
                            chooseSlot(
                              slot
                            )
                          }
                        >
                          <span>
                            {formatTime(
                              slot.start_time
                            )}
                          </span>

                          {active && (
                            <span
                              aria-hidden="true"
                            >
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    }
                  )}
                </div>
              ) : (
                <div className="booking-picker-v1-full">
                  Inga lediga tider denna dag.
                </div>
              )}

              {selectedSlot &&
                !configured && (
                  <div className="booking-picker-v1-preview-selection">
                    <div className="booking-picker-v1-preview-summary">
                      <span>
                        Ditt val
                      </span>

                      <strong>
                        {formatDate(
                          selectedDate
                        )}
                      </strong>

                      <small>
                        kl.{" "}
                        {formatTime(
                          selectedSlot.start_time
                        )}
                      </small>
                    </div>

                    <a
                      href={
                        REAL_BOOKING_URL
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="booking-picker-v1-preview-continue"
                    >
                      <span>
                        Fortsätt till bokning
                      </span>

                      <span
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </a>

                    <p>
                      Kontrollera och välj din slutliga tid i OnceHub. När API-kopplingen är klar sker hela bokningen direkt här.
                    </p>
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}