"use client";

import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { droplets, dropletSize, media, type Dictionary } from "@/content";

/**
 * The Descent — the page's one orchestrated motion moment.
 *
 * The company's copy says the rain travels through "half a kilometer of
 * igneous rock". That number is abstract as text, so here it is the
 * interaction: the section pins, and scrolling travels the camera down the
 * face of their own photograph while a depth readout counts 0 → 500 m. The
 * four stages surface as you pass them.
 *
 * The image is moved with a transform on a wrapper rather than by animating
 * `object-position`, so the whole thing stays on the compositor.
 *
 * Under `prefers-reduced-motion` none of this happens: the section collapses
 * to a plain, fully visible list of the four stages with the photograph
 * shown once, which is the same content without the travel.
 */

const STAGE_COUNT = 4;
const MAX_DEPTH = 500;

export function Descent({ t }: { t: Dictionary }) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  /*
   * The two forms are structurally different trees, so which one renders has
   * to be decided identically on the server and on the first client render —
   * otherwise React bails out of hydration (#418). `useReducedMotion` cannot
   * know the preference during SSR, so the static form is what gets
   * rendered, and the scrubbed one is an upgrade applied after mount.
   *
   * Serving the static form first is also the better default: it puts all
   * four stages in the HTML for crawlers and for anyone without JavaScript,
   * where the scrubbed form would emit three of them at opacity 0. The swap
   * happens well below the fold, so it shifts nothing visible.
   */
  if (!mounted || reduced) return <StaticJourney t={t} />;
  return <ScrubbedDescent t={t} />;
}

