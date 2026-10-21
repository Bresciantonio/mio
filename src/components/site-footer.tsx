import Link from "next/link";
import { localizePath, type Locale } from "@/lib/i18n";
import { hasAddress, hasLinkedin, hasPhone, hasVat, site } from "@/lib/site";
import { getCopyrightYear } from "@/lib/copyright-year";
import type { Messages } from "@/messages";
import { Icon } from "./icons";
import { Logo } from "./logo";

interface SiteFooterProps {
  locale: Locale;
  dict: Messages;
}

const navRoutes: Record<string, string> = {
  home: "/",
  services: "/servizi",
  about: "/#chi-sono",
  process: "/#metodo",
  credentials: "/#credenziali",
  testimonials: "/#referenze",
  faq: "/#faq",
  blog: "/blog",
  contact: "/contatti",
};

export async function SiteFooter({ locale, dict }: SiteFooterProps) {
  const nav = (Object.keys(navRoutes) as Array<keyof typeof dict.nav>)
    .filter((key) => key in dict.nav)
    .map((key) => ({ key, label: dict.nav[key], href: navRoutes[key] }));

  const year = await getCopyrightYear();

  return (
    <footer className="border-t border-ink-800 bg-ink-950 text-ink-100">
      <div className="container-shell py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <Logo className="from-brand-400 to-brand-600" />
              <span className="flex flex-col leading-none">
                <span className="text-base font-bold tracking-tight text-white">
                  Antonio Brescia
                </span>
                <span className="mt-1 text-[11px] font-medium tracking-wide text-ink-300 uppercase">
                  Energy Consultant
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-300">
              {dict.footer.tagline}
            </p>
            {hasLinkedin ? (
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink-200 transition hover:text-brand-300"
              >
                <Icon name="linkedin" className="size-4" />
                LinkedIn
              </a>
            ) : null}
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
              {dict.footer.columns.navigation}
            </h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {nav.map((item) => (
                <li key={item.key}>
                  <Link
                    href={localizePath(locale, item.href)}
                    className="text-ink-300 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
              {dict.footer.columns.services}
            </h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {dict.services.items.map((item) => (
                <li key={item.title}>
                  <Link
                    href={localizePath(locale, `/servizi/${item.slug}`)}
                    className="text-ink-300 transition hover:text-white"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
              {dict.footer.columns.contact}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-ink-300">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2.5 transition hover:text-white"
                >
                  <Icon name="mail" className="size-4 text-brand-400" />
                  {site.email}
                </a>
              </li>
              {hasPhone ? (
                <li>
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="inline-flex items-center gap-2.5 transition hover:text-white"
                  >
                    <Icon name="phone" className="size-4 text-brand-400" />
                    {site.phone}
                  </a>
                </li>
              ) : null}
              <li className="inline-flex items-center gap-2.5">
                <Icon name="map-pin" className="size-4 text-brand-400" />
                {hasAddress ? site.address.full : site.address.city}
              </li>
              <li className="inline-flex items-center gap-2.5">
                <Icon name="clock" className="size-4 text-brand-400" />
                {site.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink-800 pt-8 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName} · {dict.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {hasVat ? <span>{dict.footer.piva}: {site.vat}</span> : null}
            <Link
              href={localizePath(locale, "/privacy")}
              className="transition hover:text-white"
            >
              {dict.footer.privacy}
            </Link>
            <span className="hidden sm:inline">{dict.footer.independent}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
