"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";

/**
 * Scroll reveal, subtle tier: 8–16px of travel over 400–600ms so it reads
 * as a fade rather than a slide. Under `prefers-reduced-motion` the content
 * is rendered in its final state with no transform.
 */
const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  /** Seconds of delay. Keep stagger steps at 0.06–0.09s. */
  delay?: number;
  as?: ElementType;
  className?: string;
  /** Travel distance in px. Defaults to the subtle 14px. */
  y?: number;
};

export function Reveal({ children, delay = 0, as, className, y = 14 }: RevealProps) {
  const reduced = useReducedMotion();
  const Component = motion.create((as ?? "div") as ElementType);

  if (reduced) {
    const Static = (as ?? "div") as ElementType;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}

/**
 * Parent/child pair for staggered lists. Stagger is capped at 0.07s per
 * item so a row of cards never feels laggy at the tail.
 */
export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

export function Stagger({ children, className, as }: StaggerProps) {
  const reduced = useReducedMotion();
  const Component = motion.create((as ?? "div") as ElementType);

  if (reduced) {
    const Static = (as ?? "div") as ElementType;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ children, className, as }: StaggerProps) {
  const reduced = useReducedMotion();
  const Component = motion.create((as ?? "div") as ElementType);

  if (reduced) {
    const Static = (as ?? "div") as ElementType;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component className={className} variants={staggerChild}>
      {children}
    </Component>
  );
}
