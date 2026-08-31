import type { Metadata } from "next";
import Link from "next/link";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Priser",
  description:
    "Se priser för personlig IT-support i Stockholm för privatpersoner, seniorer och företag.",
};

const plans = [
  {
    label: "PRIVAT",
    title: "IT-support hemma",
    price: "800 kr",
    unit: "/ timme",
    note: "Efter godkänt RUT-avdrag",
    featured: true,
    badge: "MEST VALT",
    features: [
      "Hembesök i Stockholmsområdet",
      "Mac, PC, WiFi och skrivare",
      "E-post, konton och installation",
      "Personlig hjälp på plats",
      "Tydlig genomgång efter supporten",
    ],
    href: "/privat",
  },
  {
    label: "SENIOR",
    title: "Personlig teknikhjälp",
    price: "498 kr",
    unit: "/ timme",
    note: "Efter godkänt RUT-avdrag",
    featured: false,
    features: [
      "Hjälp i lugn takt",
      "Dator, mobil och surfplatta",
      "WiFi, e-post och internet",
      "Digital trygghet",
      "Hembesök och personlig genomgång",
    ],
    href: "/seniorer",
  },
  {
    label: "FÖRETAG",
    title: "Företagssupport",
    price: "1 280 kr",
    unit: "/ timme",
    note: "Exklusive moms",
    featured: false,
    features: [
      "Support på plats eller distans",
      "Microsoft 365",
      "Datorer och användarkonton",
      "Nätverk och WiFi",
      "Säkerhet och backup",
    ],
    href: "/foretag",
  },
];

const included = [
  {
    title: "Tydlig felsökning",
    text: "Vi börjar med att förstå problemet innan vi gör förändringar.",
  },
  {
    title: "Personlig support",
    text: "Du får hjälp av en tekniker, inte bara en generell instruktion.",
  },
  {
    title: "Förklaring efteråt",
    text: "Vi berättar vad som gjordes och vad du behöver känna till framåt.",
  },
  {
    title: "Rätt supportform",
    text: "På plats eller på distans beroende på vad som är mest effektivt.",
  },
];

const faq = [
  {
    question: "Finns det någon minsta debitering?",
    answer:
      "Vid hembesök kan minsta debitering gälla. Du får tydlig information om upplägget innan besöket bokas.",
  },
  {
    question: "Tillkommer resekostnad?",
    answer:
      "Resekostnad kan förekomma beroende på adress och uppdrag. Vi informerar om detta innan bokningen bekräftas.",
  },
  {
    question: "Hur fungerar RUT-avdraget?",
    answer:
      "För godkända tjänster kan privatpersoner få RUT-avdrag på arbetskostnaden. Avdraget hanteras enligt gällande regler.",
  },
  {
    question: "Kan jag få ett fast pris?",
    answer:
      "För tydligt avgränsade uppdrag kan vi ge en offert eller kostnadsbedömning innan arbetet startar.",
  },
  {
    question: "Hur betalar jag?",
    answer:
      "Betalningsinformation lämnas i samband med bokning eller efter genomfört arbete beroende på uppdrag.",
  },
];

