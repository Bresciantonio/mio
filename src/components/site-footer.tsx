import Link from "next/link";
import { getCopyrightYear } from "@/lib/copyright-year";
import { localizePath, type Locale } from "@/lib/i18n";
import { hasAddress, hasLinkedin, hasPhone, site } from "@/lib/site";
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

/**
 * Footer.
 *
 * The name comes back at full width, the way a site closes, and the menu and
 * the contact details sit underneath it. The photographs used on the site are
 * credited here, because they are not the consultant's own pictures.
 */
export async function SiteFooter({ locale, dict }: SiteFooterProps) {
  const nav = (Object.keys(navRoutes) as Array<keyof typeof dict.nav>)
    .filter((key) => key in dict.nav)
    .map((key) => ({ key, label: dict.nav[key], href: navRoutes[key] }));

  const year = await getCopyrightYear();

  return (
    <footer className="bg-ink-950 pt-16 text-ink-100 sm:pt-20">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Logo className="from-brand-400 to-brand-600" /> {/* taste-skill-ignore */}
            <p className="mt-6 text-[clamp(1.75rem,3.4vw,2.75rem)] leading-tight font-bold tracking-tight text-white">
              Antonio Brescia
            </p>
            <p className="mt-2 text-body text-ink-300">{dict.footer.tagline}</p>
            {hasLinkedin ? (
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-small font-medium text-ink-200 transition hover:text-brand-300"
              >
                <Icon name="linkedin" className="size-4" />
                LinkedIn
              </a>
            ) : null}
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <nav aria-label={dict.footer.columns.navigation}>
              <h2 className="text-small font-semibold text-white">
                {dict.footer.columns.navigation}
              </h2>
              <ul className="mt-5 space-y-2.5 text-small">
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
            </nav>

            <nav aria-label={dict.footer.columns.services}>
              <h2 className="text-small font-semibold text-white">
                {dict.footer.columns.services}
              </h2>
              <ul className="mt-5 space-y-2.5 text-small">
                {dict.services.items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={localizePath(locale, `/servizi/${item.slug}`)}
                      className="text-ink-300 transition hover:text-white"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="text-small font-semibold text-white">
                {dict.footer.columns.contact}
              </h2>
              <ul className="mt-5 space-y-3 text-small text-ink-300">
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
        </div>

        <div className="mt-14 flex flex-col gap-4 py-8 text-small text-ink-300 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p>
              © {year} {site.legalName} · {dict.footer.rights}
            </p>
            <p className="max-w-2xl text-ink-400">{dict.footer.photoCredits}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {site.vat ? (
              <span>
                {dict.footer.piva}: {site.vat}
              </span>
            ) : null}
            <Link
              href={localizePath(locale, "/privacy")}
              className="transition hover:text-white"
            >
              {dict.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
