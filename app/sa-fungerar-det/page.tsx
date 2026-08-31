import type { Metadata } from "next";
import Link from "next/link";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProcessStepVisual from "../../components/ProcessStepVisual";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Så fungerar det | Macsupport Stockholm",
  description:
    "Så går personlig IT-support till hos Macsupport Stockholm – från första kontakt till tydlig lösning och uppföljning.",
};

const steps = [
  {
    number: "01",
    visual: "contact" as const,
    title: "Berätta vad du behöver hjälp med",
    text:
      "Kontakta oss eller boka support och beskriv kort vad som inte fungerar eller vad du vill få hjälp med.",
    label: "Första kontakt",
  },
  {
    number: "02",
    visual: "assessment" as const,
    title: "Vi rekommenderar rätt typ av hjälp",
    text:
      "Vi går igenom situationen och hjälper dig välja det mest effektiva sättet att lösa problemet.",
    label: "Bedömning",
  },
  {
    number: "03",
    visual: "support" as const,
    title: "Vi löser problemet",
    text:
      "Du får hjälp på plats eller på distans med fokus på en stabil och begriplig lösning.",
    label: "Support",
  },
  {
    number: "04",
    visual: "complete" as const,
    title: "Du vet vad som gjordes",
    text:
      "Efteråt förklarar vi lösningen och vad som är bra att känna till framåt.",
    label: "Klart",
  },
];

const benefits = [
  "Personlig kontakt",
  "Tydliga besked",
  "Rätt supportform",
  "Ingen onödig teknikjargong",
];

export default function HowItWorksPage() {
  return (
    <>
      <Header />

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="premium-shell">
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className="premium-eyebrow">
                  SÅ FUNGERAR DET
                </p>

                <h1>
                  IT-support ska kännas enkel från början.
                </h1>

                <p className={styles.heroLead}>
                  Från första kontakt till färdig lösning guidar
                  vi dig genom hela processen. Tydligt, personligt
                  och utan krångel.
                </p>

                <div className={styles.heroActions}>
                  <Link
                    href="/#booking"
                    className="premium-button primary"
                  >
                    Boka support
                    <span aria-hidden="true">→</span>
                  </Link>

                  <Link
                    href="/tjanster"
                    className="premium-button secondary"
                  >
                    Våra tjänster
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>

                <div
                  className={styles.heroBenefits}
                  aria-label="Fördelar"
                >
                  {benefits.map((benefit) => (
                    <span key={benefit}>
                      <i aria-hidden="true" />
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className={styles.processVisual}
                aria-hidden="true"
              >
                <div className={styles.visualGlow} />

                <div className={styles.orbitOuter} />
                <div className={styles.orbitMiddle} />
                <div className={styles.orbitInner} />

                <div className={styles.visualCenter}>
                  <span>01</span>
                  <strong>Kontakt</strong>
                  <small>Vi börjar med dig</small>
                </div>

                <div className={`${styles.visualNode} ${styles.nodeOne}`}>
                  <span>02</span>
                  <strong>Analys</strong>
                </div>

                <div className={`${styles.visualNode} ${styles.nodeTwo}`}>
                  <span>03</span>
                  <strong>Lösning</strong>
                </div>

                <div className={`${styles.visualNode} ${styles.nodeThree}`}>
                  <span>04</span>
                  <strong>Klart</strong>
                </div>

                <span className={`${styles.visualDot} ${styles.dotOne}`} />
                <span className={`${styles.visualDot} ${styles.dotTwo}`} />
                <span className={`${styles.visualDot} ${styles.dotThree}`} />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.stepsSection}>
          <div className="premium-shell">
            <div className={styles.sectionHeading}>
              <div>
                <p className="premium-eyebrow">
                  STEG FÖR STEG
                </p>

                <h2>
                  Du vet alltid vad som händer.
                </h2>
              </div>

              <p>
                Processen är byggd för att göra det enkelt att
                få hjälp – även om du inte vet exakt vad
                problemet beror på.
              </p>
            </div>

            <div className={styles.stepsGrid}>
              {steps.map((step) => (
                <article
                  className={styles.stepCard}
                  key={step.number}
                >
                  <div className={styles.stepTop}>
                    <span className={styles.stepNumber}>
                      {step.number}
                    </span>

                    <span className={styles.stepLabel}>
                      {step.label}
                    </span>
                  </div>

                  <ProcessStepVisual type={step.visual} />

                  <div className={styles.stepCopy}>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.cta}>
              <div>
                <p className="premium-eyebrow">
                  REDO ATT FÅ HJÄLP?
                </p>

                <h2>
                  Börja med att berätta vad som krånglar.
                </h2>

                <p>
                  Du behöver inte veta vilken tjänst du ska
                  välja. Vi hjälper dig vidare.
                </p>
              </div>

              <Link
                href="/#booking"
                className="premium-button primary"
              >
                Boka support
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
