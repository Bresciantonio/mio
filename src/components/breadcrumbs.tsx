import Link from "next/link";
import { Fragment } from "react";
import { cn } from "@/lib/cn";
import { localizePath, type Locale } from "@/lib/i18n";

export interface Crumb {
  label: string;
  /** Path relative to the locale root, e.g. `/servizi/audit-energetico`. */
  href?: string;
}

/**
 * Visible breadcrumb trail.
 *
 * The reference site only exposes its hierarchy through JSON-LD; a visible
 * trail is a usability and accessibility win and gives search engines a second,
 * readable signal of the same structure.
 */
export function Breadcrumbs({
  locale,
  items,
  tone = "light",
  className,
}: {
  locale: Locale;
  items: Crumb[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const isDark = tone === "dark";

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1.5 text-small",
          isDark ? "text-ink-300" : "text-ink-600",
        )}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <Fragment key={`${item.label}-${index}`}>
              <li>
                {item.href && !isLast ? (
                  <Link
                    href={localizePath(locale, item.href)}
                    className={cn(
                      "transition",
                      isDark ? "hover:text-white" : "hover:text-ink-900",
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className={cn(isDark ? "text-white" : "text-ink-900")}
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {isLast ? null : (
                <li aria-hidden="true" className="text-ink-500">
                  /
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
