import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import { ShellHead, SkipLink } from "@/components/site/Shell";
import { company, getDictionary, locales } from "@/content";
import { absolute, isIndexable, localePath, siteUrl } from "@/lib/site";
import "../globals.css";

/** Echoes the high-contrast Didone serif of the Al Khoud latin wordmark. */
const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni", display: "swap" });

/** One bilingual type system: Plex Sans and Plex Sans Arabic share a
 *  designer and close metrics, so English and Arabic set on one scale. */
const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

const t = getDictionary("ar");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: t.meta.title,
  description: t.meta.description,
  applicationName: company.name,
  authors: [{ name: company.legalName }],
  creator: company.legalName,
  publisher: company.legalName,
  category: "Food & Beverage",
  alternates: {
    canonical: localePath.ar,
    // Every locale plus x-default, declared identically on both pages.
    // hreflang is only honoured when the set is reciprocal.
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, absolute(localePath[l])])),
      "x-default": absolute(localePath.en),
    },
  },
  openGraph: {
    type: "website",
    siteName: company.name,
    title: t.meta.title,
    description: t.meta.description,
    url: absolute(localePath.ar),
    locale: "ar_OM",
    alternateLocale: "en_OM",
  },
  twitter: {
    card: "summary_large_image",
    // The company's own handle, taken from the social links it publishes.
    site: "@alkhoudwater",
    creator: "@alkhoudwater",
    title: t.meta.title,
    description: t.meta.description,
  },
  // Preview deployments serve identical HTML on a throwaway hostname.
  // Indexing them competes with production for the same queries.
  robots: isIndexable
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
    : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f3ee" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1815" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function ArLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${bodoni.variable} ${plex.variable} ${plexArabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ShellHead locale="ar" />
      </head>
      <body>
        <SkipLink locale="ar" />
        {children}
      </body>
    </html>
  );
}
