import { Logo } from "@/components/Logo";
import { contact, copyright, social, type Dictionary } from "@/content";

export function SiteFooter({ t }: { t: Dictionary }) {
  return (
    <footer className="border-t border-white/10 bg-stone-950 text-stone-300">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
          <div>
            <Logo tone="light" className="text-base" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed">{t.footer.blurb}</p>
          </div>

          <nav aria-label={t.a11y.footerNav} className="flex flex-wrap gap-x-6 gap-y-2">
            {t.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex min-h-6 items-center text-sm transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <a
              href={contact.tollFreeHref}
              className="inline-flex min-h-6 items-center transition-colors duration-200 hover:text-white"
            >
              {t.footer.tollFree}{" "}
              <span translate="no" dir="ltr" className="ms-1">
                {contact.tollFree}
              </span>
            </a>
            <a
              href={`mailto:${contact.email}`}
              dir="ltr"
              className="inline-flex min-h-6 items-center transition-colors duration-200 hover:text-white"
              translate="no"
            >
              {contact.email}
            </a>
          </div>

          <div className="flex gap-4">
            {social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-6 min-w-6 items-center justify-center text-sm transition-colors duration-200 hover:text-white"
              >
                {item.label}
                <span className="sr-only"> {t.a11y.newTab}</span>
              </a>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs text-stone-500" dir="ltr">
          {copyright}
        </p>
      </div>
    </footer>
  );
}
