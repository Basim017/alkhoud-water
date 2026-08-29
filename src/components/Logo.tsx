import { company } from "@/content/site";

type LogoProps = {
  /** `deep` for light backgrounds, `light` for dark backgrounds. */
  tone?: "deep" | "light";
  className?: string;
  /** Stacks the Arabic wordmark above the latin one, as on the original mark. */
  stacked?: boolean;
};

/**
 * The Al Khoud wordmark, rebuilt as live text.
 *
 * The original asset is a 1505×873 raster in a single colour — #18418E,
 * kept here as `brand-700`. Rebuilding it as text keeps it crisp at any
 * size, lets it invert on dark sections, and makes the brand name
 * selectable and readable by assistive tech. The original artwork is
 * retained at `public/brand/logo-original.png` for reference.
 *
 * Sizing is driven entirely by `font-size` on the wrapper, so a single
 * `text-*` class scales the whole lockup.
 */
export function Logo({ tone = "deep", className = "", stacked = true }: LogoProps) {
  const color = tone === "deep" ? "text-brand-700" : "text-white";

  return (
    <span
      className={`inline-flex flex-col items-center ${color} ${className}`}
      translate="no"
    >
      {stacked && (
        <span
          aria-hidden="true"
          dir="rtl"
          // The Arabic sits a touch wider and lighter than the latin line,
          // matching the proportions of the original mark.
          className="font-arabic block text-[1.35em] leading-[1.15] font-extralight tracking-[0.06em]"
        >
          {company.nameArabic}
        </span>
      )}
      <span className="font-display mt-[0.12em] block text-[1em] leading-none font-semibold tracking-[0.02em]">
        {company.name}
      </span>
      <span className="sr-only">
        {company.name} — {company.descriptor}
      </span>
    </span>
  );
}
