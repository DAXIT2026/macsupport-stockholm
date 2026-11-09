import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Allmänna villkor",
  description:
    "Information om bokning, IT-support och villkor för Macsupport Stockholms tjänster.",
};

export default function VillkorPage() {
  return (
    <main className="legal-page">
      <section className="legal-page-hero">
        <div className="premium-shell legal-page-width">
          <p className="premium-eyebrow">ALLMÄNNA VILLKOR</p>

          <h1>Trygg och tydlig IT-support.</h1>

          <p>
            Här hittar du information om våra tjänster,
            bokningar och vad som gäller när du anlitar
            Macsupport Stockholm.
          </p>
        </div>
      </section>

      <section className="legal-page-content">
        <div className="premium-shell legal-page-width">
          <article>
            <h2>Om våra tjänster</h2>
            <p>
              Macsupport Stockholm erbjuder IT-support
              för privatpersoner, seniorer och företag.
              Hjälpen kan omfatta datorer, programvara,
              internet, Wi-Fi och nätverksinstallationer.
            </p>
          </article>

          <article>
            <h2>Bokning och bekräftelse</h2>
            <p>
              Du kan boka en tillgänglig tid via vår
              webbplats. När bokningen har genomförts
              visas en bekräftelse med ett bokningsnummer.
            </p>
            <p>
              Kontrollera att dina kontaktuppgifter,
              den valda tjänsten och bokningstiden
              stämmer.
            </p>
          </article>

          <article>
            <h2>Priser och betalning</h2>
            <p>
              Information om våra aktuella priser
              finns på prissidan. Eventuella kostnader
              som beror på uppdragets omfattning
              behöver klargöras innan arbetet utförs.
            </p>

            <Link
              href="/priser"
              className="premium-button secondary"
            >
              Se våra priser
            </Link>
          </article>

          <article>
            <h2>Avbokning och ombokning</h2>
            <p>
              Om du behöver avboka eller ändra en
              bokad tid ber vi dig att kontakta oss
              så snart som möjligt.
            </p>
            <p>
              Kontakta oss även om du har frågor
              om vilka villkor som gäller för
              just din bokning.
            </p>
          </article>

          <article>
            <h2>Support och ansvar</h2>
            <p>
              Vi strävar efter att ge tydlig och
              professionell IT-support. Vilka åtgärder
              som är möjliga beror på problemets
              omfattning och de tekniska förutsättningarna.
            </p>
            <p>
              Om du har frågor eller synpunkter på
              en utförd tjänst är du välkommen
              att kontakta oss.
            </p>
          </article>

          <article>
            <h2>Personuppgifter</h2>
            <p>
              Vi behandlar personuppgifter i samband
              med förfrågningar och bokningar.
              Mer information finns i vår
              integritetspolicy.
            </p>

            <Link
              href="/integritet"
              className="premium-button secondary"
            >
              Läs vår integritetspolicy
            </Link>
          </article>

          <article>
            <h2>Frågor om våra villkor?</h2>
            <p>
              Kontakta oss om du vill veta mer
              om våra tjänster, bokningar eller
              villkor innan du beställer support.
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
  );
}
