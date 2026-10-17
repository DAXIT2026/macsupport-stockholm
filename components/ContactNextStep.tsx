import Link from "next/link";

export default function ContactNextStep() {
  return (
    <section className="contact-next-v1">
      <div className="contact-next-v1-inner">

        <div className="contact-next-v1-copy">
          <span className="premium-eyebrow">
            PERSONLIG IT-SUPPORT
          </span>

          <h2>
            Du behöver inte veta vad felet heter.
          </h2>

          <p>
            Berätta vad som inte fungerar, så hjälper vi dig
            att hitta rätt nästa steg. Du kan boka en tid,
            skicka en förfrågan eller ringa oss direkt.
          </p>
        </div>

        <div className="contact-next-v1-grid">

          <div className="contact-next-v1-card">


            <strong>
              Beskriv vad du behöver hjälp med
            </strong>

            <p>
              Några meningar räcker. Vi hjälper dig att
              bedöma vad som passar bäst.
            </p>
          </div>

          <div className="contact-next-v1-card">


            <strong>
              Välj hur du vill få hjälp
            </strong>

            <p>
              Välj mellan besök och hjälp på distans.
              Vi hjälper både privatpersoner och företag.
            </p>
          </div>

          <div className="contact-next-v1-card">


            <strong>
              Få en tydlig bekräftelse
            </strong>

            <p>
              Dina val följer med genom hela flödet.
              När din bokning är genomförd får du en bekräftelse via e-post.
            </p>
          </div>

        </div>

        <div className="contact-next-v1-actions">
          <Link
            href="/support?intent=message#support-form"
            className="premium-button primary"
          >
            Skicka en förfrågan
            <span aria-hidden="true">→</span>
          </Link>

          <Link
            href="/support?intent=booking#support-form"
            className="premium-button secondary"
          >
            Boka support
          </Link>
        </div>

        <div className="contact-next-v1-trust">
          <span>✓ Personlig hjälp</span>
          <span>✓ Tydliga nästa steg</span>
          <span>✓ Säker hantering</span>
        </div>

      </div>
    </section>
  );
}
