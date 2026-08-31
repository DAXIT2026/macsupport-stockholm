import Link from "next/link";

const plans = [
  {
    id: "private",
    eyebrow: "PRIVATPERSON",
    title: "Personlig IT-support",
    price: "800 kr",
    suffix: "/ tim",
    note: "Efter godkänt RUT-avdrag",
    featured: true,
    features: [
      "Hembesök i Stockholmsområdet",
      "Mac, PC, WiFi och skrivare",
      "E-post, konton och program",
      "Personlig och pedagogisk hjälp",
      "50% RUT på godkänd arbetskostnad",
    ],
  },
  {
    id: "senior",
    eyebrow: "PENSIONÄR",
    title: "Trygg teknikhjälp",
    price: "498 kr",
    suffix: "/ tim",
    note: "Efter godkänt RUT-avdrag",
    featured: false,
    features: [
      "Hjälp hemma i lugn takt",
      "Dator, mobil och surfplatta",
      "BankID, e-post och internet",
      "Tydliga förklaringar",
      "Personlig support",
    ],
  },
  {
    id: "business",
    eyebrow: "FÖRETAG",
    title: "Företagssupport",
    price: "1 280 kr",
    suffix: "/ tim",
    note: "Exklusive moms",
    featured: false,
    features: [
      "Support på plats eller distans",
      "Microsoft 365",
      "Nätverk och WiFi",
      "Säkerhet och backup",
      "Löpande support och rådgivning",
    ],
  },
];

export default function PricingSection() {
  return (
    <section className="pricing-section premium-section" id="priser">
      <div className="premium-shell">

        <div className="pricing-top">

          <div className="premium-heading">
            <p className="premium-eyebrow">
              TRANSPARENTA PRISER
            </p>

            <h2>
              Tydligt från
              <br />
              början.
            </h2>

            <p>
              Du ska veta vad hjälpen kostar innan vi börjar.
              Inga dolda avgifter och tydliga villkor.
            </p>
          </div>

          <div className="pricing-rut-card">
            <div className="pricing-rut-icon">
              50%
            </div>

            <div>
              <strong>RUT-avdrag</strong>
              <span>
                För privatpersoner och pensionärer på godkänd arbetskostnad.
              </span>
            </div>
          </div>

        </div>

        <div className="pricing-grid">

          {plans.map((plan) => (
            <article
              key={plan.id}
              className={
                plan.featured
                  ? "pricing-card pricing-card-featured"
                  : "pricing-card"
              }
            >

              {plan.featured && (
                <div className="pricing-popular">
                  Mest valt
                </div>
              )}

              <div className="pricing-card-head">

                <span className="pricing-eyebrow">
                  {plan.eyebrow}
                </span>

                <h3>
                  {plan.title}
                </h3>

                <div className="pricing-price">
                  <strong>{plan.price}</strong>
                  <span>{plan.suffix}</span>
                </div>

                <p className="pricing-note">
                  {plan.note}
                </p>

              </div>

              <div className="pricing-divider" />

              <ul className="pricing-features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="#booking"
                className={
                  plan.featured
                    ? "premium-button primary pricing-button"
                    : "premium-button secondary pricing-button"
                }
              >
                Boka support
              </Link>

            </article>
          ))}

        </div>

        <div className="pricing-conditions">

          <div className="pricing-condition">
            <span className="pricing-condition-icon">
              ◷
            </span>

            <div>
              <strong>Minsta debitering</strong>
              <span>
                Minst 2 timmar vid hembesök.
              </span>
            </div>
          </div>

          <div className="pricing-condition">
            <span className="pricing-condition-icon">
              ↗
            </span>

            <div>
              <strong>Restid</strong>
              <span>
                Restidskostnad kan tillkomma beroende på område.
              </span>
            </div>
          </div>

          <div className="pricing-condition">
            <span className="pricing-condition-icon">
              ✓
            </span>

            <div>
              <strong>Ingen överraskning</strong>
              <span>
                Vi är tydliga med pris och upplägg innan arbetet börjar.
              </span>
            </div>
          </div>

        </div>

        <div className="pricing-custom">

          <div>
            <span className="pricing-custom-label">
              BEHÖVER DU NÅGOT ANNAT?
            </span>

            <strong>
              Företagsavtal, nätverksinstallation eller större projekt?
            </strong>

            <p>
              Kontakta oss så tar vi fram rätt upplägg för just ditt behov.
            </p>
          </div>

          <Link
            href="#kontakt"
            className="premium-button secondary"
          >
            Kontakta oss →
          </Link>

        </div>

      </div>
    </section>
  );
}
