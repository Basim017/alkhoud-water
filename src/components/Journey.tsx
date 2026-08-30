"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { droplets, dropletSize, media, type Dictionary } from "@/content";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The descent — the page's one orchestrated motion moment.
 *
 * A single line fills top to bottom as the section scrolls, and the four
 * droplet badges from the original site mark the stages. The Al Hajjar
 * photograph sits behind at low opacity and drifts upward, so the reader
 * is moving down through the rock rather than past a list.
 */
export function Journey({ t }: { t: Dictionary }) {
  const section = useRef<HTMLElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress: sectionProgress } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });
  const rockY = useTransform(sectionProgress, [0, 1], ["8%", "-8%"]);

  const { scrollYProgress } = useScroll({ target: list, offset: ["start 75%", "end 65%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 });
  const dropTop = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <section
      id="journey"
      ref={section}
      className="on-photo relative isolate overflow-hidden bg-stone-950 py-24 text-white md:py-32"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 -inset-y-[10%] -z-10 opacity-25"
        style={reduced ? undefined : { y: rockY }}
      >
        <Image src={media.hajjar.src} alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-stone-950/55" />

      <div className="container-page grid gap-14 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="eyebrow text-spring-400">{t.journey.eyebrow}</p>
            <h2 className="display mt-4 text-4xl sm:text-5xl md:text-6xl">{t.journey.title}</h2>
            <p className="lede mt-6 text-base text-stone-300 sm:text-lg">{t.journey.body}</p>
          </Reveal>
        </div>

        <div ref={list} className="relative">
          <div
            aria-hidden="true"
            className="absolute top-3 bottom-3 start-[27px] w-px bg-white/15 md:start-[35px]"
          >
            <motion.div
              className="absolute inset-x-0 top-0 h-full origin-top bg-[linear-gradient(to_bottom,var(--color-spring-400),var(--color-spring-700))]"
              style={{ scaleY: reduced ? 1 : progress }}
            />
            {!reduced && (
              <motion.span
                className="absolute -start-[5px] h-[11px] w-[11px] rounded-full bg-spring-300 shadow-[0_0_18px_4px_color-mix(in_srgb,var(--color-spring-400)_70%,transparent)]"
                style={{ top: dropTop }}
              />
            )}
          </div>

          <ol className="space-y-14 md:space-y-20">
            {t.journey.steps.map((step, i) => (
              <li key={step.title} className="relative ps-20 md:ps-28">
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  <Image
                    src={droplets[i].src}
                    alt=""
                    width={dropletSize.width}
                    height={dropletSize.height}
                    sizes="72px"
                    className="absolute start-0 top-0 h-[72px] w-auto md:h-[88px]"
                  />
                  <h3 className="display text-2xl text-white sm:text-3xl">{step.title}</h3>
                  <p className="lede mt-3 text-base text-stone-300">{step.body}</p>
                </motion.div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
