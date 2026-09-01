"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { contact, type Dictionary } from "@/content";

export function SiteHeader({ t }: { t: Dictionary }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Until it scrolls, the header floats over the hero photograph; its text
  // has to be light there and take the page colour afterwards.
  const overPhoto = !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,color] duration-300 ease-[var(--ease-out-soft)] ${
        overPhoto ? "bg-transparent text-white" : "bg-bg/85 text-fg shadow-sm shadow-black/5 backdrop-blur-md"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="container-page flex h-(--header-h) items-center justify-between gap-3">
        <a href="#top" className="shrink-0" aria-label={t.a11y.backToTop}>
          <Logo tone={overPhoto ? "light" : "auto"} className="text-[0.95rem] md:text-base" />
        </a>

        <nav aria-label={t.a11y.primaryNav} className="hidden items-center gap-1 md:flex">
          {t.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="pressable rounded-full px-4 py-2 text-sm font-medium text-current hover:bg-current/12"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href={t.otherLocaleHref}
            lang={t.locale === "en" ? "ar" : "en"}
            className="pressable inline-flex h-11 items-center rounded-full px-3 text-sm font-medium text-current hover:bg-current/12"
          >
            {t.otherLocaleLabel}
          </Link>

          <ThemeToggle t={t} />

          <a
            href={contact.tollFreeHref}
            className="pressable pressable-lift ms-1 hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-bg sm:inline-flex"
          >
            <span className="hidden lg:inline">{t.header.tollFreeShort}&nbsp;</span>
            <span translate="no" style={{ fontVariantNumeric: "tabular-nums" }}>
              {contact.tollFree}
            </span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="pressable inline-flex h-11 w-11 items-center justify-center rounded-full text-current hover:bg-current/12 md:hidden"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="stratum overscroll-contain bg-bg/95 backdrop-blur-md md:hidden"
      >
        <nav aria-label={t.a11y.mobileNav} className="container-page flex flex-col py-3">
          {t.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="pressable rounded-lg px-2 py-3.5 text-base font-medium text-fg hover:bg-fg/8"
            >
              {link.label}
            </a>
          ))}
          <a
            href={contact.tollFreeHref}
            onClick={() => setOpen(false)}
            className="pressable mt-2 rounded-full bg-accent px-5 py-3.5 text-center text-base font-semibold text-bg"
          >
            {t.header.tollFreeShort}{" "}
            <span translate="no">{contact.tollFree}</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    >
      <line
        x1="4"
        y1="8"
        x2="20"
        y2="8"
        className="origin-center transition-transform duration-200 ease-[var(--ease-out-soft)]"
        style={open ? { transform: "translateY(4px) rotate(45deg)" } : undefined}
      />
      <line
        x1="4"
        y1="16"
        x2="20"
        y2="16"
        className="origin-center transition-transform duration-200 ease-[var(--ease-out-soft)]"
        style={open ? { transform: "translateY(-4px) rotate(-45deg)" } : undefined}
      />
    </svg>
  );
}
