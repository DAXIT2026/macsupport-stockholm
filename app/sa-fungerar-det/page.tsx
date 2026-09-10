import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Så fungerar det | Macsupport Stockholm",
  description:
    "Så går personlig IT-support till hos Macsupport Stockholm – från första kontakt till tydlig lösning och uppföljning.",
};

const steps = [
  {
    number: "01",
    title: "Berätta vad du behöver hjälp med",
    text:
      "Berätta kort vad du behöver hjälp med. Du behöver inte känna till de tekniska detaljerna. Vi lyssnar, ställer rätt frågor och hjälper dig vidare.",
    label: "Första kontakt",
  },
  {
    number: "02",
    title: "Vi rekommenderar rätt hjälp",
    text:
      "Vi går igenom situationen och bedömer vilken hjälp som passar bäst. Innan arbetet börjar får du tydliga besked om lösningen och nästa steg.",
    label: "Bedömning",
  },
  {
    number: "03",
    title: "Vi löser problemet",
    text:
      "Vi hjälper dig på plats eller på distans och arbetar för en stabil och långsiktig lösning. Under tiden förklarar vi tydligt vad vi gör och varför.",
    label: "Support",
  },
  {
    number: "04",
    title: "Du vet vad som har gjorts",
    text:
      "När allt är klart går vi igenom vad som har gjorts. Du får en tydlig sammanfattning och vet vad som är bra att tänka på framöver.",
    label: "Klart",
  },
];

const benefits = [
  "Personlig kontakt",
  "Tydliga besked",
  "Rätt supportform",
  "Ingen onödig teknikjargong",
];


const processStepImages = [
  "/images/process/forsta-kontakt.png",
  "/images/process/bedomning.png",
  "/images/process/support-losning.png",
  "/images/process/klart-dokumenterat.png",
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
                    href="/support?intent=booking#support-form"
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
                className={styles.journeyVisual}
                aria-label="Supportprocess: Kontakt, bedömning, support och klart"
              >
                <div
                  className={styles.journeyAmbient}
                  aria-hidden="true"
                />

                <div
                  className={styles.journeyGrid}
                  aria-hidden="true"
                />

                <div
                  className={styles.journeyOrbit}
                  aria-hidden="true"
                >
                  <span className={styles.journeyOrbitOne} />
                  <span className={styles.journeyOrbitTwo} />
                  <span className={styles.journeyOrbitThree} />
                  <i className={styles.journeyParticleOne} />
                  <i className={styles.journeyParticleTwo} />
                  <i className={styles.journeyParticleThree} />
                </div>

                <div
                  className={styles.journeyBeam}
                  aria-hidden="true"
                >
                  <span className={styles.journeyBeamGlow} />
                  <span className={styles.journeySignal} />
                </div>

                <div className={styles.journeySteps}>

                  <article
                    className={`${styles.journeyCard} ${styles.journeyContact}`}
                  >
                    <span className={styles.journeyNumber}>
                      01
                    </span>

                    <span
                      className={styles.journeyIcon}
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      >
                        <circle cx="12" cy="8" r="3.2" />
                        <path d="M5.8 19c.5-3.6 2.6-5.4 6.2-5.4s5.7 1.8 6.2 5.4" />
                      </svg>
                    </span>

                    <div className={styles.journeyCopy}>
                      <strong>Kontakt</strong>
                      <small>
                        Berätta vad du behöver hjälp med
                      </small>
                    </div>

                    <span className={styles.journeyStatus}>
                      <i aria-hidden="true" />
                      Redo att hjälpa
                    </span>
                  </article>


                  <article
                    className={`${styles.journeyCard} ${styles.journeyAssessment}`}
                  >
                    <span className={styles.journeyNumber}>
                      02
                    </span>

                    <span
                      className={styles.journeyIcon}
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      >
                        <rect x="6" y="5" width="12" height="15" rx="2" />
                        <path d="M9 5.2V3.8h6v1.4" />
                        <path d="m9.2 12 1.7 1.7 3.8-4" />
                        <path d="M9 17h6" />
                      </svg>
                    </span>

                    <div className={styles.journeyCopy}>
                      <strong>Bedömning</strong>
                      <small>
                        Vi rekommenderar rätt hjälp
                      </small>
                    </div>
                  </article>


                  <article
                    className={`${styles.journeyCard} ${styles.journeySupport}`}
                  >
                    <span className={styles.journeyNumber}>
                      03
                    </span>

                    <span
                      className={styles.journeyIcon}
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      >
                        <path d="M5 13v-2a7 7 0 0 1 14 0v2" />
                        <path d="M5 12H3.8A1.8 1.8 0 0 0 2 13.8v2.4A1.8 1.8 0 0 0 3.8 18H5z" />
                        <path d="M19 12h1.2a1.8 1.8 0 0 1 1.8 1.8v2.4a1.8 1.8 0 0 1-1.8 1.8H19z" />
                        <path d="M19 18c-.8 2-2.6 3-5.3 3" />
                      </svg>
                    </span>

                    <div className={styles.journeyCopy}>
                      <strong>Support</strong>
                      <small>
                        Vi löser problemet
                      </small>
                    </div>
                  </article>


                  <article
                    className={`${styles.journeyCard} ${styles.journeyComplete}`}
                  >
                    <span className={styles.journeyNumber}>
                      04
                    </span>

                    <span
                      className={styles.journeyIcon}
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      >
                        <circle cx="12" cy="12" r="8" />
                        <path d="m8.5 12.2 2.2 2.2 4.9-5" />
                      </svg>
                    </span>

                    <div className={styles.journeyCopy}>
                      <strong>Klart</strong>
                      <small>
                        Du vet vad som har gjorts
                      </small>
                    </div>
                  </article>

                </div>

                <div
                  className={styles.journeyEnd}
                  aria-hidden="true"
                >
                  <span />
                </div>
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
                  En tydlig väg till rätt hjälp.
                </h2>
              </div>

              <div className={styles.processIntroCard}>
                <span className={styles.processIntroLabel}>
                  ENKELT FRÅN BÖRJAN
                </span>

                <p>
                  Du behöver inte veta vad problemet beror på.
                  Vi hjälper dig att förstå behovet, välja rätt
                  support och komma vidare.
                </p>
              </div>
            </div>

            <div className={styles.stepsGrid}>
              {steps.map((step, index) => (
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

                  <div className={styles.stepMedia}>
                    <div className={styles.stepMediaGlow} aria-hidden="true" />

                    <Image
                      src={processStepImages[index]}
                      alt=""
                      fill
                      sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1100px) 45vw, 25vw"
                      className={styles.stepImage}
                    />
                  </div>

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
                href="/support?intent=booking#support-form"
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
