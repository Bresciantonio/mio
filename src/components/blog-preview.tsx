import Link from "next/link";
import { formatDate, getPosts } from "@/lib/content";
import { localizePath, type Locale } from "@/lib/i18n";
import { Icon } from "./icons";
import { Reveal } from "./reveal";
import { Section, SectionHeader } from "./section";

interface BlogPreviewProps {
  locale: Locale;
  labels: {
    eyebrow: string;
    title: string;
    subtitle: string;
    allPosts: string;
    readingTime: string;
  };
  /** How many posts to show on the home page. */
  limit?: number;
}

/**
 * Latest articles preview.
 *
 * The reference site closes its home page with a news strip. This is the
 * single highest-leverage block for organic traffic: it links the topical
 * articles to the commercial pages and gives crawlers a clear path into the
 * blog.
 */
export function BlogPreview({
  locale,
  labels,
  limit = 3,
}: BlogPreviewProps) {
  const latest = getPosts(locale).slice(0, limit);

  if (latest.length === 0) return null;

  return (
    <Section tone="paper" id="blog">
      <SectionHeader
        eyebrow={labels.eyebrow}
        title={labels.title}
        subtitle={labels.subtitle}
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {latest.map((post, index) => (
          <Reveal key={post.slug} delay={(index % 3) * 90}>
            <article className="card group flex h-full flex-col p-7 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-600/5">
              <div className="flex items-center gap-3 text-xs">
                <span className="rounded-full bg-brand-50 px-2.5 py-1 font-semibold text-brand-700">
                  {post.category}
                </span>
                <span className="text-ink-500">
                  {formatDate(post.date, locale)}
                </span>
              </div>

              <h3 className="mt-4 text-lg leading-snug font-semibold tracking-tight text-ink-950">
                <Link href={localizePath(locale, `/blog/${post.slug}`)}>
                  {post.title}
                </Link>
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">
                {post.excerpt}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4 text-sm">
                <span className="text-ink-500">
                  {labels.readingTime} {post.readingTime}
                </span>
                <Link
                  href={localizePath(locale, `/blog/${post.slug}`)}
                  className="inline-flex items-center gap-1.5 font-semibold text-brand-700 transition group-hover:text-brand-800"
                >
                  {labels.allPosts}
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

      <div className="mt-10 flex justify-center">
        <Link href={localizePath(locale, "/blog")} className="btn-secondary">
          {labels.allPosts}
          <Icon name="arrow-right" className="size-4" />
        </Link>
      </div>
    </Section>
  );
}
