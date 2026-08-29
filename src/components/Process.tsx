"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { process } from "@/content/site";

/**
 * The quality promise, rising back out of the deep section above into
 * light — the point in the descent where the water is bottled.
 */
export function Process() {
  return (
    <section id="process" className="relative bg-mist py-24 md:py-32">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end lg:gap-20">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.22em] text-spring-700 uppercase">
              Hygiene & Safety
            </p>
            <h2 className="display mt-4 text-4xl text-brand-900 sm:text-5xl">{process.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="lede text-lg text-ink-soft">{process.body}</p>
          </Reveal>
        </div>

        <Stagger as="ul" className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-brand-900/10 sm:grid-cols-2 lg:grid-cols-4">
          {process.pillars.map((pillar) => (
            <StaggerItem as="li" key={pillar.title} className="min-w-0 bg-paper p-7">
              <h3 className="text-base font-semibold text-brand-800">{pillar.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">{pillar.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
