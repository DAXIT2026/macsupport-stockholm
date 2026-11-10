"use client";
import ConfirmationFireworks from "./ConfirmationFireworks";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { BookingServiceKind } from "../lib/oncehub-calendar-routing";
import { calculateBookingPrice } from "../lib/booking-pricing";
import BookingPriceBreakdown from "./BookingPriceBreakdown";
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
 type BookingWizardStep =   | "customer"   | "service"   | "support"   | "contact"   | "calendar"   | "review";

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

function formatChoicePrice(
  customer: CustomerType | null,
  technician: "it-technician" | "network-technician" | "network-installer",
  mode: "onsite" | "remote",
  minutes: number
): string {
  if (!customer) {
    return "Välj kundkategori för att se pris.";
  }

  const price = calculateBookingPrice(customer, technician, mode, minutes);

  if (!price) {
    return "Prisuppgift saknas för detta alternativ.";
  }

  const format = (amount: number) =>
    new Intl.NumberFormat("sv-SE", {
      maximumFractionDigits: 0,
    }).format(amount);

  const work = `Arbete: ${format(price.labor)} kr`;
  const travel =
    mode === "onsite"
      ? ` · Resa från ${format(price.travelFrom)} kr`
      : "";

  const total = ` · Totalt från ${format(price.totalFrom)} kr`;

  const conditions = price.rutApplicable
    ? " · RUT förutsätter att villkoren uppfylls"
    : "";

  const agreement = price.agreementRequired
    ? " · Avtal krävs"
    : "";

  return `${work}${travel}${total} (${price.vatLabel})${conditions}${agreement}.`;
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
   const [currentStep, setCurrentStep] =     useState<BookingWizardStep>("customer");

  const [service, setService] =
    useState<ServiceType | null>(initialService);

  const [cableDuration, setCableDuration] =
    useState<"2h" | "8h" | null>(null);

  const [supportMode, setSupportMode] =
    useState<SupportMode | null>(initialMode);

  const [name, setName] =
    useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const phoneDigits = phone.replace(/\D/g, "");
  const phoneNationalNumber = phoneDigits.startsWith("46")
    ? phoneDigits.slice(2)
    : phoneDigits.startsWith("0")
      ? phoneDigits.slice(1)
      : phoneDigits;

  const normalizedPhone = phoneNationalNumber
    ? `+46${phoneNationalNumber}`
    : "";

  // MACSUPPORT_PERSONNUMMER_INPUT_V3
  // Local UI state only. Never send to booking/contact APIs.
  const [personnummer, setPersonnummer] = useState("");

  const personnummerDigits = personnummer.replace(/\D/g, "");

  const maskedPersonnummer =
    personnummerDigits.length === 12
      ? `${personnummerDigits.slice(0, 8)}-XXXX`
      : "";
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

  const bookingRequestInProgress = useRef(false);
  const bookingAttemptKey = useRef<string | null>(null);
  const bookingAttemptPayload = useRef<string | null>(null);
  const bookingStatusUnknown = useRef(false);
  const [bookingStatusUncertain, setBookingStatusUncertain] = useState(false);

  const [bookingId, setBookingId] =
    useState<string | null>(null);

  const confirmationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!bookingId) return;

    const element = confirmationRef.current;
    if (!element) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    element.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });

    element.focus({ preventScroll: true });
  }, [bookingId]);

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
  const wizardSteps: BookingWizardStep[] = [
    "customer",
    "service",
    ...(service === "network-cable" && cableDuration
      ? []
      : ["support" as const]),
    "contact",
    "calendar",
    "review",
  ];

  function goToNextStep() {
    if (bookingLoading || bookingStatusUncertain || bookingId) {
      return;
    }

    setError(null);

    if (currentStep === "customer" && !customerType) {
      setError("Välj vem supporten gäller.");
      return;
    }

    if (currentStep === "service") {
      if (!service) {
        setError("Välj vad du behöver hjälp med.");
        return;
      }

      if (service === "network-cable" && !cableDuration) {
        setError("Välj installationens längd.");
        return;
      }
    }

    if (currentStep === "support") {
      if (!supportMode) {
        setError("Välj hur du vill få hjälp.");
        return;
      }

      if (service === "network-cable" && supportMode !== "hembesok") {
        setError("Nätverkskablage kräver besök på plats.");
        return;
      }
    }

    if (currentStep === "contact" && !validateContactFields()) {
      return;
    }

    if (currentStep === "calendar" && !bookingSelection) {
      setError("Välj ett ledigt datum och en tid.");
      return;
    }

    const index = wizardSteps.indexOf(currentStep);

    if (index < wizardSteps.length - 1) {
      setCurrentStep(wizardSteps[index + 1]);
    }
  }

  function goToPreviousStep() {
    if (bookingLoading || bookingStatusUncertain || bookingId) {
      return;
    }

    setError(null);

    const index = wizardSteps.indexOf(currentStep);

    if (index > 0) {
      setCurrentStep(wizardSteps[index - 1]);
    }
  }
  async function confirmBooking() {
    // Local static preview: never submit a real booking.
    if (
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1") &&
      window.location.port === "4173"
    ) {
      setError("Förhandsvisning: Ingen bokning kan genomföras här.");
      return;
    }
    if (
      bookingRequestInProgress.current ||
      bookingStatusUnknown.current ||
      bookingId !== null
    ) {
      return;
    }

    setError(null);

    if (!validateContactFields()) {
      return;
    }

    if (!serviceKind) {
      setError(
        "Vi kunde inte hitta rätt bokningskalender."
      );
      return;
    }

    if (!bookingSelection) {
      setError(
        "Välj ett datum och en ledig tid."
      );
      return;
    }

    bookingRequestInProgress.current = true;
    setBookingLoading(true);

    try {
      const bookingPayload = JSON.stringify({

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
            phone: normalizedPhone,
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
      });

      if (bookingAttemptPayload.current !== bookingPayload) {
        bookingAttemptKey.current = null;
        bookingAttemptPayload.current = bookingPayload;
      }

      if (!bookingAttemptKey.current) {
        bookingAttemptKey.current = Array.from(
          crypto.getRandomValues(new Uint8Array(16)),
          (byte) => byte.toString(16).padStart(2, "0")
        ).join("");
      }

      const response = await fetch(
        "/api/booking/schedule/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Idempotency-Key": bookingAttemptKey.current,
          },
          body: bookingPayload,
        }
      );
      const data = await response.json();

      if (!response.ok) {
        // MACSUPPORT_LOCAL_GATEWAY_REJECTION_V2
        // Only handle an explicit rejection from the isolated test gateway.
        // All other 502/503 responses retain uncertain-booking protection.
        const isConfirmedLocalTestRejection =
          (window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1") &&
          window.location.port === "3101" &&
          response.status === 503 &&
          data?.success === false &&
          data?.error === "Testläge: Ingen bokning har skapats.";

        if (isConfirmedLocalTestRejection) {
          bookingAttemptKey.current = null;
          bookingAttemptPayload.current = null;
          setError("Testläge: Ingen bokning har skapats.");
          return;
        }
        if (
          response.status === 502 || response.status === 503 ||
          (
            typeof data?.error === "string" &&
            (
              data.error.includes("Bokningsstatus kunde inte bekräftas") ||
              data.error.includes("Bokningens status måste kontrolleras innan ett nytt försök")
            )
          )
        ) {
          bookingStatusUnknown.current = true;
          setBookingStatusUncertain(true);
          setError(
            "Bokningens status kunde inte bekräftas. Kontakta supporten innan du försöker boka igen."
          );
          return;
        }

        setError(
          data?.error ??
            "Bokningen kunde inte genomföras."
        );
        return;
      }

      const confirmedBookingId =
        typeof data?.bookingId === "string" && data.bookingId.trim()
          ? data.bookingId.trim()
          : typeof data?.id === "string" && data.id.trim()
            ? data.id.trim()
            : null;

      if (!confirmedBookingId) {
        bookingStatusUnknown.current = true;
        setBookingStatusUncertain(true);
        setError(
          "Bokningens status kunde inte bekräftas. Kontakta supporten innan du försöker boka igen."
        );
        return;
      }

      setBookingId(confirmedBookingId);

    } catch {
      bookingStatusUnknown.current = true;
      setBookingStatusUncertain(true);
      setError(
        "Bokningens status kunde inte bekräftas. Kontakta supporten innan du försöker boka igen."
      );
    } finally {
      bookingRequestInProgress.current = false;
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

    if (intent === "message" && !lastName.trim()) {
      setError("Fyll i efternamn.");
      return false;
    }

    if (!name.trim() || !email.trim()) {
      setError("Fyll i namn och e-postadress.");
      return false;
    }

    if (!/^7\d{8}$/.test(phoneNationalNumber)) {
      setError(
        "Ange ett giltigt svenskt mobilnummer, till exempel 070 123 45 67."
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
      setError("Beskriv kort vad du behöver hjälp med.");
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
      const response = await fetch("/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerType,
          service,
          supportMode,
          firstName: name.trim(), lastName: lastName.trim(),
          email: email.trim(),
          phone: normalizedPhone,
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


          {/* MACSUPPORT_WIZARD_STEP_BOUNDARY */}
{(intent === "message" || currentStep === "customer") && (<section className="support-unified-v1-section">
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
                  description: "Personlig IT-hjälp för dig och din familj. Vi hjälper dig med datorer, skrivare, internet och tekniska problem i hemmet.",

                  icon: "person",
                },
                {
                  value: "senior",
                  title: "Senior",
                  description: "Trygg och personlig IT-hjälp i din egen takt. Vi förklarar tydligt och hjälper dig med datorer, internet och digitala tjänster.",

                  icon: "senior",
                },
                {
                  value: "foretag",
                  title: "Företag",
                  description: "Professionell IT-support för företag. Vi hjälper till med datorer, nätverk, Wi-Fi, felsökning och tekniska installationer.",

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
                      if (
  bookingRequestInProgress.current ||
  bookingStatusUnknown.current
) {
  return;
}
setCustomerType(option.value as CustomerType);
                      setBookingSelection(null);
                      if (!bookingRequestInProgress.current && !bookingStatusUnknown.current) {
                        bookingAttemptKey.current = null;
                      }
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
          </section>)}



          {/* MACSUPPORT_WIZARD_STEP_BOUNDARY */}
{(intent === "message" || currentStep === "service") && (<section className="support-unified-v1-section">
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
                  description: "Hjälp med PC, Mac, skrivare, e-post, Microsoft 365, programinstallation, säkerhetskopiering och felsökning av tekniska problem.",

                  icon: "computer",
                },
                {
                  value: "wifi",
                  title: "Internet och Wi-Fi",
                  description: "Installation, konfigurering och felsökning av internet, routrar, Wi-Fi, UniFi och ansluten utrustning. Vi hjälper dig att förbättra nätverkets funktion.",

                  icon: "wifi",
                },
                {
                  value: "network-cable",
                  title: "Nätverkskablage",
                  description: "Installation av nätverkskablar, nätverksuttag, patchpaneler och dataskåp. Arbetets omfattning beror på kabeldragning och platsens förutsättningar.",

                  icon: "network-cable",
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
                      if (
  bookingRequestInProgress.current ||
  bookingStatusUnknown.current
) {
  return;
}
const nextService = option.value as ServiceType;
                      setService(nextService);
                      setCableDuration(null);
                      if (nextService === "network-cable") {
                        setSupportMode("hembesok");
                      }
                      setBookingSelection(null);
                      if (!bookingRequestInProgress.current && !bookingStatusUnknown.current) {
                        bookingAttemptKey.current = null;
                      }
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
                      <small
                        className="ms-choice-price-hint"
                        style={{
                          display: "block",
                          marginTop: "10px",
                          fontWeight: 700,
                          lineHeight: 1.5
                        }}
                      >
                        {formatChoicePrice(
    customerType,
    option.value === "network-cable"
      ? "network-installer"
      : option.value === "wifi"
        ? "network-technician"
        : "it-technician",
    "onsite",
    option.value === "network-cable"
      ? cableDuration === "8h"
        ? 480
        : 120
      : option.value === "wifi"
        ? 60
        : 120
  )}
                      </small>
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
          </section>)}




          {(intent === "message" || currentStep === "service") && service === "network-cable" && (
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
                        if (
  bookingRequestInProgress.current ||
  bookingStatusUnknown.current
) {
  return;
}
setCableDuration(duration);
                        setBookingSelection(null);
                      if (!bookingRequestInProgress.current && !bookingStatusUnknown.current) {
                        bookingAttemptKey.current = null;
                      }
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
  ? "Mindre installation – dragning av cirka 1 nätverkskabel med nätverksuttag. Beräknad arbetstid: cirka 2 timmar. Om mer tid behövs bokar vi ett återbesök."
  : "Större installation – dragning av cirka 5 nätverkskablar med nätverksuttag. Beräknad arbetstid: cirka 8 timmar. Om mer tid behövs bokar vi ett återbesök."}</small>
                        <small
                          className="ms-choice-price-hint"
                          style={{
                            display: "block",
                            marginTop: "10px",
                            fontWeight: 700,
                            lineHeight: 1.5
                          }}
                        >
                          {formatChoicePrice(
                            customerType,
                            "network-installer",
                            "onsite",
                            duration === "2h" ? 120 : 480
                          )}
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

          {/* MACSUPPORT_WIZARD_STEP_BOUNDARY */}
{(intent === "message" || currentStep === "support") && (<section className="support-unified-v1-section">
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
                  description: "En tekniker kommer till dig för installation, felsökning eller praktisk IT-hjälp när utrustningen behöver undersökas på plats.",

                  icon: "home",
                },
                {
                  value: "distans",
                  title: "Hjälp på distans",
                  description: "Få hjälp med lämpliga dator- och programproblem via telefon eller fjärranslutning. Teknikern vägleder dig steg för steg.",

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
                      if (
  bookingRequestInProgress.current ||
  bookingStatusUnknown.current
) {
  return;
}
setSupportMode(option.value as SupportMode);
                      setBookingSelection(null);
                      if (!bookingRequestInProgress.current && !bookingStatusUnknown.current) {
                        bookingAttemptKey.current = null;
                      }
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
                      <small
                        className="ms-choice-price-hint"
                        style={{
                          display: "block",
                          marginTop: "10px",
                          fontWeight: 700,
                          lineHeight: 1.5
                        }}
                      >
                        {formatChoicePrice(
    customerType,
    service === "network-cable"
      ? "network-installer"
      : service === "wifi"
        ? "network-technician"
        : "it-technician",
    option.value === "hembesok" ? "onsite" : "remote",
    option.value === "distans"
      ? 30
      : service === "wifi"
        ? 60
        : service === "network-cable" && cableDuration === "8h"
          ? 480
          : 120
  )}
                      </small>
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
          </section>)}




{/* MACSUPPORT_WIZARD_STEP_BOUNDARY */}
{(intent === "message" || currentStep === "contact") && (<section className="support-unified-v1-section">
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
                  {intent === "message" ? "Förnamn *" : "Namn *"}
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
                  placeholder={intent === "message" ? "Ditt förnamn" : "Ditt namn"}
                />
              </label>

              {intent === "message" && (
                <label>
                  <span>Efternamn *</span>
                  <input
                    type="text"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    placeholder="Ditt efternamn"
                    required
                  />
                </label>
              )}


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

                <div className="ms-phone-field" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span aria-hidden="true" style={{ fontWeight: 600 }}>+46</span>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    aria-label="Telefonnummer utan landsnummer"
                    value={phoneNationalNumber}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="70 123 45 67"
                  />
                </div>
              </label>
              {/* MACSUPPORT_PERSONNUMMER_INPUT_V3 */}
{(customerType === "privat" || customerType === "senior") && (
  <label>
    <span>Personnummer (vid RUT-avdrag)</span>
    <input
      type="text"
      inputMode="numeric"
      autoComplete="off"
      name="rut-personnummer"
      value={personnummer}
      onChange={(event) =>
        setPersonnummer(event.target.value.slice(0, 13))
      }
      placeholder="ÅÅÅÅMMDD-XXXX"
      maxLength={13}
      aria-describedby="support-personnummer-help"
    />
    <small id="support-personnummer-help">
      Frivilligt. Uppgiften skickas inte med bokningen.
      Personnummer för RUT-avdrag lämnas separat
      via en säker kanal.
    </small>
  </label>
)}
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
                <strong>Bekräftelse av din bokning</strong>
                <p>
                  När bokningen har bekräftats visas ditt bokningsnummer
                  och dina bokningsuppgifter här på webbplatsen.
                  Spara gärna bokningsnumret för framtida kontakt.
                </p>
              </div>
            </div>

</section>)}


          {(currentStep === "calendar") && intent === "booking" && !bookingId && (
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

              {customerType && service && supportMode && (() => {
                const isCable = service === "network-cable";
                const mode = supportMode === "hembesok" ? "onsite" : "remote";

                if (service === "wifi" && mode === "onsite") {

const wifiPrice = calculateBookingPrice(
  customerType,
  "network-technician",
  "onsite",
  60
);

if (!wifiPrice) return null;

return (
  <>
    <BookingPriceBreakdown
      price={wifiPrice}
      mode="onsite"
      variant="review"
    />

<p className="ms-price-overview-conditions">
  Prisexemplet avser en timmes Wi-Fi-support.
  Arbetskostnaden visas enligt vald kundkategori.
  För privatpersoner och seniorer visas arbetskostnaden
  efter förutsatt RUT-avdrag när villkoren är uppfyllda.
  Resekostnaden omfattas inte av RUT-avdraget.
  Företagspriser visas exklusive moms och utan RUT-avdrag.
  Slutpriset kan variera beroende på arbetets omfattning.
  Prisexemplet är inte ett fast pris eller en bekräftad minimidebitering.
</p>
  </>
);
}

                const durationMinutes = isCable
                  ? cableDuration === "8h"
                    ? 480
                    : cableDuration === "2h"
                      ? 120
                      : null
                  : mode === "remote"
                    ? 30
                    : 120;

                if (durationMinutes === null) return null;

                const price = calculateBookingPrice(
                  customerType,
                  isCable ? "network-installer" : "it-technician",
                  mode,
                  durationMinutes
                );

                if (!price) return null;

                return (
                  <BookingPriceBreakdown
                    price={price}
                    mode={mode}
                    variant="review"
                  />
                );
              })()}
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
          {/* MACSUPPORT_WIZARD_STEP_BOUNDARY */}
{(intent === "message" || currentStep === "review" || Boolean(bookingId)) && (<section className="support-unified-v1-section support-unified-v1-final">

            {!bookingId && (<>
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


            {/* MACSUPPORT_BOOKING_REVIEW_UX_V1 */}
<div className="ms-booking-review-grid">
  {/* MACSUPPORT_REVIEW_THREE_COLUMNS_V3 */}
  <section className="ms-booking-review-card" aria-label="Dina uppgifter">
    <h3>Dina uppgifter</h3>

    <dl>
      <div>
        <dt>Kundtyp</dt>
        <dd>{customerType ? customerLabels[customerType] : "Ej vald"}</dd>
      </div>
      <div>
        <dt>Namn</dt>
        <dd>{name || "Ej angivet"}</dd>
      </div>
      {email && (
        <div>
          <dt>E-post</dt>
          <dd>{email}</dd>
        </div>
      )}
      {phone && (
        <div>
          <dt>Telefon</dt>
          <dd>{normalizedPhone}</dd>
        </div>
      )}
      {customerType !== "foretag" && (
  <div>
    <dt>Personnummer</dt>
    <dd>{maskedPersonnummer || "Ej angivet"}</dd>
  </div>
)}
{customerType === "foretag" && (
        <>
          <div>
            <dt>Företag</dt>
            <dd>{company || "Ej angivet"}</dd>
          </div>
          <div>
            <dt>Organisationsnummer</dt>
            <dd>{organisationNumber || "Ej angivet"}</dd>
          </div>
        </>
      )}
    </dl>
  </section>

  <section className="ms-booking-review-card" aria-label="Din bokning">
    <h3>Din bokning</h3>

    <dl>
      <div>
        <dt>Tjänst</dt>
        <dd>
          {service
            ? service === "network-cable" && cableDuration
              ? `${serviceLabels[service]} – ${cableDuration === "2h" ? "2 timmar" : "8 timmar"}`
              : serviceLabels[service]
            : "Ej vald"}
        </dd>
      </div>
      <div>
        <dt>Supportform</dt>
        <dd>{supportMode ? supportModeLabels[supportMode] : "Ej vald"}</dd>
      </div>
      {bookingSelection && (
        <div>
          <dt>Datum och tid</dt>
          <dd>
            {bookingSelection.dateLabel}, kl. {bookingSelection.timeLabel}
          </dd>
        </div>
      )}
    </dl>
  </section>
<section className="ms-booking-price-column" aria-label="Prisöversikt">
{intent === "booking" && customerType && service && supportMode && (() => {
  const isCable = service === "network-cable";
  const isWifi = service === "wifi";
  const technician = isCable ? "network-installer" : "it-technician";
  const mode = supportMode === "hembesok" ? "onsite" : "remote";

  const durationMinutes = isCable
    ? cableDuration === "8h" ? 480 : cableDuration === "2h" ? 120 : null
    : mode === "remote" ? 30 : 120;

  if (isWifi && mode === "onsite") {

const wifiPrice = calculateBookingPrice(
  customerType,
  "network-technician",
  "onsite",
  60
);

if (!wifiPrice) return null;

return (
  <>
    <BookingPriceBreakdown
      price={wifiPrice}
      mode="onsite"
      variant="review"
    />

<p className="ms-price-overview-conditions">
  Prisexemplet avser en timmes Wi-Fi-support.
  Arbetskostnaden visas enligt vald kundkategori.
  För privatpersoner och seniorer visas arbetskostnaden
  efter förutsatt RUT-avdrag när villkoren är uppfyllda.
  Resekostnaden omfattas inte av RUT-avdraget.
  Företagspriser visas exklusive moms och utan RUT-avdrag.
  Slutpriset kan variera beroende på arbetets omfattning.
  Prisexemplet är inte ett fast pris eller en bekräftad minimidebitering.
</p>
  </>
);
}

  if (durationMinutes === null) return null;

  const price = calculateBookingPrice(
    customerType,
    technician,
    mode,
    durationMinutes
  );

  if (!price) return null;

  return (
    <BookingPriceBreakdown
      price={price}
      mode={mode}
      variant="review"
    />
  );
})()}
</section>
</div>

{message.trim() && (
  <section className="ms-booking-description">
    <h3>Din problembeskrivning</h3>
    <p>{message}</p>
  </section>
)}

            </>)}
{bookingId ? (
              <div
                ref={confirmationRef}
                className="ms-booking-success ms-confirmation-v42"
                role="status"
                tabIndex={-1}
              >
  <div className="ms-booking-success-header ms-confirmation-v42-hero">
    <ConfirmationFireworks />
    <span className="ms-confirmation-v43-firework" aria-hidden="true" />
    <Image
      src="/logos/logo-light-transparent.png"
      alt="MacSupport Stockholm"
      width={240}
      height={90}
      className="ms-booking-success-logo"
    />

    <span className="ms-booking-success-icon" aria-hidden="true">✓</span>

    <h2>Din bokning är bekräftad!</h2>

    <p>
      Tack för att du har valt MacSupport Stockholm.
      Här hittar du en sammanfattning av din bokning.
    </p>

    <div className="ms-booking-success-reference">
      <span>Bokningsnummer</span>
      <strong>{bookingId}</strong>
    </div>
  </div>

  <div className="ms-booking-success-details ms-confirmation-v42-details">
    <section>
      <h3>Dina uppgifter</h3>
      <dl>
        <div><dt>Namn</dt><dd>{name}</dd></div>
        {email && <div><dt>E-post</dt><dd>{email}</dd></div>}
        {phone && <div><dt>Telefon</dt><dd>{normalizedPhone}</dd></div>}{customerType !== "foretag" && (
  <div>
    <dt>Personnummer</dt>
    <dd>{maskedPersonnummer || "Ej angivet"}</dd>
  </div>
)}
{customerType === "foretag" && (
          <>
            <div><dt>Företag</dt><dd>{company}</dd></div>
            <div>
              <dt>Organisationsnummer</dt>
              <dd>{organisationNumber}</dd>
            </div>
          </>
        )}
      </dl>
    </section>

    <section>
      <h3>Din bokning</h3>
      <dl>
        <div>
          <dt>Tjänst</dt>
          <dd>
            {service
              ? service === "network-cable" && cableDuration
                ? `${serviceLabels[service]} – ${cableDuration === "2h" ? "2 timmar" : "8 timmar"}`
                : serviceLabels[service]
              : "Ej angiven"}
          </dd>
        </div>
        <div>
          <dt>Supportform</dt>
          <dd>{supportMode ? supportModeLabels[supportMode] : "Ej angiven"}</dd>
        </div>
        {bookingSelection && (
          <div>
            <dt>Datum och tid</dt>
            <dd>
              {bookingSelection.dateLabel}, kl. {bookingSelection.timeLabel}
            </dd>
          </div>
        )}
      </dl>
    </section>
  </div>

  {message.trim() && (
    <section className="ms-booking-description">
      <h3>Din problembeskrivning</h3>
      <p>{message}</p>
    </section>
  )}

<section className="ms-booking-success-pricing-v41" aria-label="Prisuppskattning">
  <h3>Prisuppskattning</h3>

  {(() => {
    if (!customerType) {
      return (
        <p>Du får information om priset innan arbetet påbörjas.</p>
      );
    }

    const isCable = service === "network-cable";
    const technician = isCable ? "network-installer" : "it-technician";
    const mode = supportMode === "hembesok" ? "onsite" : "remote";

    const durationMinutes = isCable
      ? cableDuration === "8h"
        ? 480
        : cableDuration === "2h"
          ? 120
          : null
      : mode === "remote"
        ? 30
        : 120;

    if (durationMinutes === null) {
  return (
    <p>Du får information om priset innan arbetet påbörjas.</p>
  );
}

if (service === "wifi" && mode === "onsite") {

const wifiPrice = calculateBookingPrice(
  customerType,
  "network-technician",
  "onsite",
  60
);

if (!wifiPrice) return null;

return (
  <>
    <BookingPriceBreakdown
      price={wifiPrice}
      mode="onsite"
      variant="confirmation"
    />

<p className="ms-price-overview-conditions">
  Prisexemplet avser en timmes Wi-Fi-support.
  Arbetskostnaden visas enligt vald kundkategori.
  För privatpersoner och seniorer visas arbetskostnaden
  efter förutsatt RUT-avdrag när villkoren är uppfyllda.
  Resekostnaden omfattas inte av RUT-avdraget.
  Företagspriser visas exklusive moms och utan RUT-avdrag.
  Slutpriset kan variera beroende på arbetets omfattning.
  Prisexemplet är inte ett fast pris eller en bekräftad minimidebitering.
</p>
  </>
);
}

    const price = calculateBookingPrice(
      customerType,
      technician,
      mode,
      durationMinutes
    );

    if (!price) {
      return (
        <p>Du får information om priset innan arbetet påbörjas.</p>
      );
    }

    return (
      <BookingPriceBreakdown
        price={price}
        mode={mode}
        variant="confirmation"
      />
    );
  })()}
</section>
  <div className="ms-confirmation-v43-info">
  <section className="ms-confirmation-v43-info-card ms-confirmation-v43-email">
    <span className="ms-confirmation-v43-info-icon" aria-hidden="true">✉</span>
    <h3>Bekräftelse via e-post</h3>
    <p>
      Information om eventuell e-postbekräftelse
      finns i bokningstjänstens meddelanden.
    </p>
  </section>

  <section className="ms-confirmation-v43-info-card ms-confirmation-v43-manage">
    <span className="ms-confirmation-v43-info-icon" aria-hidden="true">▣</span>
    <h3>Hantera din bokning</h3>
    <p>
      Behöver du ändra din bokning?
      Kontakta oss och ange ditt bokningsnummer.
    </p>
  </section>

  <section className="ms-confirmation-v43-info-card ms-confirmation-v43-help">
    <span className="ms-confirmation-v43-info-icon" aria-hidden="true">?</span>
    <h3>Har du frågor?</h3>
    <p>
      Kontakta vår support om du behöver
      hjälp eller har frågor om din bokning.
    </p>
  </section>
</div>
<div className="ms-booking-success-footer ms-confirmation-v42-footer">
  <Link href="/" className="ms-confirmation-v43-home">
    Till startsidan <span aria-hidden="true">→</span>
  </Link>
    <strong>Din bokning är registrerad.</strong>
    <p>
      Spara gärna bokningsnumret om du behöver kontakta oss.
      Information om eventuell e-postbekräftelse finns i
      bokningstjänstens meddelanden.
    </p>
  </div>
</div>
            ) : (
              <div className="support-unified-v1-final-actions">

                {intent === "booking" ? (
                  <button
                    type="button"
                    className="is-primary"
                    disabled={
  bookingLoading ||
  !bookingSelection ||
  bookingStatusUncertain ||
  (typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1") &&
    window.location.port === "4173")
}
                    onClick={confirmBooking}
                  >
                    {bookingLoading
                      ? "Bekräftar bokningen…"
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
                        ? "Skickar förfrågan…"
                        : "Skicka förfrågan"}
                    </button>

                  </>
                )}

              </div>
            )}

          </section>)}

          {intent === "booking" && !bookingId && (
            <nav aria-label="Bokningssteg" className="support-unified-v1-final-actions">
              <button
                type="button"
                onClick={goToPreviousStep}
                disabled={currentStep === "customer" || bookingLoading || bookingStatusUncertain}
              >
                Tillbaka
              </button>
              {currentStep !== "review" && (
                <button
                  type="button"
                  className="is-primary"
                  onClick={goToNextStep}
                  disabled={bookingLoading || bookingStatusUncertain}
                >
                  Fortsätt
                </button>
              )}
            </nav>
          )}
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
