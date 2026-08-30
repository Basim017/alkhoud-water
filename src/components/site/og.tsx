import { ImageResponse } from "next/og";
import { getDictionary, type Locale } from "@/content";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/**
 * The share card, drawn at build time in the site's own palette: limestone
 * above, aquifer below, brand blue on the rule between them.
 *
 * Kept as drawn shapes rather than the photograph — `next/og` would have to
 * fetch and decode the 1.2 MB source at build time for every locale, and a
 * link preview does not need it.
 */
export function ogImage(locale: Locale) {
  const t = getDictionary(locale);
  const rtl = locale === "ar";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(to bottom, #f6f3ee 0%, #ede8e0 52%, #c6bcab 70%, #1a1815 100%)",
          padding: "76px 84px",
          position: "relative",
          direction: rtl ? "rtl" : "ltr",
        }}
      >
        {/* Strata */}
        {[0.62, 0.7, 0.78].map((top, i) => (
          <div
            key={top}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: `${top * 100}%`,
              height: 1,
              background: `rgba(43,40,35,${0.28 - i * 0.07})`,
            }}
          />
        ))}

        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 132, background: "#1a1815" }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 25, letterSpacing: rtl ? 0 : 6, color: "#18418e", fontWeight: 600 }}>
            {t.hero.eyebrow}
          </div>
          <div style={{ fontSize: 104, color: "#2b2823", marginTop: 26, fontWeight: 700, letterSpacing: -2 }}>
            {t.hero.title}
          </div>
          <div style={{ fontSize: 28, color: "#5c574e", marginTop: 22, maxWidth: 860, lineHeight: 1.45 }}>
            {t.meta.description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#f6f3ee",
            fontSize: 29,
            fontWeight: 600,
          }}
        >
          <div style={{ display: "flex" }}>Al Khoud</div>
          <div style={{ display: "flex", color: "#4fc3e8" }} dir="ltr">
            80070066
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
