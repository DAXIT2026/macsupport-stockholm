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

function buildMonth(
  visibleMonth: Date
): CalendarDay[] {
  const year =
    visibleMonth.getFullYear();

  const month =
    visibleMonth.getMonth();

  const first =
    new Date(year, month, 1);

  const mondayOffset =
    (first.getDay() + 6) % 7;

  const start =
    new Date(
      year,
      month,
      1 - mondayOffset
    );

  return Array.from(
    { length: 42 },
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

function dateKey(date: Date) {
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

export default function BookingCalendarPicker({
  support,
  booking,
  onChange,
}: Props) {
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

  const [selectedSlot, setSelectedSlot] =
    useState<BookingSlot | null>(null);

  const [slots, setSlots] =
    useState<BookingSlot[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [configured, setConfigured] =
    useState(true);

  const days =
    useMemo(
      () =>
        buildMonth(
          visibleMonth
        ),
      [visibleMonth]
    );

  const slotsByDate =
    useMemo(() => {
      const map =
        new Map<
          string,
          BookingSlot[]
        >();

      for (const slot of slots) {
        const key =
          slotDateKey(
            slot.start_time
          );

        const current =
          map.get(key) ?? [];

        current.push(slot);

        map.set(
          key,
          current
        );
      }

      return map;
    }, [slots]);

  const selectedSlots =
    selectedDate
      ? slotsByDate.get(
          dateKey(selectedDate)
        ) ?? []
      : [];

  useEffect(() => {
    onChange(null);


    if (!support || !booking) {
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
          (await response.json()) as SlotsResponse;

        if (!response.ok) {
          throw new Error(
            data.error ??
              "Lediga tider kunde inte hämtas."
          );
        }

        setConfigured(
          data.configured !== false
        );

        setSlots(
          data.slots ?? []
        );
      }
      catch (error) {
        if (
          error instanceof DOMException &&
          error.name ===
            "AbortError"
        ) {
          return;
        }

        setSlots([]);

        setError(
          error instanceof Error
            ? error.message
            : "Bokningssystemet kunde inte nås."
        );
      }
      finally {
        setLoading(false);
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
  }

  function chooseDate(
    date: Date
  ) {
    setSelectedDate(date);
    setSelectedSlot(null);
    onChange(null);
  }

  function chooseSlot(
    slot: BookingSlot
  ) {
    if (!selectedDate) {
      return;
    }

    setSelectedSlot(slot);

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

  const monthLabel =
    new Intl.DateTimeFormat(
      "sv-SE",
      {
        month: "long",
        year: "numeric",
      }
    ).format(
      visibleMonth
    );

  const today =
    new Date();

  return (
    <div className="booking-picker-v1">

      {!support ? (
        <div className="booking-picker-v1-empty">
          Välj supportform ovan för att se lediga tider.
        </div>
      ) : (
        <div className="booking-picker-v1-layout">

          <div className="booking-picker-v1-calendar">

            <div className="booking-picker-v1-head">
              <button
                type="button"
                onClick={() =>
                  changeMonth(-1)
                }
                aria-label="Föregående månad"
              >
                ←
              </button>

              <strong>
                {monthLabel}
              </strong>

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
                    dateKey(date);

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

                  const isPast =
                    date <
                    new Date(
                      today.getFullYear(),
                      today.getMonth(),
                      today.getDate()
                    );

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
                        count >= 3
                          ? "is-open"
                          : "",
                        count > 0 &&
                        count <= 2
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
                            {count > 0
                              ? `${count} ${
                                  count === 1
                                    ? "tid"
                                    : "tider"
                                }`
                              : "Inga tider"}
                          </small>
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

            {!configured && (
              <div className="booking-picker-v1-status is-error">
                Bokningskalendern är ännu inte konfigurerad.
              </div>
            )}

            {error && (
              <div className="booking-picker-v1-status is-error">
                {error}
              </div>
            )}

          </div>


          <div className="booking-picker-v1-times">

            {!selectedDate ? (
              <div className="booking-picker-v1-times-empty">
                <span>LEDIGA TIDER</span>

                <strong>
                  Välj ett datum
                </strong>

                <p>
                  Tillgängliga tider visas här.
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
                            onClick={() =>
                              chooseSlot(
                                slot
                              )
                            }
                          >
                            {formatTime(
                              slot.start_time
                            )}

                            {active && (
                              <span>
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
              </>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
