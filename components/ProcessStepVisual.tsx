type ProcessStepVisualProps = {
  type:
    | "contact"
    | "assessment"
    | "support"
    | "complete";
};

export default function ProcessStepVisual({
  type,
}: ProcessStepVisualProps) {
  if (type === "contact") {
    return (
      <div
        className="process-step-visual process-step-contact"
        aria-hidden="true"
      >
        <div className="process-step-field" />

        <span className="contact-orbit contact-orbit-one" />
        <span className="contact-orbit contact-orbit-two" />

        <div className="contact-person">
          <span className="contact-person-head" />
          <span className="contact-person-body" />
        </div>

        <span className="contact-signal signal-one" />
        <span className="contact-signal signal-two" />
        <span className="contact-signal signal-three" />

        <span className="process-step-caption">
          <i />
          Kontakt etablerad
        </span>
      </div>
    );
  }

  if (type === "assessment") {
    return (
      <div
        className="process-step-visual process-step-assessment"
        aria-hidden="true"
      >
        <div className="process-step-field" />

        <span className="assessment-ring assessment-ring-one" />
        <span className="assessment-ring assessment-ring-two" />

        <div className="assessment-panel">
          <span className="assessment-line line-one" />
          <span className="assessment-line line-two" />
          <span className="assessment-line line-three" />

          <span className="assessment-target">
            <i />
          </span>
        </div>

        <span className="assessment-scanner" />

        <span className="process-step-caption">
          <i />
          Vi analyserar behovet
        </span>
      </div>
    );
  }

  if (type === "support") {
    return (
      <div
        className="process-step-visual process-step-support"
        aria-hidden="true"
      >
        <div className="process-step-field" />

        <div className="support-device support-device-left">
          <span className="support-device-screen" />
          <span className="support-device-base" />
        </div>

        <div className="support-transfer">
          <span className="support-transfer-line" />
          <i className="support-transfer-dot dot-one" />
          <i className="support-transfer-dot dot-two" />
        </div>

        <div className="support-device support-device-right">
          <span className="support-device-screen" />
          <span className="support-device-base" />
        </div>

        <span className="support-center-check">
          ✓
        </span>

        <span className="process-step-caption">
          <i />
          Lösningen genomförs
        </span>
      </div>
    );
  }

  return (
    <div
      className="process-step-visual process-step-complete"
      aria-hidden="true"
    >
      <div className="process-step-field" />

      <span className="complete-ring complete-ring-one" />
      <span className="complete-ring complete-ring-two" />

      <div className="complete-document">
        <span className="complete-document-line line-one" />
        <span className="complete-document-line line-two" />
        <span className="complete-document-line line-three" />
      </div>

      <span className="complete-check">
        ✓
      </span>

      <span className="complete-pulse pulse-one" />
      <span className="complete-pulse pulse-two" />

      <span className="process-step-caption">
        <i />
        Klart och förklarat
      </span>
    </div>
  );
}
