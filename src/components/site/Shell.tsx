import { ThemeScript } from "@/components/ThemeScript";
import { company, contact, getDictionary, social, type Locale } from "@/content";

/**
 * Everything shared between the two root layouts.
 *
 * Each locale has its own root layout so `<html lang>` and `<html dir>` are
 * correct in the server-rendered markup — RTL cannot be bolted on after
 * hydration without a flash of the wrong direction.
 */
export function ShellHead({ locale }: { locale: Locale }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.name,
    legalName: company.legalName,
    url: company.url,
    telephone: contact.phone,
    email: contact.email,
    foundingDate: String(company.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: "P. O. Box: 2727, P. C. 111",
      addressLocality: "Al Seeb",
      addressRegion: "Muscat",
      addressCountry: "OM",
    },
    sameAs: social.map((s) => s.href),
  };

  return (
    <>
      <ThemeScript />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="alternate" hrefLang="en" href={`${company.url}`} />
      <link rel="alternate" hrefLang="ar" href={`${company.url}ar`} />
      <link rel="alternate" hrefLang="x-default" href={`${company.url}`} />
      <script
        type="application/ld+json"
        // Serialised from local constants, never user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <meta name="locale-hint" content={locale} />
    </>
  );
}

export function SkipLink({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-100 focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-bg"
    >
      {t.a11y.skipToContent}
    </a>
  );
}
