"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { siteConfig } from "../lib/site-config";
import { supportFormLinks } from "../lib/support-form-links";
import BrandOrbit from "./BrandOrbit";

const mainNavigation = [
  {
    label: "Privat",
    href: "/privat",
  },
  {
    label: "Företag",
    href: "/foretag",
  },
  {
    label: "Så fungerar det",
    href: "/sa-fungerar-det",
  },
  {
    label: "Priser",
    href: "/priser",
  },
  {
    label: "Om oss",
    href: "/om-oss",
  },
  {
    label: "Kontakt",
    href: "/kontakt",
  },
];

const serviceGroups = [
  {
    label: "DATOR & SUPPORT",
    description: "Personlig hjälp med dator och vardagsteknik.",
    items: [
      {
        label: "Mac-support",
        href: "/tjanster/mac-support",
        description: "Felsökning, installation och hjälp med Mac.",
      },
      {
        label: "Fjärrsupport",
        href: "/tjanster/fjarrsupport",
        description: "Säker hjälp på distans när det passar.",
      },
    ],
  },
  {
    label: "NÄTVERK & SÄKERHET",
    description: "Stabil uppkoppling och tryggare teknik.",
    items: [
      {
        label: "WiFi & nätverk",
        href: "/tjanster/wifi-natverk",
        description: "Bättre täckning, router och nätverk.",
      },
      {
        label: "IT-säkerhet",
        href: "/tjanster/it-sakerhet",
        description: "Backup, säkerhet och tryggare enheter.",
      },
      {
        label: "Kameraövervakning",
        href: "/tjanster/kameraovervakning",
        description: "Moderna kameralösningar och fjärråtkomst.",
      },
    ],
  },
  {
    label: "ARBETE & FÖRETAG",
    description: "Smidigare digital arbetsmiljö.",
    items: [
      {
        label: "Microsoft 365",
        href: "/tjanster/microsoft-365",
        description: "E-post, Teams, konton och Microsoft 365.",
      },
      {
        label: "Företagssupport",
        href: "/foretag",
        description: "IT-hjälp för företag i Stockholm.",
      },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] =
    useState(false);

  const closeButtonRef =
    useRef<HTMLButtonElement>(null);

  const menuButtonRef =
    useRef<HTMLButtonElement>(null);

  const mobileDrawerRef =
    useRef<HTMLElement>(null);

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setMobileServicesOpen(false);

        window.requestAnimationFrame(() => {
          menuButtonRef.current?.focus();
        });

        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const drawer = mobileDrawerRef.current;

      if (!drawer) {
        return;
      }

      const focusableElements = Array.from(
        drawer.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => {
        return element.offsetParent !== null;
      });

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement =
        focusableElements[focusableElements.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";

      window.clearTimeout(focusTimer);

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [mobileOpen]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  function handleBrandClick() {
    closeMobileMenu();

    if (pathname === "/") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }

  function isActive(href: string) {
    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  }

  function closeMobileMenu(restoreFocus = false) {
    setMobileOpen(false);
    setMobileServicesOpen(false);

    if (restoreFocus) {
      window.requestAnimationFrame(() => {
        menuButtonRef.current?.focus();
      });
    }
  }

  const servicesActive =
    pathname === "/tjanster" ||
    pathname.startsWith("/tjanster/");

  return (
    <header className="header-v4">

      <div className="header-v4-topline">

        <div className="premium-shell header-v4-topline-inner">

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

            <a href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          </div>

        </div>

      </div>


      <div className="header-v4-main">

        <div className="premium-shell header-v4-main-inner">

            <Link
  href="/"
  className="header-v4-brand"
  aria-label="Macsupport Stockholm – startsida"
  onClick={handleBrandClick}
>
  <Image
    src="/logos/logo-light.png"
    alt="Macsupport Stockholm"
    width={220}
    height={70}
    priority
    className="header-v4-logo-img"
  />
</Link>
          <nav
            className="header-v4-nav"
            aria-label="Huvudnavigation"
          >

            {mainNavigation.slice(0, 2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive(item.href)
                    ? "header-v4-link active"
                    : "header-v4-link"
                }
              >
                {item.label}
              </Link>
            ))}


            <div
              className={
                servicesActive
                  ? "header-v4-services active"
                  : "header-v4-services"
              }
            >

              <Link
                href="/tjanster"
                className="header-v4-services-trigger"
                aria-haspopup="true"
                aria-controls="header-v4-services-menu"
              >
                <span>Tjänster</span>

                <span
                  className="header-v4-chevron"
                  aria-hidden="true"
                >
                  ↓
                </span>
              </Link>


              <div className="header-v4-mega-shell">

                <div
                  className="header-v4-mega"
                  id="header-v4-services-menu"
                >

                  <div className="header-v4-mega-intro">

                    <span>
                      TJÄNSTER
                    </span>

                    <h2>
                      Rätt hjälp för rätt situation.
                    </h2>

                    <p>
                      Från Mac och WiFi till Microsoft 365,
                      säkerhet och fjärrsupport.
                    </p>

                    <Link
                      href="/tjanster"
                      className="header-v4-mega-all"
                    >
                      Se alla tjänster
                      <span aria-hidden="true">
                        →
                      </span>
                    </Link>

                  </div>


                  <div className="header-v4-mega-groups">

                    {serviceGroups.map((group) => (
                      <div
                        className="header-v4-mega-group"
                        key={group.label}
                      >

                        <div className="header-v4-mega-group-heading">
                          <span>
                            {group.label}
                          </span>

                          <p>
                            {group.description}
                          </p>
                        </div>


                        <div className="header-v4-mega-links">

                          {group.items.map((item) => (
                            <Link
                              href={item.href}
                              key={item.href}
                              className={
                                isActive(item.href)
                                  ? "header-v4-service-link active"
                                  : "header-v4-service-link"
                              }
                            >
                              <span>
                                <strong>
                                  {item.label}
                                </strong>

                                <small>
                                  {item.description}
                                </small>
                              </span>

                              <i aria-hidden="true">
                                →
                              </i>
                            </Link>
                          ))}

                        </div>

                      </div>
                    ))}

                  </div>

                </div>

              </div>

            </div>


            {mainNavigation.slice(2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive(item.href)
                    ? "header-v4-link active"
                    : "header-v4-link"
                }
              >
                {item.label}
              </Link>
            ))}

          </nav>


          <a
            href={supportFormLinks.booking}
            
            className="header-v4-book"
          >
            <span>
              Boka support
            </span>

            <i aria-hidden="true">
              →
            </i>
          </a>


          <button
            ref={menuButtonRef}
            type="button"
            className="header-v4-menu-button"
            aria-label="Öppna meny"
            aria-expanded={mobileOpen}
            aria-controls="header-v4-mobile"
            onClick={() => setMobileOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>

        </div>

      </div>


      {mobileOpen && (
        <div
          className="header-v4-mobile-layer"
          id="header-v4-mobile"
        >

          <button
            type="button"
            className="header-v4-mobile-backdrop"
            aria-label="Stäng meny"
            onClick={() => closeMobileMenu(true)}
          />


          <aside
            ref={mobileDrawerRef}
            className="header-v4-mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >

            <div className="header-v4-mobile-top">

              <div className="header-v4-mobile-orbit">
                <BrandOrbit />
              </div>

              <Link
                href="/"
                className="header-v4-mobile-logo"
                onClick={handleBrandClick}
              >

                <Image
                  src="/logos/logo-light.png"
                  alt="Macsupport Stockholm"
                  width={210}
                  height={76}
                  className="header-v4-logo-img"
                />
              </Link>


              <button
                ref={closeButtonRef}
                type="button"
                className="header-v4-mobile-close"
                aria-label="Stäng meny"
                onClick={() => closeMobileMenu(true)}
              >
                ×
              </button>

            </div>


            <div className="header-v4-mobile-intro">

              <span>
                MENY
              </span>

              <strong>
                Vad behöver du hjälp med?
              </strong>

            </div>


            <nav
              className="header-v4-mobile-nav"
              aria-label="Mobilnavigation"
            >

              {mainNavigation.slice(0, 2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    isActive(item.href)
                      ? "header-v4-mobile-link active"
                      : "header-v4-mobile-link"
                  }
                  onClick={() => closeMobileMenu()}
                >
                  <span>
                    {item.label}
                  </span>

                  <i aria-hidden="true">
                    →
                  </i>
                </Link>
              ))}


              <div
                className={
                  mobileServicesOpen
                    ? "header-v4-mobile-services open"
                    : "header-v4-mobile-services"
                }
              >

                <button
                  type="button"
                  className={
                    servicesActive
                      ? "header-v4-mobile-services-button active"
                      : "header-v4-mobile-services-button"
                  }
                  aria-expanded={mobileServicesOpen}
                  aria-controls="header-v4-mobile-services-panel"
                  onClick={() =>
                    setMobileServicesOpen(
                      (current) => !current
                    )
                  }
                >
                  <span>
                    Tjänster
                  </span>

                  <i aria-hidden="true">
                    +
                  </i>
                </button>


                <div
                  id="header-v4-mobile-services-panel"
                  className="header-v4-mobile-services-panel"
                >

                  <Link
                    href="/tjanster"
                    className="header-v4-mobile-all-services"
                    onClick={() => closeMobileMenu()}
                  >
                    Alla tjänster
                    <span aria-hidden="true">
                      →
                    </span>
                  </Link>


                  {serviceGroups.map((group) => (
                    <div
                      className="header-v4-mobile-service-group"
                      key={group.label}
                    >

                      <span>
                        {group.label}
                      </span>


                      {group.items.map((item) => (
                        <Link
                          href={item.href}
                          key={item.href}
                          className={
                            isActive(item.href)
                              ? "active"
                              : ""
                          }
                          onClick={() => closeMobileMenu()}
                        >
                          <strong>
                            {item.label}
                          </strong>

                          <small>
                            {item.description}
                          </small>
                        </Link>
                      ))}

                    </div>
                  ))}

                </div>

              </div>


              {mainNavigation.slice(2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    isActive(item.href)
                      ? "header-v4-mobile-link active"
                      : "header-v4-mobile-link"
                  }
                  onClick={() => closeMobileMenu()}
                >
                  <span>
                    {item.label}
                  </span>

                  <i aria-hidden="true">
                    →
                  </i>
                </Link>
              ))}

            </nav>


            <div className="header-v4-mobile-support">

              <span>
                BEHÖVER DU HJÄLP?
              </span>

              <a
                href={siteConfig.phoneHref}
                className="header-v4-mobile-phone"
              >
                <small>
                  Ring direkt
                </small>

                <strong>
                  {siteConfig.phoneDisplay}
                </strong>
              </a>


              <a
                href={supportFormLinks.booking}
                
                className="header-v4-mobile-book"
              >
                <span>
                  Boka support
                </span>

                <i aria-hidden="true">
                  →
                </i>
              </a>

            </div>

          </aside>

        </div>
      )}

    </header>
  );
}












