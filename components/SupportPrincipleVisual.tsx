type SupportPrincipleVisualProps = {
  type:
    | "listen"
    | "explain"
    | "everyday"
    | "followup";
};

export default function SupportPrincipleVisual({
  type,
}: SupportPrincipleVisualProps) {
  if (type === "listen") {
    return (
      <div
        className="principle-visual principle-visual-listen"
        aria-hidden="true"
      >
        <span className="principle-glow" />

        <span className="listen-ring listen-ring-one" />
        <span className="listen-ring listen-ring-two" />

        <div className="listen-person">
          <span className="listen-head" />
          <span className="listen-body" />
        </div>

        <span className="listen-wave listen-wave-one" />
        <span className="listen-wave listen-wave-two" />
        <span className="listen-wave listen-wave-three" />

        <span className="principle-visual-status">
          <i />
          Vi lyssnar
        </span>
      </div>
    );
  }

  if (type === "explain") {
    return (
      <div
        className="principle-visual principle-visual-explain"
        aria-hidden="true"
      >
        <span className="principle-glow" />

        <div className="explain-card">
          <span className="explain-line line-one" />
          <span className="explain-line line-two" />
          <span className="explain-line line-three" />
        </div>

        <span className="explain-highlight" />

        <span className="explain-check">
          ✓
        </span>

        <span className="principle-visual-status">
          <i />
          Tydligt förklarat
        </span>
      </div>
    );
  }

  if (type === "everyday") {
    return (
      <div
        className="principle-visual principle-visual-everyday"
        aria-hidden="true"
      >
        <span className="principle-glow" />

        <div className="everyday-screen">
          <span className="everyday-screen-inner">
            <i />
          </span>

          <span className="everyday-screen-base" />
        </div>

        <span className="everyday-orbit everyday-orbit-one" />
        <span className="everyday-orbit everyday-orbit-two" />

        <span className="everyday-status">
          Stabil
        </span>

        <span className="principle-visual-status">
          <i />
          Fungerar varje dag
        </span>
      </div>
    );
  }

  return (
    <div
      className="principle-visual principle-visual-followup"
      aria-hidden="true"
    >
      <span className="principle-glow" />

      <span className="followup-ring followup-ring-one" />
      <span className="followup-ring followup-ring-two" />

      <div className="followup-center">
        ✓
      </div>

      <span className="followup-dot followup-dot-one" />
      <span className="followup-dot followup-dot-two" />
      <span className="followup-dot followup-dot-three" />

      <span className="principle-visual-status">
        <i />
        Uppföljning klar
      </span>
    </div>
  );
}
