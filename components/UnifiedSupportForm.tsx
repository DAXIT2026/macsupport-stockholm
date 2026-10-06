"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { resolveBookingCategory } from "../lib/booking-category";
import BookingCalendarPicker, { type BookingSelection } from "./BookingCalendarPicker";
import BookingChoiceIcon, { type BookingChoiceIconName } from "./BookingChoiceIcon";

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
  searchParams.get("intent") === "message"
    ? "message"
    : "booking";

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

  const [address, setAddress] =
    useState("");

  const [postcode, setPostcode] =
    useState("");

  const [city, setCity] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [smsConsent, setSmsConsent] =
    useState(false);

  const [emailConsent, setEmailConsent] =
    useState(false);

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
            customerType,
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
            address:
              supportMode === "hembesok"
                ? address.trim()
                : null,
            postcode:
              supportMode === "hembesok"
                ? postcode.trim()
                : null,
            city:
              supportMode === "hembesok"
                ? city.trim()
                : null,
            message: message.trim(),
            smsConsent,
            emailConsent,
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
      (
        !address.trim() ||
        !postcode.trim() ||
        !city.trim()
      )
    ) {
      setError(
        "Fyll i gatuadress, postnummer och ort för hembesök."
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

    if (!message.trim()) {
      setError(
        "Beskriv problemet kort."
      );

      return false;
    }

    if (!smsConsent && !emailConsent) {
      setError(
        "Välj SMS, e-post eller båda för bokningsbekräftelsen."
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
                <strong>Vem behöver hjälp? *</strong>
                <p>Välj den kundtyp som passar bäst.</p>
              </div>
            </div>

            <div
              className="support-unified-v1-choice-grid support-unified-v1-choice-grid--3"
              role="radiogroup"
              aria-label="Vem behöver hjälp?"
            >
              {[
                {
                  value: "privat",
                  title: "Privat",
                  description: "För dig eller familjen.",
                  icon: "person",
                },
                {
                  value: "senior",
                  title: "Senior",
                  description: "Enkel hjälp i lugn takt.",
                  icon: "senior",
                },
                {
                  value: "foretag",
                  title: "Företag",
                  description: "IT-support för företaget.",
                  icon: "business",
                },
              ].map((option) => {
                const active = customerType === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    className={[
                      "support-unified-v1-choice",
                      active ? "is-selected" : "",
                    ].filter(Boolean).join(" ")}
                    onClick={() => {
                      setCustomerType(option.value as CustomerType);
                      setBookingSelection(null);
                    }}
                  >
                    <span
                      className="support-unified-v1-choice-icon"
                      aria-hidden="true"
                    >
                      <BookingChoiceIcon name={option.icon as BookingChoiceIconName} />
                    </span>

                    <span className="support-unified-v1-choice-copy">
                      <strong>{option.title}</strong>
                      <small>{option.description}</small>
                    </span>

                    <span
                      className="support-unified-v1-choice-status"
                      aria-hidden="true"
                    >
                      {active ? "\u2713" : ""}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>



          <section className="support-unified-v1-section">
            <div className="support-unified-v1-section-head">
              <div>
                <strong>Vad behöver du hjälp med? *</strong>
                <p>Välj det alternativ som bäst beskriver problemet.</p>
              </div>
            </div>

            <div
              className="support-unified-v1-choice-grid support-unified-v1-choice-grid--2"
              role="radiogroup"
              aria-label="Vad behöver du hjälp med?"
            >
              {[
                {
                  value: "mac",
                  title: "Dator & program",
                  description: "Dator, program, uppdateringar och inställningar.",
                  icon: "computer",
                },
                {
                  value: "wifi",
                  title: "Internet & Wi-Fi",
                  description: "Wi-Fi, router, internet och anslutning.",
                  icon: "wifi",
                },
                {
                  value: "email",
                  title: "E-post & konton",
                  description: "E-post, lösenord, inloggning och konton.",
                  icon: "mail",
                },
                {
                  value: "other",
                  title: "Jag vet inte / Annat",
                  description: "Välj detta om du är osäker på problemet.",
                  icon: "help",
                },
              ].map((option) => {
                const active = service === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    className={[
                      "support-unified-v1-choice",
                      active ? "is-selected" : "",
                    ].filter(Boolean).join(" ")}
                    onClick={() => {
                      setService(option.value as ServiceType);
                      setBookingSelection(null);
                    }}
                  >
                    <span
                      className="support-unified-v1-choice-icon"
                      aria-hidden="true"
                    >
                      <BookingChoiceIcon name={option.icon as BookingChoiceIconName} />
                    </span>

                    <span className="support-unified-v1-choice-copy">
                      <strong>{option.title}</strong>
                      <small>{option.description}</small>
                    </span>

                    <span
                      className="support-unified-v1-choice-status"
                      aria-hidden="true"
                    >
                      {active ? "\u2713" : ""}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>



          <section className="support-unified-v1-section">
            <div className="support-unified-v1-section-head">
              <div>
                <strong>Hur vill du få hjälp? *</strong>
                <p>Välj det sätt som passar dig bäst.</p>
              </div>
            </div>

            <div
              className="support-unified-v1-choice-grid support-unified-v1-choice-grid--3"
              role="radiogroup"
              aria-label="Hur vill du få hjälp?"
            >
              {[
                {
                  value: "hembesok",
                  title: "Hembesök",
                  description: "Vi kommer hem till dig.",
                  icon: "home",
                },
                {
                  value: "distans",
                  title: "Hjälp på distans",
                  description: "Vi hjälper dig via din dator.",
                  icon: "remote",
                },
                {
                  value: "telefon",
                  title: "Telefonsupport",
                  description: "Vi hjälper dig via telefon.",
                  icon: "phone",
                },
              ].map((option) => {
                const active = supportMode === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    className={[
                      "support-unified-v1-choice",
                      active ? "is-selected" : "",
                    ].filter(Boolean).join(" ")}
                    onClick={() => {
                      setSupportMode(option.value as SupportMode);
                      setBookingSelection(null);
                    }}
                  >
                    <span
                      className="support-unified-v1-choice-icon"
                      aria-hidden="true"
                    >
                      <BookingChoiceIcon name={option.icon as BookingChoiceIconName} />
                    </span>

                    <span className="support-unified-v1-choice-copy">
                      <strong>{option.title}</strong>
                      <small>{option.description}</small>
                    </span>

                    <span
                      className="support-unified-v1-choice-status"
                      aria-hidden="true"
                    >
                      {active ? "\u2713" : ""}
                    </span>
                  </button>
                );
              })}
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
                <>
                  <label>
                    <span>
                      Gatuadress *
                    </span>

                    <input
                      type="text"
                      autoComplete="street-address"
                      value={address}
                      onChange={(event) =>
                        setAddress(
                          event.target.value
                        )
                      }
                      placeholder="Exempel: Sveavägen 10"
                      required
                    />
                  </label>

                  <label>
                    <span>
                      Postnummer *
                    </span>

                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      value={postcode}
                      onChange={(event) =>
                        setPostcode(
                          event.target.value
                        )
                      }
                      placeholder="Exempel: 114 35"
                      required
                    />
                  </label>

                  <label>
                    <span>
                      Ort *
                    </span>

                    <input
                      type="text"
                      autoComplete="address-level2"
                      value={city}
                      onChange={(event) =>
                        setCity(
                          event.target.value
                        )
                      }
                      placeholder="Exempel: Stockholm"
                      required
                    />
                  </label>
                </>
              )}

            </div>


            <label className="support-unified-v1-message">
              <span>
                Beskriv problemet *
              </span>

              <textarea
                value={message}
                onChange={(event) =>
                  setMessage(
                    event.target.value
                  )
                }
                placeholder="Exempel: Min Mac har blivit långsam och jag behöver hjälp med backup..."
              required
              />
            </label>


                        <div className="support-unified-v1-confirmation">
              <div className="support-unified-v1-confirmation-head">
                <strong>
                  Hur vill du få bokningsbekräftelsen? *
                </strong>

                <p>
                  Välj minst ett alternativ. Du kan välja båda.
                </p>
              </div>

              <div
                className="support-unified-v1-choice-grid support-unified-v1-choice-grid--2"
                role="group"
                aria-label="Hur vill du få bokningsbekräftelsen?"
              >
                <button
                  type="button"
                  className={
                    "support-unified-v1-choice" +
                    (smsConsent
                      ? " is-selected"
                      : "")
                  }
                  aria-pressed={smsConsent}
                  onClick={() =>
                    setSmsConsent(
                      (current) => !current
                    )
                  }
                >
                  <span className="support-unified-v1-choice-icon">
                    <BookingChoiceIcon name="phone" />
                  </span>

                  <span className="support-unified-v1-choice-copy">
                    <strong>SMS</strong>
                    <small>
                      Skicka bekräftelsen till mitt telefonnummer
                    </small>
                  </span>

                  <span
                    className="support-unified-v1-choice-status"
                    aria-hidden="true"
                  >
                    {smsConsent ? "\u2713" : ""}
                  </span>
                </button>

                <button
                  type="button"
                  className={
                    "support-unified-v1-choice" +
                    (emailConsent
                      ? " is-selected"
                      : "")
                  }
                  aria-pressed={emailConsent}
                  onClick={() =>
                    setEmailConsent(
                      (current) => !current
                    )
                  }
                >
                  <span className="support-unified-v1-choice-icon">
                    <BookingChoiceIcon name="mail" />
                  </span>

                  <span className="support-unified-v1-choice-copy">
                    <strong>E-post</strong>
                    <small>
                      Skicka bekräftelsen till min e-postadress
                    </small>
                  </span>

                  <span
                    className="support-unified-v1-choice-status"
                    aria-hidden="true"
                  >
                    {emailConsent ? "\u2713" : ""}
                  </span>
                </button>
              </div>

              <small className="support-unified-v1-confirmation-note">
                Minst ett alternativ måste väljas.
              </small>
            </div>

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
                      Vald tid
                    </span>

                    <strong>
                      {bookingSelection.dateLabel}
                    </strong>

                    <small>
                      kl.{" "}{bookingSelection.timeLabel}
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

                {(smsConsent || emailConsent) && (
                  <small>
                    {smsConsent && emailConsent
                      ? "Bokningsbekräftelsen skickas via SMS och e-post till dina angivna kontaktuppgifter."
                      : smsConsent
                        ? "Bokningsbekräftelsen skickas via SMS till ditt angivna telefonnummer."
                        : "Bokningsbekräftelsen skickas till din angivna e-postadress."}
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
