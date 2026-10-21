"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getServices } from "@/lib/content";
import { cn } from "@/lib/cn";
import { localizePath, type Locale } from "@/lib/i18n";
import type { Messages } from "@/messages";
import { Icon } from "./icons";
import type { IconName } from "./icons";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";

interface SiteHeaderProps {
  locale: Locale;
  dict: Messages;
}

/** Map nav keys to routes. Anchors target sections on the home page. */
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

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  // The menu closes on navigation. Closing is wired to the link handlers
  // rather than a `pathname` effect: the effect would need a synchronous
  // `setState` (which React discourages) and the handlers are explicit about
  // what closes the menu.

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pathWithoutLocale = pathname.replace(/^\/(it|en)(?=\/|$)/, "") || "/";

  const nav = (Object.keys(navRoutes) as Array<keyof typeof dict.nav>)
    .filter((key) => key in dict.nav)
    .map((key) => ({ key, label: dict.nav[key], href: navRoutes[key] }));

  const services = getServices(locale);

  const isActive = (href: string) => {
    if (href === "/") return pathWithoutLocale === "/";
    if (href.startsWith("/#")) return false;
    return pathWithoutLocale === href || pathWithoutLocale.startsWith(`${href}/`);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled || open
          ? "border-ink-100 bg-white/85 shadow-[0_8px_30px_-18px_rgba(8,20,38,0.35)] backdrop-blur-xl"
          : "border-transparent bg-white/60 backdrop-blur-md",
      )}
    >
      <div className="container-shell flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <Link
          href={localizePath(locale, "/")}
          className="group flex items-center gap-3"
          aria-label="Antonio Brescia — home"
          onClick={() => setOpen(false)}
        >
          <Logo />
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-bold tracking-tight text-ink-950">
              Antonio Brescia
            </span>
            <span className="mt-0.5 text-[11px] font-medium tracking-wide text-ink-500 uppercase">
              Energy Consultant
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            if (item.key === "services") {
              return (
                <div key={item.key} className="group relative">
                  <Link
                    href={localizePath(locale, item.href)}
                    className={cn(
                      "flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-ink-50 text-ink-950"
                        : "text-ink-600 hover:bg-ink-50 hover:text-ink-950",
                    )}
                    aria-expanded={servicesOpen}
                    onMouseEnter={() => setServicesOpen(true)}
                    onFocus={() => setServicesOpen(true)}
                  >
                    {item.label}
                    <Icon
                      name="chevron-down"
                      className={cn(
                        "size-3.5 transition-transform",
                        servicesOpen && "rotate-180",
                      )}
                    />
                  </Link>

                  <div
                    className={cn(
                      "invisible absolute top-full left-0 w-[22rem] origin-top-left rounded-2xl border border-ink-100 bg-white p-2 opacity-0 shadow-xl shadow-ink-950/10 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100",
                      servicesOpen &&
                        "visible translate-y-0 opacity-100",
                    )}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        href={localizePath(locale, `/servizi/${service.slug}`)}
                        className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-ink-50"
                        onClick={() => setServicesOpen(false)}
                      >
                        <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                          <Icon
                            name={service.icon as IconName}
                            className="size-4"
                          />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold tracking-tight text-ink-950">
                            {service.title}
                          </span>
                          <span
                            aria-hidden="true"
                            className="mt-0.5 block text-xs leading-relaxed text-ink-500 line-clamp-2"
                          >
                            {service.shortDescription}
                          </span>
                        </span>
                      </Link>
                    ))}
                    <Link
                      href={localizePath(locale, "/servizi")}
                      className="mt-1 flex items-center justify-between rounded-xl bg-ink-50 p-3 text-sm font-semibold text-ink-900 transition hover:bg-ink-100"
                    >
                      {dict.serviceDetail.allServices}
                      <Icon name="arrow-right" className="size-4" />
                    </Link>
                  </div>
                </div>
              );
            }

            const active = isActive(item.href);
            return (
              <Link
                key={item.key}
                href={localizePath(locale, item.href)}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-ink-50 text-ink-950"
                    : "text-ink-600 hover:bg-ink-50 hover:text-ink-950",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher locale={locale} className="hidden sm:inline-flex" />
          <Link
            href={localizePath(locale, "/contatti")}
            className="btn-primary hidden md:inline-flex"
          >
            {dict.nav.cta}
            <Icon name="arrow-right" className="size-4" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.common.closeMenu : dict.common.openMenu}
            className="grid size-10 place-items-center rounded-full border border-ink-200 text-ink-800 transition hover:bg-ink-50 lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} className="size-5" />
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-t border-ink-100 bg-white transition-[max-height,opacity] duration-300 lg:hidden",
          open ? "max-h-[48rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="container-shell flex flex-col gap-1 py-4" aria-label="Mobile">
          {nav.map((item) =>
            item.key === "services" ? (
              <div key={item.key} className="rounded-xl bg-ink-50/60 p-1">
                <div className="flex items-center">
                  <Link
                    href={localizePath(locale, item.href)}
                    className="flex-1 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-800"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setServicesOpen((v) => !v)}
                    aria-expanded={servicesOpen}
                    aria-label={item.label}
                    className="grid size-9 place-items-center rounded-lg text-ink-600"
                  >
                    <Icon
                      name="chevron-down"
                      className={cn(
                        "size-4 transition-transform",
                        servicesOpen && "rotate-180",
                      )}
                    />
                  </button>
                </div>
                <div
                  className={cn(
                    "grid overflow-hidden transition-[max-height,opacity] duration-300",
                    servicesOpen ? "max-h-[30rem] opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  <ul className="space-y-0.5 pb-2">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={localizePath(locale, `/servizi/${service.slug}`)}
                          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-700 transition hover:bg-white"
                          onClick={() => {
                            setOpen(false);
                            setServicesOpen(false);
                          }}
                        >
                          <Icon
                            name={service.icon as IconName}
                            className="size-4 shrink-0 text-brand-600"
                          />
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.key}
                href={localizePath(locale, item.href)}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-sm font-medium transition hover:bg-ink-50",
                  isActive(item.href) ? "text-ink-950" : "text-ink-700",
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ),
          )}
          <div className="mt-2 flex items-center justify-between gap-3 border-t border-ink-100 pt-4">
            <LanguageSwitcher locale={locale} />
            <Link
              href={localizePath(locale, "/contatti")}
              className="btn-primary"
              onClick={() => setOpen(false)}
            >
              {dict.nav.cta}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
