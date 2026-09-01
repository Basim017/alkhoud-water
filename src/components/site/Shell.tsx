import { ThemeScript } from "@/components/ThemeScript";
import {
  company,
  contact,
  getDictionary,
  skus,
  social,
  type Locale,
} from "@/content";
import { absolute, localePath, siteUrl } from "@/lib/site";

/**
 * Everything shared between the two root layouts.
 *
 * Each locale has its own root layout so `<html lang>` and `<html dir>` are
 * correct in the server-rendered markup — RTL cannot be bolted on after
 * hydration without a flash of the wrong direction.
 *
 * hreflang is deliberately NOT emitted here. Next builds it from each
 * layout's `alternates.languages`; a second hand-written set only risks the
 * two disagreeing, and a contradictory pair is worse than none — search
 * engines drop the whole cluster rather than pick a winner.
 */
export function ShellHead({ locale }: { locale: Locale }) {
  return (
    <>
      <ThemeScript />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <script
        type="application/ld+json"
        // Serialised from local constants, never user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(locale)) }}
      />
    </>
  );
}

/**
 * One `@graph` rather than several loose blocks, so the nodes can reference
 * each other by `@id` and a crawler reads them as one organisation with a
 * site, a page and a catalogue — not four unrelated assertions.
 *
 * Everything here is stated by the company itself. Facts that would help but
 * are not published — opening hours, coordinates, prices — are left out
 * rather than guessed: structured data that disagrees with the page is worse
 * than structured data that is merely thin.
 */
function structuredData(locale: Locale) {
  const t = getDictionary(locale);
  const isArabic = locale === "ar";
  const pageUrl = absolute(localePath[locale]);

  const orgId = `${siteUrl}/#organization`;
  const siteId = `${siteUrl}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": orgId,
        name: isArabic ? company.nameArabic : company.name,
        alternateName: isArabic ? company.name : company.nameArabic,
        legalName: company.legalName,
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: absolute("/brand/logo-on-white.png"),
          caption: company.name,
        },
        image: absolute("/media/lineup.webp"),
        description: t.meta.description,
        foundingDate: String(company.founded),
        email: contact.email,
        telephone: contact.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: "P. O. Box: 2727, P. C. 111",
          addressLocality: "Al Seeb",
          addressRegion: "Muscat",
          addressCountry: "OM",
        },
        // Their own copy: water "for the people of Oman", supplied "across
        // Muscat and beyond".
        areaServed: { "@type": "Country", name: "Oman" },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: `+968 ${contact.tollFree}`,
            email: contact.email,
            // The site states a multilingual call centre; these are the two
            // languages the site itself is published in.
            availableLanguage: ["ar", "en"],
            areaServed: "OM",
          },
        ],
        sameAs: social.map((s) => s.href),
        knowsLanguage: ["ar", "en"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t.products.title,
          itemListElement: [
            ...skus.map((sku, i) => ({
              "@type": "Offer",
              position: i + 1,
              itemOffered: {
                "@type": "Product",
                name: `${company.name} ${sku.volume}`,
                image: absolute(sku.src),
                brand: { "@id": orgId },
                category: "Bottled drinking water",
                size: sku.volume,
              },
            })),
            ...t.products.services.map((service, i) => ({
              "@type": "Offer",
              position: skus.length + i + 1,
              itemOffered: {
                "@type": "Service",
                name: service.name,
                description: service.body,
                provider: { "@id": orgId },
              },
            })),
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: siteUrl,
        name: company.name,
        description: t.meta.description,
        publisher: { "@id": orgId },
        inLanguage: locale,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: t.meta.title,
        description: t.meta.description,
        isPartOf: { "@id": siteId },
        about: { "@id": orgId },
        inLanguage: locale,
        primaryImageOfPage: absolute("/media/lineup.webp"),
      },
      {
        "@type": "AboutPage",
        "@id": `${pageUrl}#story`,
        url: `${pageUrl}#story`,
        name: t.story.title,
        isPartOf: { "@id": siteId },
        about: { "@id": orgId },
        inLanguage: locale,
      },
    ],
  };
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
