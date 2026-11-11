import type { Metadata } from "next";
import { Suspense } from "react";

import SupportBookingFlow from "../../components/SupportBookingFlow";
export const metadata: Metadata = {
  title: "Support & bokning | Macsupport Stockholm",
  description:
    "Beskriv vad du behöver hjälp med, välj supportform och fortsätt till bokning eller skicka en förfrågan.",
  alternates: {
    canonical: "https://www.macsupportstockholm.se/support/",
  },
};

export default function SupportPage() {
  return (
    <>

      <main className="support-hub-v1-page">
        <section className="support-hub-v1-hero">
          <div className="premium-shell">

            <div className="support-hub-v1-intro">
              <span className="premium-eyebrow">
                PERSONLIG IT-SUPPORT
              </span>

              <h1>
                Boka personlig IT-support
                <br />
                i Stockholm.
              </h1>

              <p>
                Välj vem som behöver hjälp,
                beskriv problemet och boka
                en ledig tid som passar dig.
              </p>

              <div className="support-hub-v1-intro-trust">
                <span>✓ Privatpersoner</span>
                <span>✓ Seniorer</span>
                <span>✓ Företag</span>
                <span>✓ Nätverk & IT</span>
              </div>
            </div>

            <div className="support-hub-v1-form">
  <Suspense
    fallback={
      <div className="p-8 text-center text-gray-500">
        Laddar formuläret...
      </div>
    }
  >
    <SupportBookingFlow />
  </Suspense>
</div>

          </div>
        </section>
      </main>

    </>
  );
}
