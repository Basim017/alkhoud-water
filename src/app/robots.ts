import type { MetadataRoute } from "next";
import { absolute, isIndexable } from "@/lib/site";

/**
 * robots.txt.
 *
 * Preview deployments serve the same HTML as production on a different
 * hostname, so on anything but production this refuses everything outright —
 * belt and braces alongside the `noindex` in each layout's metadata.
 *
 * AI assistants are allowed deliberately. They are the fastest-growing source
 * of referral traffic for a brand like this one, and the crawlers that gather
 * the pages ask under their own user agents; blocking them removes Al Khoud
 * from the answers rather than protecting anything. `/api/` is the only path
 * kept out: it holds the contact endpoint, which has nothing to index.
 */
const AI_CRAWLERS = [
  "GPTBot", // OpenAI, training + retrieval
  "OAI-SearchBot", // ChatGPT search index
  "ChatGPT-User", // fetch on a user's behalf
  "ClaudeBot", // Anthropic
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini / AI Overviews grounding
  "GoogleOther",
  "Applebot",
  "Applebot-Extended",
  "meta-externalagent",
  "Bingbot",
  "cohere-ai",
  "DuckAssistBot",
  "Amazonbot",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow: "/api/" })),
    ],
    sitemap: absolute("/sitemap.xml"),
    // No `host:` — it is a Yandex-only directive that Google and Bing ignore,
    // and the canonical tags already say which origin is authoritative.
  };
}
