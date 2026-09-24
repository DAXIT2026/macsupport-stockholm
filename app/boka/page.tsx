"use client";

import React, { Suspense } from "react";
import BookingEmbed from "../../components/BookingEmbed";
import { siteConfig } from "../../lib/site-config";

export default function BookingPage() {
  return (
    <>

      <main className="booking-page-v2">
        <section className="booking-page-v2-hero">
          <div className="premium-shell">
            <div className="booking-page-v2-heading">
              <span className="premium-eyebrow">
                BOKA SUPPORT
              </span>

              <h1>
                Välj en tid.
                <br />
                Vi hjälper dig vidare.
              </h1>

              <p>
                Boka personlig IT-support för hemmet,
                företaget eller på distans. Du får tydlig
                information innan arbetet börjar.
              </p>

              <div className="booking-page-v2-trust">
                <span>✓ Personlig support</span>
                <span>✓ Tydliga priser</span>
                <span>✓ Hemma eller på distans</span>
              </div>
            </div>

            <div className="booking-page-v2-panel">
              <div className="booking-page-v2-panel-top">
                <div>
                  <span className="premium-eyebrow">
                    ONLINEBOKNING
                  </span>

                  <h2>Hitta en tid som passar dig</h2>
                </div>

                <span className="booking-page-v2-secure">
                  Säker bokning
                </span>
              </div>

              <div className="booking-page-v3-steps" aria-label="Bokningssteg">
                <div className="booking-page-v3-step is-active">
                  <span>1</span>
                  <strong>Välj tid</strong>
                </div>

                <i aria-hidden="true" />

                <div className="booking-page-v3-step">
                  <span>2</span>
                  <strong>Dina uppgifter</strong>
                </div>

                <i aria-hidden="true" />

                <div className="booking-page-v3-step">
                  <span>3</span>
                  <strong>Klart</strong>
                </div>
              </div>

              {/* Обертаємо компонент з useSearchParams у Suspense, вимагає Next.js */}
              <Suspense fallback={<div className="p-8 text-center text-gray-500">Laddar bokningskalender...</div>}>
                <BookingEmbed />
              </Suspense>
            </div>
          </div>
        </section>

        <section className="booking-page-v2-help">
          <div className="premium-shell">
            <div className="booking-page-v2-help-grid">
              <div>
                <span className="premium-eyebrow">
                  VILL DU HELLRE PRATA MED OSS?
                </span>

                <h2>Vi hjälper dig även direkt.</h2>
              </div>

              <a
                href={siteConfig.phoneHref}
                className="premium-button primary"
              >
                Ring {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
        </section>
      </main>

    </>
  );
}