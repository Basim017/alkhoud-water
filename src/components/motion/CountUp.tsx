"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: number;
  /** Rendered immediately after the number, e.g. "m". */
  unit?: string;
  className?: string;
  /** Skip thousands grouping — useful for years. */
  plain?: boolean;
};

/**
 * Counts up once when scrolled into view.
 *
 * The final value is rendered on the server, so the real number is always
 * in the HTML for crawlers and for anyone running without JavaScript, and
 * it is what shows under `prefers-reduced-motion`.
 *
 * The "have we started" flag is a ref rather than state on purpose: as
 * state it lands in the effect's dependency list, and the first counter
 * tick then re-runs the effect, whose cleanup stops the animation a frame
 * or two in and freezes the number at a wrong value.
 */
export function CountUp({ value, unit, className, plain = false }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const started = useRef(false);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduced || started.current) return;
    started.current = true;
    setDisplay(0);

    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
      // Guarantee we land exactly on the real figure.
      onComplete: () => setDisplay(value),
    });

    return () => controls.stop();
  }, [inView, reduced, value]);

  const formatted = plain
    ? String(display)
    : new Intl.NumberFormat("en-GB").format(display);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {formatted}
      {unit}
    </span>
  );
}
