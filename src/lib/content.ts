import type { Locale } from "@/lib/i18n";
import { posts, postSlugs } from "@/content/posts";
import { services, serviceSlugs } from "@/content/services";
import type { PostContent, ServiceContent } from "@/content/types";

/**
 * Read-only accessors over the editorial content.
 *
 * Content is stored in TypeScript modules rather than in a CMS: it is
 * versioned, type-checked and statically known at build time, which means every
 * article and service page can be prerendered.
 */

export function getServices(locale: Locale): ServiceContent[] {
  return services[locale];
}

export function getService(
  locale: Locale,
  slug: string,
): ServiceContent | undefined {
  return services[locale].find((service) => service.slug === slug);
}

export function getPosts(locale: Locale): PostContent[] {
  // Newest first.
  return [...posts[locale]].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(
  locale: Locale,
  slug: string,
): PostContent | undefined {
  return posts[locale].find((post) => post.slug === slug);
}

/** Resolve the related items declared by a service or a post. */
export function getRelatedServices(
  locale: Locale,
  slugs: string[],
): ServiceContent[] {
  return slugs
    .map((slug) => getService(locale, slug))
    .filter((service): service is ServiceContent => Boolean(service));
}

export function getRelatedPosts(
  locale: Locale,
  slugs: string[],
): PostContent[] {
  return slugs
    .map((slug) => getPost(locale, slug))
    .filter((post): post is PostContent => Boolean(post));
}

export { postSlugs, serviceSlugs };

/**
 * Format an ISO date for display. The locale is fixed rather than derived from
 * the runtime so the server and the client always agree.
 */
export function formatDate(isoDate: string, locale: Locale): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return new Intl.DateTimeFormat(locale === "it" ? "it-IT" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
