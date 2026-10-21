"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { localizePath, type Locale } from "@/lib/i18n";
import { Icon } from "./icons";
import { Reveal } from "./reveal";

interface NewsletterProps {
  locale: Locale;
  labels: {
    title: string;
    subtitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    consent: string;
    privacyLink: string;
    submit: string;
    submitting: string;
    success: string;
    /** Shown when the subscription was recorded but not forwarded anywhere. */
    successPending: string;
    error: string;
    invalidEmail: string;
    consentRequired: string;
  };
}

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Newsletter sign-up.
 *
 * The form posts to `/api/newsletter`, which forwards to whichever provider is
 * configured through environment variables and degrades gracefully to a
 * server-side log when none is set. When nothing is forwarded the visitor is
 * told so: a subscription that promises a confirmation e-mail that never
 * arrives is worse than no subscription at all.
 */
export function Newsletter({ locale, labels }: NewsletterProps) {
  const emailId = useId();
  const consentId = useId();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [delivered, setDelivered] = useState(true);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setStatus("error");
      setMessage(labels.invalidEmail);
      return;
    }

    if (!consent) {
      setStatus("error");
      setMessage(labels.consentRequired);
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), consent, locale }),
      });

      if (!response.ok) throw new Error("request_failed");

      // Without a configured provider the subscription is only logged: the
      // confirmation e-mail is never sent, so the visitor is told the truth.
      const result = (await response.json().catch(() => null)) as {
        delivered?: boolean;
      } | null;
      setDelivered(result?.delivered !== false);

      setStatus("success");
      setEmail("");
      setConsent(false);
    } catch {
      setStatus("error");
      setMessage(labels.error);
    }
  }

  return (
    <section className="bg-ink-950 py-16 text-white sm:py-20">
      <div className="container-shell grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-5">
          <h2 className="text-title font-bold text-balance text-white">
            {labels.title}
          </h2>
          <p className="mt-5 max-w-md text-lead text-pretty text-ink-100/80">
            {labels.subtitle}
          </p>
        </Reveal>

        <Reveal delay={90} className="lg:col-span-7">
          {status === "success" ? (
            <div
              role="status"
              className="flex items-start gap-3.5 border border-white/15 p-6"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-500/20 text-brand-200">
                <Icon name="check" className="size-5" strokeWidth={2.4} />
              </span>
              <p className="text-lead leading-relaxed text-white">
                {delivered ? labels.success : labels.successPending}
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex-1">
                  <label htmlFor={emailId} className="sr-only">
                    {labels.emailLabel}
                  </label>
                  <input
                    id={emailId}
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={labels.emailPlaceholder}
                    className="w-full border-b border-white/25 bg-transparent px-1 py-3 text-small text-white placeholder:text-ink-300/70 transition focus:border-brand-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn bg-brand-700 text-white hover:-translate-y-0.5 hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting" ? labels.submitting : labels.submit}
                  {status === "submitting" ? null : (
                    <Icon name="arrow-right" className="size-4" />
                  )}
                </button>
              </div>

              <label
                htmlFor={consentId}
                className="flex cursor-pointer items-start gap-3 text-small text-ink-100/80"
              >
                <input
                  id={consentId}
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  className="mt-0.5 size-4 shrink-0 rounded border-white/30 bg-transparent accent-brand-400"
                />
                <span>
                  {labels.consent}{" "}
                  <Link
                    href={localizePath(locale, "/privacy")}
                    className="font-medium text-brand-300 underline decoration-brand-300/40 underline-offset-2 transition hover:text-brand-200"
                  >
                    {labels.privacyLink}
                  </Link>
                </span>
              </label>

              {message ? (
                <p
                  role="alert"
                  className={cn(
                    "text-small",
                    status === "error" ? "text-red-300" : "text-brand-200",
                  )}
                >
                  {message}
                </p>
              ) : null}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
