import Image from "next/image";
import Link from "next/link";

const faqs = [
  {
    question: "Hur snabbt kan ni hjälpa mig?",
    answer:
      "Vi försöker återkomma så snart som möjligt. Beroende på ärendet kan hjälpen ske på plats eller via säker fjärrsupport.",
  },
  {
    question: "Kan ni hjälpa både privatpersoner och företag?",
    answer:
      "Ja. Vi hjälper privatpersoner, seniorer och företag med allt från Mac och PC till WiFi, Microsoft 365, säkerhet och nätverk.",
  },
  {
    question: "Hur fungerar RUT-avdraget?",
    answer:
      "För tjänster som omfattas av RUT-avdrag kan privatpersoner få skattereduktion på arbetskostnaden. Vi förklarar vad som gäller innan arbetet börjar.",
  },
  {
    question: "Kan ni hjälpa mig på distans?",
    answer:
      "Ja. Många problem med dator, e-post, program, inställningar och konton kan lösas via säker fjärrsupport.",
  },
  {
    question: "Arbetar ni med Mac?",
    answer:
      "Ja. Vi erbjuder personlig Mac-support för felsökning, uppdateringar, backup, dataöverföring, installation och andra vanliga macOS-problem.",
  },
  {
    question: "Kan ni hjälpa med WiFi och nätverk?",
    answer:
      "Ja. Vi hjälper med routerproblem, dålig täckning, mesh-WiFi, nätverksinstallation och stabilare uppkoppling hemma eller på kontoret.",
  },
];

export default function FaqContactSection() {
  return (
    <>
      <section
        className="faq-section premium-section"
        id="faq"
      >
        <div className="premium-shell faq-layout">

          <div className="faq-copy">

            <p className="premium-eyebrow">
              VANLIGA FRÅGOR
            </p>

            <h2>
              Tydliga svar
              <br />
              innan du bokar.
            </h2>

            <p>
              Vi vill att du ska känna dig trygg redan innan
              första kontakten. Här hittar du svar på några av
              de vanligaste frågorna.
            </p>

            <Link
              href="/kontakt"
              className="premium-button secondary"
            >
              Har du en annan fråga?
              <span aria-hidden="true">→</span>
            </Link>

          </div>


          <div className="faq-list">

            {faqs.map((faq, index) => (
              <details
                className="faq-item"
                key={faq.question}
                open={index === 0}
              >
                <summary>

                  <span>
                    {faq.question}
                  </span>

                  <i aria-hidden="true">
                    +
                  </i>

                </summary>

                <div className="faq-answer">
                  <p>
                    {faq.answer}
                  </p>
                </div>

              </details>
            ))}

          </div>

        </div>
      </section>


      <section
        className="contact-section"
        id="kontakt"
      >

        <div
          className="contact-background"
          aria-hidden="true"
        >
          <Image
            src="/images/network-digital-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="contact-background-image"
          />

          <div className="contact-overlay" />
        </div>


        <div className="premium-shell contact-content">

          <div className="contact-main">

            <p className="contact-eyebrow">
              HÖR AV DIG
            </p>

            <h2>
              Vi finns här
              <br />
              när tekniken krånglar.
            </h2>

            <p>
              Ring oss, boka support online eller skicka ett
              meddelande. Vi hjälper dig att hitta rätt väg
              vidare.
            </p>


            <div className="contact-actions">

              <a
                href="tel:+46840011726"
                className="contact-primary-action"
              >
                <span
                  className="contact-action-icon"
                  aria-hidden="true"
                >
                  ☎
                </span>

                <span>
                  <small>
                    Ring direkt
                  </small>

                  <strong>
                    08-400 117 26
                  </strong>
                </span>
              </a>


              <Link
                href="/boka"
                className="contact-secondary-action"
              >
                <span
                  className="contact-action-icon"
                  aria-hidden="true"
                >
                  ◷
                </span>

                <span>
                  <small>
                    Boka online
                  </small>

                  <strong>
                    Välj tid
                    <span aria-hidden="true"> →</span>
                  </strong>
                </span>
              </Link>


              <a
                href="mailto:kontakt@macsupportstockholm.se"
                className="contact-secondary-action"
              >
                <span
                  className="contact-action-icon"
                  aria-hidden="true"
                >
                  ✉
                </span>

                <span>
                  <small>
                    E-post
                  </small>

                  <strong>
                    Skicka meddelande
                    <span aria-hidden="true"> →</span>
                  </strong>
                </span>
              </a>

            </div>

          </div>


          <aside className="contact-info-card">

            <span className="contact-info-label">
              SNABB KONTAKT
            </span>

            <h3>
              Personlig hjälp när du behöver den.
            </h3>


            <div className="contact-info-list">

              <div>
                <span aria-hidden="true">
                  ✓
                </span>

                <p>
                  <strong>
                    Personlig återkoppling
                  </strong>

                  <small>
                    Tydlig kontakt från början
                  </small>
                </p>
              </div>


              <div>
                <span aria-hidden="true">
                  ✓
                </span>

                <p>
                  <strong>
                    Stockholm med omnejd
                  </strong>

                  <small>
                    Hembesök och företag
                  </small>
                </p>
              </div>


              <div>
                <span aria-hidden="true">
                  ✓
                </span>

                <p>
                  <strong>
                    Fjärrsupport
                  </strong>

                  <small>
                    Hjälp på distans när det passar
                  </small>
                </p>
              </div>


              <div>
                <span aria-hidden="true">
                  ✓
                </span>

                <p>
                  <strong>
                    Tydliga besked
                  </strong>

                  <small>
                    Du vet vad som händer innan vi börjar
                  </small>
                </p>
              </div>

            </div>


            <div className="contact-info-bottom">
              <span>
                Personligt
              </span>

              <small>
                Trygg och tydlig IT-support
              </small>
            </div>

          </aside>

        </div>

      </section>
    </>
  );
}
