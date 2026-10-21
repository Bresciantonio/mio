import Image from "next/image";
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
    photoCaption: string;
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
      <section className="bg-paper pt-14 sm:pt-20">
        <div className="container-shell">
          <Breadcrumbs
            locale={locale}
            className="mb-8"
            items={[
              { label: labels.home, href: "/" },
              { label: labels.blog, href: "/blog" },
              { label: post.title },
            ]}
          />

          <div className="max-w-4xl">
            <Reveal>
              <h1 className="text-article font-bold text-balance text-ink-950">
                {post.title}
              </h1>
            </Reveal>
            <Reveal delay={70}>
              <p className="mt-6 max-w-2xl text-lead text-pretty text-ink-800">
                {post.excerpt}
              </p>
            </Reveal>
            <Reveal delay={130}>
              <p className="mt-5 text-small text-ink-600">
                {post.category} ·{" "}
                <time dateTime={post.date}>
                  {formatDate(post.date, locale)}
                </time>{" "}
                · {labels.readingTime} {post.readingTime}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Photograph: the article opens on the world it is about */}
        <figure className="container-shell mt-12">
          <div className="relative aspect-21/9 w-full overflow-hidden bg-ink-900">
            <Image
              src="/images/aerial-picture-of-an-agrivoltaics-solar-plant.jpg"
              alt="Aerial view of a solar plant: rows of photovoltaic panels between strips of grass"
              fill
              sizes="(min-width: 1024px) 1200px, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 text-micro text-ink-600">
            {labels.photoCaption}
          </figcaption>
        </figure>
      </section>

      {/* Body */}
      <Section tone="white">
        <div className="grid gap-14 lg:grid-cols-12">
          <article className="lg:col-span-8">
            <div className="space-y-12">
              {post.sections.map((section) => (
                <Reveal key={section.heading}>
                  <section>
                    <h2 className="text-subtitle font-bold text-ink-950">
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 40)}
                          className="max-w-[62ch] text-body text-pretty text-ink-800"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    {section.bullets ? (
                      <ul className="mt-5 space-y-3 bg-paper p-6">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="text-body leading-relaxed text-ink-800">
                            {bullet}
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
              <div className="bg-brand-50 p-7">
                <h2 className="text-subtitle font-bold text-ink-950">
                  {post.takeawaysTitle}
                </h2>
                <ul className="mt-4 space-y-3">
                  {post.takeaways.map((item) => (
                    <li
                      key={item}
                      className="text-body leading-relaxed text-ink-800"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Author */}
            <Reveal className="mt-10">
              <div className="flex flex-wrap items-center gap-5 bg-paper p-6">
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-ink-950 text-lg font-bold text-white">
                  AB
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-ink-950">{site.name}</p>
                  <p className="text-small text-ink-600">{labels.authorRole}</p>
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
              <div className="bg-paper p-6">
                <h2 className="text-lead font-semibold text-ink-950">
                  {labels.contactTitle}
                </h2>
                <p className="mt-2 text-body leading-relaxed text-ink-800">
                  {labels.contactBody}
                </p>
                <ul className="mt-5 space-y-3 text-small">
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="flex items-center gap-2.5 text-ink-800 transition hover:text-brand-700"
                    >
                      <Icon name="mail" className="size-4 text-brand-600" />
                      {site.email}
                    </a>
                  </li>
                  {hasPhone ? (
                    <li>
                      <a
                        href={`tel:${site.phoneHref}`}
                        className="flex items-center gap-2.5 text-ink-800 transition hover:text-brand-700"
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
                <div className="mt-8">
                  <h2 className="text-body font-semibold text-ink-950">
                    {labels.related}
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {related.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={localizePath(locale, `/blog/${item.slug}`)}
                          className="group block text-body text-ink-800 transition hover:text-ink-950"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={localizePath(locale, "/blog")}
                    className="mt-5 inline-flex items-center gap-2 text-small font-semibold text-brand-700 transition hover:text-brand-800"
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
