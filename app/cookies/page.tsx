import type { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Cookies",
  description:
    "Information om hur Macsupport Stockholm använder cookies och liknande tekniker.",
};

export default function CookiesPage() {
  return (
    <>

      <main className="legal-page">

        <section className="legal-page-hero">
          <div className="premium-shell legal-page-width">

            <p className="premium-eyebrow">
              COOKIES
            </p>

            <h1>
              Så använder vi cookies.
            </h1>

            <p>
              Här förklarar vi vilka cookies och
              liknande tekniker som används på
              webbplatsen och hur du kan ändra ditt val.
            </p>

          </div>
        </section>

        <section className="legal-page-content">

          <div className="premium-shell legal-page-width">

            <article>

              <h2>Nödvändiga cookies</h2>

              <p>
                Webbplatsen kan använda nödvändiga
                tekniker för att komma ihåg dina
                inställningar och få grundläggande
                funktioner att fungera.
              </p>

              <p>
                Vårt cookieval sparas lokalt i din
                webbläsare så att vi kan komma ihåg
                vad du har valt.
              </p>

            </article>

            <article>

              <h2>Statistik</h2>

              <p>
                Statistik är valfritt. Vi aktiverar
                inte statistikverktyg innan du har
                samtyckt till denna kategori.
              </p>

            </article>

            <article>

              <h2>Marknadsföring</h2>

              <p>
                Marknadsföringscookies är valfria
                och får endast aktiveras efter ditt
                samtycke.
              </p>

              <p>
                Om vi senare lägger till en extern
                marknadsföringstjänst uppdaterar vi
                denna sida med leverantör, syfte och
                lagringstid.
              </p>

            </article>

            <article>

              <h2>Ändra eller återkalla ditt val</h2>

              <p>
                Du kan när som helst öppna
                Cookie-inställningar via länken
                längst ned på webbplatsen.
              </p>

              <Link
                href="/kontakt"
                className="premium-button secondary"
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
