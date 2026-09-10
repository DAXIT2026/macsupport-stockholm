export type DaxItSite = {
  name: string;
  url: string;
  focus:
    | "general"
    | "support"
    | "mac"
    | "network"
    | "business";
};

export const daxItSites: readonly DaxItSite[] = [
  {
    name: "Datahjälp",
    url: "https://www.datahjalp.nu/",
    focus: "general",
  },
  {
    name: "Datasupport Stockholm",
    url: "https://www.datasupport-stockholm.se/",
    focus: "support",
  },
  {
    name: "Datasupport",
    url: "https://www.datasupport.one/",
    focus: "support",
  },
  {
    name: "Datatekniker",
    url: "https://www.datatekniker.nu/",
    focus: "support",
  },
  {
    name: "Datorhjälp Stockholm",
    url: "https://datorhjalp-stockholm.se/",
    focus: "support",
  },
  {
    name: "Datorhjälp Täby",
    url: "https://datorhjalptaby.se/",
    focus: "support",
  },
  {
    name: "IT-support Stockholm",
    url: "https://it-support-stockholm.se/",
    focus: "support",
  },
  {
    name: "IT-support",
    url: "https://it-support.one/",
    focus: "support",
  },
  {
    name: "IT-tekniker",
    url: "https://it-tekniker.nu/",
    focus: "support",
  },
  {
    name: "IT-hjälp företag",
    url: "https://ithjalpforetag.se/",
    focus: "business",
  },
  {
    name: "Macsupport Nacka",
    url: "https://www.macsupportnacka.se/",
    focus: "mac",
  },
  {
    name: "Macsupport Stockholm",
    url: "https://www.macsupportstockholm.se/",
    focus: "mac",
  },
  {
    name: "Min Datorsupport",
    url: "https://www.mindatorsupport.se/",
    focus: "general",
  },
  {
    name: "Nätverkstekniker",
    url: "https://www.natverkstekniker.se/",
    focus: "network",
  },
  {
    name: "Trådlöst nätverk",
    url: "https://www.tradlost-natverk.se/",
    focus: "network",
  },
  {
    name: "Dax IT",
    url: "https://daxit.se/",
    focus: "business",
  },
] as const;

export const supportCompany = {
  name: "Min Datorsupport AB",
  heading: "Datorhjälp Stockholm – Min Datorsupport AB i Stockholm",
  description:
    "Datorhjälp Stockholm hos Min Datorsupport AB i hela Storstockholm. Boka tid hos oss för IT-support direkt.",
} as const;