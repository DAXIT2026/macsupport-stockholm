import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="premium-hero" id="top">
      <div className="hero-ambient hero-ambient-one" />
      <div className="hero-ambient hero-ambient-two" />

      <div className="premium-shell hero-layout">
        <div className="hero-copy">
          <p className="premium-eyebrow">
            IT-SUPPORT SOM FÖRENKLAR DIN VARDAG
          </p>

          <h1>
            Personlig IT-support
            <br />
            när du behöver det.
          </h1>

          <p className="hero-description">
            Vi hjälper privatpersoner och företag i Stockholm med datorer,
            Mac, nätverk, säkerhet och digital teknik – hemma, på kontoret
            eller på distans.
          </p>

          <div className="hero-benefits">
            <span>Snabb respons</span>
            <span>Tydligt & enkelt</span>
            <span>Trygg & säker</span>
          </div>

          <div className="hero-actions">
            <Link href="/kontakt" className="premium-button primary">
              Boka support
            </Link>

            <Link href="#tjanster" className="premium-button secondary">
              Våra tjänster →
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-soft-bg" />

          <Image
            src="/images/hero-macbook.jpg"
            alt="Mac-support och IT-support i Stockholm"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 52vw"
            className="hero-image"
          />

          <div className="hero-image-fade" />
          <div className="hero-image-glow" />

          <div className="laser laser-one" />
          <div className="laser laser-two" />
          <div className="laser laser-three" />

          <div className="hero-network" />

          <div className="hero-floating-card">
            <strong>12 år i rad på Reco</strong>
            <span>2015–2026 · rekommenderat företag</span>
          </div>
        </div>
      </div>
    </section>
  );
}
