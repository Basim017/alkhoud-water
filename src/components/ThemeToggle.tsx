"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/content";

const KEY = "alkhoud-theme";

/**
 * Light/dark switch.
 *
 * The initial value is read in an effect rather than during render: the
 * server has no way to know the visitor's stored preference, so rendering
 * one on the server and another on the client would be a hydration
 * mismatch. Until it resolves the button renders a stable placeholder.
 */
export function ThemeToggle({ t }: { t: Dictionary }) {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    try {
      localStorage.setItem(KEY, next ? "dark" : "light");
    } catch {
      // Storage can be unavailable; the theme still applies for this visit.
    }
    setDark(next);
  }

  const label = dark ? t.a11y.toLight : t.a11y.toDark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full text-current transition-colors duration-200 ease-[var(--ease-out-soft)] hover:bg-current/12"
      style={{ touchAction: "manipulation" }}
    >
      {/* Both glyphs are always in the DOM; only the transform changes, so
          the swap cannot shift layout. */}
      <span className="relative block h-5 w-5">
        <Sun className={iconClass(dark === false)} />
        <Moon className={iconClass(dark === true)} />
      </span>
    </button>
  );
}

function iconClass(shown: boolean) {
  return `absolute inset-0 h-5 w-5 transition-[opacity,transform] duration-300 ease-[var(--ease-out-quint)] ${
    shown ? "scale-100 opacity-100" : "scale-50 opacity-0"
  }`;
}

function Sun({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6" />
    </svg>
  );
}

function Moon({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.7 8.7 0 1 0 11.1 11.1Z" />
    </svg>
  );
}
