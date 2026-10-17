"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { BookingServiceKind } from "../lib/oncehub-calendar-routing";
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
  | "distans";

const customerLabels: Record<CustomerType, string> = {
  privat: "Privatperson",
  senior: "Senior / pensionär",
  foretag: "Företag",
};

const serviceLabels: Record<ServiceType, string> = {
  general: "Allmän IT-support",
  mac: "Mac och dator",
  wifi: "Wi-Fi och nätverk",
  "network-cable": "Installation av nätverkskablage",
  "unifi-camera": "UniFi och kameror",
  email: "E-post",
  microsoft365: "Microsoft 365",
  security: "Säkerhet",
  device: "Installation av ny enhet",
  other: "Annat",
};

const supportModeLabels: Record<SupportMode, string> = {
  hembesok: "Besök",
  distans: "Hjälp på distans",
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
  if (value === "telefon") {
    return "distans";
  }

  const allowed: SupportMode[] = [
    "hembesok",
    "distans",
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


  const [customerType, setCustomerType] =
    useState<CustomerType | null>(initialCustomer);

  const [service, setService] =
    useState<ServiceType | null>(initialService);

  const [cableDuration, setCableDuration] =
    useState<"2h" | "8h" | null>(null);

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

  const [website, setWebsite] = useState("");

  const [contactLoading, setContactLoading] = useState(false);




  const [error, setError] =
    useState<string | null>(null);
const [bookingSelection, setBookingSelection] =
    useState<BookingSelection | null>(null);

  const [bookingLoading, setBookingLoading] =
    useState(false);

  const [bookingId, setBookingId] =
    useState<string | null>(null);

  const serviceKind = useMemo<BookingServiceKind | null>(() => {
    if (!customerType || !service || !supportMode) {
      return null;
    }

    if (service === "network-cable") {
      if (supportMode !== "hembesok" || !cableDuration) {
        return null;
      }
      return cableDuration === "8h" ? "cable-8h" : "cable-2h";
    }

    if (supportMode === "distans") {
      return "it-remote";
    }

    if (service === "wifi") {
      return "wifi";
    }

    return "it-visit";
  }, [customerType, service, supportMode, cableDuration]);
  async function confirmBooking() {
    setError(null);

    if (!validateContactFields()) {
      return;
    }

    if (!serviceKind) {
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
            serviceKind,
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
      setError("Beskriv problemet kort.");
      return false;
    }

    return true;
  }

  async function prepareMessageRequest() {
    if (contactLoading) return;

    if (!validateContactFields()) return;

    setContactLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerType,
          service,
          supportMode,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company.trim(),
          organisationNumber: organisationNumber.trim(),
          address: address.trim(),
          postcode: postcode.trim(),
          city: city.trim(),
          message: message.trim(),
          website,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(
          typeof data?.error === "string"
            ? data.error
            : "F\u00f6rfr\u00e5gan kunde inte skickas. F\u00f6rs\u00f6k igen senare."
        );
        return;
      }

      setError(
        "Servern svarade utan bekr\u00e4ftelse p\u00e5 leverans. Kontakta oss direkt."
      );
    } catch {
      setError(
        "Kunde inte ansluta till servern. F\u00f6rs\u00f6k igen senare."
      );
    } finally {
      setContactLoading(false);
    }
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
              ? "Boka IT-support på det sätt som passar dig."
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

          Behov
        </div>

        <i />

        <div>

          Kontakt
        </div>

        <i />

        <div>

          Tid
        </div>

        <i />

        <div>

          Klart
        </div>
      </div>


      <div className="support-unified-v1-layout">

        <div className="support-unified-v1-content">


          <section className="support-unified-v1-section">
            <div className="support-unified-v1-section-head">
              <div>
                <strong>Vem behöver hjälp? *</strong>
                <p>Välj det alternativ som passar dig bäst.</p>
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
                  description: "IT-hjälp för dig och din familj.",
                  icon: "person",
                },
                {
                  value: "senior",
                  title: "Senior",
                  description: "Trygg och tydlig IT-hjälp i din egen takt.",
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
                  title: "Dator och program",
                  description: "Dator, program, uppdateringar och inställningar.",
                  icon: "computer",
                },
                {
                  value: "wifi",
                  title: "Internet och Wi-Fi",
                  description: "Wi-Fi, router, internet och anslutning.",
                  icon: "wifi",
                },
                {
                  value: "network-cable",
                  title: "Nätverkskablage",
                  description: "Installation av nätverkskabel.",
                  icon: "network-cable",
                },
                {
                  value: "email",
                  title: "E-post och konton",
                  description: "E-post, lösenord, inloggning och konton.",
                  icon: "mail",
                },
                {
                  value: "other",
                  title: "Annat eller osäker",
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
                      const nextService = option.value as ServiceType;
                      setService(nextService);
                      setCableDuration(null);
                      if (nextService === "network-cable") {
                        setSupportMode("hembesok");
                      }
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




          {service === "network-cable" && (
            <section className="support-unified-v1-section">
              <div className="support-unified-v1-section-head">
                <div>
                  <strong>Hur lång tid behöver du? *</strong>
                  <p>Välj omfattning för nätverksinstallationen.</p>
                </div>
              </div>

              <div
                className="support-unified-v1-choice-grid support-unified-v1-choice-grid--2"
                role="radiogroup"
                aria-label="Installationstid för nätverkskablage"
              >
                {(["2h", "8h"] as const).map((duration) => {
                  const active = cableDuration === duration;

                  return (
                    <button
                      key={duration}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      className={[
                        "support-unified-v1-choice",
                        active ? "is-selected" : "",
                      ].filter(Boolean).join(" ")}
                      onClick={() => {
                        setCableDuration(duration);
                        setBookingSelection(null);
                      }}
                    >
                      <span
                        className="support-unified-v1-choice-icon support-unified-v1-choice-icon--duration"
                        aria-hidden="true"
                      >
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 6.5V12l3.5 2" />
                        </svg>
                      </span>
                      <span className="support-unified-v1-choice-copy">
                        <strong>{duration === "2h" ? "2 timmar" : "8 timmar"}</strong>
                        <small>
                          {duration === "2h"
                            ? "Mindre installation"
                            : "Större installation"}
                        </small>
                      </span>
                      <span
                        className="support-unified-v1-choice-status"
                        aria-hidden="true"
                      >
                        {active ? "✓" : ""}
                      </span>
                    </button>
                  );
                })}
              </div>

              {supportMode === "distans" && (
                <p role="alert">
                  Nätverkskablage kräver besök på plats. Välj Besök.
                </p>
              )}
            </section>
          )}

          <section className="support-unified-v1-section">
            <div className="support-unified-v1-section-head">
              <div>
                <strong>Hur vill du få hjälp? *</strong>
                <p>Välj det sätt som passar dig bäst.</p>
              </div>
            </div>

            <div
              className="support-unified-v1-choice-grid support-unified-v1-choice-grid--2"
              role="radiogroup"
              aria-label="Hur vill du få hjälp?"
            >
              {[
                {
                  value: "hembesok",
                  title: "Besök",
                  description: "Vi hjälper dig på plats.",
                  icon: "home",
                },
                {
                  value: "distans",
                  title: "Hjälp på distans",
                  description: "Vi hjälper dig på distans via dator eller telefon.",
                  icon: "remote",
                },
              ]
                .filter(
                  (option) =>
                    service !== "network-cable" ||
                    option.value !== "distans"
                )
                .map((option) => {
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
                  Vi använder dina uppgifter för att hantera din förfrågan eller bokning.
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

              <div
                aria-hidden="true"
                hidden
              >
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(event) =>
                    setWebsite(event.target.value)
                  }
                />
              </div>

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
                <strong>Bokningsbekräftelse via e-post</strong>
                <p>
                  När din bokning är genomförd skickas en
                  bokningsbekräftelse till din e-postadress.
                </p>
              </div>
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
                key={`${customerType ?? "none"}-${serviceKind ?? "none"}-${supportMode ?? "none"}`}
                support={
                  supportMode === "hembesok"
                    ? "hembesok"
                    : supportMode === "distans"
                      ? "distans"
                      : null
                }
                customerType={customerType}
                serviceKind={serviceKind}
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
  <div className="support-unified-v1-summary-card">
    <span className="support-unified-v1-summary-label">Kundtyp</span>
    <strong>
      {customerType
        ? customerLabels[customerType]
        : "Kundtyp saknas"}
    </strong>
  </div>

  <div className="support-unified-v1-summary-card">
    <span className="support-unified-v1-summary-label">Tjänst</span>
    <strong>
      {service
        ? service === "network-cable" && cableDuration
          ? `${serviceLabels[service]} – ${cableDuration === "2h" ? "2 timmar" : "8 timmar"}`
          : serviceLabels[service]
        : "Tjänst saknas"}
    </strong>
  </div>

  <div className="support-unified-v1-summary-card">
    <span className="support-unified-v1-summary-label">Supportform</span>
    <strong>
      {supportMode
        ? supportModeLabels[supportMode]
        : "Supportform saknas"}
    </strong>
  </div>
</div>


            {bookingId ? (
              <div className="support-unified-v1-booked">
                <strong>
                  ✓ Bokningen är bekräftad
                </strong>

                <span>
                  Bokningsnummer: {bookingId}
                </span>

                <small>
                    Bokningsbekräftelsen skickas till din angivna e-postadress.
                  </small>
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
                      onClick={prepareMessageRequest}
                      disabled={contactLoading}
                    >
                      {contactLoading
                        ? "Skickar..."
                        : "Skicka f\u00f6rfr\u00e5gan"}
                    </button>

                  </>
                )}

              </div>
            )}

          </section>

          {error && (
            <div className="support-unified-v1-error" role="alert">
              {error}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
