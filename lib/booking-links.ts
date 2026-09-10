export const bookingLinks = {
  general: "https://go.oncehub.com/bokatid",
  support: "https://go.oncehub.com/datorsupport",
  senior: "https://go.oncehub.com/datorsupport-tekniker",
  networkCable: "https://go.oncehub.com/dranatverkskabel",
  network: "https://go.oncehub.com/tidsbokning",
} as const;

export type BookingLinkKey =
  keyof typeof bookingLinks;
