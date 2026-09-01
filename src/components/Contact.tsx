"use client";

import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { contact, media, social, type Dictionary } from "@/content";

export function Contact({ t }: { t: Dictionary }) {
  const c = t.contact;
  const addressLines = t.locale === "ar" ? contact.addressLinesArabic : contact.addressLines;

  return (
    <section
      id="contact"
      className="on-photo relative isolate overflow-hidden bg-stone-950 py-24 text-white md:py-32"
    >
      {/* The water surface shot from the original site, used as texture. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-1/2 opacity-20">
        <Image src={media.waterSurface.src} alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(26,24,21,0.7),var(--color-stone-950)_60%)]"
      />

      <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow text-spring-400">{c.eyebrow}</p>
            <h2 className="display mt-4 text-4xl sm:text-5xl md:text-6xl">{c.title}</h2>
            <p className="lede mt-6 text-lg text-stone-300">{c.body}</p>
          </Reveal>

          <Reveal delay={0.08} className="mt-10">
            <dl className="grid grid-cols-1 gap-7 sm:grid-cols-2">
              <div className="min-w-0 sm:col-span-2">
                <dt className="eyebrow text-spring-400">{c.labels.tollFree}</dt>
                <dd className="mt-1.5">
                  <a
                    href={contact.tollFreeHref}
                    className="display text-3xl text-white transition-colors duration-200 hover:text-spring-300 sm:text-4xl"
                    translate="no"
                    dir="ltr"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {contact.tollFree}
                  </a>
                </dd>
              </div>

              <div className="min-w-0">
                <dt className="eyebrow text-spring-400">{c.labels.telephone}</dt>
                <dd className="mt-1.5 break-words">
                  <a
                    href={contact.phoneHref}
                    dir="ltr"
                    className="inline-flex min-h-6 items-center text-base text-stone-200 transition-colors duration-200 hover:text-white"
                    translate="no"
                  >
                    {contact.phone}
                  </a>
                </dd>
              </div>

              <div className="min-w-0">
                <dt className="eyebrow text-spring-400">{c.labels.email}</dt>
                <dd className="mt-1.5 break-words">
                  <a
                    href={`mailto:${contact.email}`}
                    dir="ltr"
                    className="inline-flex min-h-6 items-center text-base text-stone-200 transition-colors duration-200 hover:text-white"
                    translate="no"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>

              <div className="min-w-0 sm:col-span-2">
                <dt className="eyebrow text-spring-400">{c.labels.address}</dt>
                <dd className="mt-1.5">
                  <address className="text-base leading-relaxed text-stone-200 not-italic">
                    {addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </dd>
              </div>

              <div className="min-w-0 sm:col-span-2">
                <dt className="eyebrow text-spring-400">{c.labels.follow}</dt>
                <dd className="mt-2.5 flex gap-2.5">
                  {social.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${item.label} ${t.a11y.newTab}`}
                      className="pressable pressable-lift inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-stone-200 hover:border-spring-400 hover:bg-white/10 hover:text-white"
                    >
                      <SocialIcon name={item.label} />
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="lg:pt-2">
          <div className="rounded-2xl border border-white/12 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
            <h3 className="display text-2xl text-white">{c.formTitle}</h3>
            <p className="mt-2 text-sm text-stone-300">{c.formNote}</p>
            <div className="mt-7">
              <ContactForm t={t} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SocialIcon({ name }: { name: string }) {
  const common = { "aria-hidden": true, viewBox: "0 0 24 24", className: "h-[18px] w-[18px]" } as const;

  if (name === "Facebook") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.29-.04-1.27-.12-2.41-.12-2.39 0-4.03 1.46-4.03 4.14V9.9H7.5V13h2.76v8h3.24Z" />
      </svg>
    );
  }
  if (name === "Instagram") {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg {...common} fill="currentColor">
      <path d="M17.2 3h3.3l-7.2 8.2L21.8 21h-6.6l-4.3-5.6L5.9 21H2.6l7.7-8.8L2.5 3h6.8l3.9 5.2L17.2 3Zm-1.15 16h1.83L8.06 4.9H6.1L16.05 19Z" />
    </svg>
  );
}
