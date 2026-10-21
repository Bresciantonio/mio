"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { localizePath, type Locale } from "@/lib/i18n";
import type { Messages } from "@/messages";
import { Icon } from "./icons";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";

interface SiteHeaderProps {
  locale: Locale;
  dict: Messages;
}

/**
 * Header links.
 *
 * Five plain links and one action: the mega-menu is gone on purpose. It put
 * nine items in the bar (the label "Chi sono" used to break onto two lines),
 * it hid the service names in a hover panel that keyboard and touch users
 * never reached, and it was the only place on the page where the text was
 * invisible until hovered.
 */
const navRoutes: Record<string, string> = {
  services: "/servizi",
  about: "/#chi-sono",
  process: "/#metodo",
  blog: "/blog",
  contact: "/contatti",
};

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return pathWithoutLocale === href || pathWithoutLocale.startsWith(`${href}/`);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled || open ? "bg-paper" : "bg-white",
      )}
    >
      <div className="container-shell flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link
          href={localizePath(locale, "/")}
          className="group flex items-center gap-3"
          aria-label="Antonio Brescia — home"
          onClick={() => setOpen(false)}
        >
          <Logo />
          <span className="flex flex-col leading-none">
            <span className="text-small font-bold tracking-tight text-ink-950">
              Antonio Brescia
            </span>
            <span className="mt-1 text-micro font-medium text-ink-600">
              Energy Consultant
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.key}
              href={localizePath(locale, item.href)}
              className={cn(
                "rounded-full px-3 py-2 text-small font-medium transition-colors",
                isActive(item.href)
                  ? "bg-ink-100 text-ink-950"
                  : "text-ink-800 hover:bg-ink-50 hover:text-ink-950",
              )}
            >
              {item.label}
            </Link>
          ))}
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
            className="grid size-10 place-items-center rounded-full text-ink-800 transition hover:bg-ink-50 lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} className="size-5" />
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden bg-paper transition-[max-height,opacity] duration-300 lg:hidden",
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="container-shell flex flex-col py-4" aria-label="Mobile">
          {nav.map((item) => (
            <Link
              key={item.key}
              href={localizePath(locale, item.href)}
              className="rounded-xl px-3 py-3 text-small font-medium text-ink-800 transition hover:bg-white"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 flex items-center justify-between gap-3 pt-4">
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
