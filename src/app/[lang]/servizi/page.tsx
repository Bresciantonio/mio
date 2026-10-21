import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icons";
import { JsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { getServices } from "@/lib/content";
import { isLocale, localizePath } from "@/lib/i18n";
import { site } from "@/lib/site";
import { dictionaries } from "@/messages";
import { getDictionary } from "../dictionaries";

interface ServicesPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { lang: localeParam } = await params;
  if (!isLocale(localeParam)) return {};

  const dict = dictionaries[localeParam];

  return {
    title: dict.servicesPage.title,
    description: dict.servicesPage.subtitle,
    metadataBase: new URL(site.url),
    alternates: {
      canonical: `/${localeParam}/servizi`,
      languages: { it: "/it/servizi", en: "/en/servizi" },
    },
    openGraph: {
      title: `${dict.servicesPage.title} · ${site.name}`,
      description: dict.servicesPage.subtitle,
      url: `/${localeParam}/servizi`,
      siteName: site.name,
      images: ["/opengraph-image"],
    },
  };
}

export default async function ServicesPage() {
  const locale = await lang();
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary();
  const services = getServices(locale);

  const crumbs = [
    { label: dict.serviceDetail.home, href: "/" },
    { label: dict.serviceDetail.services },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.serviceDetail.home, url: `${site.url}/${locale}` },
          { name: dict.serviceDetail.services, url: `${site.url}/${locale}/servizi` },
        ])}
      />

      {/* Hero */}
      <section className="bg-paper pt-14 sm:pt-20">
        <div className="container-shell">
          <Breadcrumbs locale={locale} className="mb-8" items={crumbs} />
          <div className="max-w-4xl">
            <Reveal>
              <h1 className="text-article font-bold text-balance text-ink-950">
                {dict.servicesPage.title}
              </h1>
              <p className="mt-6 max-w-[56ch] text-lead text-pretty text-ink-800">
                {dict.servicesPage.subtitle}
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={80}>
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
              {dict.servicesPage.photoCaption}
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* List */}
      <Section tone="white">
        <div className="space-y-12">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={(index % 2) * 60}>
              <article className="grid gap-4 lg:grid-cols-12 lg:gap-8">
                <h2 className="text-subtitle leading-snug font-semibold text-balance text-ink-950 lg:col-span-5">
                  <Link
                    href={localizePath(locale, `/servizi/${service.slug}`)}
                    className="transition hover:text-brand-700"
                  >
                    {service.title}
                  </Link>
                </h2>
                <div className="lg:col-span-6 lg:col-start-7">
                  <p className="max-w-[56ch] text-body text-ink-800">
                    {service.shortDescription}
                  </p>
                  <Link
                    href={localizePath(locale, `/servizi/${service.slug}`)}
                    className="mt-4 inline-flex items-center gap-2 text-small font-semibold text-brand-700 transition hover:text-brand-800"
                  >
                    {dict.serviceDetail.readMore}
                    <Icon name="arrow-right" className="size-4" />
                  </Link>
                </div>
              </article>

              <JsonLd
                data={serviceJsonLd({
                  name: service.title,
                  description: service.metaDescription,
                  url: `${site.url}/${locale}/servizi/${service.slug}`,
                  providerName: site.name,
                })}
              />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
