import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import UnifiedSupportForm from "@/components/UnifiedSupportForm";

export default function KontaktPage() {
  return (
    <main className="contact-ref-v5">
      <section className="contact-ref-v5-hero">
        <div className="contact-ref-v5-hero-copy">
          <p className="contact-ref-v5-eyebrow">
            Kontakt
          </p>

          <h1>
            Hur kan vi
            <span>hjälpa dig?</span>
          </h1>

          <p className="contact-ref-v5-lead">
            Ring oss direkt eller fyll i vårt formulär.
            Vi finns här för privatpersoner, företag och
            seniorer i hela Stockholm.
          </p>

          <div
            className="contact-ref-v5-trust"
            aria-label="Fördelar"
          >
            <div>
              <span className="contact-ref-v5-trust-icon">↯</span>
              <p>
                <strong>Snabb respons</strong>
                <small>Ofta samma dag</small>
              </p>
            </div>

            <div>
              <span className="contact-ref-v5-trust-icon">✓</span>
              <p>
                <strong>Trygg &amp; säker</strong>
                <small>Erfarna tekniker</small>
              </p>
            </div>

            <div>
              <span className="contact-ref-v5-trust-icon">●</span>
              <p>
                <strong>I hela Stockholm</strong>
                <small>På plats eller online</small>
              </p>
            </div>
          </div>
        </div>

        <div className="contact-ref-v5-visual">
          <Image
            src="/images/contact-support-hero.webp"
            alt="Macsupport Stockholm – personlig IT-support"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 52vw"
          />

          <div className="contact-ref-v5-orbit orbit-one" />
          <div className="contact-ref-v5-orbit orbit-two" />
        </div>
      </section>

      <section className="contact-ref-v5-actions">
        <article className="contact-ref-v5-action">
          <div className="contact-ref-v5-action-icon">
            ☎
          </div>

          <p className="contact-ref-v5-action-kicker">
            Ring oss direkt
          </p>

          <h2>08-400 117 26</h2>

          <p className="contact-ref-v5-action-copy">
            Prata med en tekniker – vi hjälper dig snabbt
            och personligt.
          </p>

          <a
            href="tel:0840011726"
            className="contact-ref-v5-button contact-ref-v5-button-primary"
          >
            <span>Ring nu</span>
            <span aria-hidden="true">→</span>
          </a>
        </article>

        <article className="contact-ref-v5-action">
          <div className="contact-ref-v5-action-icon">
            ◫
          </div>

          <p className="contact-ref-v5-action-kicker">
            Boka support
          </p>

          <h2>Välj en ledig tid direkt</h2>

          <p className="contact-ref-v5-action-copy">
            Se våra lediga tider och boka den tid som
            passar dig.
          </p>

          <Link
            href="/kontakt?intent=booking#contact-form"
            className="contact-ref-v5-button contact-ref-v5-button-soft"
          >
            <span>Boka support</span>
            <span aria-hidden="true">→</span>
          </Link>
        </article>

        <article className="contact-ref-v5-action">
          <div className="contact-ref-v5-action-icon">
            ◉
          </div>

          <p className="contact-ref-v5-action-kicker">
            Snabb fråga
          </p>

          <h2>Skicka ett meddelande</h2>

          <p className="contact-ref-v5-action-copy">
            Fyll i formuläret så återkommer vi så snart
            som möjligt.
          </p>

          <a
            href="#contact-form"
            className="contact-ref-v5-button contact-ref-v5-button-soft"
          >
            <span>Öppna formuläret</span>
            <span aria-hidden="true">→</span>
          </a>
        </article>
      </section>

      <section
        className="contact-ref-v5-main"
        id="contact-form"
      >
        <div className="contact-ref-v5-form">
          <header className="contact-ref-v5-form-head">
            <p className="contact-ref-v5-eyebrow">
              En väg vidare
            </p>

            <h2>Allt samlat i ett formulär.</h2>

            <p>
              Beskriv ditt problem i samma formulär.
              Där kan du välja supportform, ledig tid
              eller skicka en förfrågan utan bokning.
            </p>
          </header>

          <Suspense
            fallback={
              <div className="support-unified-v1-loading">
                Laddar bokningsformuläret…
              </div>
            }
          >
            <UnifiedSupportForm />
          </Suspense>
        </div>

        <aside className="contact-ref-v5-sidebar">
          <section className="contact-ref-v5-process">
            <p className="contact-ref-v5-eyebrow">
              Så fungerar det
            </p>

            <h2>Enkelt från början.</h2>

            <div className="contact-ref-v5-process-list">
              <article>
                <span>1</span>
                <div>
                  <strong>Öppna formuläret</strong>
                  <p>
                    Du väljer tjänst, beskriver ditt
                    problem och hur du vill få hjälp.
                  </p>
                </div>
              </article>

              <article>
                <span>2</span>
                <div>
                  <strong>Välj tid eller skicka</strong>
                  <p>
                    Boka en ledig tid direkt eller
                    skicka en förfrågan utan bokning.
                  </p>
                </div>
              </article>

              <article>
                <span>3</span>
                <div>
                  <strong>Vi bekräftar</strong>
                  <p>
                    Du får en bekräftelse och vi hör
                    av oss när det behövs.
                  </p>
                </div>
              </article>
            </div>
          </section>

          <section className="contact-ref-v5-phone">
            <div className="contact-ref-v5-phone-icon">
              ☎
            </div>

            <p className="contact-ref-v5-phone-kicker">
              Behöver du hjälp direkt?
            </p>

            <h2>Ring oss.</h2>

            <p>
              Om datorn eller nätverket stoppar arbetet
              är det ofta snabbast att prata med oss.
            </p>

            <a href="tel:0840011726">
              <span>08-400 117 26</span>
              <span aria-hidden="true">→</span>
            </a>
          </section>
        </aside>
      </section>
    </main>
  );
}