export type BookingCustomerType = "privat" | "senior" | "foretag";

export type TechnicianCategory =
  | "it-technician"
  | "network-technician"
  | "network-installer";

export type PricingMode = "onsite" | "remote";

type Rate = {
  amount: number;
  unitMinutes: number;
  travelFrom: number;
  vatLabel: string;
  rutApplicable: boolean;
  agreementRequired: boolean;
};

const hourly = (
  amount: number,
  travelFrom: number,
  vatLabel: string,
  rutApplicable: boolean,
  agreementRequired = false
): Rate => ({
  amount,
  unitMinutes: 60,
  travelFrom,
  vatLabel,
  rutApplicable,
  agreementRequired,
});

const remote = (
  amount: number,
  vatLabel: string,
  agreementRequired = false
): Rate => ({
  amount,
  unitMinutes: 30,
  travelFrom: 0,
  vatLabel,
  rutApplicable: false,
  agreementRequired,
});

const rates: Record<
  TechnicianCategory,
  Partial<Record<PricingMode, Record<BookingCustomerType, Rate>>>
> = {
  "it-technician": {
    onsite: {
      privat: hourly(799, 500, "inkl. moms efter RUT", true),
      senior: hourly(599, 500, "inkl. moms efter RUT", true, true),
      foretag: hourly(1280, 400, "exkl. moms", false),
    },
    remote: {
      privat: remote(799, "inkl. moms"),
      senior: remote(599, "inkl. moms", true),
      foretag: remote(640, "exkl. moms"),
    },
  },
  "network-technician": {
    onsite: {
      privat: hourly(799, 750, "inkl. moms efter RUT", true),
      senior: hourly(599, 750, "inkl. moms efter RUT", true, true),
      foretag: hourly(1280, 600, "exkl. moms", false),
    },
    remote: {
      privat: remote(799, "inkl. moms"),
      senior: remote(599, "inkl. moms", true),
      foretag: remote(640, "exkl. moms"),
    },
  },
  "network-installer": {
    onsite: {
      privat: hourly(575, 750, "inkl. moms efter RUT", true),
      senior: hourly(575, 750, "inkl. moms efter RUT", true),
      foretag: hourly(920, 600, "exkl. moms", false),
    },
  },
};

export function calculateBookingPrice(
  customerType: BookingCustomerType,
  technician: TechnicianCategory,
  mode: PricingMode,
  durationMinutes: number
) {
  const rate = rates[technician][mode]?.[customerType];

  if (!rate || !Number.isFinite(durationMinutes) || durationMinutes <= 0) {
    return null;
  }

  const minimumMinutes =
    mode === "onsite" ? 120 : rate.unitMinutes;

  const billableMinutes = Math.max(durationMinutes, minimumMinutes);
  const units = Math.ceil(billableMinutes / rate.unitMinutes);
  const labor = units * rate.amount;

  return {
    labor,
    travelFrom: rate.travelFrom,
    totalFrom: labor + rate.travelFrom,
    vatLabel: rate.vatLabel,
    rutApplicable: rate.rutApplicable,
    agreementRequired: rate.agreementRequired,
    unitMinutes: rate.unitMinutes,
    ratePerUnit: rate.amount,
    isEstimate: true as const,
  };
}
