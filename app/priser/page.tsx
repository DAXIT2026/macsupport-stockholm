import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";


import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Priser | Macsupport Stockholm",
  description:
    "Tydliga priser för personlig IT-support i Stockholm. Se våra priser för support hemma, personlig teknikhjälp och företagssupport.",
};

const customerGroups = [
  {
    id: "privat", title: "Privat", image: "/icons/booking/privat-1.png", intro: "Tydliga priser för dig som privatperson.",
    services: [
      { title: "Datorer och program", image: "/images/process/support-losning.png", price: "799 kr/tim", terms: "Inkl. moms efter RUT vid godkänt arbete i hemmet", travel: "Från 500 kr", phone: "799 kr/30 min inkl. moms", minimum: "Minst 2 timmar vid besök; minst 30 minuter per telefonsamtal" },
      { title: "Internet och Wi-Fi", image: "/images/wifi-network.jpg", price: "799 kr/tim", terms: "Inkl. moms efter RUT vid godkänt arbete i hemmet", travel: "Från 750 kr", phone: "799 kr/30 min inkl. moms", minimum: "Minst 30 minuter per telefonsamtal" },
      { title: "Nätverkskablage", image: "/images/natverksmontor-unifi.png", price: "575 kr/tim", terms: "Inkl. moms efter RUT vid godkänt arbete i hemmet", travel: "Från 750 kr", phone: null, minimum: null },
    ],
  },
  {
    id: "senior", title: "Senior 65+", image: "/icons/booking/senior-1.png", intro: "Personlig hjälp med tydliga villkor.",
    services: [
      { title: "Datorer och program", image: "/images/process/support-losning.png", price: "599 kr/tim", terms: "Inkl. moms efter RUT vid godkänt arbete i hemmet. Avtal krävs.", travel: "Från 500 kr", phone: "599 kr/30 min inkl. moms. Avtal krävs.", minimum: "Minst 2 timmar vid besök; minst 30 minuter per telefonsamtal" },
      { title: "Internet och Wi-Fi", image: "/images/wifi-network.jpg", price: "599 kr/tim", terms: "Inkl. moms efter RUT vid godkänt arbete i hemmet. Avtal krävs.", travel: "Från 750 kr", phone: "599 kr/30 min inkl. moms. Avtal krävs.", minimum: "Minst 30 minuter per telefonsamtal" },
      { title: "Nätverkskablage", image: "/images/natverksmontor-unifi.png", price: "575 kr/tim", terms: "Inkl. moms efter RUT vid godkänt arbete i hemmet", travel: "Från 750 kr", phone: null, minimum: null },
    ],
  },
  {
    id: "foretag", title: "Företag", image: "/icons/booking/foretag-1.png", intro: "Professionell IT-hjälp för verksamheten.",
    services: [
      { title: "Datorer och program", image: "/images/process/support-losning.png", price: "1 280 kr/tim", terms: "Exkl. moms", travel: "Från 400 kr", phone: "640 kr/30 min exkl. moms", minimum: "Minst 2 timmar vid besök; minst 30 minuter per telefonsamtal" },
      { title: "Internet och Wi-Fi", image: "/images/wifi-network.jpg", price: "1 280 kr/tim", terms: "Exkl. moms", travel: "Från 600 kr", phone: "640 kr/30 min exkl. moms", minimum: "Minst 30 minuter per telefonsamtal" },
      { title: "Nätverkskablage", image: "/images/natverksmontor-unifi.png", price: "920 kr/tim", terms: "Exkl. moms", travel: "Från 600 kr", phone: null, minimum: null },
    ],
  },
] as const;
const included = [
  {
    title: "Tydlig felsökning",
    text:
      "Vi börjar med att förstå problemet innan vi gör förändringar. Du får en tydlig bild av vad som behöver göras och varför.",
    type: "search",
  },
  {
    title: "Personlig support",
    text:
      "Du får hjälp av en tekniker som lyssnar och förklarar. Lösningen anpassas efter dig, din teknik och din situation.",
    type: "person",
  },
  {
    title: "Förklaring efteråt",
    text:
      "När arbetet är klart går vi igenom vad som har gjorts och vad som är bra att känna till framöver.",
    type: "document",
  },
  {
    title: "Rätt supportform",
    text:
      "Hemma, på distans eller för företaget – vi väljer den supportform som passar situationen bäst.",
    type: "support",
  },
];

