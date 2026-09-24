"use client";

import { useMemo, useState } from "react";
import { siteConfig } from "../lib/site-config";

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
    description:
      "Mac, macOS, installation, backup och felsökning.",
  },
  {
    label: "WiFi & nätverk",
    icon: "◉",
    description:
      "Router, täckning, mesh, internet och nätverk.",
  },
  {
    label: "IT-säkerhet",
    icon: "◇",
    description:
      "Säkerhet, backup, lösenord och skydd.",
  },
  {
    label: "Microsoft 365",
    icon: "▦",
    description:
      "Outlook, Teams, OneDrive och företagskonton.",
  },
  {
    label: "Fjärrsupport",
    icon: "↗",
    description:
      "Snabb hjälp direkt via säker fjärranslutning.",
  },
  {
    label: "Annat problem",
    icon: "+",
    description:
      "Beskriv problemet så hjälper vi dig vidare.",
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
    description:
      "Vi kommer hem till dig i Stockholmsområdet.",
  },
  {
    label: "Support på distans",
    icon: "◫",
    description:
      "Snabb och säker hjälp via fjärranslutning.",
  },
  {
    label: "Företagsbesök",
    icon: "▥",
    description:
      "Support direkt på kontoret eller arbetsplatsen.",
  },
];

export default function BookingSection() {
  const [step, setStep] = useState(1);

  const [supportType, setSupportType] =
    useState<SupportType | null>(null);

  const [helpMode, setHelpMode] =
    useState<HelpMode | null>(null);

  const progress = useMemo(
    () => `${Math.min(step, 3) * (100 / 3)}%`,
    [step]
  );

  const canContinue =
    (step === 1 && supportType) ||
    (step === 2 && helpMode);

  function nextStep() {
    if (step < 3 && canContinue) {
      setStep((current) => current + 1);
    }
  }

  function previousStep() {
    if (step > 1) {
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
              Välj vad du behöver hjälp med.
              Därefter visar vi den riktiga kalendern
              med aktuella lediga tider.
            </p>
          </div>

          <div className="booking-trust">
            <span>✓</span>

            <div>
              <strong>Riktiga lediga tider</strong>

              <small>
                Kalendern uppdateras via vårt bokningssystem.
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
                Lediga tider
              </span>
            </div>

            <div className="booking-progress-track">
              <span style={{ width: progress }} />
            </div>

          </div>


          <div className="booking-content">

            {step === 1 && (
              <div className="booking-step">



                <h3>
                  Vad behöver du hjälp med?
                </h3>

                <p className="booking-step-lead">
                  Välj det alternativ som ligger närmast
                  ditt problem.
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
              <div className="booking-step booking-live-calendar">



                <h3>
                  Välj en ledig tid.
                </h3>

                <p className="booking-step-lead">
                  Kalendern visar aktuella lediga tider.
                  Redan bokade eller passerade tider
                  kan inte väljas.
                </p>


                <div className="booking-live-summary">

                  <div>
                    <span>Support</span>
                    <strong>{supportType}</strong>
                  </div>

                  <div>
                    <span>Hjälpform</span>
                    <strong>{helpMode}</strong>
                  </div>

                </div>


                <div className="booking-live-panel">

                  <div className="booking-live-icon">
                    <span aria-hidden="true">◷</span>
                  </div>

                  <div className="booking-live-copy">

                    <p className="premium-eyebrow">
                      LIVEKALENDER
                    </p>

                    <h4>
                      Se tider som faktiskt är lediga.
                    </h4>

                    <p>
                      Bokningssystemet kontrollerar
                      kalendern i realtid så att du inte
                      behöver välja bland tider som redan
                      är upptagna.
                    </p>

                  </div>


                  <a
                    href={siteConfig.bookingPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="premium-button primary booking-live-button"
                  >
                    Visa lediga tider
                    <span aria-hidden="true">→</span>
                  </a>

                </div>


                <div className="booking-contact-fallback">

                  <div>
                    <small>Vill du hellre prata med oss?</small>

                    <a href={siteConfig.phoneHref}>
                      {siteConfig.phoneDisplay}
                    </a>
                  </div>

                  <div>
                    <small>Frågor före bokning?</small>

                    <a href={siteConfig.emailHref}>
                      {siteConfig.email}
                    </a>
                  </div>

                </div>

              </div>
            )}

          </div>


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
                Trygg och tydlig bokning.
              </small>
            </div>

            {step < 3 ? (
              <button
                type="button"
                className="premium-button primary"
                onClick={nextStep}
                disabled={!canContinue}
              >
                Fortsätt →
              </button>
            ) : (
              <a
                href={siteConfig.bookingPath}
                target="_blank"
                rel="noopener noreferrer"
                className="premium-button primary"
              >
                Öppna kalendern →
              </a>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}