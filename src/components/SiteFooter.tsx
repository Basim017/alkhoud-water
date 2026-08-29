import { Logo } from "@/components/Logo";
import { company, contact, copyright, nav, social } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="on-deep border-t border-white/10 bg-brand-950 text-brand-200">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
          <div>
            <Logo tone="light" className="text-base" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              {company.descriptor}, drawn from the Al Hajjar mountains and delivered across the
              Sultanate of Oman.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((link) => (
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
              translate="no"
            >
              Toll Free {contact.tollFree}
            </a>
            <a
              href={`mailto:${contact.email}`}
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
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs text-brand-200/60">{copyright}</p>
      </div>
    </footer>
  );
}
