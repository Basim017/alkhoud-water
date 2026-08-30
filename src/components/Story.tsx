"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { company, media, type Dictionary } from "@/content";

/**
 * Our Story, set beside the rock it is about. The photograph is sticky on
 * wide screens so the reader keeps the source in view while reading how
 * the water gets out of it.
 */
export function Story({ t }: { t: Dictionary }) {
  return (
    <section id="story" className="stratum relative bg-sunk py-24 md:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="eyebrow text-spring-700 dark:text-spring-400">{t.story.eyebrow}</p>
            <h2 className="display mt-4 text-4xl sm:text-5xl md:text-6xl">{t.story.title}</h2>
            <p
              aria-hidden="true"
              dir="rtl"
              className="font-arabic mt-4 text-3xl font-light text-muted"
            >
              {company.nameArabic}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-8">
            <Image
              src={media.hajjar.src}
              alt={t.hero.photoAlt}
              width={media.hajjar.width}
              height={media.hajjar.height}
              sizes="(max-width: 1024px) 92vw, 24rem"
              loading="lazy"
              className="w-full rounded-lg object-cover"
            />
          </Reveal>
        </div>

        <div>
          <Reveal>
            <p className="display text-2xl text-accent sm:text-3xl">{t.story.lead}</p>
          </Reveal>

          <div className="mt-8 space-y-6">
            {t.story.paragraphs.map((paragraph, i) => (
              <Reveal key={paragraph.slice(0, 32)} delay={i * 0.04}>
                <p className="lede max-w-[66ch] text-base text-muted sm:text-lg">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
