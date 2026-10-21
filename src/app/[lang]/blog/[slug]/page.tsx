import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd, blogPostingJsonLd, breadcrumbJsonLd } from "@/components/json-ld";
import { PostDetail } from "@/components/post-detail";
import { getPost, getRelatedPosts, postSlugs } from "@/lib/content";
import { isLocale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { getDictionary } from "../../dictionaries";

interface PostPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

/**
 * Slugs are locale-independent, so the same set is prerendered for both
 * languages; the parent `[lang]` segment supplies the locale.
 */
export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { lang: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};

  const post = getPost(localeParam, slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.metaDescription,
    metadataBase: new URL(site.url),
    alternates: {
      canonical: `/${localeParam}/blog/${slug}`,
      languages: {
        it: `/it/blog/${slug}`,
        en: `/en/blog/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: `${post.title} · ${site.name}`,
      description: post.metaDescription,
      url: `/${localeParam}/blog/${slug}`,
      siteName: site.name,
      publishedTime: post.date,
      tags: post.tags,
      images: ["/opengraph-image"],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { lang: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();

  const post = getPost(localeParam, slug);
  if (!post) notFound();

  const dict = await getDictionary();
  const related = getRelatedPosts(localeParam, post.relatedSlugs);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.postDetail.home, url: `${site.url}/${localeParam}` },
          {
            name: dict.postDetail.blog,
            url: `${site.url}/${localeParam}/blog`,
          },
          {
            name: post.title,
            url: `${site.url}/${localeParam}/blog/${slug}`,
          },
        ])}
      />
      <JsonLd
        data={blogPostingJsonLd({
          headline: post.title,
          description: post.metaDescription,
          url: `${site.url}/${localeParam}/blog/${slug}`,
          datePublished: post.date,
          authorName: site.name,
          publisherName: site.legalName,
          keywords: post.tags,
          inLanguage: localeParam === "it" ? "it-IT" : "en-GB",
        })}
      />

      <PostDetail
        locale={localeParam}
        post={post}
        related={related}
        labels={{
          home: dict.postDetail.home,
          blog: dict.postDetail.blog,
          readingTime: dict.postDetail.readingTime,
          related: dict.postDetail.related,
          allPosts: dict.postDetail.allPosts,
          contactTitle: dict.postDetail.contactTitle,
          contactBody: dict.postDetail.contactBody,
          contactCta: dict.postDetail.contactCta,
          authorRole: dict.postDetail.authorRole,
        }}
      />
    </>
  );
}
