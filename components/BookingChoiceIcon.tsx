export type BookingChoiceIconName =
  | "person"
  | "senior"
  | "business"
  | "computer"
  | "wifi"
  | "mail"
  | "help"
  | "home"
  | "remote"
  | "phone"
  | "network-cable";

type BookingChoiceIconProps = {
  name: BookingChoiceIconName;
};

export default function BookingChoiceIcon({
  name,
}: BookingChoiceIconProps) {
  const imageMap: Partial<Record<BookingChoiceIconName, string>> = {
    person: "privat.png",
    senior: "senior.png",
    business: "foretag.png",
    computer: "dator-program.png",
    wifi: "wifi-centered.png",
    "network-cable": "natverkskablage-centered.png",
    mail: "epost-centered.png",
    help: "annat-centered.png",
  };

  const imageFile = imageMap[name];

  if (imageFile) {
    return (
      <img
        src={`/icons/booking/${imageFile}`}
        alt=""
        aria-hidden="true"
        className="macsupport-booking-icon-image"
        width={48}
        height={48}
        draggable={false}
      />
    );
  }
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "person":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.25" />
          <path d="M5.5 19c.7-3.6 3.1-5.5 6.5-5.5s5.8 1.9 6.5 5.5" />
        </svg>
      );

    case "senior":
      return (
        <svg {...common}>
          <circle cx="10" cy="6.75" r="3" />
          <path d="M5 17.5c.6-3.3 2.5-5.1 5-5.1 2.1 0 3.8 1.2 4.6 3.4" />
          <path d="M17.5 10.5v9" />
          <path d="M15.5 19.5h4" />
        </svg>
      );

    case "business":
      return (
        <svg {...common}>
          <path d="M5 21V5.5A1.5 1.5 0 0 1 6.5 4h7A1.5 1.5 0 0 1 15 5.5V21" />
          <path d="M15 9h2.5A1.5 1.5 0 0 1 19 10.5V21" />
          <path d="M3 21h18" />
          <path d="M8 8h1M11 8h1M8 11h1M11 11h1M8 14h1M11 14h1" />
        </svg>
      );

    case "computer":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M8 20h8M12 16v4" />
        </svg>
      );

    case "wifi":
      return (
        <svg {...common}>
          <path d="M4 9.5a12 12 0 0 1 16 0" />
          <path d="M7 13a7.5 7.5 0 0 1 10 0" />
          <path d="M10 16.5a3 3 0 0 1 4 0" />
          <circle cx="12" cy="19" r=".8" fill="currentColor" stroke="none" />
        </svg>
      );

    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );

    case "help":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.7 9a2.5 2.5 0 1 1 3.6 2.25c-.9.45-1.3 1-1.3 2" />
          <path d="M12 17h.01" />
        </svg>
      );

    case "home":
      return (
        <svg {...common}>
          <path d="m3.5 11 8.5-7 8.5 7" />
          <path d="M5.5 9.5V20h13V9.5" />
          <path d="M9.5 20v-6h5v6" />
        </svg>
      );

    case "remote":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 17v4" />
          <path d="m9 10 2-2m0 0v2m0-2H9" />
          <path d="m15 11-2 2m0 0v-2m0 2h2" />
        </svg>
      );

    case "phone":
      return (
        <svg {...common}>
          <path d="M7.2 3.5 9.4 7c.35.55.25 1.25-.2 1.7L7.8 10.1a15 15 0 0 0 6.1 6.1l1.4-1.4c.45-.45 1.15-.55 1.7-.2l3.5 2.2c.6.4.85 1.15.55 1.8l-.7 1.55c-.3.65-.95 1.05-1.65 1.05C10 21.2 2.8 14 2.8 5.3c0-.7.4-1.35 1.05-1.65L5.4 2.95c.65-.3 1.4-.05 1.8.55Z" />
        </svg>
      );
  }
}
