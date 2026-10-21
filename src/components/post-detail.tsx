import Link from "next/link";
import { formatDate } from "@/lib/content";
import { localizePath, type Locale } from "@/lib/i18n";
import type { PostContent } from "@/content/types";
import { hasPhone, site } from "@/lib/site";
import { Breadcrumbs } from "./breadcrumbs";
import { Icon } from "./icons";
import { Reveal } from "./reveal";
import { Section } from "./section";

interface PostDetailProps {
  locale: Locale;
  post: PostContent;
  related: PostContent[];
  labels: {
    home: string;
    blog: string;
    readingTime: string;
    related: string;
    allPosts: string;
    contactTitle: string;
    contactBody: string;
    contactCta: string;
    authorRole: string;
  };
}

/**
 * Blog post page.
 *
 * Structure: a scannable outline (headings, bullet lists, a takeaways box)
 * over a single-column measure that stays readable on every breakpoint.
 */
export function PostDetail({
  locale,
  post,
  related,
  labels,
}: PostDetailProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-100 bg-paper">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -left-24 size-[26rem] rounded-full bg-brand-100/40 blur-3xl"
        />
        <div className="container-shell relative py-14 sm:py-20">
          <Breadcrumbs
            locale={locale}
            className="mb-8"
            items={[
              { label: labels.home, href: "/" },
              { label: labels.blog, href: "/blog" },
              { label: post.title },
            ]}
          />

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              <span className="rounded-full bg-brand-100 px-3 py-1 font-semibold text-brand-800">
                {post.category}
              </span>
              <span className="text-ink-500">
                <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
              </span>
              <span aria-hidden="true" className="text-ink-300">
                ·
              </span>
              <span className="text-ink-500">
                {labels.readingTime} {post.readingTime}
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance text-ink-950 sm:text-5xl lg:leading-[1.08]">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-pretty text-ink-600">
              {post.excerpt}
            </p>

            <ul className="mt-7 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-white px-3 py-1 text-xs font-medium text-ink-600 ring-1 ring-ink-100"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Body */}
      <Section tone="white">
        <div className="grid gap-14 lg:grid-cols-12">
          <article className="lg:col-span-8">
            <div className="space-y-10">
              {post.sections.map((section, index) => (
                <Reveal key={section.heading}>
                  <section>
                    <h2 className="text-2xl font-bold tracking-tight text-ink-950 sm:text-[1.75rem]">
                      <span className="mr-2 text-brand-600">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 40)}
                          className="text-base leading-[1.75] text-pretty text-ink-700 sm:text-[1.0625rem]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    {section.bullets ? (
                      <ul className="mt-5 space-y-3 rounded-2xl border border-ink-100 bg-paper p-6">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500" />
                            <span className="text-sm leading-relaxed text-ink-700">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                </Reveal>
              ))}
            </div>

            {/* Takeaways */}
            <Reveal className="mt-14">
              <div className="rounded-2xl border border-brand-100 bg-brand-50/50 p-7">
                <h2 className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-ink-950">
                  <Icon name="target" className="size-5 text-brand-600" />
                  {post.takeawaysTitle}
                </h2>
                <ul className="mt-4 space-y-3">
                  {post.takeaways.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Icon
                        name="check"
                        className="mt-0.5 size-4 shrink-0 text-brand-600"
                        strokeWidth={2.4}
                      />
                      <span className="text-sm leading-relaxed text-ink-700">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Author */}
            <Reveal className="mt-10">
              <div className="flex flex-wrap items-center gap-5 rounded-2xl border border-ink-100 p-6">
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-ink-950 text-lg font-bold text-white">
                  AB
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-ink-950">{site.name}</p>
                  <p className="text-sm text-ink-600">{labels.authorRole}</p>
                </div>
                <Link
                  href={localizePath(locale, "/contatti")}
                  className="btn-secondary"
                >
                  {labels.contactCta}
                </Link>
              </div>
            </Reveal>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="card p-6">
                <h2 className="text-lg font-semibold tracking-tight text-ink-950">
                  {labels.contactTitle}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {labels.contactBody}
                </p>
                <ul className="mt-5 space-y-3 text-sm">
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="flex items-center gap-2.5 text-ink-700 transition hover:text-brand-700"
                    >
                      <Icon name="mail" className="size-4 text-brand-600" />
                      {site.email}
                    </a>
                  </li>
                  {hasPhone ? (
                    <li>
                      <a
                        href={`tel:${site.phoneHref}`}
                        className="flex items-center gap-2.5 text-ink-700 transition hover:text-brand-700"
                      >
                        <Icon name="phone" className="size-4 text-brand-600" />
                        {site.phone}
                      </a>
                    </li>
                  ) : null}
                </ul>
                <Link
                  href={localizePath(locale, "/contatti")}
                  className="btn-primary mt-6 w-full"
                >
                  {labels.contactCta}
                  <Icon name="arrow-right" className="size-4" />
                </Link>
              </div>

              {related.length > 0 ? (
                <div className="card mt-6 p-6">
                  <h2 className="text-sm font-semibold tracking-wide text-ink-950 uppercase">
                    {labels.related}
                  </h2>
                  <ul className="mt-4 space-y-4">
                    {related.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={localizePath(locale, `/blog/${item.slug}`)}
                          className="group block"
                        >
                          <span className="text-xs font-semibold text-brand-700">
                            {item.category}
                          </span>
                          <span className="mt-1 block text-sm leading-snug font-medium text-ink-800 transition group-hover:text-brand-800">
                            {item.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={localizePath(locale, "/blog")}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition hover:text-brand-800"
                  >
                    {labels.allPosts}
                    <Icon name="arrow-right" className="size-4" />
                  </Link>
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
