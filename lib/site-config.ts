export const siteConfig = {
  phoneDisplay: "08-400 117 26",
  phoneHref: "tel:+46840011726",

  email: "kontakt@macsupportstockholm.se",
  emailHref: "mailto:kontakt@macsupportstockholm.se",

  bookingPath: "/boka",
  bookingProviderUrl: "https://go.oncehub.com/datorsupport",

  onceHub: {
    bookingCalendarId: "",
    embedScriptUrl: "https://cdn3.onceplatform.com/cal/embed.js",
  },

  contactPath: "/kontakt",
  servicesPath: "/tjanster",

  social: {
    facebook: "https://www.facebook.com/MinDatorSupport/",
    instagram: "",
    linkedin: "",
    youtube: "",
  },
} as const;
