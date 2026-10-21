import type { Locale } from "@/lib/i18n";

/**
 * Every long-form content block is stored once per locale.
 *
 * Long-form editorial content (service pages, blog posts) lives in TypeScript
 * modules instead of the JSON dictionaries: it is deeply nested, benefits from
 * type-checking, and needs to be importable from `generateStaticParams`.
 */
export type Localized<T> = Record<Locale, T>;

export interface ServiceStep {
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

/** The `energynet.it` narrative template, reused with original content:
 *  intro (what it is + normative frame) → why → how it works → deliverables → faq. */
export interface ServiceContent {
  slug: string;
  icon: string;
  title: string;
  shortDescription: string;
  eyebrow: string;
  metaDescription: string;
  intro: string[];
  whyTitle: string;
  why: string[];
  processTitle: string;
  steps: ServiceStep[];
  deliverablesTitle: string;
  deliverables: string[];
  faqTitle: string;
  faq: ServiceFaq[];
  relatedSlugs: string[];
}

export interface PostSection {
  heading: string;
  paragraphs: string[];
  /** Optional bullet list rendered under the paragraphs. */
  bullets?: string[];
}

export interface PostContent {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  /** ISO date (YYYY-MM-DD). Kept as a literal so prerendering stays deterministic. */
  date: string;
  readingTime: string;
  category: string;
  tags: string[];
  sections: PostSection[];
  takeawaysTitle: string;
  takeaways: string[];
  relatedSlugs: string[];
}

export interface MissionContent {
  eyebrow: string;
  title: string;
  missionTitle: string;
  mission: string;
  visionTitle: string;
  vision: string;
  principlesTitle: string;
  principles: Array<{ title: string; description: string }>;
}
