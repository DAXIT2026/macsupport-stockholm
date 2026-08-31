import Image from "next/image";
import Link from "next/link";
import type { ServiceItem } from "../lib/services";

type Props = {
  service: ServiceItem;
};

export default function ServiceDetail({
  service,
}: Props) {
  return (
    <main className="service-detail">

      <section className="service-detail-hero">

        <div className="service-detail-ambient" />

        <div className="premium-shell service-detail-hero-grid">

          <div className="service-detail-copy">

            <Link
              href="/#tjanster"
              className="service-back-link"
            >
              ← Alla tjänster
            </Link>

            <p className="premium-eyebrow">
              {service.eyebrow}
            </p>

            <h1>
              {service.title}
            </h1>

            <p className="service-detail-lead">
              {service.intro}
            </p>

            <div className="service-audience">
              {service.audience.map((item) => (
                <span key={item}>
                  ✓ {item}
                </span>
              ))}
            </div>

            <div className="service-detail-actions">

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
                Ring 08-400 117 26
              </a>

            </div>

          </div>

          <div className="service-detail-visual">

            <Image
              src={service.image}
              alt={service.shortTitle}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />

            <div className="service-detail-image-overlay" />

            <div className="service-detail-floating">

              <span>
                PERSONLIG SUPPORT
              </span>

              <strong>
                På plats eller på distans.
              </strong>

            </div>

          </div>

        </div>
      </section>


      <section className="service-detail-content premium-section">

        <div className="premium-shell service-detail-layout">

          <div className="service-story">

            <p className="premium-eyebrow">
              SÅ HJÄLPER VI DIG
            </p>

            <h2>
              Teknik ska kännas
              <br />
              enkel att använda.
            </h2>

            <p>
              {service.description}
            </p>

            <p>
              {service.result}
            </p>

          </div>


          <div className="service-benefits-panel">

            <span className="service-panel-label">
              DET HÄR FÅR DU
            </span>

            {service.benefits.map((benefit) => (
              <div
                className="service-benefit-row"
                key={benefit}
              >
                <span>✓</span>
                <strong>{benefit}</strong>
              </div>
            ))}

          </div>

        </div>
      </section>


      <section className="service-problems">

        <div className="premium-shell">

          <div className="service-problems-heading">
            <p className="premium-eyebrow">
              VANLIGA PROBLEM
            </p>

            <h2>
              Känner du igen något
              av det här?
            </h2>
          </div>

          <div className="service-problems-grid">

            {service.problems.map(
              (problem, index) => (
                <article key={problem}>

                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <strong>
                    {problem}
                  </strong>

                </article>
              )
            )}

          </div>

        </div>
      </section>


      <section className="service-final-cta">

        <div className="premium-shell service-final-cta-inner">

          <div>
            <p className="premium-eyebrow">
              REDO ATT FÅ HJÄLP?
            </p>

            <h2>
              Vi hjälper dig vidare.
            </h2>

            <p>
              Beskriv vad som krånglar så hittar vi
              den enklaste vägen till en lösning.
            </p>
          </div>

          <div className="service-final-buttons">

            <Link
              href="/#booking"
              className="premium-button primary"
            >
              Boka support
            </Link>

            <Link
              href="/#kontakt"
              className="premium-button secondary"
            >
              Kontakta oss
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}
