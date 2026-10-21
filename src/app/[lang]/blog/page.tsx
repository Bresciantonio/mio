import type { Metadata } from "next";
import Image from "next/image";
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
      <section className="bg-paper py-14 sm:py-20">
        <div className="container-shell">
          <Breadcrumbs
            locale={locale}
            className="mb-8"
            items={[
              { label: dict.postDetail.home, href: "/" },
              { label: dict.postDetail.blog },
            ]}
          />
          <div className="max-w-4xl">
            <Reveal>
              <h1 className="text-article font-bold text-balance text-ink-950">
                {dict.blogPage.title}
              </h1>
              <p className="mt-6 max-w-[56ch] text-lead text-pretty text-ink-800">
                {dict.blogPage.subtitle}
              </p>
            </Reveal>

            {categories.length > 0 ? (
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {categories.map((category) => (
                  <li
                    key={category}
                    className="text-small font-medium text-ink-800"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <Reveal delay={80}>
          <figure className="container-shell mt-12">
            <div className="relative aspect-21/9 w-full overflow-hidden bg-ink-900">
              <Image
                src="/images/full-milan-skyline-from-duomo-roof.jpg"
                alt="The skyline of Milan seen from the roof of the Duomo"
                fill
                sizes="(min-width: 1024px) 1200px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-micro text-ink-600">
              {dict.blogPage.photoCaption}
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* List */}
      <Section tone="white">
        {posts.length === 0 ? (
          <p className="text-body text-ink-600">{dict.blogPage.empty}</p>
        ) : (
          <div className="space-y-12">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={(index % 3) * 60}>
                <article className="grid gap-4 lg:grid-cols-12 lg:gap-8">
                  <h2 className="text-subtitle leading-snug font-semibold text-balance text-ink-950 lg:col-span-6">
                    <Link
                      href={localizePath(locale, `/blog/${post.slug}`)}
                      className="transition hover:text-brand-700"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <div className="lg:col-span-5 lg:col-start-8">
                    <p className="text-body text-ink-800">{post.excerpt}</p>
                    <p className="mt-3 text-small text-ink-600">
                      {post.category} ·{" "}
                      <time dateTime={post.date}>
                        {formatDate(post.date, locale)}
                      </time>{" "}
                      · {dict.blogPage.readingTime} {post.readingTime}
                    </p>
                    <Link
                      href={localizePath(locale, `/blog/${post.slug}`)}
                      className="mt-4 inline-flex items-center gap-2 text-small font-semibold text-brand-700 transition hover:text-brand-800"
                    >
                      {dict.blogPreview.allPosts}
                      <Icon name="arrow-right" className="size-4" />
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
