export type AudiencePage = {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  description: string;
  image: string;
  highlights: string[];
  services: {
    title: string;
    text: string;
  }[];
  reassurance: string;
  ctaTitle: string;
};

export const audiences: AudiencePage[] = [
  {
    slug: "privat",
    eyebrow: "FÖR PRIVATPERSONER",
    title: "Personlig IT-hjälp hemma.",
    intro:
      "När datorn, WiFi, skrivaren eller e-posten krånglar hjälper vi dig på ett enkelt och tryggt sätt.",
    description:
      "Vi hjälper privatpersoner i Stockholm med vardagsteknik hemma, på distans eller genom hembesök. Du behöver inte veta vad problemet heter – berätta bara vad som inte fungerar.",
    image: "/images/private-support.jpg",
    highlights: [
      "Hembesök i Stockholmsområdet",
      "50% RUT på godkänd arbetskostnad",
      "Mac, PC, WiFi och skrivare",
      "Personlig hjälp utan teknikspråk",
    ],
    services: [
      {
        title: "Dator & Mac",
        text: "Felsökning, installation, uppdateringar, backup och långsamma datorer.",
      },
      {
        title: "WiFi hemma",
        text: "Bättre täckning, routerhjälp och stabil internetanslutning.",
      },
      {
        title: "E-post & konton",
        text: "Outlook, Apple Mail, lösenord, konton och synkronisering.",
      },
      {
        title: "Säkerhet",
        text: "Backup, lösenord, tvåstegsverifiering och skydd av viktiga filer.",
      },
    ],
    reassurance:
      "Du får tydlig information innan vi börjar och vi förklarar vad vi gör under arbetets gång.",
    ctaTitle: "Berätta vad som krånglar.",
  },

  {
    slug: "foretag",
    eyebrow: "FÖR FÖRETAG",
    title: "IT som håller verksamheten igång.",
    intro:
      "Personlig och professionell IT-support för företag som behöver stabil teknik utan onödiga avbrott.",
    description:
      "Vi hjälper företag i Stockholm med datorer, Microsoft 365, nätverk, WiFi, säkerhet, backup och löpande support.",
    image: "/images/business-support.jpg",
    highlights: [
      "Support på plats och på distans",
      "Microsoft 365 & användarkonton",
      "Nätverk, WiFi och UniFi",
      "Säkerhet och backup",
    ],
    services: [
      {
        title: "Microsoft 365",
        text: "Vi hjälper företag att få ut mer av Microsoft 365 med rätt struktur, säkerhet och administration. Support för Outlook, Teams, OneDrive och SharePoint – från användarkonton till den dagliga driften.",
      },
      {
        title: "Nätverk",
        text: "Vi bygger stabila och säkra nätverk för kontor och verksamheter. WiFi, nätverksinstallation, UniFi och felsökning anpassas efter hur företaget faktiskt arbetar.",
      },
      {
        title: "Säkerhet",
        text: "Vi stärker företagets IT-säkerhet med backup, tvåstegsverifiering och bättre rutiner. Fokus ligger på att minska risker och göra skyddet enkelt att använda i vardagen.",
      },
      {
        title: "Löpande support",
        text: "Få en trygg kontakt när personalen behöver teknisk hjälp. Vi hjälper till med datorer, program, konton och vardagliga IT-problem så att arbetet kan fortsätta utan onödiga stopp.",
      },
    ],
    reassurance:
      "Vi arbetar strukturerat och dokumenterar viktiga förändringar så att företagets IT-miljö förblir begriplig och stabil.",
    ctaTitle: "Behöver företaget bättre IT-support?",
  },

  {
    slug: "seniorer",
    eyebrow: "FÖR SENIORER",
    title: "Teknikhjälp i lugn takt.",
    intro:
      "Personlig hjälp med dator, mobil, surfplatta, e-post och internet – tydligt och utan stress.",
    description:
      "Vi hjälper seniorer hemma i Stockholm och förklarar tekniken på ett enkelt sätt. Du får tid att ställa frågor och förstå hur allt fungerar.",
    image: "/images/senior-support.jpg",
    highlights: [
      "Hjälp hemma hos dig",
      "Lugna och tydliga förklaringar",
      "Dator, mobil och surfplatta",
      "Internet, e-post och BankID",
    ],
    services: [
      {
        title: "Dator & surfplatta",
        text: "Inställningar, program, uppdateringar och vanliga problem.",
      },
      {
        title: "E-post",
        text: "Skicka, ta emot, lösenord och konton på ett enklare sätt.",
      },
      {
        title: "Internet & WiFi",
        text: "Hjälp med router, anslutning och WiFi i hemmet.",
      },
      {
        title: "Digital trygghet",
        text: "Säkrare lösenord, bedrägerier, BankID och grundläggande säkerhet.",
      },
    ],
    reassurance:
      "Vi tar oss tid. Målet är inte bara att lösa problemet utan att du ska känna dig tryggare med tekniken efteråt.",
    ctaTitle: "Vill du ha personlig hjälp hemma?",
  },
];

export function getAudience(slug: string) {
  return audiences.find((audience) => audience.slug === slug);
}
