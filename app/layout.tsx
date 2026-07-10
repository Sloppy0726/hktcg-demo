import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const barlowCondensed = localFont({
  src: [
    {
      path: "./fonts/barlow-condensed-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/barlow-condensed-700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/barlow-condensed-800.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

const chironHei = localFont({
  src: "./fonts/chiron-hei-hk-subset.woff2",
  variable: "--font-body",
  weight: "400 700",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hktcg.com"),
  title: "HKTCG — Play. Collect. Connect.",
  description:
    "Step inside HKTCG at iSQUARE: trading cards, collectibles, play, events, grading, consignment and community in Tsim Sha Tsui.",
  icons: {
    icon: "/brand/favicon.png",
    shortcut: "/brand/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_HK",
    alternateLocale: "zh_HK",
    siteName: "HKTCG",
    title: "HKTCG — Play. Collect. Connect.",
    description: "Enter Hong Kong’s card destination at iSQUARE, Tsim Sha Tsui.",
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: "HKTCG — The T stands for Trading.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HKTCG — Play. Collect. Connect.",
    description: "Enter Hong Kong’s card destination at iSQUARE, Tsim Sha Tsui.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark light",
  themeColor: "#0B0C0F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${chironHei.variable}`}>
      <body>{children}</body>
    </html>
  );
}
