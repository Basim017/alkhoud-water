import type { Metadata, Viewport } from "next";
import { Inter, Noto_Kufi_Arabic, Playfair_Display } from "next/font/google";
import { company, contact, hero, social } from "@/content/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Echoes the high-contrast serif of the Al Khoud latin wordmark. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

/** Echoes the light, open Arabic in the mark. */
const kufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["200", "300", "400"],
  variable: "--font-kufi",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: `${company.name} — ${company.descriptor}`,
    template: `%s | ${company.name}`,
  },
  description: hero.body,
  keywords: [
    "Al Khoud",
    "bottled water Oman",
    "natural water Muscat",
    "water delivery Oman",
    "water cooler Oman",
    "5 gallon water",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: company.name,
    title: `${company.name} — ${company.tagline}`,
    description: hero.body,
    url: company.url,
    locale: "en_OM",
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} — ${company.tagline}`,
    description: hero.body,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7fafc",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

/** Structured data so the business is machine-readable. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: `${company.name} — ${company.descriptor}`,
  legalName: company.legalName,
  url: company.url,
  telephone: contact.phone,
  email: contact.email,
  foundingDate: String(company.founded),
  address: {
    "@type": "PostalAddress",
    streetAddress: "P. O. Box: 2727, P. C. 111",
    addressLocality: contact.address.locality,
    addressRegion: contact.address.region,
    addressCountry: contact.address.country,
  },
  sameAs: social.map((item) => item.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${kufi.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <script
          type="application/ld+json"
          // Serialised from a local constant, not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-full focus:bg-brand-700 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
