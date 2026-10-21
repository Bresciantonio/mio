import Link from "next/link";
import { formatDate, getPosts } from "@/lib/content";
import { localizePath, type Locale } from "@/lib/i18n";
import { Icon } from "./icons";
import { Reveal } from "./reveal";

interface BlogPreviewProps {
  locale: Locale;
  labels: {
    title: string;
    subtitle: string;
    allPosts: string;
    readingTime: string;
  };
  /** How many posts to show on the home page. */
  limit?: number;
}

/**
 * Latest articles.
 *
 * The index of a newspaper: the headline on the left, what it is about on the
 * right, the meta line underneath. No cards, no category pills, no excerpt
 * squeezed into a fixed-height box.
 */
export function BlogPreview({
  locale,
  labels,
  limit = 3,
}: BlogPreviewProps) {
  const latest = getPosts(locale).slice(0, limit);

  if (latest.length === 0) return null;

  return (
    <section id="blog" className="bg-white py-16 sm:py-24">
      <div className="container-shell grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
          <h2 className="text-title font-bold text-balance text-ink-950">
            {labels.title}
          </h2>
          <p className="mt-5 max-w-sm text-body text-ink-800">
            {labels.subtitle}
          </p>
          <Link
            href={localizePath(locale, "/blog")}
            className="mt-7 inline-flex items-center gap-2 text-small font-semibold text-brand-700 transition hover:text-brand-800"
          >
            {labels.allPosts}
            <Icon name="arrow-right" className="size-4" />
          </Link>
        </Reveal>

        <div className="lg:col-span-8">
          <div className="space-y-10">
            {latest.map((post, index) => (
              <Reveal key={post.slug} delay={index * 80}>
                <article>
                  <h3 className="text-subtitle leading-snug font-semibold text-balance text-ink-950">
                    <Link
                      href={localizePath(locale, `/blog/${post.slug}`)}
                      className="transition hover:text-brand-700"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-3 max-w-2xl text-body text-ink-800">
                    {post.excerpt}
                  </p>
                  <p className="mt-3 text-small text-ink-600">
                    {post.category} · {formatDate(post.date, locale)} ·{" "}
                    {labels.readingTime} {post.readingTime}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
