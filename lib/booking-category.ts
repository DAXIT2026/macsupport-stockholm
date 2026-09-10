export type BookingCategory =
  | "general"
  | "support"
  | "senior"
  | "networkCable"
  | "network";

export function isBookingCategory(
  value: unknown
): value is BookingCategory {
  return (
    value === "general" ||
    value === "support" ||
    value === "senior" ||
    value === "networkCable" ||
    value === "network"
  );
}

export function resolveBookingCategory(options: {
  audience?: string | null;
  customer:
    | "privat"
    | "senior"
    | "foretag";
  service:
    | "general"
    | "mac"
    | "wifi"
    | "network-cable"
    | "unifi-camera"
    | "email"
    | "microsoft365"
    | "security"
    | "device"
    | "other";
}): BookingCategory {
  const {
    audience,
    customer,
    service,
  } = options;

  if (
    customer === "senior" ||
    audience === "senior"
  ) {
    return "senior";
  }

  if (
    service === "network-cable" ||
    audience === "networkCable"
  ) {
    return "networkCable";
  }

  if (
    service === "wifi" ||
    service === "unifi-camera" ||
    audience === "network"
  ) {
    return "network";
  }

  if (audience === "general") {
    return "general";
  }

  return "support";
}
