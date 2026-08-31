import Image from "next/image";
import Link from "next/link";
import RecoTimeline from "./RecoTimeline";

const values = [
  {
    number: "01",
    title: "Personlig kontakt",
    text:
      "Du får kontakt med en riktig tekniker som lyssnar, förklarar och följer upp.",
  },
  {
    number: "02",
    title: "Tydliga besked",
    text:
      "Vi förklarar vad som behöver göras och hur nästa steg ser ut innan vi börjar.",
  },
  {
    number: "03",
    title: "Praktiska lösningar",
    text:
      "Vi fokuserar på teknik som fungerar stabilt i vardagen – hemma eller på jobbet.",
  },
  {
    number: "04",
    title: "Flexibel support",
    text:
      "Hjälp på plats, på kontoret eller via säker fjärrsupport beroende på behov.",
  },
];

export default function AboutSection() {
  return (
    <section
      className="about-section premium-section"
      id="om-oss"
    >
      <div className="premium-shell">

        <div className="about-grid about-grid-v8">

          <div className="about-visual-v8">

            <div className="about-team-frame-v8">
              <Image
                src="/images/team-macsupport.jpg"
                alt="Teamet bakom Macsupport Stockholm"
                width={1500}
                height={631}
                className="about-team-image-v8"
                sizes="(max-width: 1180px) 100vw, 54vw"
              />

              <div
                className="about-team-soft-glow-v8"
                aria-hidden="true"
              />
            </div>

          </div>


          <div className="about-copy about-copy-v8">

            <p className="premium-eyebrow">
              OM OSS
            </p>

            <h2>
              Teknik är personlig när den påverkar vardagen.
            </h2>

            <p className="about-lead">
              Därför bygger vi vår IT-support runt människan,
              inte runt tekniska termer.
            </p>

            <p className="about-description">
              Vi hjälper privatpersoner, seniorer och företag
              i Stockholm med Mac, datorer, nätverk,
              Microsoft 365, säkerhet och annan teknik som
              behöver fungera varje dag.
            </p>


            <div className="about-values">

              {values.map((value) => (
                <article
                  className="about-value"
                  key={value.number}
                >
                  <span>
                    {value.number}
                  </span>

                  <div>
                    <strong>
                      {value.title}
                    </strong>

                    <p>
                      {value.text}
                    </p>
                  </div>
                </article>
              ))}

            </div>


            <div className="about-actions">

              <Link
                href="/#booking"
                className="premium-button primary"
              >
                Boka support
                <span aria-hidden="true">
                  →
                </span>
              </Link>

              <Link
                href="/om-oss"
                className="premium-button secondary"
              >
                Lär känna oss
                <span aria-hidden="true">
                  →
                </span>
              </Link>

            </div>

          </div>

        </div>


        <div className="about-reco-timeline about-reco-timeline-v8">
          <RecoTimeline />
        </div>

      </div>
    </section>
  );
}
