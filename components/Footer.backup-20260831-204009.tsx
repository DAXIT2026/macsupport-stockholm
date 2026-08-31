import Image from "next/image";
import Link from "next/link";
import CookieSettingsButton from "./CookieSettingsButton";
import { siteConfig } from "../lib/site-config";

export default function Footer() {
  return (
    <>
      <footer className="premium-footer">

        <div className="premium-shell footer-grid">

          <div className="footer-brand">
            <strong>Macsupport Stockholm</strong>

            <p>
              Personlig IT-support för privatpersoner,
              seniorer och företag i Stockholm.
            </p>
          </div>

          <div className="footer-column">
            <span>TJÄNSTER</span>

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
          </div>

          <div className="footer-column">
            <span>HJÄLP & INFORMATION</span>

            <Link href={siteConfig.bookingUrl}>
              Boka support
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
          </div>

          <div className="footer-column">
            <span>KONTAKT</span>

            <a href="tel:+46840011726">
              08-400 117 26
            </a>

            <a href="mailto:kontakt@mindatorsupport.se">
              kontakt@mindatorsupport.se
            </a>

            <p>
              Stockholm med omnejd
            </p>
          </div>

        </div>

        <div className="premium-shell footer-bottom">

          <span>
            © {new Date().getFullYear()} Macsupport Stockholm
          </span>

          <div className="footer-legal-links">

            <Link href="/integritet">
              Integritet
            </Link>

            <Link href="/cookies">
              Cookies
            </Link>

            <CookieSettingsButton />

            <Link href="#">
              Villkor
            </Link>

          </div>

        </div>

      </footer>


      <nav
        className="mobile-sticky-actions mobile-sticky-actions-v2"
        aria-label="Snabbåtgärder"
      >

        <a
          href="tel:+46840011726"
          className="mobile-dock-action mobile-dock-ring"
        >
          <span
            className="mobile-dock-icon"
            aria-hidden="true"
          >
            ☎
          </span>

          <span className="mobile-dock-copy">
            <small>Ring</small>
            <strong>Direkt</strong>
          </span>
        </a>


        <Link
          href={siteConfig.bookingUrl}
          className="mobile-dock-action mobile-dock-book"
        >
          <span
            className="mobile-dock-icon mobile-dock-icon-book"
            aria-hidden="true"
          >
            ◷
          </span>

          <span className="mobile-dock-copy">
            <small>Boka</small>
            <strong>Support</strong>
          </span>
        </Link>


        <Link
          href="/kontakt"
          className="mobile-dock-action mobile-dock-support"
        >
          <span className="mobile-dock-logo" aria-hidden="true">
            <Image
              src="/logos/logo-light.png"
              alt=""
              width={48}
              height={48}
            />
          </span>

          <span className="mobile-dock-copy">
            <small>Support</small>
            <strong>Hjälp</strong>
          </span>
        </Link>

      </nav>
    </>
  );
}
