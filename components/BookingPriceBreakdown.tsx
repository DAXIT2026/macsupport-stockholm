import type { calculateBookingPrice } from "../lib/booking-pricing";

type BookingPrice = NonNullable<ReturnType<typeof calculateBookingPrice>>;

type BookingPriceBreakdownProps = {
  price: BookingPrice;
  mode: "onsite" | "remote";
  variant?: "review" | "confirmation";
};

const currencyFormatter = new Intl.NumberFormat("sv-SE", {
  style: "currency",
  currency: "SEK",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function formatPrice(amount: number): string {
  return currencyFormatter.format(amount);
}

export default function BookingPriceBreakdown({
  price,
  mode,
  variant = "review",
}: BookingPriceBreakdownProps) {
  const isConfirmation = variant === "confirmation";

  const laborLabel = price.rutApplicable
    ? "Arbetskostnad efter RUT-avdrag"
    : "Arbetskostnad";

  const conditions = [
    price.vatLabel.trim().replace(/[.\s]+$/, "") + ".",
    price.rutApplicable
      ? "Arbetskostnaden är beräknad efter RUT-avdrag och förutsätter att du har rätt till avdraget."
      : "RUT-avdrag gäller inte.",
    price.agreementRequired ? "Avtal krävs." : null,
    mode === "onsite"
      ? "Rese- och materialkostnader omfattas inte av RUT-avdraget."
      : null,
    "Slutpriset kan variera beroende på arbetets omfattning.",
  ]
    .filter(Boolean)
    .join(" ");

  if (isConfirmation) {
    return (
      <div
        className="ms-booking-success-pricing-v41-details"
        aria-label="Prisöversikt"
      >
        <div>
          <span>{laborLabel}</span>
          <strong>{formatPrice(price.labor)}</strong>
        </div>

        {mode === "onsite" && (
          <div>
            <span>Resekostnad från</span>
            <strong>{formatPrice(price.travelFrom)}</strong>
          </div>
        )}

        <div>
          <strong>Beräknat totalpris från</strong>
          <strong>{formatPrice(price.totalFrom)}</strong>
        </div>

        <p>{conditions}</p>
      </div>
    );
  }

  return (
    <section
      className="ms-price-overview"
      aria-label="Prisöversikt"
    >
      <div className="ms-price-overview-header">
        <h3>Prisöversikt</h3>
        <span>Preliminärt pris</span>
      </div>

      <div className="ms-price-overview-row">
        <span>{laborLabel}</span>
        <strong>{formatPrice(price.labor)}</strong>
      </div>

      {mode === "onsite" && (
        <div className="ms-price-overview-row">
          <span>Resekostnad från</span>
          <strong>{formatPrice(price.travelFrom)}</strong>
        </div>
      )}

      <div className="ms-price-overview-total">
        <span>Beräknat totalpris från</span>
        <strong>{formatPrice(price.totalFrom)}</strong>
      </div>

      <p className="ms-price-overview-conditions">
        {conditions}
      </p>
    </section>
  );
}