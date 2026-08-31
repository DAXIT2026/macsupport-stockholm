export type ServiceItem = {
  slug: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  intro: string;
  description: string;
  image: string;
  benefits: string[];
  problems: string[];
  result: string;
  audience: string[];
};

export const services: ServiceItem[] = [
  {
    slug: "mac-support",
    eyebrow: "MAC & APPLE",
    title: "Personlig Mac-support i Stockholm",
    shortTitle: "Mac-support",
    intro:
      "Snabb och personlig hjälp med Mac, macOS, backup, installation och felsökning.",
    description:
      "Vi hjälper dig när din Mac är långsam, inte startar, krånglar efter en uppdatering eller när du behöver hjälp med installation, dataöverföring eller säkerhetskopiering.",
    image: "/images/mac-support-repair.jpg",
    benefits: [
      "Personlig hjälp utan komplicerat teknikspråk",
      "Hembesök, kontor eller säker fjärrsupport",
      "Hjälp med backup och dataöverföring",
      "Installation och optimering av macOS",
    ],
    problems: [
      "Macen är långsam",
      "macOS eller program krånglar",
      "Backup fungerar inte",
      "Ny Mac behöver installeras",
      "Filer ska flyttas från gammal dator",
      "E-post eller konton fungerar inte",
    ],
    result:
      "Målet är att din Mac ska kännas enkel, stabil och trygg att använda igen.",
    audience: ["Privatpersoner", "Seniorer", "Företag"],
  },

  {
    slug: "wifi-natverk",
    eyebrow: "WIFI & NÄTVERK",
    title: "Stabilt WiFi och nätverk",
    shortTitle: "WiFi & nätverk",
    intro:
      "Bättre täckning, stabilare uppkoppling och professionella nätverkslösningar.",
    description:
      "Vi felsöker långsamt internet, dålig WiFi-täckning och instabila nätverk och hjälper dig med router, mesh-system, kabeldragning och UniFi.",
    image: "/images/wifi-network.jpg",
    benefits: [
      "Stabil täckning där du faktiskt behöver den",
      "Router och mesh-WiFi",
      "Nätverk för hem och företag",
      "Installation och felsökning",
    ],
    problems: [
      "WiFi når inte hela bostaden",
      "Internet tappar anslutningen",
      "Routern behöver bytas eller konfigureras",
      "Mesh-system fungerar dåligt",
      "Nätverk behövs på kontoret",
      "Flera enheter konkurrerar om uppkopplingen",
    ],
    result:
      "Du får ett nätverk som är stabilt, lätt att använda och anpassat efter lokalen.",
    audience: ["Privatpersoner", "Företag", "Fastigheter"],
  },

  {
    slug: "it-sakerhet",
    eyebrow: "IT-SÄKERHET",
    title: "Tryggare datorer, konton och filer",
    shortTitle: "IT-säkerhet",
    intro:
      "Praktisk IT-säkerhet som skyddar utan att göra vardagen krångligare.",
    description:
      "Vi hjälper med backup, lösenord, tvåstegsverifiering, säkerhetsinställningar och skydd för datorer och konton.",
    image: "/images/security-backup.jpg",
    benefits: [
      "Backup av viktiga filer",
      "Säkrare lösenord och konton",
      "Tvåstegsverifiering",
      "Skydd för hem och företag",
    ],
    problems: [
      "Osäkerhet kring backup",
      "Misstänkt virus eller intrång",
      "Svaga eller återanvända lösenord",
      "Konton saknar 2FA",
      "Viktiga filer finns bara på en enhet",
      "Behov av bättre säkerhetsrutiner",
    ],
    result:
      "Vi bygger ett säkerhetsupplägg som fungerar i vardagen, inte bara på papper.",
    audience: ["Privatpersoner", "Seniorer", "Företag"],
  },

  {
    slug: "microsoft-365",
    eyebrow: "MICROSOFT 365",
    title: "Microsoft 365 utan onödigt krångel",
    shortTitle: "Microsoft 365",
    intro:
      "Outlook, Teams, OneDrive och Microsoft 365 konfigurerat på rätt sätt.",
    description:
      "Vi hjälper företag och användare med Microsoft 365, konton, e-post, Teams, OneDrive och synkronisering.",
    image: "/images/microsoft-365-support.jpg",
    benefits: [
      "Outlook och e-post",
      "Teams och samarbete",
      "OneDrive och filsynkronisering",
      "Konton och säkerhet",
    ],
    problems: [
      "Outlook synkar inte",
      "OneDrive visar fel",
      "Teams fungerar inte som det ska",
      "Nya användare behöver sättas upp",
      "E-post behöver flyttas",
      "Microsoft-konton behöver säkras",
    ],
    result:
      "Målet är en Microsoft 365-miljö som är tydlig, säker och enkel för användarna.",
    audience: ["Företag", "Organisationer", "Privatpersoner"],
  },

  {
    slug: "fjarrsupport",
    eyebrow: "FJÄRRSUPPORT",
    title: "Snabb support på distans",
    shortTitle: "Fjärrsupport",
    intro:
      "Få hjälp direkt utan att vänta på ett hembesök.",
    description:
      "Många problem med dator, e-post, program och inställningar kan lösas snabbt och säkert via fjärrsupport.",
    image: "/images/remote-support.jpg",
    benefits: [
      "Ingen restid",
      "Snabb start",
      "Säker anslutning",
      "Du ser vad teknikern gör",
    ],
    problems: [
      "E-post fungerar inte",
      "Program visar fel",
      "Inställningar behöver ändras",
      "Konton behöver hjälp",
      "Datorn behöver felsökas",
      "Microsoft 365 problem",
    ],
    result:
      "När problemet kan lösas på distans får du en snabbare och smidigare väg till fungerande teknik.",
    audience: ["Privatpersoner", "Seniorer", "Företag"],
  },

  {
    slug: "kameraovervakning",
    eyebrow: "UNIFI PROTECT",
    title: "Modern kameraövervakning",
    shortTitle: "Kameraövervakning",
    intro:
      "Trygga kameralösningar för hem, kontor och verksamheter.",
    description:
      "Vi hjälper med installation och konfiguration av moderna kamerasystem med hög bildkvalitet och säker fjärråtkomst.",
    image: "/images/camera-unifi-protect.jpg",
    benefits: [
      "Kameror för ute och inne",
      "Mobil åtkomst",
      "Smarta notiser",
      "Professionell installation",
    ],
    problems: [
      "Behov av bättre överblick",
      "Gamla kameror ger dålig bild",
      "Fjärråtkomst saknas",
      "Ny anläggning ska planeras",
      "UniFi Protect ska installeras",
      "Kameror behöver integreras i nätverket",
    ],
    result:
      "Du får ett modernt system som är lätt att använda och ger bättre kontroll över miljön.",
    audience: ["Företag", "Fastigheter", "Privatpersoner"],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