const faqs = [
  {
    q: "Finns det några extra kostnader?",
    a: "Du får tydlig information om upplägg och pris innan arbetet börjar. Om förutsättningarna förändras berättar vi det innan vi går vidare.",
  },
  {
    q: "Tillkommer rese- eller startkostnad?",
    a: "Det beror på vilken supportform och vilket uppdrag det gäller. Vi går igenom kostnaden med dig innan bokningen bekräftas.",
  },
  {
    q: "Kan jag använda RUT-avdrag?",
    a: "För vissa IT-tjänster som utförs i hemmet kan RUT-avdrag vara möjligt. Vi hjälper dig att förstå vad som kan omfattas.",
  },
  {
    q: "Kan företag boka support?",
    a: "Ja. Vi hjälper företag med bland annat datorer, Microsoft 365, nätverk, säkerhet och löpande IT-support.",
  },
];

function TrustIcon({ type }: { type: string }) {
  return (
    <div className={`${styles.trustVisual} ${styles[type]}`} aria-hidden="true">
      <span className={styles.trustOrbit} />

      {type === "search" && (
        <span className={styles.searchSymbol}>
          <i />
        </span>
      )}

      {type === "person" && (
        <>
          <span className={styles.personHead} />
          <span className={styles.personBody} />
          <span className={styles.personBubble}>•••</span>
        </>
      )}

      {type === "document" && (
        <>
          <span className={styles.documentSymbol}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.documentCheck}>✓</span>
        </>
      )}

      {type === "support" && (
        <>
          <span className={styles.supportHome}>⌂</span>
          <span className={styles.supportLine} />
          <span className={styles.supportScreen}>▭</span>
        </>
      )}
    </div>
  );
}

