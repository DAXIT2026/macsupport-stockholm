import Image from "next/image";
import Link from "next/link";
import type { AudiencePage } from "../lib/audiences";

type Props = {
  audience: AudiencePage;
};

const businessServiceImages = [
  "/images/foretag/microsoft-365.png",
  "/images/foretag/network.png",
  "/images/foretag/security.png",
  "/images/foretag/lopande-support.png",
];

const privateServiceImages = [
  "/images/privat/dator-mac.png",
  "/images/privat/wifi-hemma.png",
  "/images/privat/epost-konton.png",
  "/images/privat/sakerhet.png",
];

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
                href="/boka"
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

            {audience.services.map((service, index) => {
              const imageSrc =
                audience.slug === "foretag"
                  ? businessServiceImages[index]
                  : audience.slug === "privat"
                    ? privateServiceImages[index]
                    : null;

              return (
                <article
                  key={service.title}
                  className={
                    imageSrc
                      ? "audience-service-card business-service-card"
                      : "audience-service-card"
                  }
                >

                  <span className="audience-service-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {imageSrc && (
                    <div
                      className="business-service-media"
                      aria-hidden="true"
                    >
                      <Image
                        src={imageSrc}
                        alt=""
                        fill
                        sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw"
                        className="business-service-image"
                      />

                      <span className="business-service-media-aura" />
                    </div>
                  )}

                  <div className="business-service-copy">
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </div>

                </article>
              );
            })}

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
              href="/boka"
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
