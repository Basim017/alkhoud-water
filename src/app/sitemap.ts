import type { MetadataRoute } from "next";
import { locales } from "@/content";
import { absolute, localePath } from "@/lib/site";

/**
 * The sitemap.
 *
 * Two URLs — the site is one page per locale — each declaring the full set of
 * alternates, including `x-default`. Search engines treat hreflang as a claim
 * that has to be reciprocal: every page in the set must point at every other
 * one, or the whole cluster is ignored. Emitting them from one loop is what
 * keeps that true.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, absolute(localePath[locale])]),
  );

  return locales.map((locale) => ({
    url: absolute(localePath[locale]),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: locale === "en" ? 1 : 0.9,
    alternates: { languages: { ...languages, "x-default": absolute(localePath.en) } },
  }));
}
