import Image from "next/image";

export default function TrustSection() {
  return (
    <section className="trust-zone">

      <div className="premium-shell trust-panel">

        <div className="trust-title">
          <p className="premium-eyebrow">
            FÖRTROENDE SOM BYGGTS ÖVER TID
          </p>

          <h2>
            Rekommenderat år efter år.
          </h2>

          <p>
            Tack till alla kunder som har gett oss sitt förtroende.
          </p>
        </div>

        <div className="reco-strip">
          <Image
            src="/badges/reco-2015-2026.png"
            alt="Reco rekommenderat företag 2015 till 2026"
            width={1500}
            height={190}
          />
        </div>

        <div className="trust-statistics">

          <div>
            <strong>2015–2026</strong>
            <span>Rekommenderat på Reco</span>
          </div>

          <div>
            <strong>4,8 / 5</strong>
            <span>Starka kundomdömen</span>
          </div>

          <div>
            <strong>Svar samma dag</strong>
            <span>På arbetstid</span>
          </div>

          <div>
            <strong>50% RUT</strong>
            <span>På godkänd arbetskostnad</span>
          </div>

        </div>

      </div>
    </section>
  );
}
