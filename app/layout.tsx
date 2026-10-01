import type { Metadata } from "next";

import "./globals.css";
import "./premium.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.macsupportstockholm.se"),

  title: {
    default: "MacSupport Stockholm | Mac- & IT-support i Stockholm",
    template: "%s | MacSupport Stockholm",
  },

  description:
    "Professionell Mac- och IT-support i Stockholm för privatpersoner, seniorer och företag. Hjälp med Mac, WiFi, nätverk, Microsoft 365, säkerhet och hembesök.",

  keywords: [
    "MacSupport Stockholm",
    "Mac-support Stockholm",
    "IT-support Stockholm",
    "datorhjälp Stockholm",
    "Mac hjälp Stockholm",
    "WiFi support Stockholm",
    "nätverk support Stockholm",
    "Microsoft 365 support",
    "IT-säkerhet Stockholm",
    "hembesök IT-support Stockholm",
  ],

  alternates: {
    canonical: "https://www.macsupportstockholm.se/",
  },

  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: "https://www.macsupportstockholm.se/",
    siteName: "MacSupport Stockholm",
    title: "MacSupport Stockholm | Mac- & IT-support i Stockholm",
    description:
      "Professionell Mac- och IT-support i Stockholm för privatpersoner, seniorer och företag.",
    images: [
      {
        url: "/images/hero-macbook.jpg",
        width: 1200,
        height: 630,
        alt: "MacSupport Stockholm – professionell Mac- och IT-support",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "MacSupport Stockholm | Mac- & IT-support i Stockholm",
    description:
      "Professionell Mac- och IT-support i Stockholm för privatpersoner, seniorer och företag.",
    images: ["/images/hero-macbook.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.macsupportstockholm.se/#organization",
  name: "MacSupport Stockholm",
  url: "https://www.macsupportstockholm.se/",
  logo: {
    "@type": "ImageObject",
    url: "https://www.macsupportstockholm.se/logos/logo-mark.png",
  },
  image: "https://www.macsupportstockholm.se/images/hero-macbook.jpg",
  telephone: "+46840011726",
  email: "kontakt@macsupportstockholm.se",
  areaServed: {
    "@type": "City",
    name: "Stockholm",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.macsupportstockholm.se/#website",
  url: "https://www.macsupportstockholm.se/",
  name: "MacSupport Stockholm",
  alternateName: "Macsupport Stockholm",
  publisher: {
    "@id": "https://www.macsupportstockholm.se/#organization",
  },
  inLanguage: "sv-SE",
};

const structuredData = [organizationSchema, websiteSchema];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" data-scroll-behavior="smooth">
      <head>
        <script
          id="CookieConsent"
          src="https://policy.app.cookieinformation.com/uc.js"
          data-culture="SV"
          data-gcm-version="2.0"
          type="text/javascript"
        />
      </head>
      <body>
        {structuredData.map((schema) => (
          <script
            key={schema["@id"] ?? schema.name ?? "schema"}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
            }}
          />
        ))}

        <ScrollToTop />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
