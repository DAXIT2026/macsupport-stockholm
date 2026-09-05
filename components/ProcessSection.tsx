import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Berätta vad du behöver hjälp med",
    text: "Välj exempelvis Mac, WiFi, säkerhet, Microsoft 365 eller ett annat problem.",
    icon: "⌘",
  },
  {
    number: "02",
    title: "Välj hur du vill få hjälp",
    text: "Hembesök, företagssupport eller säker hjälp på distans.",
    icon: "↗",
  },
  {
    number: "03",
    title: "Välj en tid som passar",
    text: "Se tillgängliga tider och välj den som fungerar bäst för dig.",
    icon: "◷",
  },
  {
    number: "04",
    title: "Vi bekräftar allt",
    text: "Du får en tydlig bekräftelse med tid, kontaktuppgifter och nästa steg.",
    icon: "✓",
  },
];

export default function ProcessSection() {
  return (
    <section className="process-section premium-section" id="process">
      <div className="premium-shell">

        <div className="process-top">
          <div className="premium-heading">
            <p className="premium-eyebrow">
              SÅ FUNGERAR DET
            </p>

            <h2>
              Från problem
              <br />
              till lösning.
            </h2>

            <p>
              Vi har gjort vägen till support så enkel som möjligt.
              Du ska alltid veta vad nästa steg är.
            </p>
          </div>

          <div className="process-assurance">
            <span className="process-assurance-icon">✓</span>
            <div>
              <strong>Enkelt från början</strong>
              <span>Inga krångliga formulär eller tekniska ord.</span>
            </div>
          </div>
        </div>

        <div className="process-grid">
          {steps.map((step, index) => (
            <article className="process-card" key={step.number}>
              <div className="process-card-top">
                <span className="process-number">
                  {step.number}
                </span>

                <span className="process-icon">
                  {step.icon}
                </span>
              </div>

              <h3>{step.title}</h3>
              <p>{step.text}</p>

              {index < steps.length - 1 && (
                <span className="process-arrow" aria-hidden="true">
                  →
                </span>
              )}
            </article>
          ))}
        </div>

        <div className="process-cta">
          <div>
            <span className="process-cta-label">
              REDO ATT FÅ HJÄLP?
            </span>

            <strong>
              Boka support på några minuter.
            </strong>
          </div>

          <Link href="/boka" className="premium-button primary">
            Boka support
          </Link>
        </div>

      </div>
    </section>
  );
}