function ScrubbedDescent({ t }: { t: Dictionary }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // A spring on the scroll value keeps the travel from feeling mechanically
  // welded to the wheel; it lags a touch and settles, which reads as weight.
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  // Travel down the image. It is rendered at 240% of the stage height, so
  // moving it -58% walks the viewport from its top edge to near its bottom.
  const imageY = useTransform(progress, [0, 1], ["0%", "-58%"]);
  const scrim = useTransform(progress, [0, 1], [0.45, 0.86]);
  const hintOpacity = useTransform(progress, [0, 0.06], [1, 0]);

  // Rounded to the nearest 5 m so the readout ticks rather than blurs, and
  // so this only re-renders ~100 times across the whole section.
  const [depth, setDepth] = useState(0);
  useMotionValueEvent(progress, "change", (v) => {
    const next = Math.round((Math.min(Math.max(v, 0), 1) * MAX_DEPTH) / 5) * 5;
    setDepth((prev) => (prev === next ? prev : next));
  });

  return (
    <section
      id="journey"
      ref={ref}
      className="on-photo relative bg-stone-950 text-white"
      style={{ height: `${STAGE_COUNT * 85 + 30}vh` }}
    >
      <div className="sticky top-0 h-dvh overflow-hidden">
        {/* The rock, travelling */}
        <motion.div className="absolute inset-x-0 top-0 h-[240%]" style={{ y: imageY }}>
          <Image
            src={media.hajjar.src}
            alt={t.hero.photoAlt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-stone-950"
          style={{ opacity: scrim }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(26,24,21,0.85),transparent_28%,transparent_72%,rgba(26,24,21,0.9))]"
        />

        <div className="container-page relative flex h-full flex-col justify-center pt-(--header-h)">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-center lg:gap-16">
            {/* The instrument */}
            <div>
              <p className="eyebrow text-spring-400">{t.journey.eyebrow}</p>
              <h2 className="display mt-3 text-4xl sm:text-5xl">{t.journey.title}</h2>

              <div className="mt-8 flex items-end gap-3 sm:mt-10">
                <span
                  className="display numeric text-6xl leading-none text-white tabular-nums sm:text-7xl"
                  aria-hidden="true"
                >
                  {depth}
                </span>
                <span className="pb-1 text-2xl text-spring-400 sm:pb-2 sm:text-3xl" aria-hidden="true">
                  m
                </span>
              </div>
              <p className="eyebrow mt-2 text-stone-400">{t.journey.depthLabel}</p>

              {/* Depth gauge */}
              <div
                aria-hidden="true"
                className="relative mt-6 h-px w-full max-w-56 bg-white/20"
              >
                <motion.div
                  className="absolute inset-y-0 start-0 bg-spring-400"
                  style={{ scaleX: progress, transformOrigin: "left" }}
                />
              </div>

              <motion.p
                className="eyebrow mt-8 text-stone-400"
                style={{ opacity: hintOpacity }}
                aria-hidden="true"
              >
                {t.journey.scrollHint}
              </motion.p>
            </div>

            {/* The stages. All four stay in the accessibility tree and in
                document order; only their opacity is driven by scroll. */}
            <ol className="relative min-h-72 sm:min-h-80">
              {t.journey.steps.map((step, i) => (
                <Stage key={step.title} progress={progress} index={i} step={step} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stage({
  progress,
  index,
  step,
}: {
  progress: MotionValue<number>;
  index: number;
  step: { title: string; body: string };
}) {
  const start = index / STAGE_COUNT;
  const end = (index + 1) / STAGE_COUNT;
  const fade = 0.055;

  // The first and last stages are clamped at their outer edges: without
  // this, stage one sits at half opacity the moment the section pins (its
  // fade-in is still ramping through zero) and stage four fades back out
  // while it is still the last thing on screen.
  const first = index === 0;
  const last = index === STAGE_COUNT - 1;

  const keyframes: number[] = [
    first ? start : start - fade,
    first ? start : start + fade,
    last ? end : end - fade,
    last ? end : end + fade,
  ];

  const opacity = useTransform(progress, keyframes, [first ? 1 : 0, 1, 1, last ? 1 : 0]);
  // A short rise as it arrives and a short fall as it leaves, so the stages
  // read as passing the viewport rather than blinking.
  const y = useTransform(progress, keyframes, [first ? 0 : 26, 0, 0, last ? 0 : -26]);

  return (
    <li className="absolute inset-x-0 top-0">
      <motion.div style={{ opacity, y }}>
        <Image
          src={droplets[index].src}
          alt=""
          width={dropletSize.width}
          height={dropletSize.height}
          sizes="88px"
          className="h-24 w-auto md:h-32"
        />
        <p className="eyebrow numeric mt-5 text-spring-400">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="display mt-2 text-3xl text-white sm:text-4xl md:text-5xl">{step.title}</h3>
        <p className="lede mt-4 max-w-lg text-base text-stone-200 sm:text-lg">{step.body}</p>
      </motion.div>
    </li>
  );
}

/** The reduced-motion form: the same content, stacked and always visible. */
function StaticJourney({ t }: { t: Dictionary }) {
  return (
    <section id="journey" className="on-photo relative isolate bg-stone-950 py-24 text-white md:py-32">
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-25">
        <Image src={media.hajjar.src} alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-stone-950/60" />

      <div className="container-page grid gap-14 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow text-spring-400">{t.journey.eyebrow}</p>
            <h2 className="display mt-4 text-4xl sm:text-5xl md:text-6xl">{t.journey.title}</h2>
            <p className="lede mt-6 text-base text-stone-300 sm:text-lg">{t.journey.body}</p>
          </Reveal>
        </div>

        <ol className="space-y-12">
          {t.journey.steps.map((step, i) => (
            <li key={step.title} className="flex gap-6">
              <Image
                src={droplets[i].src}
                alt=""
                width={dropletSize.width}
                height={dropletSize.height}
                sizes="72px"
                className="h-16 w-auto shrink-0"
              />
              <div>
                <h3 className="display text-2xl text-white sm:text-3xl">{step.title}</h3>
                <p className="lede mt-2 text-base text-stone-300">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
