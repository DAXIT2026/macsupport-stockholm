"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ConsentSettings = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "macsupport-cookie-consent";

const defaultConsent: ConsentSettings = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [settings, setSettings] =
    useState<ConsentSettings>(defaultConsent);

  useEffect(() => {
    const stored =
      window.localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      const timer = window.setTimeout(() => {
        setOpen(true);
      }, 350);

      return () => {
        window.clearTimeout(timer);
      };
    }

    const timer = window.setTimeout(() => {
      try {
        const parsed =
          JSON.parse(stored) as ConsentSettings;

        setSettings({
          necessary: true,
          analytics: Boolean(parsed.analytics),
          marketing: Boolean(parsed.marketing),
        });
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
        setOpen(true);
      }
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  function saveConsent(
    nextSettings: ConsentSettings
  ) {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...nextSettings,
        savedAt: new Date().toISOString(),
      })
    );

    setSettings(nextSettings);
    setCustomize(false);
    setOpen(false);

    window.dispatchEvent(
      new CustomEvent(
        "macsupport-consent-changed",
        {
          detail: nextSettings,
        }
      )
    );
  }

  function acceptAll() {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  }

  function rejectOptional() {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  }

  function saveCustom() {
    saveConsent(settings);
  }

  useEffect(() => {
    function openPreferences() {
      setOpen(true);
      setCustomize(true);
    }

    window.addEventListener(
      "macsupport-open-cookie-settings",
      openPreferences
    );

    return () => {
      window.removeEventListener(
        "macsupport-open-cookie-settings",
        openPreferences
      );
    };
  }, []);

  if (!open) {
    return null;
  }

  return (
    <div className="cookie-layer">

      <button
        type="button"
        className="cookie-backdrop"
        aria-label="Stäng inte utan att välja cookieinställning"
        tabIndex={-1}
      />

      <section
        className="cookie-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-title"
      >

        <div className="cookie-brand-row">
          <span className="cookie-brand-dot" />

          <span>
            MACSUPPORT STOCKHOLM
          </span>
        </div>

        {!customize ? (
          <>
            <div className="cookie-copy">

              <p className="premium-eyebrow">
                DIN INTEGRITET
              </p>

              <h2 id="cookie-title">
                Vi använder cookies
                med respekt för ditt val.
              </h2>

              <p>
                Nödvändiga cookies används för att
                webbplatsen ska fungera. Med ditt
                samtycke kan vi även använda cookies
                för statistik och marknadsföring.
              </p>

              <p className="cookie-copy-secondary">
                Du kan ändra eller återkalla ditt val
                när som helst.
              </p>

            </div>

            <div className="cookie-actions">

              <button
                type="button"
                className="cookie-button cookie-button-accept"
                onClick={acceptAll}
              >
                Godkänn alla
              </button>

              <button
                type="button"
                className="cookie-button cookie-button-reject"
                onClick={rejectOptional}
              >
                Avvisa valfria
              </button>

              <button
                type="button"
                className="cookie-button cookie-button-customize"
                onClick={() => setCustomize(true)}
              >
                Anpassa
              </button>

            </div>

            <div className="cookie-links">
              <Link href="/cookies">
                Läs om våra cookies
              </Link>

              <Link href="/integritet">
                Integritetspolicy
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="cookie-preferences-heading">

              <button
                type="button"
                className="cookie-back-button"
                onClick={() => setCustomize(false)}
              >
                ← Tillbaka
              </button>

              <p className="premium-eyebrow">
                COOKIE-INSTÄLLNINGAR
              </p>

              <h2 id="cookie-title">
                Välj vad du vill tillåta.
              </h2>

              <p>
                Du kan ändra detta senare via länken
                Cookie-inställningar längst ned på sidan.
              </p>

            </div>

            <div className="cookie-category-list">

              <div className="cookie-category">

                <div>
                  <strong>
                    Nödvändiga
                  </strong>

                  <p>
                    Krävs för grundläggande funktioner
                    och för att komma ihåg ditt val.
                  </p>
                </div>

                <span className="cookie-required">
                  Alltid aktiva
                </span>

              </div>

              <label className="cookie-category">

                <div>
                  <strong>
                    Statistik
                  </strong>

                  <p>
                    Hjälper oss förstå hur webbplatsen
                    används och förbättra upplevelsen.
                  </p>
                </div>

                <span className="cookie-switch">
                  <input
                    type="checkbox"
                    checked={settings.analytics}
                    onChange={(event) =>
                      setSettings((current) => ({
                        ...current,
                        analytics:
                          event.target.checked,
                      }))
                    }
                  />

                  <span />
                </span>

              </label>

              <label className="cookie-category">

                <div>
                  <strong>
                    Marknadsföring
                  </strong>

                  <p>
                    Kan användas för relevant annonsering
                    om sådana tjänster aktiveras.
                  </p>
                </div>

                <span className="cookie-switch">
                  <input
                    type="checkbox"
                    checked={settings.marketing}
                    onChange={(event) =>
                      setSettings((current) => ({
                        ...current,
                        marketing:
                          event.target.checked,
                      }))
                    }
                  />

                  <span />
                </span>

              </label>

            </div>

            <div className="cookie-custom-actions">

              <button
                type="button"
                className="cookie-button cookie-button-save"
                onClick={saveCustom}
              >
                Spara mina val
              </button>

              <button
                type="button"
                className="cookie-button cookie-button-reject"
                onClick={rejectOptional}
              >
                Avvisa valfria
              </button>

            </div>
          </>
        )}

      </section>

    </div>
  );
}
