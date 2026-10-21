"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeShortNames, switchLocalePath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

interface LanguageSwitcherProps {
  locale: Locale;
  className?: string;
}

/**
 * Compact IT/EN toggle. It rewrites the current pathname's locale segment so
 * the visitor stays on the same page when switching language.
 */
export function LanguageSwitcher({ locale, className }: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-ink-200 bg-white/80 p-1 text-xs font-semibold",
        className,
      )}
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={switchLocalePath(pathname, l)}
            hrefLang={l}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 transition-colors",
              active
                ? "bg-ink-950 text-white"
                : "text-ink-500 hover:bg-ink-50 hover:text-ink-900",
            )}
          >
            {localeShortNames[l]}
          </Link>
        );
      })}
    </div>
  );
}
