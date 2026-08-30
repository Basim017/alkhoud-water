import { getDictionary } from "@/content";
import { ogContentType, ogImage, ogSize } from "@/components/site/og";

const t = getDictionary("ar");

export const alt = t.meta.title;
export const size = ogSize;
export const contentType = ogContentType;

/**
 * The Arabic route deliberately renders the latin card.
 *
 * `next/og` shapes text with satori, whose OpenType parser does not
 * implement GSUB lookup format 3 — the substitution table Arabic needs for
 * contextual letter joining. Feeding it Arabic fails the build outright
 * ("lookupType: 5 - substFormat: 3 is not yet supported"), and rendering
 * Arabic without shaping would show disjointed letterforms, which is worse
 * than showing none. The card carries the latin wordmark, which is half of
 * the real logo, plus the toll free number.
 */
export default async function OpengraphImage() {
  return ogImage("en");
}
