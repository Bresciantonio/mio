import { NextResponse } from "next/server";

/**
 * Newsletter subscription endpoint.
 *
 * Provider-agnostic by design: the site can run with no provider at all (leads
 * are logged server-side), or forward to Brevo, Mailchimp or Mailjet through
 * environment variables. See README for the setup.
 *
 *   NEWSLETTER_PROVIDER=brevo     -> BREVO_API_KEY, BREVO_LIST_ID
 *   NEWSLETTER_PROVIDER=mailchimp -> MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID
 *                                    (MAILCHIMP_SERVER_PREFIX optional)
 *   NEWSLETTER_PROVIDER=mailjet   -> MAILJET_API_KEY, MAILJET_API_SECRET,
 *                                    MAILJET_LIST_ID
 */

type Provider = "brevo" | "mailchimp" | "mailjet" | "none";

interface NewsletterPayload {
  email?: unknown;
  consent?: unknown;
  locale?: unknown;
  /** Honeypot — hidden from real users. */
  website?: unknown;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function readProvider(): Provider {
  const raw = (process.env.NEWSLETTER_PROVIDER ?? "").toLowerCase();
  if (raw === "brevo" || raw === "mailchimp" || raw === "mailjet") return raw;
  return "none";
}

/** Mailchimp encodes the data centre in the API key suffix (`...-us21`). */
function mailchimpPrefix(apiKey: string): string | undefined {
  const explicit = process.env.MAILCHIMP_SERVER_PREFIX;
  if (explicit) return explicit;
  const suffix = apiKey.split("-").pop();
  return suffix && suffix.length > 1 ? suffix : undefined;
}

async function subscribeToBrevo(email: string, locale: string): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;
  if (!apiKey || !listId) throw new Error("brevo_not_configured");

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      email,
      listIds: [Number(listId)],
      attributes: { LANGUAGE: locale.toUpperCase() },
      updateEnabled: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`brevo_${response.status}`);
  }
}

async function subscribeToMailchimp(
  email: string,
  locale: string,
): Promise<void> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;
  const prefix = apiKey ? mailchimpPrefix(apiKey) : undefined;
  if (!apiKey || !listId || !prefix) throw new Error("mailchimp_not_configured");

  const response = await fetch(
    `https://${prefix}.api.mailchimp.com/3.0/lists/${listId}/members`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `apikey ${apiKey}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
        language: locale === "it" ? "it" : "en",
        tags: ["website"],
      }),
    },
  );

  if (!response.ok && response.status !== 400) {
    throw new Error(`mailchimp_${response.status}`);
  }
}

async function subscribeToMailjet(
  email: string,
  locale: string,
): Promise<void> {
  const apiKey = process.env.MAILJET_API_KEY;
  const apiSecret = process.env.MAILJET_API_SECRET;
  const listId = process.env.MAILJET_LIST_ID;
  if (!apiKey || !apiSecret || !listId) throw new Error("mailjet_not_configured");

  const response = await fetch(
    `https://api.mailjet.com/v3/contacts/${encodeURIComponent(listId)}/manage-contact`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}`,
      },
      body: JSON.stringify({
        Email: email,
        Action: "addforce",
        Name: email.split("@")[0],
        Properties: { Language: locale },
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`mailjet_${response.status}`);
  }
}

export async function POST(request: Request) {
  let body: NewsletterPayload;
  try {
    body = (await request.json()) as NewsletterPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  // Honeypot: accept silently so bots do not learn they were filtered.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const locale = typeof body.locale === "string" ? body.locale : "it";
  const consent = body.consent === true;

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "validation" },
      { status: 422 },
    );
  }

  // Consent is mandatory under GDPR for marketing e-mail: without it the
  // subscription is not actionable and must not be forwarded.
  if (!consent) {
    return NextResponse.json(
      { ok: false, error: "consent_required" },
      { status: 422 },
    );
  }

  const provider = readProvider();

  // Without a provider the subscription is only logged: the client says so
  // instead of promising a confirmation e-mail that is never sent.
  const delivered = provider !== "none";

  try {
    switch (provider) {
      case "brevo":
        await subscribeToBrevo(email, locale);
        break;
      case "mailchimp":
        await subscribeToMailchimp(email, locale);
        break;
      case "mailjet":
        await subscribeToMailjet(email, locale);
        break;
      default:
        // No provider configured: log the subscription so nothing is lost.
        console.log(
          "[newsletter] new subscription:",
          JSON.stringify({ email, locale, subscribedAt: new Date().toISOString() }),
        );
        break;
    }
  } catch (error) {
    console.error("[newsletter] delivery failed:", error);
    return NextResponse.json(
      { ok: false, error: "delivery" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, provider, delivered });
}
