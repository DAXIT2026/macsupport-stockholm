type AboutAudienceVisualProps = {
  type:
    | "private"
    | "senior"
    | "business";
};

export default function AboutAudienceVisual({
  type,
}: AboutAudienceVisualProps) {
  if (type === "private") {
    return (
      <div
        className="about-audience-visual about-audience-private"
        aria-hidden="true"
      >
        <span className="about-audience-visual-glow" />

        <div className="private-home">
          <span className="private-home-roof" />
          <span className="private-home-body" />
        </div>

        <span className="private-connection">
          <i className="private-connection-dot dot-one" />
          <i className="private-connection-dot dot-two" />
        </span>

        <div className="private-device">
          <span className="private-device-screen" />
          <span className="private-device-base" />
        </div>

        <span className="private-help-check">
          ✓
        </span>

        <span className="about-audience-visual-status">
          <i />
          Hjälp hemma
        </span>
      </div>
    );
  }

  if (type === "senior") {
    return (
      <div
        className="about-audience-visual about-audience-senior"
        aria-hidden="true"
      >
        <span className="about-audience-visual-glow" />

        <span className="senior-ring senior-ring-one" />
        <span className="senior-ring senior-ring-two" />

        <div className="senior-person">
          <span className="senior-person-head" />
          <span className="senior-person-body" />
        </div>

        <div className="senior-guide-card">
          <span className="senior-guide-line line-one" />
          <span className="senior-guide-line line-two" />
          <span className="senior-guide-line line-three" />
        </div>

        <span className="senior-guide-check">
          ✓
        </span>

        <span className="about-audience-visual-status">
          <i />
          Lugn och tydlig hjälp
        </span>
      </div>
    );
  }

  return (
    <div
      className="about-audience-visual about-audience-business"
      aria-hidden="true"
    >
      <span className="about-audience-visual-glow" />

      <div className="business-node business-node-one">
        <span />
      </div>

      <div className="business-node business-node-two">
        <span />
      </div>

      <div className="business-node business-node-three">
        <span />
      </div>

      <span className="business-line business-line-one" />
      <span className="business-line business-line-two" />
      <span className="business-line business-line-three" />

      <div className="business-center">
        <span className="business-center-screen" />
        <span className="business-center-base" />
      </div>

      <span className="business-status">
        Stabil
      </span>

      <span className="about-audience-visual-status">
        <i />
        Support för verksamheten
      </span>
    </div>
  );
}
