import "server-only";

import { company } from "@/content";

/**
 * Where this deployment actually lives, and whether it should be indexed.
 *
 * Every canonical, hreflang, Open Graph URL and sitemap entry is built from
 * `siteUrl`, so getting it wrong is not cosmetic: pointing canonicals at a
 * domain this deployment does not serve tells search engines to index that
 * other site instead of this one.
 *
 * Resolution order:
 *
 *   1. `NEXT_PUBLIC_SITE_URL` — set this once the site is live on its final
 *      domain. It wins over everything.
 *   2. `VERCEL_PROJECT_PRODUCTION_URL` — the project's stable production
 *      hostname, which Vercel sets on every build. Correct by default before
 *      a custom domain is attached.
 *   3. The company domain, as a last resort for local builds.
 *
 * Server-only: `VERCEL_ENV` and friends are not exposed to the browser, and
 * reading them in a shared module would resolve differently on each side.
 */
function resolve(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;

  return company.url.replace(/\/+$/, "");
}

export const siteUrl = resolve();

/** An absolute URL for a site-relative path. */
export function absolute(path: string): string {
  return new URL(path, `${siteUrl}/`).toString();
}

/**
 * Only the production deployment may be indexed.
 *
 * Vercel gives every push a preview URL that serves the same HTML. Left
 * indexable, those become duplicates competing with production — and because
 * they are real, crawlable pages, `noindex` is the only thing that keeps them
 * out. `VERCEL_ENV` is "production", "preview" or "development"; anything
 * that is not production, including local builds, stays out of the index.
 */
export const isIndexable = process.env.VERCEL_ENV === "production";

/** Canonical path for each locale. */
export const localePath = { en: "/", ar: "/ar" } as const;
