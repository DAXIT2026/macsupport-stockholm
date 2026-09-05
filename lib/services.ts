export type ServiceFeature = {
  number: string;
  title: string;
  text: string;
};

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
  features: ServiceFeature[];
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
      "Filer ska flyttas från en gammal dator",
      "E-post eller konton fungerar inte",
    ],
    result:
      "Målet är att din Mac ska kännas enkel, stabil och trygg att använda igen.",
    audience: ["Privatpersoner", "Seniorer", "Företag"],
    features: [
      {
        number: "01",
        title: "Felsökning & prestanda",
        text:
          "Vi hittar orsaken till långsamhet, felmeddelanden, programproblem och andra störningar i macOS.",
      },
      {
        number: "02",
        title: "Installation & uppdatering",
        text:
          "Vi installerar och konfigurerar din Mac så att system, program och inställningar fungerar tillsammans.",
      },
      {
        number: "03",
        title: "Backup & data",
        text:
          "Vi hjälper dig att skydda viktiga filer, konfigurera backup och flytta data mellan gamla och nya enheter.",
      },
      {
        number: "04",
        title: "Konton & e-post",
        text:
          "Vi löser problem med Apple-ID, iCloud, e-post och andra konton som du använder i vardagen.",
      },
    ],
  },

  {
    slug: "fjarrsupport",
    eyebrow: "FJÄRRSUPPORT",
    title: "Snabb support på distans",
    shortTitle: "Fjärrsupport",
    intro:
      "Få personlig hjälp direkt utan att vänta på ett hembesök.",
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
      "Microsoft 365 fungerar inte som det ska",
    ],
    result:
      "När problemet kan lösas på distans får du en snabbare och smidigare väg till fungerande teknik.",
    audience: ["Privatpersoner", "Seniorer", "Företag"],
    features: [
      {
        number: "01",
        title: "Snabb felsökning",
        text:
          "Vi går igenom problemet tillsammans och kan i många fall börja felsöka direkt.",
      },
      {
        number: "02",
        title: "Säker anslutning",
        text:
          "Fjärranslutningen används endast när du godkänner den och du kan följa vad som händer på skärmen.",
      },
      {
        number: "03",
        title: "Program & konton",
        text:
          "Vi hjälper med e-post, program, inställningar, konton och andra problem som inte kräver ett besök.",
      },
      {
        number: "04",
        title: "Tydlig genomgång",
        text:
          "När vi är klara förklarar vi vad som gjordes och vad som är bra att känna till framåt.",
      },
    ],
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
    features: [
      {
        number: "01",
        title: "WiFi-analys",
        text:
          "Vi identifierar svaga områden, störningar och flaskhalsar som påverkar hastighet och stabilitet.",
      },
      {
        number: "02",
        title: "Router & mesh",
        text:
          "Vi väljer, installerar och konfigurerar utrustning efter bostadens eller verksamhetens verkliga behov.",
      },
      {
        number: "03",
        title: "Kabel & nätverk",
        text:
          "När trådlöst inte räcker planerar vi en stabil nätverkslösning med rätt anslutningar och placering.",
      },
      {
        number: "04",
        title: "UniFi & företag",
        text:
          "Vi hjälper verksamheter med professionell nätverksutrustning, struktur och en lösning som kan växa över tid.",
      },
    ],
  },

  {
    slug: "it-sakerhet",
    eyebrow: "IT-SÄKERHET",
    title: "Tryggare datorer, konton och filer",
    shortTitle: "IT-säkerhet",
    intro:
      "Praktisk IT-säkerhet som skyddar utan att göra vardagen krångligare.",
    description:
      "Vi hjälper dig med backup, lösenord, tvåstegsverifiering, säkerhetsinställningar och skydd för datorer och konton.",
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
      "Konton saknar tvåstegsverifiering",
      "Viktiga filer finns bara på en enhet",
      "Behov av bättre säkerhetsrutiner",
    ],
    result:
      "Vi bygger ett säkerhetsupplägg som fungerar i vardagen, inte bara på papper.",
    audience: ["Privatpersoner", "Seniorer", "Företag"],
    features: [
      {
        number: "01",
        title: "Backup & återställning",
        text:
          "Vi hjälper dig att skapa en tydlig backup-lösning så att viktiga filer inte är beroende av en enda enhet.",
      },
      {
        number: "02",
        title: "Kontosäkerhet",
        text:
          "Vi ser över lösenord, tvåstegsverifiering och säkerhetsinställningar för de konton som är viktigast.",
      },
      {
        number: "03",
        title: "Dator & enheter",
        text:
          "Vi kontrollerar grundläggande skydd, uppdateringar och inställningar på datorer och andra enheter.",
      },
      {
        number: "04",
        title: "Trygga rutiner",
        text:
          "Du får praktiska rekommendationer som är lätta att följa och som minskar onödiga risker i vardagen.",
      },
    ],
  },

  {
    slug: "kameraovervakning",
    eyebrow: "UNIFI PROTECT",
    title: "Modern kameraövervakning",
    shortTitle: "Kameraövervakning",
    intro:
      "Genomtänkta kameralösningar för hem, kontor och verksamheter.",
    description:
      "Vi hjälper till med planering, installation och konfiguration av moderna kamerasystem med hög bildkvalitet och säker fjärråtkomst.",
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
      "En ny anläggning ska planeras",
      "UniFi Protect ska installeras",
      "Kameror behöver integreras i nätverket",
    ],
    result:
      "Du får ett modernt system som är lätt att använda och ger bättre kontroll över miljön.",
    audience: ["Företag", "Fastigheter", "Privatpersoner"],
    features: [
      {
        number: "01",
        title: "Planering & placering",
        text:
          "Vi går igenom miljön och planerar kamerornas placering utifrån täckning, användning och tekniska förutsättningar.",
      },
      {
        number: "02",
        title: "Installation",
        text:
          "Kameror, nätverk och tillhörande utrustning installeras med fokus på en ren och stabil lösning.",
      },
      {
        number: "03",
        title: "Mobil åtkomst",
        text:
          "Vi konfigurerar åtkomst och notiser så att systemet blir enkelt att använda även när du inte är på plats.",
      },
      {
        number: "04",
        title: "UniFi Protect",
        text:
          "Vi hjälper med konfiguration och integration av UniFi Protect i en genomtänkt nätverksmiljö.",
      },
    ],
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
    features: [
      {
        number: "01",
        title: "Outlook & e-post",
        text:
          "Vi konfigurerar e-post, konton och Outlook och löser problem med anslutning och synkronisering.",
      },
      {
        number: "02",
        title: "Teams & samarbete",
        text:
          "Vi hjälper användare att få Teams och den dagliga kommunikationen att fungera på ett tydligt sätt.",
      },
      {
        number: "03",
        title: "OneDrive & filer",
        text:
          "Vi konfigurerar synkronisering och hjälper till att skapa en tryggare struktur för filer och åtkomst.",
      },
      {
        number: "04",
        title: "Konton & säkerhet",
        text:
          "Vi hjälper till med användare, behörigheter och grundläggande säkerhetsinställningar i Microsoft 365.",
      },
    ],
  },

  {
    slug: "foretagssupport",
    eyebrow: "IT FÖR FÖRETAG",
    title: "Personlig IT-support för företag",
    shortTitle: "Företagssupport",
    intro:
      "Praktisk och personlig IT-support för mindre företag som vill att tekniken bara ska fungera.",
    description:
      "Vi hjälper företag med datorer, användare, nätverk, Microsoft 365 och löpande IT-frågor. Du får en personlig kontakt och hjälp anpassad efter verksamheten.",
    image: "/images/business-support.jpg",
    benefits: [
      "En personlig kontakt för IT-frågor",
      "Support på plats och på distans",
      "Hjälp med användare och arbetsplatser",
      "Nätverk, Microsoft 365 och säkerhet",
    ],
    problems: [
      "Medarbetare behöver löpande IT-hjälp",
      "Nya datorer och användare ska sättas upp",
      "Microsoft 365 behöver administreras",
      "Nätverket är instabilt",
      "Säkerhetsrutiner behöver förbättras",
      "Företaget saknar en tydlig IT-kontakt",
    ],
    result:
      "Målet är en IT-miljö som fungerar stabilt i vardagen och där det är enkelt att få hjälp när något behöver lösas.",
    audience: ["Småföretag", "Kontor", "Organisationer"],
    features: [
      {
        number: "01",
        title: "Löpande support",
        text:
          "Medarbetare får en tydlig väg till hjälp när datorer, program, konton eller annan teknik krånglar.",
      },
      {
        number: "02",
        title: "Arbetsplatser & användare",
        text:
          "Vi hjälper till med nya datorer, konton, e-post och grundläggande konfiguration för nya och befintliga användare.",
      },
      {
        number: "03",
        title: "Nätverk & Microsoft 365",
        text:
          "Vi hjälper verksamheten med stabil uppkoppling, Microsoft 365 och de tjänster som används i det dagliga arbetet.",
      },
      {
        number: "04",
        title: "Struktur & säkerhet",
        text:
          "Vi hjälper till att skapa tydligare rutiner för backup, konton, åtkomst och den tekniska miljön.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}