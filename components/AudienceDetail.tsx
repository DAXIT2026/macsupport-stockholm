import Image from "next/image";
import Link from "next/link";
import type { AudiencePage } from "../lib/audiences";

type Props = {
  audience: AudiencePage;
};

export default function AudienceDetail({ audience }: Props) {
  return (
    <main className="audience-detail">

      <section className="audience-detail-hero">
        <div className="premium-shell audience-detail-grid">

          <div className="audience-detail-copy">

            <Link href="/#privat" className="service-back-link">
              ← Till startsidan
            </Link>

            <p className="premium-eyebrow">
              {audience.eyebrow}
            </p>

            <h1>{audience.title}</h1>

            <p className="audience-detail-lead">
              {audience.intro}
            </p>

            <div className="audience-detail-highlights">
              {audience.highlights.map((item) => (
                <span key={item}>
                  ✓ {item}
                </span>
              ))}
            </div>

            <div className="audience-detail-actions">
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

          <div className="audience-detail-image">
            <Image
              src={audience.image}
              alt={audience.title}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />

            <div className="audience-detail-image-overlay" />

            <div className="audience-image-card">
              <span>PERSONLIG SUPPORT</span>
              <strong>
                Hjälp anpassad efter dig.
              </strong>
            </div>
          </div>

        </div>
      </section>


      <section className="audience-intro premium-section">
        <div className="premium-shell audience-intro-grid">

          <div>
            <p className="premium-eyebrow">
              SÅ HJÄLPER VI
            </p>

            <h2>
              Teknik ska göra vardagen enklare.
            </h2>
          </div>

          <div className="audience-long-copy">
            <p>{audience.description}</p>

            <div className="audience-reassurance">
              <span>✓</span>
              <p>{audience.reassurance}</p>
            </div>
          </div>

        </div>
      </section>


      <section className="audience-services-section">

        <div className="premium-shell">

          <div className="audience-services-heading">
            <p className="premium-eyebrow">
              VANLIGA BEHOV
            </p>

            <h2>
              Det här hjälper vi ofta till med.
            </h2>
          </div>

          <div className="audience-service-grid">

            {audience.services.map((service, index) => (
              <article key={service.title}>

                <span className="audience-service-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{service.title}</h3>
                <p>{service.text}</p>

              </article>
            ))}

          </div>

        </div>
      </section>


      <section className="audience-final-section">

        <div className="premium-shell audience-final-card">

          <div>
            <p className="premium-eyebrow">
              NÄSTA STEG
            </p>

            <h2>
              {audience.ctaTitle}
            </h2>

            <p>
              Välj en tid som passar eller ring oss så hjälper vi dig vidare.
            </p>
          </div>

          <div className="audience-final-actions">

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
              08-400 117 26
            </a>

          </div>

        </div>
      </section>

    </main>
  );
}
