export type BookingSupportType =
  | "hembesok"
  | "distans"
  | "foretag";

export const bookingSupport = {
  hembesok: {
    label: "Hembesök",
    shortLabel: "Hemma",
  },

  distans: {
    label: "Support på distans",
    shortLabel: "På distans",
  },

  foretag: {
    label: "Företagssupport",
    shortLabel: "Företag",
  },
} satisfies Record<
  BookingSupportType,
  {
    label: string;
    shortLabel: string;
  }
>;

export function isBookingSupportType(
  value: unknown
): value is BookingSupportType {
  return (
    value === "hembesok" ||
    value === "distans" ||
    value === "foretag"
  );
}
