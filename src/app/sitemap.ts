import type { MetadataRoute } from "next";
import { postSlugs, serviceSlugs } from "@/lib/content";
import { locales } from "@/lib/i18n";
import { site } from "@/lib/site";

const routes = ["", "/contatti", "/privacy", "/servizi", "/blog"] as const;

/** Fixed build-time value: Cache Components rejects `new Date()` during prerender. */
const LAST_MODIFIED = "2026-10-21";

function priorityFor(route: string): number {
  if (route === "") return 1;
  if (route === "/servizi") return 0.9;
  if (route === "/contatti") return 0.8;
  if (route === "/blog") return 0.7;
  return 0.3;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${site.url}/${locale}${route}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: priorityFor(route),
      alternates: {
        languages: {
          it: `${site.url}/it${route}`,
          en: `${site.url}/en${route}`,
        },
      },
    })),
  );

  const serviceEntries = locales.flatMap((locale) =>
    serviceSlugs.map((slug) => ({
      url: `${site.url}/${locale}/servizi/${slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          it: `${site.url}/it/servizi/${slug}`,
          en: `${site.url}/en/servizi/${slug}`,
        },
      },
    })),
  );

  const postEntries = locales.flatMap((locale) =>
    postSlugs.map((slug) => ({
      url: `${site.url}/${locale}/blog/${slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly" as const,
      priority: 0.6,
      alternates: {
        languages: {
          it: `${site.url}/it/blog/${slug}`,
          en: `${site.url}/en/blog/${slug}`,
        },
      },
    })),
  );

  return [...staticEntries, ...serviceEntries, ...postEntries];
}
