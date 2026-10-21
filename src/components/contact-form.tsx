"use client";

import { useState, type FormEvent } from "react";
import { localizePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import type { Messages } from "@/messages";
import { cn } from "@/lib/cn";
import { Icon } from "./icons";
import { Reveal } from "./reveal";

interface ContactFormProps {
  locale: Locale;
  dict: Messages;
  services: string[];
}

type Status = "idle" | "sending" | "success" | "error";

type FieldName = "name" | "email" | "company" | "phone" | "service" | "message";

interface FormValues {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
  consent: boolean;
  /** Honeypot: humans never fill this hidden field. */
  website: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "",
  message: "",
  consent: false,
  website: "",
};

export function ContactForm({ locale, dict, services }: ContactFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [submittedName, setSubmittedName] = useState("");
  const [errors, setErrors] = useState<
    Partial<Record<FieldName | "consent", string>>
  >({});
  const [status, setStatus] = useState<Status>("idle");
  const [delivered, setDelivered] = useState(true);

  const { form: labels, validation } = dict.contact;

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(current: FormValues): boolean {
    const next: Partial<Record<FieldName | "consent", string>> = {};
    if (!current.name.trim()) next.name = validation.nameRequired;
    if (!current.email.trim()) next.email = validation.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(current.email.trim()))
      next.email = validation.emailInvalid;
    if (!current.message.trim()) next.message = validation.messageRequired;
    else if (current.message.trim().length < 20)
      next.message = validation.messageShort;
    if (!current.consent) next.consent = validation.consentRequired;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    if (!validate(values)) {
      document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          phone: values.phone.trim(),
          service: values.service,
          message: values.message.trim(),
          website: values.website,
          locale: document.documentElement.lang || "it",
        }),
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);

      // The endpoint tells us whether the lead was really forwarded. Without
      // a webhook the request is only logged, and the visitor is told that
      // instead of waiting for a reply that cannot arrive.
      const result = (await response.json().catch(() => null)) as {
        delivered?: boolean;
      } | null;
      setDelivered(result?.delivered !== false);

      setSubmittedName(values.name.trim());
      setValues(initialValues);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex h-full flex-col items-start justify-center bg-paper p-10"
      >
        <span className="grid size-14 place-items-center rounded-full bg-brand-50 text-brand-600">
          <Icon name="check" className="size-7" />
        </span>
        <h3 className="mt-5 text-subtitle font-bold text-ink-950">
          {delivered
            ? dict.contact.success.title
            : dict.contact.success.pendingTitle}
        </h3>
        <p className="mt-3 max-w-sm text-body text-ink-800">
          {delivered
            ? dict.contact.success.message.replace("{name}", submittedName)
            : dict.contact.success.pending.replace("{name}", submittedName)}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-secondary mt-6"
        >
          {labels.reset}
        </button>
      </div>
    );
  }

  const fieldError = (key: FieldName | "consent") =>
    errors[key] ? (
      <p id={`${key}-error`} className="mt-1.5 text-micro text-red-600">
        {errors[key]}
      </p>
    ) : null;

  const describedBy = (key: FieldName | "consent") =>
    errors[key] ? `${key}-error` : undefined;

  return (
    <form onSubmit={onSubmit} noValidate className="bg-paper p-6 sm:p-9">
      <h3 className="text-subtitle font-bold text-ink-950">{labels.title}</h3>
      <p className="mt-2 max-w-[60ch] text-body text-ink-800">{labels.privacyNote}</p>

      {status === "error" ? (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <p className="font-semibold">{dict.contact.error.title}</p>
          <p className="mt-0.5">
            {dict.contact.error.message.replace("{email}", site.email)}
          </p>
        </div>
      ) : null}

      <Reveal delay={90}>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label">
            {labels.name} <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            placeholder={labels.namePlaceholder}
            className="input"
          />
          {fieldError("name")}
        </div>

        <div>
          <label htmlFor="email" className="label">
            {labels.email} <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            placeholder={labels.emailPlaceholder}
            className="input"
          />
          {fieldError("email")}
        </div>

        <div>
          <label htmlFor="company" className="label">
            {labels.company}
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            placeholder={labels.companyPlaceholder}
            className="input"
          />
        </div>

        <div>
          <label htmlFor="phone" className="label">
            {labels.phone}{" "}
            <span className="font-normal text-ink-800">({labels.optional})</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder={labels.phonePlaceholder}
            className="input"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="service" className="label">
            {labels.service}
          </label>
          <select
            id="service"
            name="service"
            value={values.service}
            onChange={(e) => update("service", e.target.value)}
            className="input"
          >
            <option value="">{labels.servicePlaceholder}</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="label">
            {labels.message} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message")}
            placeholder={labels.messagePlaceholder}
            className="input resize-y"
          />
          {fieldError("message")}
        </div>

        {/* Honeypot — visually hidden from users, attractive to bots */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="flex max-w-[60ch] items-start gap-3 text-small text-ink-800">
            <input
              type="checkbox"
              checked={values.consent}
              onChange={(e) => update("consent", e.target.checked)}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={describedBy("consent")}
              className="mt-0.5 size-4 shrink-0 rounded border-ink-300 text-brand-600 focus:ring-brand-600"
            />
            <span>
              {labels.consent}{" "}
              <a
                href={localizePath(locale, "/privacy")}
                className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-800"
              >
                {labels.consentLink}
              </a>
              .
            </span>
          </label>
          {fieldError("consent")}
        </div>
        </div>
      </Reveal>

      <button
        type="submit"
        disabled={status === "sending"}
        className={cn("btn-primary mt-6 w-full sm:w-auto")}
      >
        {status === "sending" ? labels.sending : labels.submit}
        {status !== "sending" && <Icon name="arrow-right" className="size-4" />}
      </button>
    </form>
  );
}
