import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon, type IconName } from "@/components/icons";
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
      <section className="relative overflow-hidden border-b border-ink-100 bg-paper">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-24 size-[28rem] rounded-full bg-brand-100/50 blur-3xl"
        />
        <div className="container-shell relative py-14 sm:py-20">
          <Breadcrumbs locale={locale} className="mb-8" items={crumbs} />
          <div className="max-w-3xl">
            <p className="eyebrow text-brand-600">
              <span className="h-px w-6 bg-current" aria-hidden="true" />
              {dict.servicesPage.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance text-ink-950 sm:text-5xl lg:leading-[1.08]">
              {dict.servicesPage.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-pretty text-ink-600">
              {dict.servicesPage.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* List */}
      <Section tone="white">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={(index % 2) * 90}>
              <article className="card group relative flex h-full flex-col overflow-hidden p-8 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-600/5">
                <div
                  aria-hidden="true"
                  className="absolute -top-16 -right-16 size-36 rounded-full bg-brand-50 transition-transform duration-500 group-hover:scale-[1.8]"
                />
                <div className="relative">
                  <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                    <Icon
                      name={service.icon as IconName}
                      className="size-6"
                    />
                  </span>
                  <h2 className="mt-5 text-xl font-semibold tracking-tight text-ink-950">
                    {service.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">
                    {service.shortDescription}
                  </p>

                  <Link
                    href={localizePath(locale, `/servizi/${service.slug}`)}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition group-hover:text-brand-800"
                  >
                    {dict.serviceDetail.readMore}
                    <Icon
                      name="arrow-right"
                      className="size-4 transition group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>

                <JsonLd
                  data={serviceJsonLd({
                    name: service.title,
                    description: service.metaDescription,
                    url: `${site.url}/${locale}/servizi/${service.slug}`,
                    providerName: site.name,
                  })}
                />
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
