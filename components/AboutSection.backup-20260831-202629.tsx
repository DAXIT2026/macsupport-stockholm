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
    <section className="about-section about-v11" id="om-oss">
      <div className="premium-shell">
        <div className="about-v11-wrap">
          <div className="about-v11-photo-block">
            <div className="about-v11-photo-frame">
              <Image
                src="/images/team-macsupport.jpg"
                alt="Teamet bakom Macsupport Stockholm"
                width={1500}
                height={631}
                className="about-v11-team-image"
                sizes="(max-width: 700px) 100vw, (max-width: 1180px) 100vw, 1100px"
                priority
              />
            </div>

            <div className="about-v11-photo-note">
              <span className="about-v11-photo-note-label">
                REKOMMENDERAT ÅR EFTER ÅR
              </span>
              <strong>2015–2026</strong>
              <p>
                Ett långsiktigt förtroende byggt på personlig service och tydlig support.
              </p>
            </div>
          </div>

          <div className="about-v11-content">
            <p className="premium-eyebrow">OM OSS</p>

            <h2>Teknik är personlig när den påverkar vardagen.</h2>

            <p className="about-v11-lead">
              Därför bygger vi vår IT-support runt människan, inte runt tekniska termer.
            </p>

            <p className="about-v11-description">
              Vi hjälper privatpersoner, seniorer och företag i Stockholm med Mac,
              datorer, nätverk, Microsoft 365, säkerhet och annan teknik som behöver
              fungera varje dag.
            </p>

            <div className="about-v11-values">
              {values.map((value) => (
                <article className="about-v11-value" key={value.number}>
                  <span className="about-v11-value-number">{value.number}</span>

                  <div className="about-v11-value-content">
                    <strong>{value.title}</strong>
                    <p>{value.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="about-v11-actions">
              <Link href="/#booking" className="premium-button primary">
                Boka support
                <span aria-hidden="true">→</span>
              </Link>

              <Link href="/om-oss" className="premium-button secondary">
                Lär känna oss
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="about-v11-reco">
            <RecoTimeline />
          </div>
        </div>
      </div>
    </section>
  );
}
