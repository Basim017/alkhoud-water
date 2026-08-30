import { company } from "@/content";

type LogoProps = {
  /** `light` inverts the mark for use on photography and dark bands. */
  tone?: "auto" | "light";
  className?: string;
};

/**
 * The Al Khoud wordmark, rebuilt as live text.
 *
 * The original is a single-colour raster (#18418E, kept as `khoud-700`).
 * As text it stays crisp at any size, inverts on photography, themes with
 * the rest of the page, and is readable by assistive tech. The original
 * artwork is kept at `public/media/logo.webp` for reference.
 */
export function Logo({ tone = "auto", className = "" }: LogoProps) {
  const color = tone === "light" ? "text-white" : "text-khoud-700 dark:text-stone-100";

  return (
    <span className={`inline-flex flex-col items-center ${color} ${className}`} translate="no">
      <span
        aria-hidden="true"
        dir="rtl"
        className="font-arabic block text-[1.35em] leading-[1.15] font-light tracking-[0.06em]"
      >
        {company.nameArabic}
      </span>
      <span className="font-display mt-[0.1em] block text-[1em] leading-none font-semibold tracking-[0.02em]">
        {company.name}
      </span>
      <span className="sr-only">{company.name}</span>
    </span>
  );
}
