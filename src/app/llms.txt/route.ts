import { company, contact, getDictionary, skus, social } from "@/content";
import { absolute, isIndexable, siteUrl } from "@/lib/site";

/**
 * llms.txt — a plain-text brief for AI assistants, at a conventional path.
 *
 * The page itself is a scroll-driven, motion-heavy single page: excellent for
 * a person, and more work than it should be for a model that only wants to
 * know what Al Khoud sells and how to order it. This states the same facts
 * flatly, in the order a question about the brand tends to arrive.
 *
 * It is generated from the dictionaries rather than written by hand, so it
 * cannot drift out of step with the page it summarises — a stale brief is
 * worse than no brief, because it is the version that gets quoted.
 */
export const dynamic = "force-static";

export function GET() {
  const en = getDictionary("en");

  const body = `# ${company.name} — ${en.meta.title.split("—")[1]?.trim() ?? en.meta.description}

> ${en.meta.description}

${company.name} (${company.nameArabic}) is a natural bottled-water brand from the
Sultanate of Oman, produced by ${company.legalName} since ${company.founded}. The water is
drawn from the Al Hajjar mountains, where rainfall filters through roughly half a
kilometre of igneous rock before collecting as mineral-rich groundwater.

## Pages

- [English](${absolute("/")}): the full site — range, process, story, careers, contact.
- [العربية](${absolute("/ar")}): the same site in Arabic.

## Retail range

${skus.map((s) => `- ${s.volume} ${s.id === "c200" ? "sealed cup" : "bottle"}`).join("\n")}

## Home and office service

${en.products.services.map((s) => `- ${s.name} (${s.volume}): ${s.body}`).join("\n")}

## How it is made

${en.process.pillars.map((p) => `- ${p.title}: ${p.body}`).join("\n")}

## Contact

- Toll free (Oman): ${contact.tollFree}
- Telephone: ${contact.phone}
- Email: ${contact.email}
- Address: ${contact.addressLines.join(" ")}
- Delivery: free to homes and offices; coolers delivered and serviced on site.

## Elsewhere

${social.map((s) => `- ${s.label}: ${s.href}`).join("\n")}

## Notes

- Site: ${siteUrl}
- Languages: English (en), Arabic (ar)
- Prices are not published online; contact the toll-free line for a quote.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // Static content, but cheap to revalidate — and it must not be cached
      // publicly from a preview deployment.
      "Cache-Control": isIndexable
        ? "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800"
        : "no-store",
    },
  });
}
