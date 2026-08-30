"use client";

import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { skus, type Dictionary } from "@/content";

/**
 * The retail range.
 *
 * The four bottles are drawn at their true relative heights — the cutouts
 * all come from one product render, so the ratio between them is the real
 * ratio between the products. A 250 ml bottle really is a little over a
 * third the height of the 1.5 litre. Sizing them to a uniform box would
 * throw that away, and the comparison is the whole point of a range.
 */
const TALLEST = Math.max(...skus.map((s) => s.height));

export function Products({ t }: { t: Dictionary }) {
  return (
    <section id="products" className="stratum relative bg-bg py-24 md:py-32">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-spring-700 dark:text-spring-400">{t.products.eyebrow}</p>
          <h2 className="display mt-4 text-4xl sm:text-5xl md:text-6xl">{t.products.title}</h2>
          <p className="lede mt-6 text-lg text-muted">{t.products.body}</p>
        </Reveal>

        {/* Retail bottles, on a shared ground line. */}
        <Reveal className="mt-16" y={20}>
          <h3 className="eyebrow text-muted">{t.products.retailTitle}</h3>
        </Reveal>

        <Stagger
          as="ul"
          className="mt-8 grid grid-cols-2 items-end gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-x-8"
        >
          {skus.map((sku) => (
            <StaggerItem as="li" key={sku.id} className="group min-w-0">
              <div className="flex h-[clamp(9rem,26vw,17rem)] items-end justify-center sm:h-[clamp(12rem,20vw,21rem)]">
                {/* Decorative: the volume is announced by the visible label
                    directly below, so alt text here would only duplicate it. */}
                <Image
                  src={sku.src}
                  alt=""
                  width={sku.width}
                  height={sku.height}
                  sizes="(max-width: 640px) 44vw, 20vw"
                  className="w-auto max-w-full origin-bottom object-contain transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:-translate-y-2"
                  style={{ height: `${(sku.height / TALLEST) * 100}%` }}
                />
              </div>
              <div className="mt-5 border-t border-line pt-3 text-center">
                <p
                  className="display text-xl text-fg sm:text-2xl"
                  translate="no"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {sku.volume}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-4">
          <p className="text-center text-sm text-muted">{t.products.retailNote}</p>
        </Reveal>

        {/* Delivery service */}
        <Reveal className="mt-20 md:mt-28" y={20}>
          <h3 className="eyebrow text-muted">{t.products.serviceTitle}</h3>
        </Reveal>

        <Stagger as="ul" className="mt-8 grid gap-6 md:grid-cols-3">
          {t.products.services.map((item) => (
            <StaggerItem as="li" key={item.name} className="min-w-0">
              <article className="group relative flex h-full flex-col rounded-xl border border-line bg-surface p-7 transition-[transform,border-color] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-accent/40">
                <div className="flex items-start justify-between gap-4">
                  <h4 className="display text-2xl text-fg">{item.name}</h4>
                  <span className="shrink-0 rounded-full bg-fg/6 px-3 py-1 text-xs font-semibold text-muted">
                    {item.volume}
                  </span>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{item.body}</p>
                <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-fg">
                      <Tick />
                      <span className="min-w-0">{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
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
