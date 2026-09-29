export type UniFiProduct = {
  name: string;
  image: string;
  description: string;
  specs: string[];
};

export const unifiProducts: Record<
  "kameraovervakning" | "wifi-natverk",
  UniFiProduct[]
> = {
  kameraovervakning: [
    {
      name: "UniFi G6 Bullet",
      image: "/images/unifi-g6-bullet.png",
      description:
        "4K PoE-kamera för professionell kameraövervakning inom- och utomhus.",
      specs: ["4K", "PoE", "Inom- & utomhus"],
    },
    {
      name: "UniFi G6 Turret",
      image: "/images/unifi-g6-turret.png",
      description:
        "Diskret 4K-kamera för flexibel och professionell övervakning.",
      specs: ["4K", "PoE", "Flexibel placering"],
    },
    {
      name: "UniFi G6 Dome",
      image: "/images/unifi-g6-dome.png",
      description:
        "Robust dome-kamera för miljöer där diskret och säker installation är viktig.",
      specs: ["4K", "PoE", "Diskret design"],
    },
    {
      name: "UniFi G6 Instant",
      image: "/images/unifi-g6-instant.png",
      description:
        "Kompakt kamera för flexibel övervakning i mindre miljöer.",
      specs: ["Kompakt", "Flexibel", "UniFi Protect"],
    },
  ],

  "wifi-natverk": [
    {
      name: "UniFi U7 Pro",
      image: "/images/u7-pro.png",
      description:
        "WiFi 7-accesspunkt för snabb och stabil trådlös täckning i moderna nätverk.",
      specs: ["WiFi 7", "6 GHz", "Professionell WiFi"],
    },
    {
      name: "UniFi U7 Pro XG",
      image: "/images/u7-pro-xg.png",
      description:
        "Högpresterande WiFi 7-accesspunkt för nätverk med höga kapacitetskrav.",
      specs: ["WiFi 7", "Hög kapacitet", "Företag"],
    },
    {
      name: "UniFi U7 Outdoor",
      image: "/images/u7-outdoor.png",
      description:
        "WiFi 7-accesspunkt utvecklad för stabil trådlös täckning utomhus.",
      specs: ["WiFi 7", "Utomhus", "Stabil täckning"],
    },
    {
      name: "UniFi Switch Pro Max 24 PoE",
      image: "/images/switch-pro-max-24-poe.png",
      description:
        "Professionell PoE-switch för accesspunkter, kameror och avancerade nätverksinstallationer.",
      specs: ["24 portar", "PoE", "Professionellt nätverk"],
    },
  ],
};
