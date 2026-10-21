import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales, type Locale } from "@/lib/i18n";

const PUBLIC_FILE = /\.[^/]+$/;

/**
 * Locale bootstrap.
 *
 * Visitors hitting a URL without a locale segment (`/`, `/contatti`) are
 * redirected to `/it/...` or `/en/...` based on their `Accept-Language` header.
 * Requests that already carry a locale, plus static assets and the API, are
 * left untouched.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/opengraph-image" ||
    pathname === "/twitter-image" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = negotiateLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

function negotiateLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .filter((item) => item.q > 0)
    .sort((a, b) => b.q - a.q);

  for (const item of preferred) {
    if (item.tag.startsWith("it")) return "it";
    if (item.tag.startsWith("en")) return "en";
  }

  return defaultLocale;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
