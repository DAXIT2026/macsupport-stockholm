import type { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Integritetspolicy",
  description:
    "Läs hur Macsupport Stockholm hanterar personuppgifter och skyddar din integritet.",
};

export default function IntegritetPage() {
  return (
    <>

      <main className="legal-page">

        <section className="legal-page-hero">

          <div className="premium-shell legal-page-width">

            <p className="premium-eyebrow">
              INTEGRITET
            </p>

            <h1>
              Din integritet är viktig för oss.
            </h1>

            <p>
              Här beskriver vi hur personuppgifter kan
              behandlas när du kontaktar oss, bokar support
              eller använder webbplatsen.
            </p>

          </div>

        </section>


        <section className="legal-page-content">

          <div className="premium-shell legal-page-width">

            <article>
              <h2>Vilka uppgifter kan vi behandla?</h2>

              <p>
                När du kontaktar oss kan vi behandla
                information som namn, e-postadress,
                telefonnummer och de uppgifter du själv
                lämnar i samband med din förfrågan.
              </p>
            </article>


            <article>
              <h2>Varför behandlar vi uppgifterna?</h2>

              <p>
                Uppgifterna används för att kunna svara
                på frågor, hantera bokningar, utföra
                support och följa upp ett ärende.
              </p>
            </article>


            <article>
              <h2>Hur länge sparas uppgifterna?</h2>

              <p>
                Personuppgifter sparas inte längre än vad
                som är nödvändigt för det ändamål de
                samlades in för eller så länge som krävs
                enligt tillämpliga regler.
              </p>
            </article>


            <article>
              <h2>Cookies och liknande tekniker</h2>

              <p>
                Webbplatsen använder endast valfria cookies
                efter ditt samtycke. Du kan när som helst
                ändra ditt val via Cookie-inställningar i
                sidfoten.
              </p>

              <Link
                href="/cookies"
                className="premium-button secondary"
              >
                Läs om cookies
              </Link>
            </article>


            <article>
              <h2>Dina rättigheter</h2>

              <p>
                Du kan ha rätt att begära information om
                vilka personuppgifter som behandlas om dig,
                begära rättelse eller i vissa fall begära
                att uppgifter raderas.
              </p>
            </article>


            <article>
              <h2>Kontakta oss</h2>

              <p>
                Om du har frågor om hur personuppgifter
                hanteras är du välkommen att kontakta oss.
              </p>

              <Link
                href="/kontakt"
                className="premium-button primary"
              >
                Kontakta oss
              </Link>
            </article>

          </div>

        </section>

      </main>

    </>
  );
}
