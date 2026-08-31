import type { Metadata } from "next";
import Link from "next/link";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontakta Macsupport Stockholm för personlig IT-support, hembesök, företagssupport och säker fjärrhjälp.",
};

const contactOptions = [
  {
    label: "RING OSS",
    title: "08-400 117 26",
    text: "Bra när du vill prata direkt med oss.",
    href: "tel:+46840011726",
    action: "Ring nu",
    icon: "☎",
  },
  {
    label: "BOKA ONLINE",
    title: "Välj en tid",
    text: "Passar när du redan vet att du behöver hjälp.",
    href: "/#booking",
    action: "Boka support",
    icon: "◷",
  },
  {
    label: "E-POST",
    title: "Skicka ett meddelande",
    text: "Bra för frågor som inte är akuta.",
    href: "mailto:kontakt@mindatorsupport.se",
    action: "Skriv e-post",
    icon: "✉",
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
                Vi hjälper dig
                <br />
                vidare.
              </h1>

              <p>
                Du behöver inte veta exakt vad problemet
                heter. Berätta vad som krånglar så hjälper
                vi dig hitta rätt nästa steg.
              </p>

            </div>


            <div className="contact-choice-grid">

              {contactOptions.map((option) => (
                <Link
                  href={option.href}
                  className="contact-choice-card"
                  key={option.label}
                >
                  <div className="contact-choice-icon">
                    {option.icon}
                  </div>

                  <span>
                    {option.label}
                  </span>

                  <h2>
                    {option.title}
                  </h2>

                  <p>
                    {option.text}
                  </p>

                  <strong>
                    {option.action}
                    <i>→</i>
                  </strong>
                </Link>
              ))}

            </div>

          </div>

        </section>


        <section className="contact-page-main">

          <div className="premium-shell contact-page-layout">

            <div className="contact-form-shell">
              <ContactForm />
            </div>


            <aside className="contact-sidebar">

              <div className="contact-sidebar-card">

                <p className="premium-eyebrow">
                  SNABB INFORMATION
                </p>

                <h2>
                  Innan du kontaktar oss.
                </h2>

                <div className="contact-sidebar-list">

                  <div>
                    <span>01</span>

                    <p>
                      <strong>
                        Beskriv problemet
                      </strong>

                      <small>
                        Berätta vad som händer och vilken
                        enhet det gäller.
                      </small>
                    </p>
                  </div>


                  <div>
                    <span>02</span>

                    <p>
                      <strong>
                        Vi väljer rätt supportform
                      </strong>

                      <small>
                        På plats, företag eller säker
                        fjärrsupport.
                      </small>
                    </p>
                  </div>


                  <div>
                    <span>03</span>

                    <p>
                      <strong>
                        Du får ett tydligt nästa steg
                      </strong>

                      <small>
                        Vi gör processen så enkel som möjligt.
                      </small>
                    </p>
                  </div>

                </div>

              </div>


              <div className="contact-sidebar-trust">

                <div>
                  <strong>
                    4,8 / 5
                  </strong>

                  <span>
                    kundomdömen
                  </span>
                </div>

                <div>
                  <strong>
                    2015–2026
                  </strong>

                  <span>
                    rekommenderat år efter år
                  </span>
                </div>

              </div>


              <div className="contact-sidebar-help">

                <span>
                  AKUT PROBLEM?
                </span>

                <strong>
                  Ring hellre direkt.
                </strong>

                <p>
                  Om datorn eller nätverket stoppar
                  arbetet är telefon ofta snabbaste vägen.
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
