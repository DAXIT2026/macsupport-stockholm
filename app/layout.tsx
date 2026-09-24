import type { Metadata } from "next";

import "./globals.css";
import "./premium.css";
import CookieConsent from "../components/CookieConsent";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export const metadata: Metadata = {
  metadataBase: new URL("https://macsupport-stockholm.se"),

  title: {
    default: "Macsupport Stockholm | Personlig IT-support",
    template: "%s | Macsupport Stockholm",
  },

  description:
    "Personlig IT-support i Stockholm för privatpersoner, seniorer och företag. Mac, WiFi, Microsoft 365, säkerhet, fjärrsupport och hembesök.",

  keywords: [
    "Macsupport Stockholm",
    "IT-support Stockholm",
    "datorhjälp Stockholm",
    "Mac hjälp",
    "WiFi support",
    "Microsoft 365 support",
    "fjärrsupport",
    "IT-säkerhet",
  ],

  openGraph: {
    type: "website",
    locale: "sv_SE",
    siteName: "Macsupport Stockholm",
    title: "Macsupport Stockholm",
    description: "Personlig IT-support i Stockholm för hem och företag.",
    images: [
      {
        url: "/images/hero-macbook.jpg",
        width: 1200,
        height: 630,
        alt: "Macsupport Stockholm",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Macsupport Stockholm",
    description: "Personlig IT-support i Stockholm.",
    images: ["/images/hero-macbook.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" data-scroll-behavior="smooth">
      <body>
        <ScrollToTop />
        <Header />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
