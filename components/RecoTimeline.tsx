const years = [
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
];

export default function RecoTimeline() {
  return (
    <section
      className="reco-timeline"
      aria-labelledby="reco-timeline-title"
    >
      <div className="reco-timeline-heading">

        <div>
          <p className="premium-eyebrow">
            REKOMMENDERAT ÅR EFTER ÅR
          </p>

          <h2 id="reco-timeline-title">
            2015–2026
          </h2>
        </div>

        <p>
          Ett långsiktigt förtroende byggt på
          personlig service och nöjda kunder.
        </p>

      </div>

      <div
        className="reco-years"
        aria-label="År"
      >
        {years.map((year, index) => (
          <div
            key={year}
            className={
              index === years.length - 1
                ? "reco-year active"
                : "reco-year"
            }
          >
            <span>{year}</span>

            {index === years.length - 1 && (
              <small>NU</small>
            )}
          </div>
        ))}
      </div>

      <div className="reco-timeline-line" aria-hidden="true">
        <span />
      </div>

    </section>
  );
}
