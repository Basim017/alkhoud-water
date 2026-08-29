"use client";

import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { contact, contactSection, social } from "@/content/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="on-deep relative isolate overflow-hidden bg-brand-950 py-24 text-white md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 -bottom-1/3 h-[60vmin] w-[60vmin] rounded-full blur-3xl animate-drift-slow"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-brand-600) 55%, transparent), transparent 70%)",
        }}
      />

      <div className="container-page relative grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.22em] text-spring-400 uppercase">
              Get In Touch
            </p>
            <h2 className="display mt-4 text-4xl sm:text-5xl md:text-6xl">
              {contactSection.title}
            </h2>
            <p className="lede mt-6 text-lg text-brand-200">{contactSection.body}</p>
          </Reveal>

          <Reveal delay={0.08} className="mt-10">
            {/* Every direct child of the <dl> is a <div> holding one
                dt/dd pair — the two-column row is done with a grid on the
                list itself rather than an extra wrapper, which would make
                the dt/dd grandchildren and break the list semantics. */}
            <dl className="grid grid-cols-1 gap-7 sm:grid-cols-2">
              <div className="min-w-0 sm:col-span-2">
                <dt className="text-xs font-semibold tracking-[0.16em] text-spring-400 uppercase">
                  Toll Free
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={contact.tollFreeHref}
                    className="display text-3xl text-white transition-colors duration-200 hover:text-spring-300 sm:text-4xl"
                    translate="no"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {contact.tollFree}
                  </a>
                </dd>
              </div>

              <div className="min-w-0">
                <dt className="text-xs font-semibold tracking-[0.16em] text-spring-400 uppercase">
                  Telephone
                </dt>
                <dd className="mt-1.5 break-words">
                  <a
                    href={contact.phoneHref}
                    className="inline-flex min-h-6 items-center text-base text-brand-100 transition-colors duration-200 hover:text-white"
                    translate="no"
                  >
                    {contact.phone}
                  </a>
                </dd>
              </div>

              <div className="min-w-0">
                <dt className="text-xs font-semibold tracking-[0.16em] text-spring-400 uppercase">
                  Email
                </dt>
                <dd className="mt-1.5 break-words">
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex min-h-6 items-center text-base text-brand-100 transition-colors duration-200 hover:text-white"
                    translate="no"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>

              <div className="min-w-0 sm:col-span-2">
                <dt className="text-xs font-semibold tracking-[0.16em] text-spring-400 uppercase">
                  Address
                </dt>
                <dd className="mt-1.5">
                  <address className="text-base leading-relaxed text-brand-100 not-italic">
                    {contact.address.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </dd>
              </div>

              <div className="min-w-0 sm:col-span-2">
                <dt className="text-xs font-semibold tracking-[0.16em] text-spring-400 uppercase">
                  Follow
                </dt>
                <dd className="mt-2.5 flex gap-2.5">
                  {social.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${item.label} (opens in a new tab)`}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/18 text-brand-100 transition-[background-color,border-color,transform] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-spring-400 hover:bg-white/10 hover:text-white"
                      style={{ touchAction: "manipulation" }}
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
          <div className="rounded-3xl border border-white/12 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
            <h3 className="display text-2xl text-white">Send Us A Message</h3>
            <p className="mt-2 text-sm text-brand-200">
              We reply to every enquiry. For urgent orders, the toll free line is fastest.
            </p>
            <div className="mt-7">
              <ContactForm />
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
  // X (formerly Twitter)
  return (
    <svg {...common} fill="currentColor">
      <path d="M17.2 3h3.3l-7.2 8.2L21.8 21h-6.6l-4.3-5.6L5.9 21H2.6l7.7-8.8L2.5 3h6.8l3.9 5.2L17.2 3Zm-1.15 16h1.83L8.06 4.9H6.1L16.05 19Z" />
    </svg>
  );
}
