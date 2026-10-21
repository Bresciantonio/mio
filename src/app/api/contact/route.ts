import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * Delivery strategy (see README):
 *   - If `CONTACT_WEBHOOK_URL` is set (e.g. a Formspree/Basin endpoint), the
 *     lead is forwarded there as JSON.
 *   - Otherwise the lead is logged to the server console so nothing is lost.
 *
 * The client already validates; this endpoint re-validates defensively and
 * honours the honeypot field (`website`) used to filter bots.
 */

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  phone?: unknown;
  service?: unknown;
  message?: unknown;
  website?: unknown;
  locale?: unknown;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: real users never see or fill this field. Silently accept bots.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const service = typeof body.service === "string" ? body.service.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const locale = typeof body.locale === "string" ? body.locale : "it";

  if (!name || !EMAIL_RE.test(email) || message.length < 20) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const payload = {
    name,
    email,
    company,
    phone,
    service,
    message,
    locale,
    source: "website",
    submittedAt: new Date().toISOString(),
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;

  // `delivered` tells the client whether the lead really left the site: with
  // no webhook configured the lead is only logged, and the visitor is told so
  // instead of waiting for a reply that never comes.
  let delivered = false;

  try {
    if (webhook) {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Webhook responded with ${response.status}`);
      }
      delivered = true;
    } else {
      // No webhook configured: log so the lead is still captured in server logs.
      console.log("[contact] new lead:", JSON.stringify(payload));
    }
  } catch (error) {
    console.error("[contact] delivery failed:", error);
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered });
}
