"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { resolveBookingCategory } from "../lib/booking-category";
import BookingCalendarPicker, { type BookingSelection } from "./BookingCalendarPicker";

type CustomerType =
  | "privat"
  | "senior"
  | "foretag";

type ServiceType =
  | "general"
  | "mac"
  | "wifi"
  | "network-cable"
  | "unifi-camera"
  | "email"
  | "microsoft365"
  | "security"
  | "device"
  | "other";

type SupportMode =
  | "hembesok"
  | "distans"
  | "telefon";

const customerLabels: Record<CustomerType, string> = {
  privat: "Privatperson",
  senior: "Senior / pensionär",
  foretag: "Företag",
};

const serviceLabels: Record<ServiceType, string> = {
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

const supportModeLabels: Record<SupportMode, string> = {
  hembesok: "Hembesök",
  distans: "Support på distans",
  telefon: "Telefonsupport",
};

function readCustomerType(
  value: string | null
): CustomerType | null {
  if (
    value === "privat" ||
    value === "senior" ||
    value === "foretag"
  ) {
    return value;
  }

  return null;
}

function readServiceType(
  value: string | null
): ServiceType | null {
  const allowed: ServiceType[] = [
    "general",
    "mac",
    "wifi",
    "network-cable",
    "unifi-camera",
    "email",
    "microsoft365",
    "security",
    "device",
    "other",
  ];

  return allowed.includes(
    value as ServiceType
  )
    ? (value as ServiceType)
    : null;
}

function readSupportMode(
  value: string | null
): SupportMode | null {
  const allowed: SupportMode[] = [
    "hembesok",
    "distans",
    "telefon",
  ];

  return allowed.includes(
    value as SupportMode
  )
    ? (value as SupportMode)
    : null;
}
export default function UnifiedSupportForm() {
  const searchParams = useSearchParams();

  const initialCustomer =
    readCustomerType(
      searchParams.get("customer")
    );

  const initialService =
    readServiceType(
      searchParams.get("service")
    );

  const initialMode =
    readSupportMode(
      searchParams.get("mode")
    );

  const intent =
    searchParams.get("intent") === "booking"
      ? "booking"
      : "message";

  const audience =
    searchParams.get("audience") ?? "general";

  const [customerType, setCustomerType] =
    useState<CustomerType | null>(initialCustomer);

  const [service, setService] =
    useState<ServiceType | null>(initialService);

  const [supportMode, setSupportMode] =
    useState<SupportMode | null>(initialMode);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [company, setCompany] =
    useState("");

  const [organisationNumber, setOrganisationNumber] =
    useState("");

  const [postcode, setPostcode] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [smsConsent, setSmsConsent] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);
const [bookingSelection, setBookingSelection] =
    useState<BookingSelection | null>(null);

  const [bookingLoading, setBookingLoading] =
    useState(false);

  const [bookingId, setBookingId] =
    useState<string | null>(null);

  const bookingCategory = useMemo(() => {
    if (!customerType || !service) {
      return null;
    }

    return resolveBookingCategory({
      audience,
      customer: customerType,
      service,
    });
  }, [
    audience,
    customerType,
    service,
  ]);
  async function confirmBooking() {
    setError(null);

    if (!validateContactFields()) {
      return;
    }

    if (!bookingCategory) {
      setError(
        "Vi kunde inte välja rätt bokningskalender."
      );
      return;
    }

    if (!bookingSelection) {
      setError(
        "Välj ett datum och en ledig tid."
      );
      return;
    }

    setBookingLoading(true);

    try {
      const response = await fetch(
        "/api/booking/schedule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            booking: bookingCategory,
            support:
              supportMode === "hembesok"
                ? "hembesok"
                : "distans",
            startTime:
              bookingSelection.startTime,
            timeZone:
              Intl.DateTimeFormat()
                .resolvedOptions()
                .timeZone,
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            location:
              bookingSelection.location,
            company:
              customerType === "foretag"
                ? company.trim()
                : null,
            organisationNumber:
              customerType === "foretag"
                ? organisationNumber.trim()
                : null,
            postcode:
              supportMode === "hembesok"
                ? postcode.trim()
                : null,
            message: message.trim(),
            smsConsent,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data?.error ??
            "Bokningen kunde inte genomföras."
        );
        return;
      }

      setBookingId(
        data.bookingId ??
          data.id ??
          "Bekräftad"
      );
    } catch {
      setError(
        "Bokningssystemet kunde inte nås. Försök igen."
      );
    } finally {
      setBookingLoading(false);
    }
  }
