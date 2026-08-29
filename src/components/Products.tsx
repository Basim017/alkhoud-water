"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { products } from "@/content/site";

const GLYPHS = [BottleGlyph, CoolerGlyph, PalletGlyph];

export function Products() {
  return (
    <section id="products" className="relative bg-paper py-24 md:py-32">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-spring-700 uppercase">
            What We Deliver
          </p>
          <h2 className="display mt-4 text-4xl text-brand-900 sm:text-5xl md:text-6xl">
            {products.title}
          </h2>
          <p className="lede mt-6 text-lg text-ink-soft">{products.body}</p>
        </Reveal>

        <Stagger as="ul" className="mt-14 grid gap-6 md:mt-16 md:grid-cols-3">
          {products.items.map((item, index) => {
            const Glyph = GLYPHS[index] ?? BottleGlyph;
            return (
              <StaggerItem as="li" key={item.name} className="min-w-0">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-900/8 bg-white p-7 shadow-sm shadow-brand-900/5 transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-900/10">
                  {/* Water line that rises behind the card on hover */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-0 bg-linear-to-t from-brand-50 to-transparent transition-[height] duration-500 ease-[var(--ease-out-quint)] group-hover:h-2/3"
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <Glyph />
                    <span className="shrink-0 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                      {item.volume}
                    </span>
                  </div>

                  <h3 className="display relative mt-6 text-2xl text-brand-900">{item.name}</h3>
                  <p className="relative mt-3 text-[15px] leading-relaxed text-ink-soft">
                    {item.body}
                  </p>

                  <ul className="relative mt-6 space-y-2.5 border-t border-brand-900/8 pt-5">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-brand-800">
                        <Tick />
                        <span className="min-w-0">{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        {products.retailSizes.length > 0 && (
          <Reveal className="mt-10">
            <p className="text-sm text-ink-soft">
              Retail sizes: {products.retailSizes.join(" · ")}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function Tick() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="mt-0.5 h-4 w-4 shrink-0 text-spring-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8.5l3.2 3.2L13 5" />
    </svg>
  );
}

const glyphClass =
  "h-11 w-11 text-brand-700 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:-translate-y-0.5";

function BottleGlyph() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className={glyphClass} fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M13 3h6v3.2c0 .9.4 1.7 1.1 2.3l1.6 1.4A5 5 0 0 1 23.4 14v11.5A3.5 3.5 0 0 1 19.9 29h-7.8A3.5 3.5 0 0 1 8.6 25.5V14a5 5 0 0 1 1.7-3.8l1.6-1.4A3 3 0 0 0 13 6.2V3Z" />
      <path d="M8.7 17.5c1.6 1.4 3.2 1.4 4.9 0s3.2-1.4 4.9 0 3.2 1.4 4.9 0" strokeLinecap="round" />
    </svg>
  );
}

function CoolerGlyph() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className={glyphClass} fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M11 3h10l-1.4 6.2a2 2 0 0 1-2 1.6h-3.2a2 2 0 0 1-2-1.6L11 3Z" />
      <rect x="8.5" y="10.8" width="15" height="18.2" rx="2.4" />
      <path d="M13 17.5h6M13.8 22.4h4.4" strokeLinecap="round" />
    </svg>
  );
}

function PalletGlyph() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className={glyphClass} fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="4" y="5" width="10" height="10" rx="1.6" />
      <rect x="18" y="5" width="10" height="10" rx="1.6" />
      <rect x="11" y="17" width="10" height="10" rx="1.6" />
      <path d="M3 30h26" strokeLinecap="round" />
    </svg>
  );
}
