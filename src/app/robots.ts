import type { MetadataRoute } from "next";
import { isBeta, site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // In beta the whole site is closed to crawlers: the content is not final
  // and a preview must not show up in search results.
  if (isBeta) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
