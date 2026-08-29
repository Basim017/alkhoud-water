"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { company, story } from "@/content/site";

/**
 * Our Story — the deepest point of the page.
 *
 * The background sits at bedrock depth and a slow parallax wash drifts
 * behind the copy. The text itself never moves: parallax on body copy
 * hurts reading comfort, so only the decorative layer is animated.
 */
export function Story() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const washY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="story"
      ref={ref}
      className="on-deep relative isolate overflow-hidden bg-brand-900 py-24 text-white md:py-32"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -inset-y-1/4"
        style={{ y: reduced ? "0%" : washY }}
      >
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(70% 45% at 15% 20%, color-mix(in srgb, var(--color-brand-700) 80%, transparent), transparent 70%), radial-gradient(60% 50% at 88% 78%, color-mix(in srgb, var(--color-spring-600) 30%, transparent), transparent 72%)",
          }}
        />
      </motion.div>

      <div className="container-page relative grid gap-12 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.22em] text-spring-400 uppercase">
              Since {company.founded}
            </p>
            <h2 className="display mt-4 text-4xl sm:text-5xl md:text-6xl">{story.title}</h2>
            <p
              aria-hidden="true"
              dir="rtl"
              className="font-arabic mt-5 text-3xl font-extralight text-brand-200/70"
            >
              {company.nameArabic}
            </p>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <p className="display text-2xl text-spring-300 sm:text-3xl">{story.lead}</p>
          </Reveal>

          <div className="mt-8 space-y-6">
            {story.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 32)} delay={index * 0.05}>
                <p className="lede max-w-[68ch] text-base text-brand-100/90 sm:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
