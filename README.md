# Al Khoud — Pure Natural Water

A rebuild of [alkhoud.com](https://www.alkhoud.com/) for Al Khoud (Global Pioneer LLC),
the natural water brand drawn from the Al Hajjar mountains in the Sultanate of Oman.

All body copy, contact details and social links are carried over verbatim from the
existing site. The design, structure and motion are new.

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Motion | `motion` (Framer Motion) |
| Fonts | Playfair Display, Inter, Noto Kufi Arabic via `next/font` |

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## The idea

The page is laid out as a **descent**, following the water itself:

1. **Hero** — rain over the Al Hajjar ridge line, three parallax ranges standing in the water table.
2. **The Journey** — the four stages from the original site (rainfall → mountain → filtration → ground water), as a vertical descent with a drop of light riding the leading edge of a scroll-linked line.
3. **Products & Service** — what actually gets delivered.
4. **Our Story** — the deepest, darkest point of the page.
5. **Hygiene & Safety** — rising back into the light, where the water is bottled.
6. **Careers** and **Contact**.

## Brand

The Al Khoud logo is a single colour: **`#18418E`**. That one value is the anchor for
the whole palette, read as the "deep aquifer" end of a scale running from mountain haze
(`brand-50`) down to bedrock (`brand-950`), with a bright `spring` water highlight and a
warm `hajjar` limestone accent. All tokens live in `src/app/globals.css` under `@theme`.

The wordmark is rebuilt as live text in `src/components/Logo.tsx` rather than shipped as
a bitmap, so it stays crisp at any size, inverts on dark sections, and is readable by
assistive tech. The original raster is kept at `public/brand/logo-original.png` for
reference.

## Content

Every string on the page comes from **`src/content/site.ts`**. Edit copy there, not in
components.

## Motion

Motion is deliberately in the "subtle/standard" tier — scroll reveals travel 8–16px over
400–600ms, hover feedback is under 2px and 150–200ms, and stagger steps are capped at
0.07s so the tail of a list never lags. Only `transform` and `opacity` are animated.

**Everything decorative is switched off under `prefers-reduced-motion`**, and content
renders in its final state — verified with a reduced-motion pass in Chromium.

## Things to wire up before launch

- **`src/app/api/contact/route.ts`** validates and accepts enquiries but does not yet
  deliver them anywhere. Connect an email provider (Resend, SES, an SMTP relay) or a CRM
  webhook at the marked `TODO` — until then, submissions are accepted and dropped.
- **`products.retailSizes`** in `src/content/site.ts` is empty. The current site does not
  publish retail bottle sizes, so none were invented; add the confirmed sizes and the
  Products section will render them.
- The footer carries the original site's `© 2018` notice verbatim. Update the year.
- Add a real Open Graph image (`src/app/opengraph-image.*`) — metadata is in place, the
  image is not.

## Accessibility

Checked with axe-core (WCAG 2.0/2.1/2.2 A + AA plus best-practice rules) at 1440×900 and
390×844: **zero violations**. Beyond that:

- Skip link is the first tab stop; every tab stop has a visible focus ring.
- Contrast was computed by hand for the pairs axe cannot evaluate over gradients — the
  hero, the animated headline sheen, and text on the deep sections all clear 4.5:1
  (3:1 for large display type).
- Pointer targets meet the WCAG 2.2 24×24 CSS px minimum.
- The contact form has real labels, `autocomplete`, `inputmode`, inline errors beside
  each field, focus moved to the first error on submit, and an `aria-live` status.
