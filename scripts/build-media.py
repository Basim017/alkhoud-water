#!/usr/bin/env python3
"""
Turn the raw Wix downloads in `assets-src/` into the web-ready set in
`public/media/`.

Run after `.github/workflows/fetch-legacy-assets.yml` has refreshed
`assets-src/`:

    pip install Pillow
    python3 scripts/build-media.py

Everything is emitted as WebP at a single generous size; `next/image`
derives the responsive variants at request time, so there is no need to
commit a ladder of widths.

The four SKUs are cut out of the single lineup render by scanning the alpha
channel for columns that contain pixels, which keeps the crops exact even
if the artwork is re-exported at a different size.
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

Image.MAX_IMAGE_PIXELS = None

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets-src"
OUT = ROOT / "public" / "media"

# Source file -> output name. Wix ids are opaque, so they are mapped once here.
LINEUP_PLAIN = "2f06f2_bde1639e22d046c6abc1f6e9bb1314de_mv2.png"
LINEUP_LABELLED = "2f06f2_01f3e81e300341a69d12bd972fb0f241_mv2.png"
HAJJAR = "f2d301_b1aa341f9f734d09b47d7abad25746d5_mv2_d_9856_6528_s_4_2.jpg"
SURFACE = "2f06f2_d8f62ece79834aac8f6ef60b0b10f334f000.jpg"
LOGO = "f2d301_579e3b3b4fa94d6ba67e67d78b96e562_mv2.png"

# Journey droplets, in the order the original site showed them.
DROPLETS = [
    ("f2d301_3baf434b79a146578b4b49931c37adc5_mv2_d_3002_4381_s_4_2.png", "drop-rainfall"),
    ("f2d301_1f300b89f672480bb0852560923fdd35_mv2_d_3002_4381_s_4_2.png", "drop-mountain"),
    ("f2d301_f9a16c843f734dc7b9bb6dee7121229f_mv2_d_3001_4381_s_4_2.png", "drop-filtered"),
    ("f2d301_8072644d19b844ff8b4c67f9520906b5_mv2_d_3001_4381_s_4_2.png", "drop-groundwater"),
]

# Ordered left-to-right as they appear in the lineup render. The volumes are
# read off the size badges in the labelled version of the same artwork.
SKUS = ["bottle-500ml", "bottle-1500ml", "bottle-250ml", "cup-200ml"]


def content_box(img: Image.Image) -> tuple[int, int, int, int]:
    """Bounding box of everything that is not fully transparent."""
    return img.getchannel("A").getbbox() or (0, 0, img.width, img.height)


def column_runs(img: Image.Image, min_width: int = 40) -> list[tuple[int, int]]:
    """Column ranges that contain visible pixels — one per object."""
    alpha = img.getchannel("A")
    w, h = alpha.size
    px = alpha.load()
    counts = []
    for x in range(w):
        n = 0
        for y in range(0, h, 4):  # every 4th row is plenty to detect presence
            if px[x, y] > 12:
                n += 1
        counts.append(n)

    threshold = max(1, max(counts) // 400)
    runs: list[tuple[int, int]] = []
    start = None
    for x, c in enumerate(counts):
        if c > threshold and start is None:
            start = x
        elif c <= threshold and start is not None:
            if x - start > min_width:
                runs.append((start, x))
            start = None
    if start is not None:
        runs.append((start, w))
    return runs


def save_webp(img: Image.Image, name: str, width: int, quality: int = 88) -> None:
    out = img.copy()
    if out.width > width:
        out = out.resize((width, round(out.height * width / out.width)), Image.LANCZOS)
    path = OUT / f"{name}.webp"
    if out.mode == "RGBA":
        out.save(path, "WEBP", quality=quality, method=6)
    else:
        out.convert("RGB").save(path, "WEBP", quality=quality, method=6)
    print(f"  {path.relative_to(ROOT)}  {out.width}x{out.height}  {path.stat().st_size // 1024} KB")


def main() -> int:
    if not SRC.exists():
        print(f"Missing {SRC}. Run the fetch-legacy-assets workflow first.", file=sys.stderr)
        return 1
    OUT.mkdir(parents=True, exist_ok=True)

    print("Al Hajjar photograph")
    hajjar = Image.open(SRC / HAJJAR).convert("RGB")
    save_webp(hajjar, "hajjar", 2400, quality=82)
    save_webp(hajjar, "hajjar-blur", 32, quality=60)  # LQIP placeholder

    print("Water surface")
    save_webp(Image.open(SRC / SURFACE).convert("RGB"), "water-surface", 1280, quality=84)

    print("Product lineup")
    lineup = Image.open(SRC / LINEUP_PLAIN).convert("RGBA")
    save_webp(lineup.crop(content_box(lineup)), "lineup", 1800)

    labelled = Image.open(SRC / LINEUP_LABELLED).convert("RGBA")
    save_webp(labelled.crop(content_box(labelled)), "lineup-labelled", 1800)

    print("Individual SKUs")
    runs = column_runs(lineup)
    if len(runs) != len(SKUS):
        print(f"  ! expected {len(SKUS)} objects, found {len(runs)} — skipping cutouts", file=sys.stderr)
    else:
        for (x0, x1), name in zip(runs, SKUS):
            pad = 12
            strip = lineup.crop((max(0, x0 - pad), 0, min(lineup.width, x1 + pad), lineup.height))
            save_webp(strip.crop(content_box(strip)), name, 700)

    print("Journey droplets")
    for filename, name in DROPLETS:
        drop = Image.open(SRC / filename).convert("RGBA")
        save_webp(drop.crop(content_box(drop)), name, 360)

    print("Logo")
    logo = Image.open(SRC / LOGO).convert("RGBA")
    save_webp(logo.crop(content_box(logo)), "logo", 900)

    print("\nDone.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
