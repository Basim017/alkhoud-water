/**
 * Locale-independent facts: the company, how to reach it, and the media
 * pulled from the original site. Nothing here needs translating.
 */

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const company = {
  name: "Al Khoud",
  nameArabic: "الخوض",
  legalName: "Global Pioneer LLC",
  founded: 2016,
  url: "https://www.alkhoud.com/",
} as const;

export const contact = {
  email: "info@alkhoud.com",
  tollFree: "80070066",
  tollFreeHref: "tel:80070066",
  phone: "+968 2454 1617",
  phoneHref: "tel:+96824541617",
  addressLines: [
    "Global Pioneer LLC",
    "P. O. Box: 2727, P. C. 111,",
    "Al Khoud, Al Seeb, Muscat,",
    "Sultanate of Oman",
  ],
  addressLinesArabic: [
    "شركة الرائد العالمي ش.م.م",
    "ص. ب: 2727، ر. ب: 111،",
    "الخوض، السيب، مسقط،",
    "سلطنة عُمان",
  ],
} as const;

export const social = [
  { label: "Facebook", href: "https://www.facebook.com/alkhoudwater/" },
  { label: "X", href: "https://twitter.com/alkhoudwater" },
  { label: "Instagram", href: "https://www.instagram.com/alkhoud_water/" },
] as const;

export const careersUrl = "https://www.gpoman.com/careers";

/**
 * Media taken from the original alkhoud.com and re-encoded by
 * `scripts/build-media.py`. Intrinsic sizes are recorded so every image can
 * reserve its space and avoid layout shift.
 */
export const media = {
  hajjar: { src: "/media/hajjar.webp", width: 2400, height: 1590 },
  waterSurface: { src: "/media/water-surface.webp", width: 1280, height: 720 },
  lineup: { src: "/media/lineup.webp", width: 1800, height: 2028 },
  lineupLabelled: { src: "/media/lineup-labelled.webp", width: 1430, height: 1443 },
} as const;

/**
 * The header loop from the original site — a waterline rising through frame,
 * shot bright against white. Wix served it as a single 720p MP4; the encodes
 * and poster here are produced by `.github/workflows/fetch-hero-video.yml`.
 *
 * The MP4 is the primary and the WebM the fallback, which is the reverse of
 * the usual advice: on this footage x264 beats VP9 on size, so the only
 * browsers that should take the WebM are the ones that cannot decode H.264.
 */
export const heroVideo = {
  mp4: "/media/hero.mp4",
  webm: "/media/hero.webm",
  poster: "/media/hero-poster.webp",
  width: 1280,
  height: 720,
} as const;

/**
 * The retail range, read off the size badges on the company's own product
 * artwork — 1.5 Ltr, 500 ml, 250 ml and a 200 ml cup. Each entry points at
 * a cutout taken from the single lineup render.
 */
export const skus = [
  { id: "b1500", volume: "1.5 Ltr", src: "/media/bottle-1500ml.webp", width: 608, height: 2401 },
  { id: "b500", volume: "500 ml", src: "/media/bottle-500ml.webp", width: 440, height: 1598 },
  { id: "b250", volume: "250 ml", src: "/media/bottle-250ml.webp", width: 325, height: 1055 },
  { id: "c200", volume: "200 ml", src: "/media/cup-200ml.webp", width: 591, height: 680 },
] as const;

/** The four journey droplets, in the order the original site showed them. */
export const droplets = [
  { id: "rainfall", src: "/media/drop-rainfall.webp" },
  { id: "mountain", src: "/media/drop-mountain.webp" },
  { id: "filtered", src: "/media/drop-filtered.webp" },
  { id: "groundwater", src: "/media/drop-groundwater.webp" },
] as const;

export const dropletSize = { width: 360, height: 555 } as const;

export const copyright = "© 2018 Global Pioneer. All Right Reserved.";
