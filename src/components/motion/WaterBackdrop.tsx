"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/**
 * The hero backdrop: sky, three Al Hajjar ridge lines and the water table
 * beneath them, each moving at a different speed on scroll.
 *
 * The horizon sits at ~54% down so the ridges never cross the headline.
 * Parallax stays in the subtle tier — no layer shifts more than ~30% of
 * its own height — and the wrapper clips everything. It is decorative, so
 * it is hidden from assistive tech and pinned still under
 * `prefers-reduced-motion`.
 */
export function WaterBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Background slowest, foreground fastest — this sells the depth.
  const sun = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const ridgeFar = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const ridgeMid = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const ridgeNear = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  const still = "0%";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Sky: pale dawn at the top, deepening only below the horizon line. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-brand-50)_0%,var(--color-brand-100)_34%,var(--color-brand-200)_48%,var(--color-brand-400)_62%,var(--color-brand-800)_82%,var(--color-brand-950)_100%)]" />

      {/* Low sun behind the range */}
      <motion.div
        className="animate-drift-slow absolute top-[6%] left-[62%] h-[52vmin] w-[52vmin] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          y: reduced ? still : sun,
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-hajjar-300) 62%, transparent) 0%, transparent 66%)",
        }}
      />

      <Rainfall reduced={Boolean(reduced)} />

      {/*
        Each range is anchored to the bottom of the hero and fills all the
        way down, so the range in front always covers the one behind it and
        no layer can show a cut edge. Peak heights and slope widths are
        deliberately uneven — an even sawtooth reads as a chart, not a
        mountain range.
      */}
      <motion.svg
        className="absolute inset-x-0 bottom-0 h-[46%] w-full"
        viewBox="0 78 1440 322"
        preserveAspectRatio="xMidYMax slice"
        style={{ y: reduced ? still : ridgeFar }}
      >
        <path
          d="M0 400V186l96-28 56 38 116-92 78 72 56-26 113 55 113-73 62 36 116-80 86 76 118-24 78 50 116-72 96 54 82-26 58 32v212Z"
          fill="var(--color-brand-400)"
          opacity="0.4"
        />
      </motion.svg>

      <motion.svg
        className="absolute inset-x-0 bottom-0 h-[40%] w-full"
        viewBox="0 94 1440 306"
        preserveAspectRatio="xMidYMax slice"
        style={{ y: reduced ? still : ridgeMid }}
      >
        <path
          d="M0 400V236l72-32 116 44 74-112 96 86 112-46 76 78 116-150 82 94 86-38 116 84 100-96 102 72 114-54 86 74 92-42v238Z"
          fill="var(--color-brand-600)"
          opacity="0.65"
        />
      </motion.svg>

      <motion.svg
        className="absolute inset-x-0 bottom-0 h-[33%] w-full"
        viewBox="0 140 1440 260"
        preserveAspectRatio="xMidYMax slice"
        style={{ y: reduced ? still : ridgeNear }}
      >
        <path
          d="M0 400V296l110-40 96 54 84-124 82 92 96-54 92 78 88-152 94 96 116-46 82 94 118-64 112 66 106-76 94 66 70-34v208Z"
          fill="var(--color-brand-900)"
        />
      </motion.svg>

      {/* The water table the ranges stand in */}
      <div className="absolute inset-x-0 bottom-0 h-[24%] bg-[linear-gradient(to_bottom,transparent,var(--color-brand-900)_22%,var(--color-brand-950))]" />

      {/* Caustics — two slow pools of light on the surface */}
      <div
        className="animate-drift absolute inset-x-0 bottom-0 h-[24%] opacity-60"
        style={{
          background:
            "radial-gradient(60% 120% at 24% 55%, color-mix(in srgb, var(--color-spring-500) 40%, transparent), transparent 66%), radial-gradient(52% 100% at 78% 72%, color-mix(in srgb, var(--color-spring-400) 26%, transparent), transparent 68%)",
        }}
      />
    </div>
  );
}

/**
 * Rainfall over the sky only. Fixed positions so the server and client
 * render identical markup, and blurred so the streaks read as rain rather
 * than as hairline rendering artefacts.
 */
const DROPS = [
  { left: 4, delay: 0, duration: 3.2, height: 34 },
  { left: 13, delay: 1.6, duration: 3.9, height: 26 },
  { left: 22, delay: 0.6, duration: 3.5, height: 40 },
  { left: 31, delay: 2.3, duration: 4.2, height: 28 },
  { left: 44, delay: 1.0, duration: 3.3, height: 36 },
  { left: 57, delay: 2.0, duration: 4.0, height: 26 },
  { left: 68, delay: 0.35, duration: 3.6, height: 42 },
  { left: 79, delay: 2.6, duration: 3.4, height: 30 },
  { left: 88, delay: 1.25, duration: 4.1, height: 24 },
  { left: 96, delay: 0.85, duration: 3.7, height: 32 },
];

function Rainfall({ reduced }: { reduced: boolean }) {
  if (reduced) return null;

  return (
    <div className="absolute inset-x-0 top-0 h-[52%] overflow-hidden opacity-[0.10] blur-[0.6px]">
      {DROPS.map((drop) => (
        <span
          key={drop.left}
          className="absolute top-0 w-px rounded-full bg-[linear-gradient(to_bottom,transparent,var(--color-brand-500),transparent)]"
          style={{
            left: `${drop.left}%`,
            height: `${drop.height}px`,
            animation: `alkhoud-fall ${drop.duration}s linear ${drop.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes alkhoud-fall {
          from { transform: translate3d(0, -15vh, 0); opacity: 0; }
          12%  { opacity: 1; }
          88%  { opacity: 1; }
          to   { transform: translate3d(0, 62vh, 0); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
