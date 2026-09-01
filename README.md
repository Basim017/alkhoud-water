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

The hero's header film comes down the same way, via
**`.github/workflows/fetch-hero-video.yml`**. Wix does not put the video URL in the
markup, but it stores the poster frame beside it as `<id>f000.jpg`, so the workflow reads
the id off the poster, probes `video.wixstatic.com/video/<id>/<quality>/mp4/file.mp4` for
the best quality on offer (720p is the highest published), and commits the encodes plus a
poster into `public/media/`. Audio is stripped — it is a decorative loop — and the `moov`
atom is moved to the front so playback can start before the file finishes arriving.

The `<source>` order is **MP4 first, WebM second**, which is the reverse of the usual
advice and deliberate: on this footage x264 encodes smaller than VP9, so listing WebM
first had every browser that prefers it downloading the heavier file. With the MP4 first,
everyone who can decode H.264 takes the smaller one and the WebM is left for the browsers
that cannot — an open-source Chromium build reports no H.264 support at all, and would
otherwise sit frozen on the poster.

The film is near-white water against white, where the previous backdrop was dark rock, so
the hero's scrim stops are measured rather than judged by eye: the worst frame of the loop
is sampled behind every run of text, at three viewports, and the gradient is set to
whatever clears 4.5:1 there.

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

Held to the subtle/standard tier: scroll reveals travel 8–16px over 400–600ms, press and
hover feedback is 160ms, stagger steps are capped at 0.07s. Only `transform` and
`opacity` are animated, and transitions name their properties rather than using `all`.

**The Descent** (`src/components/Descent.tsx`) is the one orchestrated moment. The
company's copy says the rain travels through "half a kilometre of igneous rock" — a
number that means nothing as text, so the section pins and scrolling travels the camera
down the face of their own photograph while a depth readout counts 0 → 500 m and the four
stages surface as you pass them. The image moves via a transform on a wrapper rather than
by animating `object-position`, so it stays on the compositor.

Two details worth keeping:

- Which form of the Descent renders is decided identically on the server and the first
  client render. `useReducedMotion` cannot know the preference during SSR, so the static
  form is served — that also puts all four stages in the HTML for crawlers — and the
  scrubbed one is an upgrade applied after mount. Deciding it any other way is a
  hydration mismatch (React #418).
- Hover lifts are gated behind `@media (hover: hover) and (pointer: fine)`. On a
  touchscreen `:hover` sticks after a tap, so an ungated hover-lift leaves controls
  floating until you tap elsewhere. Press feedback (`scale(0.97)`) is on the element
  itself, so it works on touch where hover does not.

**Everything decorative is off under `prefers-reduced-motion`**, with content rendered in
its final state; verified in Chromium.

## The range

The four SKUs are a radio group, not a card grid — picking a size is the actual job. They
are drawn at their **true relative heights**, which the cutouts make possible because all
four come from one product render. Selecting one lifts and saturates it and quietens the
rest; a single live region announces the change instead of four repeated captions.

## Verified

Checked at 1440×900 and 390×844, in both locales and both themes:

- **axe-core: zero violations** (WCAG 2.0/2.1/2.2 A + AA plus best-practice).
- Contrast computed by hand for pairs axe cannot read over photography, and sampled
  frame-by-frame across the hero film — axe sees one painted frame, not the loop.
- The hero film plays; under `prefers-reduced-motion` it never starts and the poster
  frame stands in its place.
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
