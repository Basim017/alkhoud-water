"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { skus, type Dictionary } from "@/content";

/**
 * The retail range, as a comparison rather than a card grid.
 *
 * All four cutouts come from one product render, so the ratio between their
 * heights is the real ratio between the products — a 250 ml bottle really is
 * a little over a third of the 1.5 litre. They are drawn to that ratio on a
 * shared baseline, which is the whole point of showing a range together.
 *
 * Picking a size is the actual job here, so the bottles are real buttons in
 * a radio group: clickable, tabbable, arrow-key friendly via the browser's
 * native radio behaviour, and announced with their volume.
 */
const TALLEST = Math.max(...skus.map((s) => s.height));

export function Products({ t }: { t: Dictionary }) {
  const [selected, setSelected] = useState(0);

  return (
    <section id="products" className="stratum relative bg-bg py-24 md:py-32">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-spring-700 dark:text-spring-400">{t.products.eyebrow}</p>
          <h2 className="display mt-4 text-4xl sm:text-5xl md:text-6xl">{t.products.title}</h2>
          <p className="lede mt-6 text-lg text-muted">{t.products.body}</p>
        </Reveal>

        <Reveal className="mt-16" y={20}>
          <h3 className="eyebrow text-muted">{t.products.retailTitle}</h3>
        </Reveal>

        <fieldset className="mx-auto mt-8 max-w-4xl">
          <legend className="sr-only">{t.products.selectHint}</legend>

          <div className="grid grid-cols-4 items-end">
            {skus.map((sku, i) => {
              const active = selected === i;
              return (
                <label
                  key={sku.id}
                  className="pressable group relative flex cursor-pointer flex-col items-center px-1 sm:px-3"
                >
                  <input
                    type="radio"
                    name="sku"
                    value={sku.id}
                    checked={active}
                    onChange={() => setSelected(i)}
                    className="sr-only"
                  />

                  <span className="flex h-[clamp(8rem,26vw,18rem)] w-full items-end justify-center sm:h-[clamp(11rem,22vw,22rem)]">
                    {/* Decorative: the volume is announced by the visible
                        label below and by the radio's own accessible name. */}
                    <Image
                      src={sku.src}
                      alt=""
                      width={sku.width}
                      height={sku.height}
                      sizes="(max-width: 640px) 24vw, 18vw"
                      className={`w-auto max-w-full origin-bottom object-contain transition-[transform,filter] duration-300 ease-[var(--ease-out-strong)] ${
                        active
                          ? "-translate-y-2 drop-shadow-[0_18px_28px_rgba(0,0,0,0.22)]"
                          : "opacity-70 grayscale-[0.35] group-hover:opacity-100 group-hover:grayscale-0"
                      }`}
                      style={{ height: `${(sku.height / TALLEST) * 100}%` }}
                    />
                  </span>

                  {/* Each size sits on its own rule, so the row reads as a
                      measuring scale; only the selected one takes the accent. */}
                  <span
                    className={`mt-5 w-full border-t-2 pt-3 text-center transition-colors duration-200 ease-[var(--ease-out-strong)] ${
                      active ? "border-accent" : "border-line"
                    }`}
                  >
                    <span
                      className={`display numeric block text-lg transition-colors duration-200 sm:text-2xl ${
                        active ? "text-accent" : "text-fg"
                      }`}
                      translate="no"
                    >
                      {sku.volume}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* One live line rather than four repeated captions. */}
        <Reveal className="mt-6">
          <p aria-live="polite" className="text-center text-sm text-muted">
            <span className="font-medium text-fg">{t.products.skuNotes[selected]}</span>
            <span aria-hidden="true" className="mx-2 text-line">·</span>
            {t.products.retailNote}
          </p>
        </Reveal>

        <Reveal className="mt-24 md:mt-32" y={20}>
          <h3 className="eyebrow text-muted">{t.products.serviceTitle}</h3>
        </Reveal>

        {/* Editorial rows rather than a card grid — three services with very
            different shapes read better as a list than as equal boxes. */}
        <Stagger as="ul" className="mt-6">
          {t.products.services.map((item, i) => (
            <StaggerItem
              as="li"
              key={item.name}
              className="grid gap-4 border-t border-line py-8 md:grid-cols-[3rem_minmax(0,22rem)_minmax(0,1fr)] md:gap-10 md:py-10"
            >
              <span className="display numeric text-2xl text-accent md:text-3xl">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div>
                <h4 className="display text-2xl text-fg md:text-3xl">{item.name}</h4>
                <p className="mt-2 text-sm font-medium text-muted">{item.volume}</p>
              </div>

              <div>
                <p className="lede text-[15px] text-muted">{item.body}</p>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm text-fg">
                      <Tick />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
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
      className="h-3.5 w-3.5 shrink-0 text-spring-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8.5l3.2 3.2L13 5" />
    </svg>
  );
}
