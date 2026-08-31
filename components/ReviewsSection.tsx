import Link from "next/link";

const reviews = [
  {
    quote:
      "Snabb, professionell och väldigt pedagogisk hjälp. Problemet blev löst och allt förklarades på ett sätt som var lätt att förstå.",
    name: "Privatkund",
    location: "Stockholm",
    type: "Datorhjälp",
  },
  {
    quote:
      "Vi fick hjälp med nätverk och WiFi på kontoret. Servicen var tydlig, effektiv och lösningen fungerade direkt.",
    name: "Företagskund",
    location: "Stockholm",
    type: "Nätverk",
  },
  {
    quote:
      "Trygg och personlig service från första kontakten. Väldigt skönt att få hjälp av någon som faktiskt tar sig tid.",
    name: "Privatkund",
    location: "Storstockholm",
    type: "Hembesök",
  },
];

export default function ReviewsSection() {
  return (
    <section
      className="reviews-section premium-section"
      id="recensioner"
    >
      <div className="premium-shell">

        <div className="reviews-header">

          <div className="premium-heading">
            <p className="premium-eyebrow">
              VAD VÅRA KUNDER SÄGER
            </p>

            <h2>
              Förtroende märks
              <br />
              i upplevelsen.
            </h2>

            <p>
              Personlig service, tydlig kommunikation och lösningar
              som faktiskt fungerar.
            </p>
          </div>

          <div className="reviews-score-card">
            <div className="reviews-score-top">
              <strong>4,8</strong>
              <span>/ 5</span>
            </div>

            <div className="reviews-stars">
              ★★★★★
            </div>

            <p>Starka kundomdömen på Reco</p>

            <span className="reviews-verified">
              ✓ Verifierade kundomdömen
            </span>
          </div>

        </div>

        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <article
              className={
                index === 0
                  ? "review-card review-card-featured"
                  : "review-card"
              }
              key={`${review.name}-${review.type}`}
            >

              <div className="review-card-top">
                <div className="review-stars">
                  ★★★★★
                </div>

                <span className="review-source">
                  Reco
                </span>
              </div>

              <blockquote>
                “{review.quote}”
              </blockquote>

              <div className="review-person">
                <div className="review-avatar">
                  {review.name.charAt(0)}
                </div>

                <div>
                  <strong>{review.name}</strong>

                  <span>
                    {review.location} · {review.type}
                  </span>
                </div>
              </div>

            </article>
          ))}
        </div>

        <div className="reviews-prestige">

          <div className="reviews-prestige-copy">
            <span className="reviews-prestige-label">
              REKOMMENDERAT ÅR EFTER ÅR
            </span>

            <strong>
              2015–2026
            </strong>

            <p>
              Ett långsiktigt förtroende byggt på personlig service
              och nöjda kunder.
            </p>
          </div>

          <div className="reviews-years">
            {[
              "2015",
              "2016",
              "2017",
              "2018",
              "2019",
              "2020",
              "2021",
              "2022",
              "2023",
              "2024",
              "2025",
              "2026",
            ].map((year) => (
              <span key={year}>
                {year}
              </span>
            ))}
          </div>

        </div>

        <div className="reviews-bottom">

          <div>
            <span>
              Redo att få hjälp?
            </span>

            <strong>
              Vi gör det enkelt från första kontakt.
            </strong>
          </div>

          <Link
            href="#booking"
            className="premium-button primary"
          >
            Boka support
          </Link>

        </div>

      </div>
    </section>
  );
}
