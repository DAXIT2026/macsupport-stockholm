import Image from "next/image";
import Link from "next/link";
import CookieSettingsButton from "./CookieSettingsButton";
import { siteConfig } from "../lib/site-config";

export default function Footer() {
  return (
    <>
      <footer className="footer-v3">

        <div className="premium-shell">

          <section className="footer-v3-cta">

            <div className="footer-v3-cta-copy">
              <span>
                BEHÖVER DU HJÄLP?
              </span>

              <h2>
                Teknik ska kännas enkel.
              </h2>

              <p>
                Boka support, ring oss direkt eller skicka ett meddelande.
                Vi hjälper dig att hitta rätt nästa steg.
              </p>
            </div>


            <div className="footer-v3-cta-actions">

              <a
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-v3-book"
              >
                <span>
                  Boka support
                </span>

                <strong aria-hidden="true">
                  →
                </strong>
              </a>


              <a
                href={siteConfig.phoneHref}
                className="footer-v3-call"
              >
                <small>
                  Ring direkt
                </small>

                <strong>
                  {siteConfig.phoneDisplay}
                </strong>
              </a>

            </div>

          </section>


          <div className="footer-v3-main">

            <div className="footer-v3-brand">

              <Link
                href="/"
                className="footer-v3-logo"
                aria-label="Macsupport Stockholm – startsida"
              >
                <Image
                  src="/logos/logo-dark.png"
                  alt="Macsupport Stockholm"
                  width={310}
                  height={110}
                  sizes="240px"
                
                  style={{ height: "auto" }}
                />
              </Link>

              <p>
                Personlig IT-support för privatpersoner,
                seniorer och företag i Stockholm.
              </p>

              <div className="footer-v3-trust">

                <span>
                  <i aria-hidden="true" />
                  Personlig service
                </span>

                <span>
                  <i aria-hidden="true" />
                  Stockholm med omnejd
                </span>

              </div>

            </div>


            <nav
              className="footer-v3-column"
              aria-label="Tjänster"
            >
              <span className="footer-v3-label">
                TJÄNSTER
              </span>

              <Link href="/tjanster/mac-support">
                Mac-support
              </Link>

              <Link href="/tjanster/wifi-natverk">
                WiFi & nätverk
              </Link>

              <Link href="/tjanster/it-sakerhet">
                IT-säkerhet
              </Link>

              <Link href="/tjanster/microsoft-365">
                Microsoft 365
              </Link>

              <Link href="/tjanster/fjarrsupport">
                Fjärrsupport
              </Link>

              <Link
                href="/tjanster"
                className="footer-v3-all"
              >
                Alla tjänster
                <span aria-hidden="true">→</span>
              </Link>
            </nav>


            <nav
              className="footer-v3-column"
              aria-label="Information"
            >
              <span className="footer-v3-label">
                HJÄLP & INFORMATION
              </span>

              <Link href="/sa-fungerar-det">
                Så fungerar det
              </Link>

              <Link href="/priser">
                Priser
              </Link>

              <Link href="/om-oss">
                Om oss
              </Link>

              <Link href="/kontakt">
                Kontakt
              </Link>

              <Link href="/cookies">
                Cookies
              </Link>
            </nav>


            <div className="footer-v3-contact">

              <span className="footer-v3-label">
                KONTAKT
              </span>

              <div className="footer-v3-contact-card">

                <span className="footer-v3-contact-status">
                  <i aria-hidden="true" />
                  PERSONLIG SUPPORT
                </span>

                <a
                  href={siteConfig.phoneHref}
                  className="footer-v3-phone"
                >
                  {siteConfig.phoneDisplay}
                </a>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="footer-v3-email"
                >
                  {siteConfig.email}
                </a>

                <p>
                  Stockholm med omnejd
                </p>

              </div>

            </div>

          </div>


          <div className="footer-v3-bottom">

            <span>
              © {new Date().getFullYear()} Macsupport Stockholm
            </span>


            <div className="footer-v3-legal">

              <Link href="/integritet">
                Integritet
              </Link>

              <Link href="/cookies">
                Cookies
              </Link>

              <CookieSettingsButton />

              <Link href="/villkor">
                Villkor
              </Link>

            </div>

          </div>

        </div>

      </footer>


            <nav
        className="mobile-sticky-actions mobile-actions-v5"
        aria-label="Snabbåtgärder"
      >

        <a
          href={siteConfig.phoneHref}
          className="mobile-v5-action mobile-v5-call"
          aria-label="Ring Macsupport Stockholm"
        >
          <span
            className="mobile-v5-laser"
            aria-hidden="true"
          />

          <span className="mobile-v5-icon">
            <Image
              src="/icons/mobile-call.png"
              alt=""
              width={72}
              height={72}
              sizes="54px"
            />
          </span>

          <span className="mobile-v5-copy">
            <small>Ring</small>
            <strong>Direkt</strong>
          </span>
        </a>


        <a
          href={siteConfig.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-v5-action mobile-v5-booking"
          aria-label="Boka support"
        >
          <span
            className="mobile-v5-laser"
            aria-hidden="true"
          />

          <span className="mobile-v5-icon">
            <Image
              src="/icons/mobile-booking.png"
              alt=""
              width={72}
              height={72}
              sizes="58px"
            />
          </span>

          <span className="mobile-v5-copy">
            <small>Boka</small>
            <strong>Support</strong>
          </span>
        </a>


        <Link
          href="/kontakt"
          className="mobile-v5-action mobile-v5-support"
          aria-label="Få support och hjälp"
        >
          <span
            className="mobile-v5-laser"
            aria-hidden="true"
          />

          <span className="mobile-v5-icon">
            <Image
              src="/icons/mobile-support.png"
              alt=""
              width={72}
              height={72}
              sizes="54px"
            />
          </span>

          <span className="mobile-v5-copy">
            <small>Support</small>
            <strong>Hjälp</strong>
          </span>
        </Link>

      </nav>
    </>
  );
}
