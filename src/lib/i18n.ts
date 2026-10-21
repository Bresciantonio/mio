/**
 * Internationalization helpers.
 *
 * The site is served from a `[lang]` dynamic segment (see `src/app/[lang]`).
 * Italian is the default locale and every route is prefixed (`/it`, `/en`) so
 * the two languages never compete for the same URL.
 */

export const locales = ["it", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "it";

export const localeNames: Record<Locale, string> = {
  it: "Italiano",
  en: "English",
};

export const localeShortNames: Record<Locale, string> = {
  it: "IT",
  en: "EN",
};

export const localeFlags: Record<Locale, string> = {
  it: "🇮🇹",
  en: "🇬🇧",
};

/** Narrow an unknown string (e.g. a route param) to a supported locale. */
export function isLocale(value: string | undefined | null): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** Build a localized path, e.g. `localizePath("it", "/contatti")` -> `/it/contatti`. */
export function localizePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

/**
 * Map an incoming pathname to its localized counterpart, preserving the route.
 * `"/it/contatti"` + `"en"` -> `"/en/contatti"`.
 */
export function switchLocalePath(pathname: string, target: Locale): string {
  const rest = pathname.replace(/^\/(it|en)(?=\/|$)/, "");
  return `/${target}${rest === "" ? "" : rest}`;
}
