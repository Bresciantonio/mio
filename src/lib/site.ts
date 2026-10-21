/**
 * Central place for site-wide constants.
 *
 * 👉 UPDATE THESE VALUES before going live: contact details, domain and socials.
 * They are intentionally kept in one file so you never have to hunt through
 * components to change your email address or phone number.
 */

/**
 * Release state.
 *
 * - `beta` — work in progress: the site says so in a banner on every page, the
 *   details that are not final yet are not published, and search engines are
 *   asked to leave it alone.
 * - `live` — everything is published and the site becomes indexable.
 *
 * Controlled by the `SITE_STATUS` environment variable. Anything that is not
 * exactly `live` keeps the site in beta, so a missing variable is the safe
 * default: the beta can never be published by accident.
 */
export type SiteStatus = "beta" | "live";

const status = (
  process.env.NEXT_PUBLIC_SITE_STATUS ??
  process.env.SITE_STATUS ??
  "beta"
)
  .trim()
  .toLowerCase();

export const siteStatus: SiteStatus = status === "live" ? "live" : "beta";

/** True while the site is still a beta. */
export const isBeta = siteStatus === "beta";

const domain = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname
  : "antoniobrescia.it"; // TODO: set your real domain

export const site = {
  name: "Antonio Brescia",
  legalName: "Antonio Brescia — Consulenza Energetica",
  role: "Senior Energy Consultant",
  domain,
  url: `https://${domain}`,
  // TODO: override with NEXT_PUBLIC_CONTACT_EMAIL if the mailbox is not on the domain.
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? `info@${domain}`,
  // The details below are published only once they hold a real value: an empty
  // string means "not published yet" and the UI hides the row instead of
  // showing invented data. Fill them in and they appear everywhere.
  phone: "", // TODO: real phone number
  phoneHref: "", // TODO: digits only, for tel: links
  vat: "", // TODO: partita IVA / P.IVA
  address: {
    city: "Milano",
    country: "Italia",
    full: "", // TODO: full street address
  },
  hours: "Lun–Ven, 9:00–18:00 CET",
  linkedin: "", // TODO: your profile URL
  availability: "Disponibile per progetti da Q1 2027",
};

/** True when a contact detail has been filled in and can be published. */
export const hasPhone = site.phone.trim().length > 0;
export const hasAddress = site.address.full.trim().length > 0;
export const hasVat = site.vat.trim().length > 0;
export const hasLinkedin = site.linkedin.trim().length > 0;

/** Default contact webhook (e.g. a Formspree/Basin endpoint). See README. */
export const contactWebhookUrl = process.env.CONTACT_WEBHOOK_URL ?? "";
