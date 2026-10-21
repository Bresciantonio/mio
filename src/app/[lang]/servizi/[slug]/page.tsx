import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/json-ld";
import { ServiceDetail } from "@/components/service-detail";
import {
  getRelatedServices,
  getService,
  serviceSlugs,
} from "@/lib/content";
import { isLocale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { getDictionary } from "../../dictionaries";

interface ServicePageProps {
  params: Promise<{ lang: string; slug: string }>;
}

/**
 * Slugs are locale-independent, so the same set is prerendered for both
 * languages; the parent `[lang]` segment supplies the locale.
 */
export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { lang: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};

  const service = getService(localeParam, slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.metaDescription,
    metadataBase: new URL(site.url),
    alternates: {
      canonical: `/${localeParam}/servizi/${slug}`,
      languages: {
        it: `/it/servizi/${slug}`,
        en: `/en/servizi/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: `${service.title} · ${site.name}`,
      description: service.metaDescription,
      url: `/${localeParam}/servizi/${slug}`,
      siteName: site.name,
      images: ["/opengraph-image"],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { lang: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();

  const service = getService(localeParam, slug);
  if (!service) notFound();

  const dict = await getDictionary();
  const related = getRelatedServices(localeParam, service.relatedSlugs);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.serviceDetail.home, url: `${site.url}/${localeParam}` },
          {
            name: dict.serviceDetail.services,
            url: `${site.url}/${localeParam}/servizi`,
          },
          {
            name: service.title,
            url: `${site.url}/${localeParam}/servizi/${slug}`,
          },
        ])}
      />
      <JsonLd data={faqJsonLd(service.faq)} />

      <ServiceDetail
        locale={localeParam}
        service={service}
        related={related}
        labels={{
          home: dict.serviceDetail.home,
          services: dict.serviceDetail.services,
          related: dict.serviceDetail.related,
          faq: dict.serviceDetail.faq,
          contactTitle: dict.serviceDetail.contactTitle,
          contactBody: dict.serviceDetail.contactBody,
          contactCta: dict.serviceDetail.contactCta,
          readMore: dict.serviceDetail.readMore,
          allServices: dict.serviceDetail.allServices,
        }}
      />
    </>
  );
}
