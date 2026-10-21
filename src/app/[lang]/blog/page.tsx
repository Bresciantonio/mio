import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icons";
import { JsonLd, breadcrumbJsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { formatDate, getPosts } from "@/lib/content";
import { isLocale, localizePath } from "@/lib/i18n";
import { site } from "@/lib/site";
import { dictionaries } from "@/messages";
import { getDictionary } from "../dictionaries";

interface BlogPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { lang: localeParam } = await params;
  if (!isLocale(localeParam)) return {};

  const dict = dictionaries[localeParam];

  return {
    title: dict.blogPage.title,
    description: dict.blogPage.subtitle,
    metadataBase: new URL(site.url),
    alternates: {
      canonical: `/${localeParam}/blog`,
      languages: { it: "/it/blog", en: "/en/blog" },
    },
    openGraph: {
      title: `${dict.blogPage.title} · ${site.name}`,
      description: dict.blogPage.subtitle,
      url: `/${localeParam}/blog`,
      siteName: site.name,
      images: ["/opengraph-image"],
    },
  };
}

export default async function BlogPage() {
  const locale = await lang();
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary();
  const posts = getPosts(locale);

  const categories = Array.from(new Set(posts.map((post) => post.category)));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.postDetail.home, url: `${site.url}/${locale}` },
          { name: dict.postDetail.blog, url: `${site.url}/${locale}/blog` },
        ])}
      />

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
              { label: dict.postDetail.home, href: "/" },
              { label: dict.postDetail.blog },
            ]}
          />
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-600">
              <span className="h-px w-6 bg-current" aria-hidden="true" />
              {dict.blogPage.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance text-ink-950 sm:text-5xl lg:leading-[1.08]">
              {dict.blogPage.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-pretty text-ink-600">
              {dict.blogPage.subtitle}
            </p>

            {categories.length > 0 ? (
              <ul className="mt-7 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <li
                    key={category}
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-ink-600 ring-1 ring-ink-100"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </section>

      {/* List */}
      <Section tone="white">
        {posts.length === 0 ? (
          <p className="text-center text-ink-500">{dict.blogPage.empty}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={(index % 3) * 90}>
                <article className="card group flex h-full flex-col p-7 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-600/5">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-full bg-brand-50 px-2.5 py-1 font-semibold text-brand-700">
                      {post.category}
                    </span>
                    <span className="text-ink-500">
                      <time dateTime={post.date}>
                        {formatDate(post.date, locale)}
                      </time>
                    </span>
                  </div>

                  <h2 className="mt-4 text-lg leading-snug font-semibold tracking-tight text-ink-950">
                    <Link href={localizePath(locale, `/blog/${post.slug}`)}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">
                    {post.excerpt}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-ink-50 px-2.5 py-1 text-[11px] font-medium text-ink-600"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4 text-sm">
                    <span className="text-ink-500">
                      {dict.blogPage.readingTime} {post.readingTime}
                    </span>
                    <Link
                      href={localizePath(locale, `/blog/${post.slug}`)}
                      className="inline-flex items-center gap-1.5 font-semibold text-brand-700 transition group-hover:text-brand-800"
                    >
                      {dict.blogPreview.allPosts}
                      <Icon
                        name="arrow-right"
                        className="size-4 transition group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
