"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function SplashIntro() {
  const splashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const splash = splashRef.current;

    if (!splash) {
      return;
    }

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    const alreadySeen =
      sessionStorage.getItem(
        "macsupport-splash-seen"
      ) === "true";

    if (reduceMotion || alreadySeen) {
      splash.classList.add(
        "splash-v6-skip"
      );

      return;
    }

    const previousOverflow =
      document.documentElement.style.overflow;

    document.documentElement.style.overflow =
      "hidden";

    const timer = window.setTimeout(() => {
      splash.classList.add(
        "splash-v6-finished"
      );

      sessionStorage.setItem(
        "macsupport-splash-seen",
        "true"
      );

      document.documentElement.style.overflow =
        previousOverflow;
    }, 5000);

    return () => {
      window.clearTimeout(timer);

      document.documentElement.style.overflow =
        previousOverflow;
    };
  }, []);

  return (
    <div
      ref={splashRef}
      className="splash-v6"
      aria-hidden="true"
    >
      <div className="splash-v6-ambient" />

      <div className="splash-v6-network">
        {Array.from({ length: 12 }).map(
          (_, index) => (
            <span
              key={index}
              className={`splash-v6-node splash-v6-node-${index + 1}`}
            />
          )
        )}
      </div>

      <div className="splash-v6-hex hex-one" />
      <div className="splash-v6-hex hex-two" />
      <div className="splash-v6-hex hex-three" />
      <div className="splash-v6-hex hex-four" />

      <div className="splash-v6-orbit-system">
        <span className="splash-v6-orbit orbit-a" />
        <span className="splash-v6-orbit orbit-b" />
        <span className="splash-v6-orbit orbit-c" />
        <span className="splash-v6-orbit orbit-d" />

        <span className="splash-v6-light light-one" />
        <span className="splash-v6-light light-two" />
        <span className="splash-v6-light light-three" />
        <span className="splash-v6-light light-four" />
      </div>

      <div className="splash-v6-card">
        <div className="splash-v6-card-glow" />

        <Image
          src="/logos/logo-light.png"
          alt=""
          width={360}
          height={130}
          priority
          className="splash-v6-logo"
        />

        <p>
          Teknik som gör din vardag enklare.
        </p>

        <div className="splash-v6-progress">
          <span />
        </div>

        <small>
          LADDAR DIN IT-SUPPORT...
        </small>
      </div>
    </div>
  );
}
