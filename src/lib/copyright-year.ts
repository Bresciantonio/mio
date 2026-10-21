/**
 * Current year for the footer copyright.
 *
 * Wrapped in `"use cache"` so the value is computed once at build time instead
 * of on every render — required by Cache Components (`cacheComponents: true`),
 * which rejects unstable values like `new Date()` during prerendering.
 *
 * Keep this module server-only: it must never be imported by a Client Component.
 */
export async function getCopyrightYear(): Promise<number> {
  "use cache";
  return new Date().getFullYear();
}
