import Link from "next/link";

const plans = [
  {
    id: "it-technician",
    eyebrow: "IT-TEKNIKER",
    title: "IT-tekniker",
    price: "799 kr",
    suffix: "/ tim",
    note: "Privatpris inkl. moms efter godkänt RUT-avdrag",
    featured: true,
    features: [
      "Besök: Företag 1 280 kr/tim exkl. moms",
      "Besök: Privat 799 kr/tim inkl. moms efter RUT",
      "Besök: Pensionär 65+ 599 kr/tim inkl. moms efter RUT – avtal krävs",
      "Resekostnad: företag från 400 kr, privat och pensionär från 500 kr",
      "Minimidebitering vid besök: 2 timmar",
      "Telefonsupport per 30 min: företag 640 kr exkl. moms, privat 799 kr inkl. moms, pensionär 599 kr inkl. moms",
      "Telefonsupport: minst 30 minuter. RUT gäller inte. Avtal krävs för pensionärspris.",
    ],
  },
  {
    id: "network-technician",
    eyebrow: "NÄTVERKSTEKNIKER",
    title: "Nätverkstekniker",
    price: "799 kr",
    suffix: "/ tim",
    note: "Privatpris inkl. moms efter godkänt RUT-avdrag",
    featured: false,
    features: [
      "Besök: Företag 1 280 kr/tim exkl. moms",
      "Besök: Privat 799 kr/tim inkl. moms efter RUT",
      "Besök: Pensionär 65+ 599 kr/tim inkl. moms efter RUT – avtal krävs",
      "Resekostnad: företag från 600 kr, privat och pensionär från 750 kr",
      "Telefonsupport per 30 min: företag 640 kr exkl. moms, privat 799 kr inkl. moms, pensionär 599 kr inkl. moms",
      "Telefonsupport: RUT gäller inte. Avtal krävs för pensionärspris.",
    ],
  },
  {
    id: "network-installer",
    eyebrow: "NÄTVERKSMONTÖR",
    title: "Nätverksmontör",
    price: "575 kr",
    suffix: "/ tim",
    note: "Privatpris inkl. moms efter godkänt RUT-avdrag",
    featured: false,
    features: [
      "Besök: Företag 920 kr/tim exkl. moms",
      "Besök: Privat 575 kr/tim inkl. moms efter RUT",
      "Besök: Pensionär 65+ 575 kr/tim inkl. moms efter RUT",
      "Resekostnad: företag från 600 kr, privat och pensionär från 750 kr",
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
                href="/support?intent=booking#support-form"
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
                IT-tekniker: minst 2 timmar vid besök på plats.
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
                Resekostnad tillkommer enligt prislistan och uppdragets omfattning.
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
            href="/kontakt"
            className="premium-button secondary"
          >
            Kontakta oss →
          </Link>

        </div>

      </div>
    </section>
  );
}
