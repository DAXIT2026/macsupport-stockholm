import Link from "next/link";
import SupportVisual from "./SupportVisual";

const reasons = [
  {
    number: "01",
    visual: "personal" as const,
    title: "Personlig hjälp",
    text:
      "Du får kontakt med en riktig tekniker som lyssnar, förklarar och hjälper dig vidare.",
  },
  {
    number: "02",
    visual: "response" as const,
    title: "Snabb återkoppling",
    text:
      "Vi hjälper dig hitta rätt väg redan från första kontakten.",
  },
  {
    number: "03",
    visual: "pricing" as const,
    title: "Tydliga priser",
    text:
      "Du får veta upplägg och kostnad innan arbetet börjar.",
  },
  {
    number: "04",
    visual: "flexible" as const,
    title: "Flexibel support",
    text:
      "Hjälp hemma, på arbetsplatsen eller på distans – beroende på vad som passar bäst.",
  },
  {
    number: "05",
    visual: "experience" as const,
    title: "Lång erfarenhet",
    text:
      "Många års erfarenhet av personlig IT-support för olika behov.",
  },
  {
    number: "06",
    visual: "secure" as const,
    title: "Trygga lösningar",
    text:
      "Vi fokuserar på stabil teknik som fortsätter fungera även efter supportbesöket.",
  },
];

export default function WhyUsSection() {
  return (
    <section
      className="why-us-premium-v5"
      id="varfor-oss"
    >
      <div className="premium-shell">

        <div className="why-us-premium-heading">

          <div className="why-us-premium-heading-copy">
            <p className="premium-eyebrow">
              VARFÖR VÄLJA OSS
            </p>

            <h2>
              Support som känns
              <br />
              enkel och trygg.
            </h2>

            <p>
              Bra IT-support handlar lika mycket om
              upplevelsen som om tekniken.
            </p>
          </div>


          <aside className="why-us-premium-note">

            <div
              className="why-us-premium-note-icon"
              aria-hidden="true"
            >
              ✓
            </div>

            <div>
              <strong>
                Teknik ska inte skapa mer stress.
              </strong>

              <p>
                Därför bygger vi kundresan runt tydlighet,
                personlig kontakt och praktiska lösningar.
              </p>
            </div>

          </aside>

        </div>


        <div className="why-us-premium-grid">

          {reasons.map((reason) => (
            <article
              className="why-us-premium-card"
              key={reason.number}
            >

              <div className="why-us-premium-card-top">
                <span>
                  {reason.number}
                </span>

                <i aria-hidden="true" />
              </div>


              <SupportVisual
                type={reason.visual}
              />


              <div className="why-us-premium-card-copy">
                <h3>
                  {reason.title}
                </h3>

                <p>
                  {reason.text}
                </p>
              </div>

            </article>
          ))}

        </div>


        <div className="why-us-premium-cta">

          <div>
            <p className="premium-eyebrow">
              REDO ATT FÅ HJÄLP?
            </p>

            <h3>
              Börja med att berätta vad som krånglar.
            </h3>
          </div>

          <Link
            href="/support?intent=booking#support-form"
            className="premium-button primary"
          >
            Boka support
            <span aria-hidden="true">
              →
            </span>
          </Link>

        </div>

      </div>
    </section>
  );
}
