export const supportFormLinks = {
  message:
    "/support?intent=message#support-form",

  booking:
    "/support?intent=booking#support-form",

  time:
    "/support?intent=time#support-form",

  general:
    "/support?intent=booking&audience=general#support-form",

  support:
    "/support?intent=booking&audience=support#support-form",

  senior:
    "/support?intent=booking&audience=senior#support-form",

  networkCable:
    "/support?intent=booking&audience=networkCable&service=network-cable#support-form",

  network:
    "/support?intent=booking&audience=network&service=wifi#support-form",
} as const;

export type SupportFormLinkKey =
  keyof typeof supportFormLinks;
