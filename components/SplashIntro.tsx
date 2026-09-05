"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashIntro() {
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const finishTimer = window.setTimeout(() => {
      setActive(false);
    }, 3300);

    const removeTimer = window.setTimeout(() => {
      setVisible(false);
    }, 3900);

    return () => {
      window.clearTimeout(finishTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`splash-v5 ${active ? "is-active" : "is-leaving"}`}
      role="status"
      aria-live="polite"
      aria-label="Macsupport Stockholm laddas"
    >
      <div className="splash-v5-ambient" aria-hidden="true">
        <span className="splash-v5-glow splash-v5-glow-a" />
        <span className="splash-v5-glow splash-v5-glow-b" />
        <span className="splash-v5-glow splash-v5-glow-c" />

        <span className="splash-v5-particle p1" />
        <span className="splash-v5-particle p2" />
        <span className="splash-v5-particle p3" />
        <span className="splash-v5-particle p4" />
        <span className="splash-v5-particle p5" />
        <span className="splash-v5-particle p6" />
        <span className="splash-v5-particle p7" />
        <span className="splash-v5-particle p8" />

        <span className="splash-v5-hex h1" />
        <span className="splash-v5-hex h2" />
        <span className="splash-v5-hex h3" />
      </div>

      <div className="splash-v5-stage">
        <div className="splash-v5-network">
          <div className="splash-v5-globe" aria-hidden="true">
            <span className="splash-v5-globe-core" />

            <span className="splash-v5-latitude lat-1" />
            <span className="splash-v5-latitude lat-2" />
            <span className="splash-v5-latitude lat-3" />

            <span className="splash-v5-longitude long-1" />
            <span className="splash-v5-longitude long-2" />
            <span className="splash-v5-longitude long-3" />

            <span className="splash-v5-map-light map-1" />
            <span className="splash-v5-map-light map-2" />
            <span className="splash-v5-map-light map-3" />
            <span className="splash-v5-map-light map-4" />
            <span className="splash-v5-map-light map-5" />

            <span className="splash-v5-orbit orbit-1">
              <i />
            </span>

            <span className="splash-v5-orbit orbit-2">
              <i />
            </span>

            <span className="splash-v5-orbit orbit-3">
              <i />
            </span>
          </div>

          <div className="splash-v5-service splash-v5-service-support">
            <span className="splash-v5-service-icon">⌁</span>
            <div>
              <strong>SUPPORT</strong>
              <small>Privat &amp; företag</small>
            </div>
          </div>

          <div className="splash-v5-service splash-v5-service-security">
            <span className="splash-v5-service-icon">◇</span>
            <div>
              <strong>SÄKERHET</strong>
              <small>Tryggare digital vardag</small>
            </div>
          </div>

          <div className="splash-v5-service splash-v5-service-solutions">
            <span className="splash-v5-service-icon">⚙</span>
            <div>
              <strong>LÖSNINGAR</strong>
              <small>Snabb och effektiv hjälp</small>
            </div>
          </div>

          <div className="splash-v5-service splash-v5-service-personal">
            <span className="splash-v5-service-icon">●</span>
            <div>
              <strong>PERSONLIG HJÄLP</strong>
              <small>På dina villkor</small>
            </div>
          </div>
        </div>

        <div className="splash-v5-brand">
          <div className="splash-v5-logo-shell">
            <Image
              src="/logos/logo-light.png"
              alt="Macsupport Stockholm"
              width={360}
              height={160}
              priority
              className="splash-v5-logo-image"
            />
          </div>
        </div>

        <p className="splash-v5-tagline">
          Teknik som gör din vardag enklare.
        </p>

        <div className="splash-v5-progress" aria-hidden="true">
          <span className="splash-v5-progress-fill" />
          <span className="splash-v5-progress-dot" />
        </div>

        <strong className="splash-v5-loading">
          LADDAR DIN IT-SUPPORT...
        </strong>

        <span className="splash-v5-wait">
          Snart är vi där.
        </span>
      </div>

      <div className="splash-v5-stockholm" aria-hidden="true">
        <span className="splash-v5-building b1" />
        <span className="splash-v5-building b2" />
        <span className="splash-v5-building b3" />
        <span className="splash-v5-building b4" />
        <span className="splash-v5-building b5" />
        <span className="splash-v5-building b6" />

        <span className="splash-v5-tower tower-left" />
        <span className="splash-v5-tower tower-right" />

        <span className="splash-v5-water" />
      </div>
    </div>
  );
}
