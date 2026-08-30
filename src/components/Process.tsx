"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import type { Dictionary } from "@/content";

export function Process({ t }: { t: Dictionary }) {
  return (
    <section id="process" className="stratum relative bg-bg py-24 md:py-32">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end lg:gap-20">
          <Reveal>
            <p className="eyebrow text-spring-700 dark:text-spring-400">{t.process.eyebrow}</p>
            <h2 className="display mt-4 text-4xl sm:text-5xl">{t.process.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="lede text-lg text-muted">{t.process.body}</p>
          </Reveal>
        </div>

        {/* Numbered because the process genuinely is a sequence — the
            company describes it as a 24-step order of operations. */}
        <Stagger as="ol" className="mt-14 grid gap-px overflow-hidden rounded-xl bg-line sm:grid-cols-2 lg:grid-cols-4">
          {t.process.pillars.map((pillar, i) => (
            <StaggerItem as="li" key={pillar.title} className="min-w-0 bg-bg p-7">
              <span
                className="display block text-3xl text-accent"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-base font-semibold text-fg">{pillar.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{pillar.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
