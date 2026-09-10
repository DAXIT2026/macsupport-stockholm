import type { Metadata } from "next";
import Link from "next/link";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontakta Macsupport Stockholm för personlig IT-support, hembesök, företagssupport och säker fjärrhjälp.",
};

const contactOptions = [
  {
    label: "RING OSS",
    title: "08-400 117 26",
    text: "Prata direkt med oss om du behöver snabb hjälp eller vill ställa en fråga.",
    href: "tel:+46840011726",
    action: "Ring nu",
    icon: "☎",
    external: true,
  },
  {
    label: "SUPPORT & KONTAKT",
    title: "Boka support eller skicka en förfrågan",
    text: "Beskriv ditt problem i samma formulär. Där kan du välja supportform, ledig tid eller skicka förfrågan utan bokning.",
    href: "/support?intent=booking#support-form",
    action: "Öppna formuläret",
    icon: "→",
    external: false,
  },
];

export default function KontaktPage() {
  return (
    <>
      <Header />

      <main className="contact-page">
        <section className="contact-page-hero">
          <div className="contact-page-orb contact-page-orb-one" />
          <div className="contact-page-orb contact-page-orb-two" />

          <div className="premium-shell contact-page-hero-inner">
            <div className="contact-page-heading">
              <p className="premium-eyebrow">
                KONTAKT
              </p>

              <h1>
                Hur kan vi
                <br />
                hjälpa dig?
              </h1>

              <p>
                Ring oss direkt eller öppna vårt gemensamma
                supportformulär. Du behöver inte veta exakt
                vad problemet heter.
              </p>
            </div>

            <div className="contact-choice-grid contact-choice-grid-direct">
              {contactOptions.map((option) =>
                option.external ? (
                  <a
                    href={option.href}
                    className="contact-choice-card"
                    key={option.label}
                  >
                    <div className="contact-choice-icon">
                      {option.icon}
                    </div>

                    <span>{option.label}</span>

                    <h2>{option.title}</h2>

                    <p>{option.text}</p>

                    <strong>
                      {option.action}
                      <i>→</i>
                    </strong>
                  </a>
                ) : (
                  <Link
                    href={option.href}
                    className="contact-choice-card contact-choice-card-primary"
                    key={option.label}
                  >
                    <div className="contact-choice-icon">
                      {option.icon}
                    </div>

                    <span>{option.label}</span>

                    <h2>{option.title}</h2>

                    <p>{option.text}</p>

                    <strong>
                      {option.action}
                      <i>→</i>
                    </strong>
                  </Link>
                )
              )}
            </div>
          </div>
        </section>

        <section className="contact-page-main">
          <div className="premium-shell contact-page-layout">
            <div className="contact-form-shell">
              <div className="contact-direct-v1">
                <span className="premium-eyebrow">
                  EN VÄG VIDARE
                </span>

                <h2>
                  Allt samlat i ett formulär.
                </h2>

                <p>
                  I formuläret väljer du vem supporten gäller,
                  vad du behöver hjälp med och hur du vill få
                  hjälp. Därefter kan du välja en ledig tid
                  eller skicka din förfrågan utan bokning.
                </p>

                <Link
                  href="/support?intent=booking#support-form"
                  className="premium-button primary"
                >
                  Boka support / Kontakta oss
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <aside className="contact-sidebar">
              <div className="contact-sidebar-card">
                <p className="premium-eyebrow">
                  SÅ FUNGERAR DET
                </p>

                <h2>
                  Enkelt från början.
                </h2>

                <div className="contact-sidebar-list">
                  <div>
                    <span>01</span>

                    <p>
                      <strong>
                        Öppna formuläret
                      </strong>

                      <small>
                        Du kommer direkt till samma formulär
                        för support, kontakt och bokning.
                      </small>
                    </p>
                  </div>

                  <div>
                    <span>02</span>

                    <p>
                      <strong>
                        Beskriv ditt behov
                      </strong>

                      <small>
                        Välj några enkla alternativ och
                        beskriv problemet med egna ord.
                      </small>
                    </p>
                  </div>

                  <div>
                    <span>03</span>

                    <p>
                      <strong>
                        Boka eller skicka
                      </strong>

                      <small>
                        Välj en ledig tid eller skicka
                        förfrågan utan att boka.
                      </small>
                    </p>
                  </div>
                </div>
              </div>

              <div className="contact-sidebar-help">
                <span>
                  BEHÖVER DU HJÄLP DIREKT?
                </span>

                <strong>
                  Ring oss.
                </strong>

                <p>
                  Om datorn eller nätverket stoppar arbetet
                  är telefon ofta snabbaste vägen.
                </p>

                <a href="tel:+46840011726">
                  08-400 117 26 →
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
