import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SupportPrincipleVisual from "../../components/SupportPrincipleVisual";
import AboutAudienceVisual from "../../components/AboutAudienceVisual";

export const metadata: Metadata = {
  title: "Om oss",
  description:
    "Lär känna Macsupport Stockholm och hur vi arbetar med personlig IT-support för privatpersoner, seniorer och företag.",
};

const principles = [
  {
    number: "01",
    visual: "listen" as const,
    title: "Vi lyssnar först",
    text: "Bra support börjar med att förstå vad kunden faktiskt behöver, inte med att prata teknik.",
  },
  {
    number: "02",
    visual: "explain" as const,
    title: "Vi förklarar tydligt",
    text: "Du ska förstå vad vi gör, varför vi gör det och vad nästa steg blir.",
  },
  {
    number: "03",
    visual: "everyday" as const,
    title: "Vi bygger för vardagen",
    text: "Lösningen ska vara stabil och enkel att använda även efter att supporten är avslutad.",
  },
  {
    number: "04",
    visual: "followup" as const,
    title: "Vi följer upp",
    text: "När det behövs ser vi till att kunden vet vad som är gjort och hur tekniken ska användas framåt.",
  },
];

const audiences = [
  {
    title: "Privatpersoner",
    visual: "private" as const,
    text: "Personlig hjälp hemma med Mac, PC, WiFi, e-post, säkerhet och vardagsteknik.",
    href: "/privat",
  },
  {
    title: "Seniorer",
    visual: "senior" as const,
    text: "Lugn och tydlig teknikhjälp där frågor får ta tid och förklaringar är en självklar del av servicen.",
    href: "/seniorer",
  },
  {
    title: "Företag",
    visual: "business" as const,
    text: "Strukturerad support för datorer, Microsoft 365, nätverk, säkerhet och digital arbetsmiljö.",
    href: "/foretag",
  },
];

