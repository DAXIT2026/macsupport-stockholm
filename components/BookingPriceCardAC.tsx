import type { ReactNode } from "react";
import styles from "./BookingPriceCardAC.module.css";

type PriceDetails = {
  labor: number;
  travelFrom: number;
  totalFrom: number;
  vatLabel: string;
  rutApplicable: boolean;
  agreementRequired: boolean;
};

type BookingPriceCardACProps = {
  title: string;
  description: string;
  durationLabel: string;
  mode: "onsite" | "remote";
  modeLabel: string;
  price: PriceDetails | null;
  expanded: boolean;
  onToggle: () => void;
  children?: ReactNode;
};

const currency = new Intl.NumberFormat("sv-SE", {
  maximumFractionDigits: 0,
});

function formatPrice(amount: number): string {
  return `${currency.format(amount)} kr`;
}

export default function BookingPriceCardAC({
  title,
  description,
  durationLabel,
  mode,
  modeLabel,
  price,
  expanded,
  onToggle,
  children,
}: BookingPriceCardACProps) {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

        <div className={styles.price}>
          <span>Prisexempel från</span>
          <strong>
            {price ? formatPrice(price.totalFrom) : "Pris på förfrågan"}
          </strong>
        </div>
      </div>

      <div className={styles.actions}>
        {children}

        <button
          type="button"
          className={styles.detailsButton}
          aria-expanded={expanded}
          onClick={onToggle}
        >
          {expanded ? "Dölj prisdetaljer" : "Visa prisdetaljer"}
          <span aria-hidden="true">{expanded ? "−" : "+"}</span>
        </button>
      </div>

      {expanded && (
        <div className={styles.details}>
          {price ? (
            <>
              <p className={styles.context}>
                Prisexempel · {modeLabel} · {durationLabel}
              </p>

              <dl className={styles.breakdown}>
                <div>
                  <dt>Arbete</dt>
                  <dd>{formatPrice(price.labor)}</dd>
                </div>

                {mode === "onsite" && (
                  <div>
                    <dt>Resekostnad från</dt>
                    <dd>{formatPrice(price.travelFrom)}</dd>
                  </div>
                )}

                <div className={styles.total}>
                  <dt>Beräknat totalpris från</dt>
                  <dd>{formatPrice(price.totalFrom)}</dd>
                </div>
              </dl>

              <p className={styles.conditions}>
                {price.vatLabel}.
                {price.rutApplicable
                  ? " RUT-avdrag förutsätter att villkoren är uppfyllda."
                  : ""}
                {price.agreementRequired
                  ? " Avtal krävs."
                  : ""}
                {" "}Slutpriset kan variera beroende på uppdragets omfattning.
              </p>
            </>
          ) : (
            <p className={styles.conditions}>
              Välj kundkategori för att se ett prisexempel.
            </p>
          )}
        </div>
      )}
    </section>
  );
}