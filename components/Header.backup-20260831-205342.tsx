"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { siteConfig } from "../lib/site-config";

const navigation = [
  {
    label: "Privat",
    href: "/privat",
    description: "Personlig IT-hjälp hemma",
  },
  {
    label: "Företag",
    href: "/foretag",
    description: "IT-support för verksamheten",
  },
  {
    label: "Tjänster",
    href: "/tjanster",
    description: "Mac, WiFi, säkerhet och mer",
  },
  {
    label: "Så fungerar det",
    href: "/sa-fungerar-det",
    description: "Från problem till lösning",
  },
  {
    label: "Priser",
    href: "/priser",
    description: "Tydliga priser och RUT",
  },
  {
    label: "Om oss",
    href: "/om-oss",
    description: "Lär känna hur vi arbetar",
  },
  {
    label: "Kontakt",
    href: "/kontakt",
    description: "Ring, boka eller skriv till oss",
  },
];

export default function Header() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  const closeButtonRef =
    useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const focusTimer =
      window.setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow = "";

      window.clearTimeout(focusTimer);

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [mobileOpen]);

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  }

  return (
    <header className="premium-header">

      <div className="header-topline">
        <div className="premium-shell header-topline-inner">

          <span>
            Personlig IT-support i Stockholm
          </span>

          <div>

            <a href={siteConfig.phoneHref}>
              {siteConfig.phoneDisplay}
            </a>

            <span aria-hidden="true">
              ·
            </span>

            <a
              href={`mailto:${siteConfig.email}`}
            >
              {siteConfig.email}
            </a>

          </div>

        </div>
      </div>


      <div className="premium-shell premium-nav">

        <Link
          href="/"
          className="premium-brand premium-brand-v3"
          aria-label="Macsupport Stockholm – startsida"
        >
          <span className="premium-brand-glow" />

          <Image
            src="/logos/logo-light.png"
            alt="Macsupport Stockholm"
            width={250}
            height={90}
            priority
          />
        </Link>


        <nav
          className="desktop-menu"
          aria-label="Huvudnavigation"
        >

          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={
                isActive(item.href)
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              {item.label}
            </Link>
          ))}

        </nav>


        <a
          href={siteConfig.bookingUrl}
          className="premium-button primary header-booking-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Boka support
        </a>


        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label="Öppna meny"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() =>
            setMobileOpen(true)
          }
        >
          <span />
          <span />
          <span />
        </button>

      </div>


      {mobileOpen && (
        <div
          className="mobile-drawer-layer"
          id="mobile-navigation"
        >

          <button
            type="button"
            className="mobile-drawer-backdrop"
            aria-label="Stäng meny"
            onClick={() =>
              setMobileOpen(false)
            }
          />


          <aside
            className="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >

            <div className="mobile-drawer-top">

              <Link
                href="/"
                className="mobile-drawer-logo"
                onClick={() =>
                  setMobileOpen(false)
                }
              >
                <Image
                  src="/logos/logo-light.png"
                  alt="Macsupport Stockholm"
                  width={210}
                  height={76}
                />
              </Link>

              <button
                ref={closeButtonRef}
                type="button"
                className="mobile-drawer-close"
                aria-label="Stäng meny"
                onClick={() =>
                  setMobileOpen(false)
                }
              >
                ×
              </button>

            </div>


            <div className="mobile-drawer-intro">
              <span>MENY</span>

              <p>
                Vad behöver du hjälp med?
              </p>
            </div>


            <nav
              className="mobile-drawer-navigation"
              aria-label="Mobilnavigation"
            >

              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={
                    isActive(item.href)
                      ? "mobile-drawer-link active"
                      : "mobile-drawer-link"
                  }
                  onClick={() =>
                    setMobileOpen(false)
                  }
                >

                  <div>
                    <strong>
                      {item.label}
                    </strong>

                    <small>
                      {item.description}
                    </small>
                  </div>

                  <span aria-hidden="true">
                    →
                  </span>

                </Link>
              ))}

            </nav>


            <div className="mobile-drawer-support">

              <div>
                <span>
                  BEHÖVER DU HJÄLP NU?
                </span>

                <strong>
                  Vi hjälper dig vidare.
                </strong>
              </div>


              <a
                href={siteConfig.phoneHref}
                className="mobile-drawer-phone"
              >
                <small>
                  Ring direkt
                </small>

                <strong>
                  {siteConfig.phoneDisplay}
                </strong>
              </a>


              <a
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="premium-button primary"
              >
                Boka support
              </a>

            </div>

          </aside>
        </div>
      )}

    </header>
  );
}
