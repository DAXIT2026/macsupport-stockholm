import Image from "next/image";
import Link from "next/link";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { services } from "../../lib/services";

const categories = [
  {
    title: "Dator & Mac",
    description:
      "Personlig hjälp med datorer, Mac, program, konton och vardagsteknik.",
    slugs: ["mac-support", "fjarrsupport"],
  },
  {
    title: "Nätverk & WiFi",
    description:
      "Stabil uppkoppling hemma och på kontoret, från router till professionellt nätverk.",
    slugs: ["wifi-natverk"],
  },
  {
    title: "Säkerhet",
    description:
      "Skydda datorer, filer, konton och verksamhet med smartare säkerhetslösningar.",
    slugs: ["it-sakerhet", "kameraovervakning"],
  },
  {
    title: "Företag & Microsoft",
    description:
      "Microsoft 365, support, samarbete och digital arbetsmiljö för företag.",
    slugs: ["microsoft-365"],
  },
];

export default function TjansterPage() {
  return (
    <>
      <Header />

      <main className="services-overview-page">

        <section className="services-overview-hero">

          <div className="services-overview-glow services-overview-glow-one" />
          <div className="services-overview-glow services-overview-glow-two" />

          <div className="premium-shell services-overview-hero-grid">

            <div className="services-overview-copy">

              <p className="premium-eyebrow">
                ALLA TJÄNSTER
              </p>

              <h1>
                IT-support för
                <br />
                hela din digitala vardag.
              </h1>

              <p>
                Oavsett om det gäller Mac, WiFi, säkerhet,
                Microsoft 365 eller något annat hjälper vi dig
                hitta rätt lösning.
              </p>

              <div className="services-overview-actions">

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

            <div className="services-overview-feature">

              <div className="services-overview-feature-image">
                <Image
                  src="/images/tech-accent.jpg"
                  alt="IT-support och digital teknik"
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 50vw"
                />

                <div className="services-overview-feature-overlay" />
              </div>

              <div className="services-overview-feature-copy">

                <span>
                  PERSONLIG IT-SUPPORT
                </span>

                <strong>
                  En kontakt för teknik som bara ska fungera.
                </strong>

              </div>

            </div>

          </div>

        </section>


        <section className="services-overview-categories">

          <div className="premium-shell">

            <div className="services-overview-heading">

              <p className="premium-eyebrow">
                HITTA RÄTT HJÄLP
              </p>

              <h2>
                Välj det område
                <br />
                som passar bäst.
              </h2>

              <p>
                Du behöver inte veta exakt vad felet heter.
                Börja med det område som ligger närmast problemet.
              </p>

            </div>

            <div className="service-category-list">

              {categories.map((category, categoryIndex) => {

                const categoryServices = services.filter(
                  (service) =>
                    category.slugs.includes(service.slug)
                );

                return (
                  <section
                    className="service-category-block"
                    key={category.title}
                  >

                    <div className="service-category-header">

                      <span className="service-category-index">
                        {String(categoryIndex + 1).padStart(2, "0")}
                      </span>

                      <div>
                        <h3>{category.title}</h3>
                        <p>{category.description}</p>
                      </div>

                    </div>

                    <div className="service-category-grid">

                      {categoryServices.map((service) => (

                        <Link
                          href={`/tjanster/${service.slug}`}
                          className="service-overview-card"
                          key={service.slug}
                        >

                          <div className="service-overview-card-image">

                            <Image
                              src={service.image}
                              alt={service.shortTitle}
                              fill
                              sizes="(max-width: 700px) 100vw, 40vw"
                            />

                            <div className="service-overview-card-overlay" />

                            <span className="service-overview-card-arrow">
                              ↗
                            </span>

                          </div>

                          <div className="service-overview-card-content">

                            <span>
                              {service.eyebrow}
                            </span>

                            <h4>
                              {service.shortTitle}
                            </h4>

                            <p>
                              {service.intro}
                            </p>

                            <strong>
                              Läs mer →
                            </strong>

                          </div>

                        </Link>

                      ))}

                    </div>

                  </section>
                );
              })}

            </div>

          </div>

        </section>


        <section className="services-guide-section">

          <div className="premium-shell services-guide-card">

            <div className="services-guide-copy">

              <p className="premium-eyebrow">
                OSÄKER PÅ VAD DU BEHÖVER?
              </p>

              <h2>
                Du behöver inte
                felsöka själv.
              </h2>

              <p>
                Beskriv bara vad som händer. Vi hjälper dig att
                avgöra vilken typ av support som passar bäst.
              </p>

              <div className="services-guide-actions">

                <Link
                  href="/support?intent=booking#support-form"
                  className="premium-button primary"
                >
                  Beskriv problemet
                </Link>

                <a
                  href="tel:+46840011726"
                  className="premium-button secondary"
                >
                  Ring oss
                </a>

              </div>

            </div>

            <div className="services-guide-steps">

              <div>
                <span>01</span>
                <strong>Berätta vad som krånglar</strong>
              </div>

              <div>
                <span>02</span>
                <strong>Vi rekommenderar rätt hjälp</strong>
              </div>

              <div>
                <span>03</span>
                <strong>Välj tid och supportform</strong>
              </div>

            </div>

          </div>

        </section>


        <section className="services-network-feature">

          <div className="premium-shell services-network-card">

            <div className="services-network-image">

              <Image
                src="/images/fiber-network-premium.webp"
                alt="Fiber och nätverksinstallation"
                fill
                sizes="(max-width: 900px) 100vw, 55vw"
              />

              <div className="services-network-overlay" />

            </div>

            <div className="services-network-copy">

              <p className="premium-eyebrow">
                NÄTVERK & INFRASTRUKTUR
              </p>

              <h2>
                Snabbt nätverk.
                <br />
                Stabil grund.
              </h2>

              <p>
                Professionell installation av nätverk,
                kabel och digital infrastruktur för företag,
                fastigheter och verksamheter.
              </p>

              <Link
                href="/tjanster/wifi-natverk"
                className="premium-button primary"
              >
                Utforska nätverk
              </Link>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}
