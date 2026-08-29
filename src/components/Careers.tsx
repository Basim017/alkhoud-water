"use client";

import { Reveal } from "@/components/motion/Reveal";
import { careers } from "@/content/site";

export function Careers() {
  return (
    <section id="careers" className="relative bg-paper py-24 md:py-32">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-brand-700 px-7 py-14 text-white sm:px-12 md:px-16 md:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-1/3 -right-1/4 h-[46vmin] w-[46vmin] rounded-full blur-3xl animate-drift"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--color-spring-400) 45%, transparent), transparent 70%)",
            }}
          />

          <div className="on-deep relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <Reveal>
                <p className="text-xs font-semibold tracking-[0.22em] text-spring-300 uppercase">
                  Careers
                </p>
                <h2 className="display mt-4 text-4xl sm:text-5xl">{careers.title}</h2>
              </Reveal>
              <div className="mt-6 space-y-4">
                {careers.paragraphs.map((paragraph, index) => (
                  <Reveal key={paragraph.slice(0, 32)} delay={index * 0.05}>
                    <p className="lede text-base text-brand-100/90">{paragraph}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.15}>
              <a
                href={careers.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-brand-800 transition-[transform,background-color] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:bg-spring-300"
                style={{ touchAction: "manipulation" }}
              >
                {careers.cta.label}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="h-4 w-4 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 11L11 5M6 5h5v5" />
                </svg>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
