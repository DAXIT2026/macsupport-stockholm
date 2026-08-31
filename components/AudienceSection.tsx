import Image from "next/image";
import Link from "next/link";

export default function AudienceSection() {
  return (
    <section className="premium-section audience-zone">

      <div className="premium-shell">

        <div className="premium-heading">

          <p className="premium-eyebrow">
            HJÄLP PÅ DINA VILLKOR
          </p>

          <h2>
            IT-support byggd
            <br />
            runt kunden.
          </h2>

          <p>
            Olika kunder behöver olika typ av hjälp.
            Därför har vi gjort det enkelt att hitta rätt väg.
          </p>

        </div>

        <div className="audience-cards">

          <article id="privat" className="audience-card">

            <Link
              href="/privat"
              className="audience-image"
              aria-label="IT-support för privatpersoner"
            >
              <Image
                src="/images/private-support.jpg"
                alt="IT-support för privatpersoner"
                fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
              />
            </Link>

            <div className="audience-content">

              <span>PRIVATPERSONER</span>

              <h3>
                Teknikhjälp hemma som känns enkel.
              </h3>

              <p>
                Mac, PC, WiFi, skrivare, e-post,
                säkerhet och vardagsteknik.
              </p>

              <Link href="/privat">
                Utforska privat support →
              </Link>

            </div>

          </article>


          <article id="foretag" className="audience-card">

            <Link
              href="/foretag"
              className="audience-image"
              aria-label="IT-support för företag"
            >
              <Image
                src="/images/business-support.jpg"
                alt="IT-support för företag"
                fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
              />
            </Link>

            <div className="audience-content">

              <span>FÖRETAG</span>

              <h3>
                IT-support som håller verksamheten igång.
              </h3>

              <p>
                Microsoft 365, nätverk, säkerhet,
                backup och löpande support.
              </p>

              <Link href="/foretag">
                Utforska företagssupport →
              </Link>

            </div>

          </article>


          <article className="audience-card audience-card-senior">

            <Link
              href="/seniorer"
              className="audience-image"
              aria-label="Teknikhjälp för seniorer"
            >
              <Image
                src="/images/senior-support.jpg"
                alt="Teknikhjälp för seniorer"
                fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
              />
            </Link>

            <div className="audience-content">

              <span>SENIORER</span>

              <h3>
                Personlig hjälp i lugn takt.
              </h3>

              <p>
                Dator, mobil, surfplatta, e-post,
                internet och digital trygghet.
              </p>

              <Link href="/seniorer">
                Se seniorhjälp →
              </Link>

            </div>

          </article>

        </div>

      </div>

    </section>
  );
}