export default function OmOssPage() {
  return (
    <>
      <Header />

      <main className="about-page">

        <section className="about-page-hero">
          <div className="about-page-glow about-page-glow-one" />
          <div className="about-page-glow about-page-glow-two" />

          <div className="premium-shell about-page-hero-grid">

            <div className="about-page-hero-copy">
              <p className="premium-eyebrow">
                OM MACSUPPORT STOCKHOLM
              </p>

              <h1>
                Teknik med
                <br />
                människan först.
              </h1>

              <p>
                Vi hjälper människor och företag att få teknik
                som känns enklare, tryggare och mer stabil i vardagen.
              </p>

              <div className="about-page-actions">
                <Link
                  href="/support?intent=booking#support-form"
                  className="premium-button primary"
                >
                  Boka support
                </Link>

                <Link
                  href="/kontakt"
                  className="premium-button secondary"
                >
                  Kontakta oss
                </Link>
              </div>
            </div>

            <div className="about-page-hero-visual">
              <Image
                src="/images/about-team.jpg"
                alt="Macsupport Stockholm"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
              />

              <div className="about-page-image-overlay" />

              <div className="about-page-visual-card">
                <span>VÅR FILOSOFI</span>
                <strong>
                  Teknik ska lösa problem,
                  inte skapa nya.
                </strong>
              </div>
            </div>

          </div>
        </section>


        <section className="about-page-intro premium-section">

          <div className="premium-shell about-page-intro-grid">

            <div>
              <p className="premium-eyebrow">
                HUR VI TÄNKER
              </p>

              <h2>
                Bra support är mer
                än att fixa ett fel.
              </h2>
            </div>

            <div className="about-page-intro-copy">
              <p>
                En teknisk lösning kan vara korrekt men ändå kännas
                komplicerad för kunden. Därför fokuserar vi både på
                tekniken och på själva upplevelsen.
              </p>

              <p>
                Målet är att kunden ska känna sig trygg före,
                under och efter supporten.
              </p>

              <div className="about-page-quote">
                <span>“</span>
                <strong>
                  Vi vill att kunden ska förstå lösningen,
                  inte bara se att problemet försvann.
                </strong>
              </div>
            </div>

          </div>

        </section>


        <section className="about-principles-section">

          <div className="premium-shell">

            <div className="about-principles-heading">
              <p className="premium-eyebrow">
                SÅ ARBETAR VI
              </p>

              <h2>
                Fyra principer som styr supporten.
              </h2>
            </div>

            <div className="about-principles-grid">

              {principles.map((principle) => (
                <article
                  className="about-principle-card about-principle-card-v2"
                  key={principle.number}
                >
                  <div className="about-principle-card-top">
                    <span>{principle.number}</span>

                    <i aria-hidden="true" />
                  </div>

                  <SupportPrincipleVisual
                    type={principle.visual}
                  />

                  <div className="about-principle-card-copy">
                    <h3>{principle.title}</h3>

                    <p>{principle.text}</p>
                  </div>
                </article>
              ))}

            </div>

          </div>

        </section>


        <section className="about-human-section">

          <div className="premium-shell about-human-card">

            <div className="about-human-image">
              <Image
                src="/images/business-support.jpg"
                alt="Personlig IT-support i Stockholm"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />

              <div className="about-human-image-overlay" />
            </div>

            <div className="about-human-copy">

              <p className="premium-eyebrow">
                PERSONLIG SERVICE
              </p>

              <h2>
                Samma teknik.
                <br />
                Olika människor.
              </h2>

              <p>
                En privatkund, en senior och ett företag har inte
                samma behov. Därför ska supporten inte heller se
                likadan ut för alla.
              </p>

              <p>
                Vi anpassar kommunikation, arbetssätt och supportform
                efter situationen.
              </p>

              <Link
                href="/tjanster"
                className="premium-button secondary"
              >
                Utforska våra tjänster
              </Link>

            </div>

          </div>

        </section>


        <section className="about-audience-section">

          <div className="premium-shell">

            <div className="about-audience-heading">

              <p className="premium-eyebrow">
                VEM VI HJÄLPER
              </p>

              <h2>
                Rätt support för
                olika behov.
              </h2>

            </div>

            <div className="about-audience-grid">

              {audiences.map((audience) => (
                <Link
                  href={audience.href}
                  className="about-audience-card about-audience-card-v2"
                  key={audience.title}
                >
                  <div className="about-audience-card-top">
                    <span>
                      {audience.title}
                    </span>

                    <i aria-hidden="true" />
                  </div>

                  <AboutAudienceVisual
                    type={audience.visual}
                  />

                  <div className="about-audience-card-copy">
                    <p>
                      {audience.text}
                    </p>

                    <strong>
                      Läs mer
                      <i>→</i>
                    </strong>
                  </div>
                </Link>
              ))}

            </div>

          </div>

        </section>


                  <section className="about-final-section">

            <div className="premium-shell">

              <div className="about-final-card about-final-card-v2">

                <div className="about-final-copy">

                  <div className="about-final-status">
                    <span aria-hidden="true" />
                    <strong>Personlig hjälp i Stockholm</strong>
                  </div>

                  <p className="premium-eyebrow">
                    NÄSTA STEG
                  </p>

                  <h2>
                    Behöver du hjälp
                    <br />
                    med tekniken?
                  </h2>

                  <p className="about-final-lead">
                    Börja med att beskriva vad som krånglar.
                    Du behöver inte veta vilken tjänst du ska välja –
                    vi hjälper dig att hitta rätt väg.
                  </p>

                  <div className="about-final-points">

                    <span>
                      <i aria-hidden="true">✓</i>
                      Personlig kontakt
                    </span>

                    <span>
                      <i aria-hidden="true">✓</i>
                      Tydliga besked
                    </span>

                    <span>
                      <i aria-hidden="true">✓</i>
                      Hjälp på plats eller distans
                    </span>

                  </div>

                </div>

                <div className="about-final-action-panel">

                  <span className="about-final-panel-label">
                    REDO ATT FÅ HJÄLP?
                  </span>

                  <strong>
                    Vi hjälper dig vidare.
                  </strong>

                  <p>
                    Boka support direkt eller kontakta oss om du är
                    osäker på vilken hjälp som passar bäst.
                  </p>

                  <div className="about-final-actions">

                    <Link
                      href="/support?intent=booking#support-form"
                      className="premium-button primary"
                    >
                      Boka support
                      <span aria-hidden="true">→</span>
                    </Link>

                    <Link
                      href="/kontakt"
                      className="premium-button secondary"
                    >
                      Kontakta oss
                      <span aria-hidden="true">→</span>
                    </Link>

                  </div>

                </div>

              </div>

            </div>

          </section>

      </main>

      <Footer />
    </>
  );
}
