type PricingBenefitVisualProps = {
  type:
    | "diagnostic"
    | "personal"
    | "explanation"
    | "flexible";
};

export default function PricingBenefitVisual({
  type,
}: PricingBenefitVisualProps) {
  if (type === "diagnostic") {
    return (
      <div
        className="pricing-benefit-visual pricing-benefit-diagnostic"
        aria-hidden="true"
      >
        <span className="pricing-benefit-glow" />

        <span className="diagnostic-ring diagnostic-ring-one" />
        <span className="diagnostic-ring diagnostic-ring-two" />

        <div className="diagnostic-screen">
          <span className="diagnostic-screen-line line-one" />
          <span className="diagnostic-screen-line line-two" />
          <span className="diagnostic-screen-line line-three" />

          <span className="diagnostic-target">
            <i />
          </span>
        </div>

        <span className="diagnostic-scan-line" />

        <span className="pricing-benefit-status">
          <i />
          Felsökning
        </span>
      </div>
    );
  }

  if (type === "personal") {
    return (
      <div
        className="pricing-benefit-visual pricing-benefit-personal"
        aria-hidden="true"
      >
        <span className="pricing-benefit-glow" />

        <span className="personal-support-ring personal-support-ring-one" />
        <span className="personal-support-ring personal-support-ring-two" />

        <div className="personal-support-person">
          <span className="personal-support-head" />
          <span className="personal-support-body" />
        </div>

        <span className="personal-support-signal signal-one" />
        <span className="personal-support-signal signal-two" />
        <span className="personal-support-signal signal-three" />

        <span className="pricing-benefit-status">
          <i />
          Personlig kontakt
        </span>
      </div>
    );
  }

  if (type === "explanation") {
    return (
      <div
        className="pricing-benefit-visual pricing-benefit-explanation"
        aria-hidden="true"
      >
        <span className="pricing-benefit-glow" />

        <div className="explanation-sheet">
          <span className="explanation-sheet-line line-one" />
          <span className="explanation-sheet-line line-two" />
          <span className="explanation-sheet-line line-three" />
        </div>

        <span className="explanation-check">
          ✓
        </span>

        <span className="explanation-ring explanation-ring-one" />
        <span className="explanation-ring explanation-ring-two" />

        <span className="pricing-benefit-status">
          <i />
          Tydlig förklaring
        </span>
      </div>
    );
  }

  return (
    <div
      className="pricing-benefit-visual pricing-benefit-flexible"
      aria-hidden="true"
    >
      <span className="pricing-benefit-glow" />

      <div className="flexible-home">
        <span className="flexible-home-roof" />
        <span className="flexible-home-body" />
      </div>

      <span className="flexible-route">
        <i className="flexible-route-dot dot-one" />
        <i className="flexible-route-dot dot-two" />
      </span>

      <div className="flexible-screen">
        <span className="flexible-screen-display" />
        <span className="flexible-screen-base" />
      </div>

      <span className="flexible-switch">
        ↔
      </span>

      <span className="pricing-benefit-status">
        <i />
        På plats eller distans
      </span>
    </div>
  );
}
