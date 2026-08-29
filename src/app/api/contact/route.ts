import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * This validates and accepts the submission. It does NOT yet deliver the
 * message anywhere — wire an email provider (Resend, SES, SMTP relay) or
 * a CRM webhook at the marked spot below before going live, otherwise
 * enquiries are accepted and silently dropped.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTH = 5000;

type Payload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
};

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_LENGTH) : "";
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request body." }, { status: 400 });
  }

  const name = asText(body.name);
  const email = asText(body.email);
  const phone = asText(body.phone);
  const message = asText(body.message);

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Name is required.";
  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) errors.email = "Email is not a valid address.";
  if (!message) errors.message = "Message is required.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  // TODO(client): deliver the enquiry. For example, with Resend:
  //
  //   await resend.emails.send({
  //     from: "site@alkhoud.com",
  //     to: "info@alkhoud.com",
  //     replyTo: email,
  //     subject: `Website enquiry — ${name}`,
  //     text: `${name}\n${email}\n${phone}\n\n${message}`,
  //   });
  //
  // Until that is in place the submission is only acknowledged.
  console.info("[contact] enquiry received", { name, email, phone: phone || null });

  return NextResponse.json({ ok: true }, { status: 200 });
}
