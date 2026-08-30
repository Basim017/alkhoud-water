import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import { ShellHead, SkipLink } from "@/components/site/Shell";
import { company, getDictionary } from "@/content";
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
  metadataBase: new URL(company.url),
  title: t.meta.title,
  description: t.meta.description,
  alternates: { canonical: "/ar", languages: { en: "/", ar: "/ar" } },
  openGraph: {
    type: "website",
    siteName: company.name,
    title: t.meta.title,
    description: t.meta.description,
    url: `${company.url}ar`,
    locale: "ar_OM",
    alternateLocale: "en_OM",
  },
  twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
  robots: { index: true, follow: true },
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
