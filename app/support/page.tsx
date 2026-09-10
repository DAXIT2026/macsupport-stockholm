import type { Metadata } from "next";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SupportBookingFlow from "../../components/SupportBookingFlow";

export const metadata: Metadata = {
  title: "Support & bokning | Macsupport Stockholm",
  description:
    "Beskriv vad du behöver hjälp med, välj supportform och fortsätt till bokning eller skicka en förfrågan.",
};

export default function SupportPage() {
  return (
    <>
      <Header />

      <main className="support-hub-v1-page">
        <section className="support-hub-v1-hero">
          <div className="premium-shell">

            <div className="support-hub-v1-intro">
              <span className="premium-eyebrow">
                PERSONLIG IT-SUPPORT
              </span>

              <h1>
                Ett ställe för hela
                <br />
                din supportförfrågan.
              </h1>

              <p>
                Berätta vad du behöver hjälp med.
                Därefter kan du välja en ledig tid
                eller skicka din förfrågan direkt.
              </p>

              <div className="support-hub-v1-intro-trust">
                <span>✓ Privatpersoner</span>
                <span>✓ Seniorer</span>
                <span>✓ Företag</span>
                <span>✓ Nätverk & IT</span>
              </div>
            </div>

            <div className="support-hub-v1-form">
              <SupportBookingFlow />
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
