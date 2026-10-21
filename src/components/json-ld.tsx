/**
 * JSON-LD structured data.
 *
 * The reference site emits `BreadcrumbList`, `Organization`, `WebPage` and
 * `WebSite` through AIOSEO. This component reproduces the same vocabulary
 * natively, which removes a plugin and keeps the markup under source control.
 */

type JsonLdObject = Record<string, unknown>;

/**
 * `<` is escaped so the payload can never terminate the script element early.
 */
function serialize(data: JsonLdObject): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: { data: JsonLdObject }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from our own content, never from user input.
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function organizationJsonLd(input: {
  name: string;
  legalName: string;
  url: string;
  email: string;
  telephone: string;
  address: string;
  linkedin?: string;
  logo?: string;
}): JsonLdObject {
  const sameAs = input.linkedin ? [input.linkedin] : undefined;

  // Empty values are omitted rather than published as empty strings: a
  // placeholder phone number or address in the structured data is worse than
  // no property at all.
  const email = input.email?.trim();
  const telephone = input.telephone?.trim();
  const address = input.address?.trim();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: input.name,
    legalName: input.legalName,
    url: input.url,
    ...(email ? { email } : {}),
    ...(telephone ? { telephone } : {}),
    ...(address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: address,
          },
        }
      : {}),
    ...(input.logo ? { logo: input.logo } : {}),
    ...(sameAs ? { sameAs } : {}),
  };
}

export function webSiteJsonLd(input: {
  name: string;
  url: string;
  description: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: input.name,
    url: input.url,
    description: input.description,
    inLanguage: ["it-IT", "en-GB"],
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  url: string;
  providerName: string;
  areaServed?: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: input.url,
    serviceType: input.name,
    provider: {
      "@type": "Organization",
      name: input.providerName,
    },
    areaServed: input.areaServed ?? "IT",
  };
}

export function blogPostingJsonLd(input: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  authorName: string;
  publisherName: string;
  keywords?: string[];
  inLanguage: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.headline,
    description: input.description,
    url: input.url,
    datePublished: input.datePublished,
    author: {
      "@type": "Person",
      name: input.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: input.publisherName,
    },
    keywords: input.keywords?.join(", "),
    inLanguage: input.inLanguage,
    mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
  };
}

export function faqJsonLd(
  items: Array<{ question: string; answer: string }>,
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