function validateContactFields() {
    setError(null);

    if (!customerType) {
      setError(
        "Välj vem supporten gäller."
      );

      return false;
    }

    if (!service) {
      setError(
        "Välj vad du behöver hjälp med."
      );

      return false;
    }

    if (!supportMode) {
      setError(
        "Välj hur du vill få hjälp."
      );

      return false;
    }

    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim()
    ) {
      setError(
        "Fyll i namn, e-post och telefonnummer."
      );

      return false;
    }

    if (
      supportMode === "hembesok" &&
      !postcode.trim()
    ) {
      setError(
        "Fyll i postnummer för hembesök."
      );

      return false;
    }

    if (
      customerType === "foretag" &&
      !company.trim()
    ) {
      setError(
        "Fyll i företagsnamn."
      );

      return false;
    }

    if (
      customerType === "foretag" &&
      !organisationNumber.trim()
    ) {
      setError(
        "Fyll i organisationsnummer."
      );

      return false;
    }

    return true;
  }

  function prepareMessageRequest() {
    if (!validateContactFields()) {
      return;
    }

    setError(
      "Förfrågan är klar att skickas. Nästa steg är att koppla formuläret till vår server."
    );
  }
  return (
    <div className="support-unified-v1">

      <header className="support-unified-v1-header">
        <div>
          <span className="support-unified-v1-eyebrow">
            KONTAKT & BOKNING
          </span>

          <h2>
            {intent === "booking"
              ? "Boka support på ditt sätt."
              : "Hur kan vi hjälpa dig?"}
          </h2>

          <p>
            {intent === "booking"
              ? "Berätta vad du behöver hjälp med, så följer dina val med hela vägen till bokningen."
              : "Berätta kort vad du behöver hjälp med. Du kan sedan välja om du vill boka en tid eller skicka din förfrågan."}
          </p>
        </div>

        <div className="support-unified-v1-secure">
          <span aria-hidden="true">
            ✓
          </span>

          Trygg och säker hantering
        </div>
      </header>


      <div className="support-unified-v1-progress">
        <div className="is-active">
          <span>1</span>
          Behov
        </div>

        <i />

        <div>
          <span>2</span>
          Kontakt
        </div>

        <i />

        <div>
          <span>3</span>
          Tid
        </div>

        <i />

        <div>
          <span>4</span>
          Klart
        </div>
      </div>


      <div className="support-unified-v1-layout">

        <div className="support-unified-v1-content">

          <section className="support-unified-v1-section">
            <div className="support-unified-v1-section-head">


              <div>
                <strong>
                  Vem gäller det?
                </strong>

                <p>
                  Välj den typ som passar dig.
                </p>
              </div>
            </div>

            <div className="support-unified-v1-compact-field">
  <label htmlFor="support-customer">
    Välj kundtyp
  </label>

  <div className="support-unified-v1-select-wrap">
    <select
      id="support-customer"
      value={customerType ?? ""}
      onChange={(event) =>
        setCustomerType(
          event.target.value
            ? (event.target.value as CustomerType)
            : null
        )
      }
      required
    >
      <option value="" disabled>
        Välj vem supporten gäller
      </option>

      <option value="privat">
        Privatperson
      </option>

      <option value="senior">
        Senior / pensionär
      </option>

      <option value="foretag">
        Företag
      </option>
    </select>

    <span aria-hidden="true">↓</span>
  </div>
</div>
</section>


          <section className="support-unified-v1-section">
            <div className="support-unified-v1-section-head">


              <div>
                <strong>
                  Vad behöver du hjälp med?
                </strong>

                <p>
                  Du kan beskriva problemet mer längre ner.
                </p>
              </div>
            </div>

            <div className="support-unified-v1-compact-field">
  <label htmlFor="support-service">
    Välj tjänst
  </label>

  <div className="support-unified-v1-select-wrap">
    <select
      id="support-service"
      value={service ?? ""}
      onChange={(event) =>
        setService(
          event.target.value
            ? (event.target.value as ServiceType)
            : null
        )
      }
      required
    >
      <option value="" disabled>
        Vad behöver du hjälp med?
      </option>

      {(
        Object.entries(serviceLabels) as [
          ServiceType,
          string
        ][]
      ).map(([value, label]) => (
        <option
          key={value}
          value={value}
        >
          {label}
        </option>
      ))}
    </select>

    <span aria-hidden="true">↓</span>
  </div>
</div>
</section>


          <section className="support-unified-v1-section">
            <div className="support-unified-v1-section-head">


              <div>
                <strong>
                  Hur vill du få hjälp?
                </strong>

                <p>
                  Vi anpassar nästa steg efter ditt val.
                </p>
              </div>
            </div>

            <div className="support-unified-v1-compact-field">
  <label htmlFor="support-mode">
    Välj supportform
  </label>

  <div className="support-unified-v1-select-wrap">
    <select
      id="support-mode"
      value={supportMode ?? ""}
      onChange={(event) =>
        setSupportMode(
          event.target.value
            ? (event.target.value as SupportMode)
            : null
        )
      }
      required
    >
      <option value="" disabled>
        Hur vill du få hjälp?
      </option>

      <option value="hembesok">
        Hembesök
      </option>

      <option value="distans">
        Support på distans
      </option>

      <option value="telefon">
        Telefonsupport
      </option>
    </select>

    <span aria-hidden="true">↓</span>
  </div>
</div>
</section>




<section className="support-unified-v1-section">
            <div className="support-unified-v1-section-head">


              <div>
                <strong>
                  Dina uppgifter
                </strong>

                <p>
                  Vi använder uppgifterna för din förfrågan och bokning.
                </p>
              </div>
            </div>

            <div className="support-unified-v1-fields">

              <label>
                <span>
                  Namn *
                </span>

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
                />
              </label>


              <label>
                <span>
                  E-post *
                </span>

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
                />
              </label>


              <label>
                <span>
                  Telefonnummer *
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
                  placeholder="+46 7X XXX XX XX"
                />
              </label>


              {customerType === "foretag" && (
                <>
                  <label>
                    <span>
                      Företagsnamn *
                    </span>

                    <input
                      type="text"
                      autoComplete="organization"
                      value={company}
                      onChange={(event) =>
                        setCompany(
                          event.target.value
                        )
                      }
                      placeholder="Företagsnamn"
                      required
                    />
                  </label>

                  <label>
                    <span>
                      Organisationsnummer *
                    </span>

                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      value={organisationNumber}
                      onChange={(event) =>
                        setOrganisationNumber(
                          event.target.value
                        )
                      }
                      placeholder="XXXXXX-XXXX"
                      aria-describedby="support-organisation-help"
                      required
                    />

                    <small id="support-organisation-help">
                      Ange företagets organisationsnummer.
                    </small>
                  </label>
                </>
              )}


              {supportMode === "hembesok" && (
                <label>
                  <span>
                    Postnummer / ort
                  </span>

                  <input
                    type="text"
                    value={postcode}
                    onChange={(event) =>
                      setPostcode(
                        event.target.value
                      )
                    }
                    placeholder="Exempel: 114 35 Stockholm"
                  />
                </label>
              )}

            </div>


            <label className="support-unified-v1-message">
              <span>
                Beskriv problemet
              </span>

              <textarea
                value={message}
                onChange={(event) =>
                  setMessage(
                    event.target.value
                  )
                }
                placeholder="Exempel: Min Mac har blivit långsam och jag behöver hjälp med backup..."
              />
            </label>


            <label className="support-unified-v1-sms">
              <input
                type="checkbox"
                checked={smsConsent}
                onChange={(event) =>
                  setSmsConsent(
                    event.target.checked
                  )
                }
              />

              <span className="support-unified-v1-sms-check">
                ✓
              </span>

              <div>
                <strong>
                  SMS-bekräftelse
                </strong>

                <small>
                  Skicka bokningsinformation och bekräftelse till mitt telefonnummer.
                </small>
              </div>
            </label>

          </section>


          {intent === "booking" && (
            <section className="support-unified-v1-section support-unified-v1-calendar">
              <div className="support-unified-v1-section-head">
                <div>
                  <strong>
                    Välj datum och tid
                  </strong>

                  <p>
                    Välj först en ledig dag och därefter den tid som passar dig.
                  </p>
                </div>
              </div>

              <BookingCalendarPicker
                support={
                  supportMode === "hembesok"
                    ? "hembesok"
                    : supportMode === "distans" ||
                        supportMode === "telefon"
                      ? "distans"
                      : customerType === "foretag"
                        ? "foretag"
                        : null
                }
                booking={bookingCategory}
                onChange={setBookingSelection}
              />

              {bookingSelection && (
                <div className="support-unified-v1-selected-time">
                  <div>
                    <span>
                      Din valda tid
                    </span>

                    <strong>
                      {bookingSelection.dateLabel}
                    </strong>

                    <small>
                      {bookingSelection.timeLabel}
                    </small>
                  </div>

                  <span aria-hidden="true">
                    ✓
                  </span>
                </div>
              )}
            </section>
          )}
          <section className="support-unified-v1-section support-unified-v1-final">

            <div className="support-unified-v1-section-head">


              <div>
                <strong>
                  Kontrollera och bekräfta
                </strong>

                <p>
                  Kontrollera dina uppgifter och den valda tiden innan du bekräftar bokningen.
                </p>
              </div>
            </div>


            <div className="support-unified-v1-final-summary">

              <span>
                {customerType
                  ? customerLabels[
                      customerType
                    ]
                  : "Kundtyp saknas"}
              </span>

              <i>·</i>

              <span>
                {service
                  ? serviceLabels[
                      service
                    ]
                  : "Tjänst saknas"}
              </span>

              <i>·</i>

              <span>
                {supportMode
                  ? supportModeLabels[
                      supportMode
                    ]
                  : "Supportform saknas"}
              </span>

            </div>


            {bookingId ? (
              <div className="support-unified-v1-booked">
                <strong>
                  ✓ Bokningen är bekräftad
                </strong>

                <span>
                  Bokningsnummer: {bookingId}
                </span>

                {smsConsent && (
                  <small>
                    SMS-bekräftelse skickas när Twilio-integrationen aktiveras.
                  </small>
                )}
              </div>
            ) : (
              <div className="support-unified-v1-final-actions">

                {intent === "booking" ? (
                  <button
                    type="button"
                    className="is-primary"
                    disabled={bookingLoading || !bookingSelection}
                    onClick={confirmBooking}
                  >
                    {bookingLoading
                      ? "Bekräftar..."
                      : "Bekräfta bokning"}
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="is-primary"
                      onClick={
                        prepareMessageRequest
                      }
                    >
                      Skicka förfrågan
                    </button>

                  </>
                )}

              </div>
            )}

          </section>

          {error && (
            <div className="support-unified-v1-error">
              {error}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
