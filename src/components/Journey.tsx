"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { journey } from "@/content/site";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The four stages of the water's journey, laid out as a descent.
 *
 * A single line fills from top to bottom as the section scrolls, with a
 * drop of light riding its leading edge — the page's one scroll-linked
 * animation. It is purely decorative: the steps themselves are ordinary
 * list items that read correctly with the animation switched off.
 */
export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 });
  const dropTop = useTransform(progress, (value) => `${value * 100}%`);

  return (
    <section
      id="journey"
      className="on-deep relative isolate overflow-hidden bg-brand-950 py-24 text-white md:py-32"
    >
      {/* Depth: a faint pool of light behind the copy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/4 left-1/4 h-[60vmin] w-[60vmin] rounded-full blur-3xl animate-drift"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-brand-600) 45%, transparent), transparent 70%)",
        }}
      />

      <div className="container-page relative grid gap-14 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.22em] text-spring-400 uppercase">
              From Cloud to Bottle
            </p>
            <h2 className="display mt-4 text-4xl sm:text-5xl md:text-6xl">{journey.title}</h2>
            <p className="lede mt-6 text-base text-brand-200 sm:text-lg">{journey.body}</p>
          </Reveal>
        </div>

        <div ref={ref} className="relative">
          {/* The descent line */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[15px] w-px bg-white/12 md:left-[19px]"
          >
            <motion.div
              className="absolute inset-x-0 top-0 origin-top bg-linear-to-b from-spring-400 to-spring-600"
              style={{
                height: "100%",
                scaleY: reduced ? 1 : progress,
              }}
            />
            {!reduced && (
              <motion.span
                className="absolute -left-[5px] h-[11px] w-[11px] rounded-full bg-spring-300 shadow-[0_0_18px_4px_color-mix(in_srgb,var(--color-spring-400)_70%,transparent)]"
                style={{ top: dropTop }}
              />
            )}
          </div>

          <ol className="space-y-12 md:space-y-16">
            {journey.steps.map((step, index) => (
              <li key={step.title} className="relative pl-12 md:pl-16">
                <motion.div
                  initial={reduced ? false : { opacity: 0, x: -10 }}
                  whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-brand-900 text-[11px] font-semibold text-spring-300 md:h-10 md:w-10 md:text-xs"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display text-2xl text-white sm:text-3xl">{step.title}</h3>
                  <p className="lede mt-3 text-base text-brand-200">{step.body}</p>
                </motion.div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
