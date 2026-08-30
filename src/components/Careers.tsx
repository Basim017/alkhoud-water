"use client";

import { Reveal } from "@/components/motion/Reveal";
import { careersUrl, type Dictionary } from "@/content";

export function Careers({ t }: { t: Dictionary }) {
  return (
    <section id="careers" className="stratum relative bg-sunk py-24 md:py-32">
      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow text-spring-700 dark:text-spring-400">{t.careers.eyebrow}</p>
            <h2 className="display mt-4 text-4xl sm:text-5xl">{t.careers.title}</h2>
          </Reveal>
          <div className="mt-6 space-y-4">
            {t.careers.paragraphs.map((p, i) => (
              <Reveal key={p.slice(0, 32)} delay={i * 0.05}>
                <p className="lede text-base text-muted">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15}>
          <a
            href={careersUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-bg transition-transform duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-0.5"
            style={{ touchAction: "manipulation" }}
          >
            {t.careers.cta}
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="h-4 w-4 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 11L11 5M6 5h5v5" />
            </svg>
            <span className="sr-only">{t.a11y.newTab}</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
