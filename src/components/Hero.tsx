"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { CountUp } from "@/components/motion/CountUp";
import { media, type Dictionary } from "@/content";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The hero opens on the thing that actually makes this water what it is:
 * the striated limestone of the Al Hajjar range, photographed by the
 * company itself. The product stands in front of it.
 */
export function Hero({ t }: { t: Dictionary }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
  const item = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      };

  return (
    <section id="top" ref={ref} className="on-photo relative isolate overflow-hidden bg-stone-950">
      {/* The rock */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={reduced ? undefined : { y: photoY, scale: photoScale }}
      >
        <Image
          src={media.hajjar.src}
          alt={t.hero.photoAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Scrim. Two layers: a vertical one so the headline sits on a dark
          field, and a side one so the text edge stays legible regardless of
          what the photograph is doing behind it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(26,24,21,0.82)_0%,rgba(26,24,21,0.55)_38%,rgba(26,24,21,0.72)_78%,rgba(26,24,21,0.95)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(26,24,21,0.75),transparent_62%)] rtl:bg-[linear-gradient(to_left,rgba(26,24,21,0.75),transparent_62%)]"
      />

      <div className="container-page relative grid min-h-dvh grid-rows-[1fr_auto] pt-(--header-h)">
        <div className="grid items-center gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-12">
          <motion.div variants={container} initial="hidden" animate="visible" className="max-w-2xl">
            <motion.p variants={item} className="eyebrow text-spring-400">
              {t.hero.eyebrow}
            </motion.p>

            <motion.h1
              variants={item}
              className="display mt-5 text-[clamp(2.75rem,8vw,6.5rem)] text-white"
            >
              {t.hero.title}
            </motion.h1>

            <motion.p variants={item} className="lede mt-6 text-lg text-stone-200 sm:text-xl">
              {t.hero.body}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="pressable pressable-lift group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-stone-950 hover:bg-spring-300"
              >
                {t.hero.primaryCta}
                <Arrow />
              </a>
              <a
                href="#products"
                className="pressable pressable-lift inline-flex items-center rounded-full border border-white/35 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:border-white/70 hover:bg-white/10"
              >
                {t.hero.secondaryCta}
              </a>
            </motion.div>
          </motion.div>

          {/* The product, lit against the rock. */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div
              aria-hidden="true"
              className="animate-drift absolute inset-x-4 top-1/4 bottom-4 rounded-[50%] bg-spring-400/20 blur-3xl"
            />
            <Image
              src={media.lineup.src}
              alt={t.hero.lineupAlt}
              width={media.lineup.width}
              height={media.lineup.height}
              priority
              sizes="(max-width: 1024px) 90vw, 26rem"
              className="relative w-full drop-shadow-2xl"
            />
          </motion.div>
        </div>

        <dl className="grid grid-cols-3 gap-4 border-t border-white/15 sm:gap-8">
          {t.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.09, ease: EASE }}
              className="flex min-w-0 flex-col py-5 sm:py-7"
            >
              <dd className="display order-1 text-2xl text-white sm:text-4xl">
                <CountUp
                  value={Number(stat.value)}
                  unit={stat.unit}
                  plain={stat.value === "2016"}
                />
              </dd>
              <dt className="order-2 mt-1.5 text-[10px] leading-snug font-medium tracking-[0.1em] text-stone-300 uppercase sm:text-xs rtl:tracking-normal rtl:normal-case">
                {stat.label}
              </dt>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-4 w-4 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
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
