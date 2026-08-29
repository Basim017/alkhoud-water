"use client";

import { useRef, useState } from "react";
import { contactSection } from "@/content/site";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "sending" | "sent" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name) next.name = "Enter your name so we know who to reply to.";
    if (!email) next.email = "Enter an email address we can reply to.";
    else if (!EMAIL_RE.test(email)) next.email = "That email address is missing an @ or a domain.";
    if (!message) next.message = "Tell us what you need and we will get back to you.";

    return next;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);

    // Move focus to the first field with a problem.
    const firstBad = (["name", "email", "message"] as const).find((key) => found[key]);
    if (firstBad) {
      form.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="on-deep">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="e.g. Fatma Al Balushi…"
          error={errors.name}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          placeholder="e.g. you@company.om…"
          error={errors.email}
        />
        <div className="sm:col-span-2">
          <Field
            label="Phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            optional
            placeholder="e.g. +968 9000 0000…"
          />
        </div>
        <div className="sm:col-span-2">
          <Field
            label="Message"
            name="message"
            as="textarea"
            placeholder="How many bottles, and where should we deliver?…"
            error={errors.message}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-spring-400 px-7 py-3.5 text-sm font-semibold text-brand-950 transition-[background-color,transform] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:bg-spring-300 disabled:translate-y-0 disabled:opacity-70"
          disabled={status === "sending"}
          style={{ touchAction: "manipulation" }}
        >
          {status === "sending" ? "Sending…" : "Send Message"}
          {status === "sending" && <Spinner />}
        </button>

        <p aria-live="polite" className="text-sm">
          {status === "sent" && (
            <span className="text-spring-300">{contactSection.successMessage}</span>
          )}
          {status === "error" && (
            <span className="text-hajjar-300">
              That didn&rsquo;t send. Please call{" "}
              <a href="tel:80070066" className="underline">
                80070066
              </a>{" "}
              or email us instead.
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
  optional?: boolean;
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
  optional = false,
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
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: `w-full rounded-xl border bg-white/8 px-4 py-3 text-[15px] text-white placeholder:text-brand-200/70 transition-[border-color,background-color] duration-200 ease-[var(--ease-out-soft)] hover:bg-white/12 ${
      error ? "border-hajjar-300" : "border-white/18"
    }`,
  };

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-sm font-medium text-brand-100">
        {label}
        {optional && <span className="ml-1.5 text-brand-200/60">(optional)</span>}
      </label>
      <div className="mt-2">
        {as === "textarea" ? (
          <textarea {...shared} rows={5} />
        ) : (
          <input {...shared} type={type} inputMode={inputMode} />
        )}
      </div>
      {error && (
        <p id={errorId} className="mt-2 text-sm text-hajjar-300">
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
