type SupportVisualProps = {
  type:
    | "personal"
    | "response"
    | "pricing"
    | "flexible"
    | "experience"
    | "secure";
};

export default function SupportVisual({
  type,
}: SupportVisualProps) {
  return (
    <div
      className={`benefit-visual benefit-visual-${type}`}
      aria-hidden="true"
    >
      <div className="benefit-visual-glow" />

      {type === "personal" && (
        <div className="benefit-personal">
          <span className="benefit-personal-ring ring-a" />
          <span className="benefit-personal-ring ring-b" />

          <div className="benefit-person">
            <span className="benefit-person-head" />
            <span className="benefit-person-body" />
          </div>

          <span className="benefit-person-signal signal-one" />
          <span className="benefit-person-signal signal-two" />
        </div>
      )}

      {type === "response" && (
        <div className="benefit-response">
          <span className="benefit-response-line line-one" />
          <span className="benefit-response-line line-two" />
          <span className="benefit-response-line line-three" />

          <div className="benefit-response-core">
            <span>→</span>
          </div>

          <span className="benefit-response-dot dot-a" />
          <span className="benefit-response-dot dot-b" />
        </div>
      )}

      {type === "pricing" && (
        <div className="benefit-pricing">
          <div className="benefit-price-sheet">
            <span className="benefit-price-top" />

            <strong>kr</strong>

            <span className="benefit-price-row row-one" />
            <span className="benefit-price-row row-two" />
          </div>

          <div className="benefit-price-check">
            ✓
          </div>
        </div>
      )}

      {type === "flexible" && (
        <div className="benefit-flexible">
          <div className="benefit-home">
            <span className="benefit-home-roof" />
            <span className="benefit-home-box" />
          </div>

          <span className="benefit-route">
            <i />
          </span>

          <div className="benefit-screen">
            <span className="benefit-screen-box" />
            <span className="benefit-screen-base" />
          </div>
        </div>
      )}

      {type === "experience" && (
        <div className="benefit-experience">
          <span className="benefit-experience-ring ring-one" />
          <span className="benefit-experience-ring ring-two" />

          <div className="benefit-experience-core">
            <strong>10+</strong>
            <small>år</small>
          </div>

          <span className="benefit-experience-marker marker-a" />
          <span className="benefit-experience-marker marker-b" />
        </div>
      )}

      {type === "secure" && (
        <div className="benefit-secure">
          <span className="benefit-secure-wave wave-one" />
          <span className="benefit-secure-wave wave-two" />

          <div className="benefit-shield">
            <span>✓</span>
          </div>

          <span className="benefit-secure-dot dot-one" />
          <span className="benefit-secure-dot dot-two" />
        </div>
      )}
    </div>
  );
}
