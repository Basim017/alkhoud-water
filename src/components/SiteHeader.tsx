"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { contact, nav } from "@/content/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on Escape, and lock the page behind it.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-(--header-h) transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-[var(--ease-out-soft)] ${
        scrolled || open
          ? "bg-paper/85 shadow-sm shadow-brand-900/5 backdrop-blur-md"
          : "bg-transparent"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="container-page flex h-full items-center justify-between gap-4">
        <a
          href="#top"
          className="shrink-0 text-lg leading-none md:text-xl"
          aria-label="Al Khoud — back to top"
        >
          <Logo className="text-[0.95rem] md:text-base" />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-brand-900 transition-colors duration-200 ease-[var(--ease-out-soft)] hover:bg-brand-700/8 hover:text-brand-700"
              style={{ touchAction: "manipulation" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={contact.tollFreeHref}
            className="hidden rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition-[background-color,transform] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:bg-brand-600 sm:inline-flex"
            style={{ touchAction: "manipulation" }}
          >
            <span className="hidden lg:inline">Toll Free&nbsp;</span>
            <span translate="no">{contact.tollFree}</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-900 transition-colors duration-200 hover:bg-brand-700/8 md:hidden"
            style={{ touchAction: "manipulation" }}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="overscroll-contain border-t border-brand-900/10 bg-paper/95 backdrop-blur-md md:hidden"
      >
        <nav aria-label="Primary, mobile" className="container-page flex flex-col py-3">
          {nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3.5 text-base font-medium text-brand-900 transition-colors duration-200 hover:bg-brand-700/8"
              style={{ touchAction: "manipulation" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={contact.tollFreeHref}
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-brand-700 px-5 py-3.5 text-center text-base font-semibold text-white"
            style={{ touchAction: "manipulation" }}
          >
            Toll Free <span translate="no">{contact.tollFree}</span>
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
