# Al Khoud — Pure Natural Water

A rebuild of [alkhoud.com](https://www.alkhoud.com/) for Al Khoud (Global Pioneer LLC),
the natural water brand drawn from the Al Hajjar mountains in the Sultanate of Oman.

Bilingual (English / Arabic), light and dark, built around the company's own
photography and product artwork. All body copy, contact details and social links are
carried over verbatim from the existing site.

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Motion | `motion` (Framer Motion) |
| Type | Bodoni Moda, IBM Plex Sans, IBM Plex Sans Arabic via `next/font` |

```bash
npm install
npm run dev     # http://localhost:3000  (Arabic at /ar)
npm run build
npm start
```

## Art direction

The thesis is **the rock, not the water**. Every bottled-water site reaches for blue
gradients; the thing that is actually specific to this brand is the striated limestone
of the Al Hajjar range, which the company's own copy says the rain travels through for
half a kilometre before it becomes the product.

So the palette is **sampled directly from the company's photograph of that range** —
warm limestone greys and ochres — and stone owns the environment. The Al Khoud blue
(`#18418E`, the single colour in the logo) and the cap cyan taken off the bottles are
held back for the water, the product, and anything you can act on. The page is laid out
as a descent through those layers, with a hairline `.stratum` rule between each band.

Typography pairs **Bodoni Moda** — an honest match for the high-contrast Didone serif in
the Al Khoud latin wordmark — with **IBM Plex Sans** and **IBM Plex Sans Arabic**, which
share a designer and close metrics so English and Arabic sit on one type scale rather
than being two fonts bolted together.

## Media

Everything visual comes from the original site. The development environment cannot reach
`static.wixstatic.com`, so the assets are fetched on a GitHub runner instead:

1. Run **`.github/workflows/fetch-legacy-assets.yml`** from the Actions tab. It scrapes
   the live homepage, extracts every media URL, strips the Wix resize transform to get
   full-resolution originals, and commits them to `assets-src/` with a manifest.
2. Run **`scripts/build-media.py`** (needs `Pillow`) to turn those into the web-ready
   WebP set in `public/media/`. `next/image` derives responsive variants from there.

`assets-src/` holds the untouched originals, including a 19 MB photograph — it is the
input to the pipeline, not something the site ships.

The four retail SKUs are **cut out of a single product render** by scanning its alpha
channel, which is why they can be drawn at their true relative heights in the range: a
250 ml bottle really is a little over a third the height of the 1.5 litre. The volumes
(1.5 Ltr, 500 ml, 250 ml, 200 ml cup) are read off the size badges on the company's own
artwork — none were invented.

## Localisation

English at `/`, Arabic at `/ar`. Each locale has its own **root layout** so `lang` and
`dir` are correct in the server-rendered HTML — RTL cannot be applied after hydration
without a flash of the wrong direction. Layout mirroring uses logical properties
(`ms-*`, `ps-*`, `start-*`) rather than `rtl:` overrides, so it follows `dir`
automatically.

All copy lives in `src/content/en.ts` and `src/content/ar.ts`, typed against one
`Dictionary` so a missing translation is a build error. Locale-independent facts
(contact details, media, SKUs) sit once in `src/content/shared.ts`.

## Theming

Light and dark, defaulting to the OS preference and overridable by the toggle, stored in
`localStorage`. `ThemeScript` applies the class synchronously in `<head>` so dark never
flashes light on load. The dark theme is not an inversion — it is the aquifer, warm
stone at depth rather than neutral black.

Components reference semantic tokens (`bg-bg`, `text-fg`, `text-muted`, `border-line`,
`bg-accent`) defined once in `globals.css`, so the whole page themes from one place
instead of sprouting `dark:` on every element.

## Motion

Held to the subtle/standard tier: scroll reveals travel 8–16px over 400–600ms, hover
feedback is under 2px, stagger steps are capped at 0.07s. Only `transform` and `opacity`
are animated. There is one orchestrated moment — the descent through the Journey — rather
than effects scattered across every section.

**Everything decorative is off under `prefers-reduced-motion`**, with content rendered in
its final state; verified in Chromium.

## Verified

Checked at 1440×900 and 390×844, in both locales and both themes:

- **axe-core: zero violations** (WCAG 2.0/2.1/2.2 A + AA plus best-practice).
- Contrast computed by hand for pairs axe cannot read over photography.
- Skip link first in tab order; every tab stop has a visible focus ring; pointer targets
  meet the WCAG 2.2 24×24 minimum.
- Theme persists across reload; locale switch flips `lang`/`dir` both ways.
- All images load; no horizontal overflow; no console errors.

## Still to wire up

- **`src/app/api/contact/route.ts`** validates and accepts enquiries but does not deliver
  them. Connect an email provider or CRM webhook at the marked `TODO` — until then,
  submissions are accepted and dropped.
- The footer carries the original site's `© 2018` notice verbatim. Update the year.
- `vercel.json` pins the framework preset to `nextjs`. Without it the build succeeds but
  Vercel never applies Next.js output routing and every path 404s — leave it in place.
