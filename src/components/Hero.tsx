"use client";

import { motion, useReducedMotion } from "motion/react";
import { WaterBackdrop } from "@/components/motion/WaterBackdrop";
import { CountUp } from "@/components/motion/CountUp";
import { company, hero, stats } from "@/content/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();

  // Headline words rise in sequence. Under reduced motion everything is
  // rendered in place with no transform.
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
  };
  const item = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 22 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      };

  return (
    <section id="top" className="relative isolate flex min-h-dvh flex-col justify-between pt-(--header-h)">
      <WaterBackdrop />

      {/* Content is biased above the horizon line so the ridges never run
          through the headline. */}
      <div className="container-page relative flex flex-1 flex-col justify-center pt-12 pb-[12vh]">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.p
            variants={item}
            className="text-xs font-semibold tracking-[0.22em] text-brand-600 uppercase sm:text-sm"
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={item}
            className="display mt-5 text-5xl text-brand-900 sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <span className="text-sheen">{hero.title}</span>
          </motion.h1>

          <motion.p
            variants={item}
            aria-hidden="true"
            dir="rtl"
            className="font-arabic mt-2 text-left text-2xl font-extralight tracking-[0.06em] text-brand-600/80 sm:text-3xl"
          >
            {company.nameArabic}
          </motion.p>

          <motion.p variants={item} className="lede mt-6 text-lg text-ink-soft sm:text-xl">
            {hero.body}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={hero.primaryCta.href}
              className="group inline-flex items-center gap-2 rounded-full bg-brand-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-900/20 transition-[background-color,transform,box-shadow] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-900/25 active:translate-y-0"
              style={{ touchAction: "manipulation" }}
            >
              {hero.primaryCta.label}
              <Arrow />
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border border-brand-300 bg-white/70 px-6 py-3.5 text-sm font-semibold text-brand-800 backdrop-blur-sm transition-[background-color,border-color,transform] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-brand-500 hover:bg-white"
              style={{ touchAction: "manipulation" }}
            >
              {hero.secondaryCta.label}
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Stat band sits on the dark water at the foot of the hero. */}
      <div className="on-deep relative border-t border-white/10">
        <div className="container-page">
          {/* Three across at every width — stacking these on mobile made the
              hero far too tall. */}
          <dl className="grid grid-cols-3 gap-4 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.09, ease: EASE }}
                className="flex min-w-0 flex-col py-5 sm:py-8"
              >
                <dd className="display order-1 text-2xl text-white sm:text-4xl md:text-5xl">
                  <CountUp
                    value={Number(stat.value)}
                    unit={stat.unit}
                    plain={stat.value === "2016"}
                  />
                </dd>
                <dt className="order-2 mt-1.5 text-[10px] leading-snug font-medium tracking-[0.12em] text-spring-300/80 uppercase sm:text-xs sm:tracking-[0.14em]">
                  {stat.label}
                </dt>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-4 w-4 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
