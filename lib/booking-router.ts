import {
  bookingLinks,
  type BookingLinkKey,
} from "./booking-links";

export type BookingAudience =
  | "general"
  | "support"
  | "senior"
  | "networkCable"
  | "network";

export function getBookingLink(
  audience: BookingAudience
) {
  return bookingLinks[
    audience satisfies BookingLinkKey
  ];
}

export function resolveBookingLink(options: {
  audience?: string | null;
  service?: string | null;
}) {
  const {
    audience,
    service,
  } = options;

  if (
    audience === "senior"
  ) {
    return bookingLinks.senior;
  }

  if (
    service === "network-cable"
  ) {
    return bookingLinks.networkCable;
  }

  if (
    service === "wifi" ||
    service === "unifi" ||
    service === "camera" ||
    service === "network"
  ) {
    return bookingLinks.network;
  }

  if (
    audience === "general"
  ) {
    return bookingLinks.general;
  }

  return bookingLinks.support;
}