export default function PriserPage() {
  return (
    <>

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="premium-shell">
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className="premium-eyebrow">PRISER</p>

                <h1>
                  Tydliga priser.
                  <br />
                  Inga onödiga överraskningar.
                </h1>

                <p className={styles.heroLead}>
                  Välj den supportform som passar dig. Du får tydliga
                  besked om upplägg och kostnad innan arbetet börjar.
                </p>

                <div className={styles.heroActions}>
                  <Link href="/support?intent=booking#support-form" className="premium-button primary">
                    Boka support
                    <span aria-hidden="true">→</span>
                  </Link>

                  <Link href="/kontakt" className="premium-button secondary">
                    Fråga om pris
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              <div
                className={styles.pricePromise}
                aria-label="Tydliga priser och trygg IT-support"
              >
                <div className={styles.pricingPhoto}>
                  <Image
                    src="/images/pricing-screen.jpg"
                    alt="Arbetsplats med dator för Macsupport Stockholm"
                    fill
                    priority
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 52vw, 48vw"
                    className={styles.pricingPhotoImage}
                  />

                  <div className={styles.monitorScreen}>
                    <div className={styles.monitorContent}>
                      <div className={styles.monitorBrand}>
                        <span>MACSUPPORT</span>
                        <strong>STOCKHOLM</strong>
                      </div>

                      <div className={styles.monitorTyping}>
                        <p className={styles.typeLineOne}>
                          Personlig IT-support i Stockholm.
                        </p>

                        <p className={styles.typeLineTwo}>
                          Du får pris och upplägg innan vi börjar.
                        </p>

                        <p className={styles.typeLineThree}>
                          Inga dolda avgifter. Inga överraskningar.
                        </p>

                        <p className={styles.typeLineFour}>
                          Hemma, på distans eller för företag.
                        </p>

                        <p className={styles.typeLineFive}>
                          12 år i rad på Reco · 2015–2026.
                        </p>
                      </div>

                      <div className={styles.monitorResult}>
                        <span aria-hidden="true">✓</span>

                        <strong>
                          Tydligt från början.
                        </strong>

                        <i aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.customerPricingGrid}>
              {customerGroups.map((group) => (
                <article className={styles.customerCard} key={group.id}>
                  <div className={styles.customerHeader}>
                    <Image src={group.image} alt="" width={112} height={112} className={styles.customerIcon} />
                    <h2>{group.title}</h2>
                    <p>{group.intro}</p>
                  </div>
                  <p className={styles.customerClickHint}><span className={styles.pricingAccessibilityV4} aria-hidden="true">↓</span> Tryck eller klicka på den gröna knappen nedan för att se alla priser och villkor.</p>
                  <details className={styles.customerDetails}>
                    <summary className={styles.customerToggle}>Tryck eller klicka här – visa alla priser <span aria-hidden="true">⌄</span></summary>
                    <div className={styles.customerServices}>
                      {group.services.map((service) => (
                        <section className={styles.customerService} key={service.title} aria-label={service.title}>
                          <div className={styles.customerServiceHeader}>
                            <Image src={service.image} alt="" width={112} height={84} className={styles.customerServiceImage} />
                            <h3>{service.title}</h3>
                          </div>
                          <div className={styles.customerServiceBody}>
                            <span className={styles.customerPriceLabel}>Besök på plats</span>
                            <strong className={styles.customerPrice}>{service.price}</strong>
                            <p className={styles.customerTerms}>{service.terms}</p>
                            <dl className={styles.customerFacts}>
                              <div><dt>Resekostnad</dt><dd>{service.travel}</dd></div>
                              {service.phone && <div><dt>Telefonsupport</dt><dd>{service.phone}</dd></div>}
                              {service.minimum && <div><dt>Minimidebitering</dt><dd>{service.minimum}</dd></div>}
                            </dl>
                            {service.phone && <p className={styles.customerFinePrint}>RUT-avdrag gäller inte för telefonsupport.</p>}
                            {!service.phone && <p className={styles.customerFinePrint}>Telefonsupport erbjuds inte för nätverksmontör.</p>}
                          </div>
                        </section>
                      ))}
                      <Link href="/support?intent=booking#support-form" className={styles.customerBook}>Boka support <span aria-hidden="true">→</span></Link>
                    </div>
                  </details>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.recoSection}>
          <div className="premium-shell">
            <div className={styles.recoBand}>
              <div className={styles.recoBadgeWrap}>
                <Image
                  src="/badges/reco-2015-2026.png"
                  alt="Reco 2015–2026"
                  width={430}
                  height={150}
                  className={styles.recoBadge}
                />
              </div>

              <div className={styles.recoCopy}>
                <p className="premium-eyebrow">
                  FÖRTROENDE SOM BYGGTS ÖVER TID
                </p>

                <h2>
                  Rekommenderad år efter år.
                </h2>

                <p>
                  Bra support handlar om mer än teknik. För oss handlar
                  det om personlig kontakt, tydliga besked och lösningar
                  som fungerar i vardagen.
                </p>
              </div>

              <div className={styles.recoFact}>
                <span>2015</span>
                <i>→</i>
                <strong>2026</strong>
                <small>förtroende över tid</small>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.includedSection}>
          <div className="premium-shell">
            <div className={styles.sectionHeading}>
              <div>
                <p className="premium-eyebrow">DET HÄR INGÅR</p>

                <h2>
                  Du betalar inte bara
                  <br />
                  för teknisk tid.
                </h2>
              </div>

              <div className={styles.headingNote}>
                <span>ENKELT OCH TYDLIGT</span>

                <p>
                  Vi kombinerar teknisk kompetens med personlig service
                  så att du förstår både lösningen och nästa steg.
                </p>
              </div>
            </div>

            <div className={styles.includedGrid}>
              {included.map((item) => (
                <article className={styles.includedCard} key={item.title}>
                  <div className={styles.cardTop}>
                    <i aria-hidden="true" />
                  </div>

                  <div className={styles.cardVisual}>
                    <TrustIcon type={item.type} />
                  </div>

                  <div className={styles.cardCopy}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.rutSection}>
          <div className="premium-shell">
            <div className={styles.rutCard}>
              <div>
                <p className="premium-eyebrow">RUT-AVDRAG</p>

                <h2>
                  Lägre arbetskostnad
                  <br />
                  för godkänd hjälp hemma.
                </h2>

                <p>
                  Vissa IT-tjänster som utförs i hemmet kan omfattas
                  av RUT-avdrag. Vi hjälper dig att förstå vad som gäller
                  för just ditt uppdrag.
                </p>
              </div>

              <div className={styles.rutValue}>
                <span>UPP TILL</span>
                <strong>50%</strong>
                <small>på arbetskostnaden</small>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className="premium-shell">
            <div className={styles.faqGrid}>
              <div className={styles.faqIntro}>
                <p className="premium-eyebrow">VANLIGA FRÅGOR</p>

                <h2>
                  Bra att veta
                  <br />
                  innan du bokar.
                </h2>

                <p>
                  Här hittar du svar på några av de vanligaste frågorna
                  om priser och support.
                </p>

                <Link href="/kontakt" className="premium-button secondary">
                  Kontakta oss
                </Link>
              </div>

              <div className={styles.faqList}>
                {faqs.map((faq) => (
                  <details key={faq.q} className={styles.faqItem}>
                    <summary>
                      <span>{faq.q}</span>
                      <i aria-hidden="true">+</i>
                    </summary>

                    <p>{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.finalSection}>
          <div className="premium-shell">
            <div className={styles.finalCard}>
              <div>
                <p className="premium-eyebrow">REDO ATT BÖRJA?</p>

                <h2>
                  Börja med att berätta
                  <br />
                  vad som krånglar.
                </h2>

                <p>
                  Vi hjälper dig att välja rätt supportform och berättar
                  hur nästa steg ser ut.
                </p>
              </div>

              <div className={styles.finalActions}>
                <Link href="/support?intent=booking#support-form" className="premium-button primary">
                  Boka support
                  <span aria-hidden="true">→</span>
                </Link>

                <Link href="/kontakt" className="premium-button secondary">
                  Kontakta oss
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

    </>
  );
}