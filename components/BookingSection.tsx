"use client";

import { useMemo, useState } from "react";

type SupportType =
  | "Mac-support"
  | "WiFi & nätverk"
  | "IT-säkerhet"
  | "Microsoft 365"
  | "Fjärrsupport"
  | "Annat problem";

type HelpMode =
  | "Hembesök"
  | "Support på distans"
  | "Företagsbesök";

const supportTypes: {
  label: SupportType;
  icon: string;
  description: string;
}[] = [
  {
    label: "Mac-support",
    icon: "⌘",
    description: "Mac, macOS, installation, backup och felsökning.",
  },
  {
    label: "WiFi & nätverk",
    icon: "◉",
    description: "Router, täckning, mesh, internet och nätverk.",
  },
  {
    label: "IT-säkerhet",
    icon: "◇",
    description: "Säkerhet, backup, lösenord och skydd.",
  },
  {
    label: "Microsoft 365",
    icon: "▦",
    description: "Outlook, Teams, OneDrive och företagskonton.",
  },
  {
    label: "Fjärrsupport",
    icon: "↗",
    description: "Snabb hjälp direkt via säker fjärranslutning.",
  },
  {
    label: "Annat problem",
    icon: "+",
    description: "Beskriv problemet så hjälper vi dig vidare.",
  },
];

const helpModes: {
  label: HelpMode;
  icon: string;
  description: string;
}[] = [
  {
    label: "Hembesök",
    icon: "⌂",
    description: "Vi kommer hem till dig i Stockholmsområdet.",
  },
  {
    label: "Support på distans",
    icon: "◫",
    description: "Snabb och säker hjälp via fjärranslutning.",
  },
  {
    label: "Företagsbesök",
    icon: "▥",
    description: "Support direkt på kontoret eller arbetsplatsen.",
  },
];

const dates = [
  { day: "Mån", date: "31 aug" },
  { day: "Tis", date: "1 sep" },
  { day: "Ons", date: "2 sep" },
  { day: "Tor", date: "3 sep" },
];

const times = [
  "09:00",
  "10:30",
  "12:00",
  "13:30",
  "15:00",
  "16:30",
];

