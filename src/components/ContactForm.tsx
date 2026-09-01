"use client";

import { useState } from "react";
import { contact, type Dictionary } from "@/content";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "sending" | "sent" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({ t }: { t: Dictionary }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const c = t.contact;

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name) next.name = c.errors.name;
    if (!email) next.email = c.errors.emailMissing;
    else if (!EMAIL_RE.test(email)) next.email = c.errors.emailInvalid;
    if (!message) next.message = c.errors.message;
    return next;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);

    const firstBad = (["name", "email", "message"] as const).find((k) => found[k]);
    if (firstBad) {
      form.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={c.labels.name}
          name="name"
          autoComplete="name"
          placeholder={c.placeholders.name}
          error={errors.name}
        />
        <Field
          label={c.labels.email}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          dir="ltr"
          placeholder={c.placeholders.email}
          error={errors.email}
        />
        <div className="sm:col-span-2">
          <Field
            label={c.labels.phone}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            optional={c.labels.optional}
            placeholder={c.placeholders.phone}
          />
        </div>
        <div className="sm:col-span-2">
          <Field
            label={c.labels.message}
            name="message"
            as="textarea"
            placeholder={c.placeholders.message}
            error={errors.message}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="pressable pressable-lift inline-flex items-center gap-2 rounded-full bg-spring-400 px-7 py-3.5 text-sm font-semibold text-stone-950 hover:bg-spring-300 disabled:translate-y-0 disabled:opacity-70"
        >
          {status === "sending" ? c.submitting : c.submit}
          {status === "sending" && <Spinner />}
        </button>

        <p aria-live="polite" className="text-sm">
          {status === "sent" && <span className="text-spring-300">{c.success}</span>}
          {status === "error" && (
            <span className="text-stone-200">
              {c.errorPrefix}{" "}
              <a href={contact.tollFreeHref} className="underline" translate="no">
                {contact.tollFree}
              </a>{" "}
              {c.errorSuffix}
            </span>
          )}
        </p>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  as?: "input" | "textarea";
  type?: string;
  inputMode?: "email" | "tel" | "text";
  autoComplete?: string;
  spellCheck?: boolean;
  placeholder?: string;
  /** Forces LTR on fields whose value is never Arabic (email, phone). */
  dir?: "ltr";
  optional?: string;
  error?: string;
};

function Field({
  label,
  name,
  as = "input",
  type = "text",
  inputMode,
  autoComplete,
  spellCheck,
  placeholder,
  dir,
  optional,
  error,
}: FieldProps) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;

  const shared = {
    id,
    name,
    placeholder,
    autoComplete,
    spellCheck,
    dir,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: `w-full rounded-lg border bg-white/8 px-4 py-3 text-[15px] text-white placeholder:text-stone-400 transition-[border-color,background-color] duration-200 ease-[var(--ease-out-soft)] hover:bg-white/12 ${
      error ? "border-spring-300" : "border-white/20"
    }`,
  };

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-sm font-medium text-stone-200">
        {label}
        {optional && <span className="ms-1.5 text-stone-400">{optional}</span>}
      </label>
      <div className="mt-2">
        {as === "textarea" ? (
          <textarea {...shared} rows={5} />
        ) : (
          <input {...shared} type={type} inputMode={inputMode} />
        )}
      </div>
      {error && (
        <p id={errorId} className="mt-2 text-sm text-spring-300">
          {error}
        </p>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-4 w-4 animate-spin"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="8" cy="8" r="6" opacity="0.25" />
      <path d="M14 8a6 6 0 0 0-6-6" strokeLinecap="round" />
    </svg>
  );
}