export default function PriserPage() {
  return (
    <>
      <Header />

      <main className="pricing-page">

        <section className="pricing-page-hero">

          <div className="pricing-page-glow pricing-page-glow-one" />
          <div className="pricing-page-glow pricing-page-glow-two" />

          <div className="premium-shell pricing-page-hero-inner">

            <p className="premium-eyebrow">
              PRISER
            </p>

            <h1>
              Tydliga priser.
              <br />
              Inga onödiga överraskningar.
            </h1>

            <p>
              Välj den typ av support som passar dig.
              Om uppdraget kräver något annat går vi igenom
              kostnaden innan arbetet börjar.
            </p>

            <div className="pricing-page-hero-actions">
              <Link
                href="/#booking"
                className="premium-button primary"
              >
                Boka support
              </Link>

              <Link
                href="/kontakt"
                className="premium-button secondary"
              >
                Fråga om pris
              </Link>
            </div>

          </div>

        </section>


        <section className="pricing-page-plans">

          <div className="premium-shell">

            <div className="pricing-page-grid">

              {plans.map((plan) => (
                <article
                  className={
                    plan.featured
                      ? "pricing-page-card featured"
                      : "pricing-page-card"
                  }
                  key={plan.label}
                >

                  {plan.badge && (
                    <span className="pricing-page-badge">
                      {plan.badge}
                    </span>
                  )}

                  <div className="pricing-page-card-top">
                    <span>{plan.label}</span>
                    <h2>{plan.title}</h2>
                  </div>

                  <div className="pricing-page-price">
                    <strong>{plan.price}</strong>
                    <span>{plan.unit}</span>
                  </div>

                  <p className="pricing-page-note">
                    {plan.note}
                  </p>

                  <div className="pricing-page-features">

                    {plan.features.map((feature) => (
                      <div key={feature}>
                        <span>✓</span>
                        <p>{feature}</p>
                      </div>
                    ))}

                  </div>

                  <Link
                    href={plan.href}
                    className={
                      plan.featured
                        ? "premium-button primary"
                        : "premium-button secondary"
                    }
                  >
                    Läs mer
                  </Link>

                </article>
              ))}

            </div>

          </div>

        </section>


        <section className="pricing-included-section">

          <div className="premium-shell">

            <div className="pricing-included-heading">

              <p className="premium-eyebrow">
                DET HÄR INGÅR
              </p>

              <h2>
                Du betalar inte bara
                för teknisk tid.
              </h2>

              <p>
                Bra support handlar också om att förstå problemet,
                välja rätt lösning och göra den begriplig för kunden.
              </p>

            </div>

            <div className="pricing-included-grid">

              {included.map((item, index) => (
                <article key={item.title}>

                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{item.title}</h3>

                  <p>{item.text}</p>

                </article>
              ))}

            </div>

          </div>

        </section>


        <section className="pricing-rut-section">

          <div className="premium-shell pricing-rut-card">

            <div className="pricing-rut-copy">

              <p className="premium-eyebrow">
                RUT-AVDRAG
              </p>

              <h2>
                Lägre arbetskostnad
                för godkänd hjälp hemma.
              </h2>

              <p>
                För tjänster som omfattas av RUT kan privatpersoner
                få avdrag på arbetskostnaden enligt gällande regler.
              </p>

              <p>
                Vi hjälper dig förstå hur priset påverkas innan
                arbetet börjar.
              </p>

            </div>

            <div className="pricing-rut-stat">

              <span>
                UPP TILL
              </span>

              <strong>
                50%
              </strong>

              <p>
                på godkänd arbetskostnad
              </p>

            </div>

          </div>

        </section>


        <section className="pricing-faq-section">

          <div className="premium-shell pricing-faq-layout">

            <div className="pricing-faq-heading">

              <p className="premium-eyebrow">
                VANLIGA FRÅGOR
              </p>

              <h2>
                Bra att veta
                innan du bokar.
              </h2>

              <p>
                Om något fortfarande är oklart kan du alltid
                kontakta oss innan du bestämmer dig.
              </p>

              <Link
                href="/kontakt"
                className="premium-button secondary"
              >
                Kontakta oss
              </Link>

            </div>

            <div className="pricing-faq-list">

              {faq.map((item, index) => (
                <details
                  className="pricing-faq-item"
                  key={item.question}
                  open={index === 0}
                >
                  <summary>
                    <span>{item.question}</span>
                    <i>+</i>
                  </summary>

                  <div>
                    <p>{item.answer}</p>
                  </div>
                </details>
              ))}

            </div>

          </div>

        </section>


        <section className="pricing-final-section">

          <div className="premium-shell pricing-final-card">

            <div>
              <p className="premium-eyebrow">
                REDO ATT BOKA?
              </p>

              <h2>
                Börja med att beskriva
                vad som krånglar.
              </h2>

              <p>
                Vi hjälper dig välja rätt supportform och går
                igenom kostnaden innan arbetet börjar.
              </p>
            </div>

            <div className="pricing-final-actions">

              <Link
                href="/#booking"
                className="premium-button primary"
              >
                Boka support
              </Link>

              <a
                href="tel:+46840011726"
                className="premium-button secondary"
              >
                Ring oss
              </a>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}
