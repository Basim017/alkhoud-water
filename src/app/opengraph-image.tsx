import { ImageResponse } from "next/og";
import { company, hero } from "@/content/site";

export const alt = `${company.name} — ${company.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card, drawn at build time.
 *
 * It reuses the site's own composition — pale sky above a deep water
 * table, with an Al Hajjar ridge line between them — so a link preview
 * reads as the same brand as the page it opens.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(to bottom, #eef4fd 0%, #d9e6fa 46%, #5688de 72%, #0a1830 100%)",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Ridge line */}
        <svg
          width="1200"
          height="230"
          viewBox="0 140 1440 260"
          preserveAspectRatio="none"
          style={{ position: "absolute", left: 0, bottom: 0 }}
        >
          <path
            d="M0 400V296l110-40 96 54 84-124 82 92 96-54 92 78 88-152 94 96 116-46 82 94 118-64 112 66 106-76 94 66 70-34v208Z"
            fill="#102750"
          />
        </svg>

        {/* Water */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 120,
            background: "linear-gradient(to bottom, #102750, #0a1830)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#234db0",
              fontWeight: 600,
            }}
          >
            Al Hajjar Mountains · Sultanate of Oman
          </div>
          <div
            style={{
              fontSize: 108,
              color: "#102750",
              marginTop: 26,
              fontWeight: 700,
              letterSpacing: -2,
            }}
          >
            {hero.title}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#46586e",
              marginTop: 20,
              maxWidth: 880,
              lineHeight: 1.45,
            }}
          >
            The purest form of hydration coming straight from nature.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#ffffff",
            fontSize: 30,
            fontWeight: 600,
          }}
        >
          <div style={{ display: "flex" }}>{company.name}</div>
          <div style={{ display: "flex", color: "#7fdcf0" }}>Toll Free 80070066</div>
        </div>
      </div>
    ),
    size,
  );
}