export default function BookingSection() {
  const [step, setStep] = useState(1);

  const [supportType, setSupportType] =
    useState<SupportType | null>(null);

  const [helpMode, setHelpMode] =
    useState<HelpMode | null>(null);

  const [selectedDate, setSelectedDate] =
    useState<string | null>(null);

  const [selectedTime, setSelectedTime] =
    useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const progress = useMemo(
    () => `${Math.min(step, 5) * 20}%`,
    [step]
  );

  const canContinue =
    (step === 1 && supportType) ||
    (step === 2 && helpMode) ||
    (step === 3 && selectedDate && selectedTime) ||
    (step === 4 && name && email && phone);

  function nextStep() {
    if (step < 5 && canContinue) {
      setStep((current) => current + 1);
    }
  }

  function previousStep() {
    if (step > 1 && step < 5) {
      setStep((current) => current - 1);
    }
  }

  return (
    <section
      className="booking-section premium-section"
      id="booking"
    >
      <div className="premium-shell">

        <div className="booking-intro">
          <div className="premium-heading">
            <p className="premium-eyebrow">
              BOKA SUPPORT
            </p>

            <h2>
              Hjälp börjar
              <br />
              här.
            </h2>

            <p>
              Välj vad du behöver hjälp med och en tid som passar.
              Det tar bara några minuter.
            </p>
          </div>

          <div className="booking-trust">
            <span>✓</span>

            <div>
              <strong>Trygg bokning</strong>
              <small>
                Tydliga steg. Ingen betalning online.
              </small>
            </div>
          </div>
        </div>

        <div className="booking-shell">

          <div className="booking-progress-area">

            <div className="booking-progress-labels">
              <span className={step >= 1 ? "active" : ""}>
                Problem
              </span>

              <span className={step >= 2 ? "active" : ""}>
                Hjälpform
              </span>

              <span className={step >= 3 ? "active" : ""}>
                Tid
              </span>

              <span className={step >= 4 ? "active" : ""}>
                Uppgifter
              </span>

              <span className={step >= 5 ? "active" : ""}>
                Klart
              </span>
            </div>

            <div className="booking-progress-track">
              <span style={{ width: progress }} />
            </div>

          </div>

          <div className="booking-content">

            {step === 1 && (
              <div className="booking-step">
                <p className="booking-step-number">
                  STEG 1 AV 4
                </p>

                <h3>
                  Vad behöver du hjälp med?
                </h3>

                <p className="booking-step-lead">
                  Välj det alternativ som ligger närmast ditt problem.
                </p>

                <div className="booking-options booking-options-services">
                  {supportTypes.map((item) => (
                    <button
                      type="button"
                      key={item.label}
                      className={
                        supportType === item.label
                          ? "booking-option selected"
                          : "booking-option"
                      }
                      onClick={() =>
                        setSupportType(item.label)
                      }
                    >
                      <span className="booking-option-icon">
                        {item.icon}
                      </span>

                      <span className="booking-option-copy">
                        <strong>{item.label}</strong>
                        <small>{item.description}</small>
                      </span>

                      <span className="booking-option-check">
                        ✓
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="booking-step">
                <p className="booking-step-number">
                  STEG 2 AV 4
                </p>

                <h3>
                  Hur vill du ha hjälp?
                </h3>

                <p className="booking-step-lead">
                  Välj den supportform som passar dig bäst.
                </p>

                <div className="booking-options booking-help-modes">
                  {helpModes.map((item) => (
                    <button
                      type="button"
                      key={item.label}
                      className={
                        helpMode === item.label
                          ? "booking-mode selected"
                          : "booking-mode"
                      }
                      onClick={() =>
                        setHelpMode(item.label)
                      }
                    >
                      <span className="booking-mode-icon">
                        {item.icon}
                      </span>

                      <strong>{item.label}</strong>

                      <small>{item.description}</small>

                      <span className="booking-mode-check">
                        ✓
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="booking-step">
                <p className="booking-step-number">
                  STEG 3 AV 4
                </p>

                <h3>
                  Välj datum och tid.
                </h3>

                <p className="booking-step-lead">
                  Tillgängliga tider visas nedan.
                </p>

                <div className="booking-date-grid">
                  {dates.map((item) => {
                    const value =
                      `${item.day} ${item.date}`;

                    return (
                      <button
                        key={value}
                        type="button"
                        className={
                          selectedDate === value
                            ? "booking-date selected"
                            : "booking-date"
                        }
                        onClick={() =>
                          setSelectedDate(value)
                        }
                      >
                        <small>{item.day}</small>
                        <strong>{item.date}</strong>
                      </button>
                    );
                  })}
                </div>

                <div className="booking-time-grid">
                  {times.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={
                        selectedTime === time
                          ? "booking-time selected"
                          : "booking-time"
                      }
                      onClick={() =>
                        setSelectedTime(time)
                      }
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="booking-step">
                <p className="booking-step-number">
                  STEG 4 AV 4
                </p>

                <h3>
                  Vem ska vi hjälpa?
                </h3>

                <p className="booking-step-lead">
                  Vi använder uppgifterna för din bokningsbekräftelse.
                </p>

                <div className="booking-form">

                  <label>
                    <span>Namn</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(event) =>
                        setName(event.target.value)
                      }
                      placeholder="För- och efternamn"
                      autoComplete="name"
                    />
                  </label>

                  <div className="booking-form-row">
                    <label>
                      <span>E-post</span>
                      <input
                        type="email"
                        value={email}
                        onChange={(event) =>
                          setEmail(event.target.value)
                        }
                        placeholder="namn@email.se"
                        autoComplete="email"
                      />
                    </label>

                    <label>
                      <span>Mobilnummer</span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(event) =>
                          setPhone(event.target.value)
                        }
                        placeholder="+46 70 123 45 67"
                        autoComplete="tel"
                      />
                    </label>
                  </div>

                  <label>
                    <span>
                      Kort beskrivning
                      <small> valfritt</small>
                    </span>

                    <textarea
                      rows={5}
                      placeholder="Berätta gärna lite kort om problemet..."
                    />
                  </label>

                </div>
              </div>
            )}

            {step === 5 && (
              <div className="booking-success">

                <div className="booking-success-icon">
                  ✓
                </div>

                <p className="premium-eyebrow">
                  BOKNING KLAR
                </p>

                <h3>
                  Tack {name}.
                  <br />
                  Vi ses snart.
                </h3>

                <p>
                  Din bokningsförfrågan är registrerad.
                  Nästa steg blir att automatiskt skicka
                  bekräftelse via SMS och e-post.
                </p>

                <div className="booking-summary">
                  <div>
                    <span>Support</span>
                    <strong>{supportType}</strong>
                  </div>

                  <div>
                    <span>Hjälpform</span>
                    <strong>{helpMode}</strong>
                  </div>

                  <div>
                    <span>Datum</span>
                    <strong>{selectedDate}</strong>
                  </div>

                  <div>
                    <span>Tid</span>
                    <strong>{selectedTime}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="premium-button secondary booking-reset"
                  onClick={() => {
                    setStep(1);
                    setSupportType(null);
                    setHelpMode(null);
                    setSelectedDate(null);
                    setSelectedTime(null);
                    setName("");
                    setEmail("");
                    setPhone("");
                  }}
                >
                  Tillbaka till bokningen
                </button>

              </div>
            )}

          </div>

          {step < 5 && (
            <div className="booking-footer">

              <button
                type="button"
                className="booking-back"
                onClick={previousStep}
                disabled={step === 1}
              >
                ← Tillbaka
              </button>

              <div className="booking-footer-note">
                <span>🔒</span>
                <small>
                  Dina uppgifter behandlas säkert.
                </small>
              </div>

              <button
                type="button"
                className="premium-button primary"
                onClick={nextStep}
                disabled={!canContinue}
              >
                {step === 4
                  ? "Bekräfta bokning"
                  : "Fortsätt →"}
              </button>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
