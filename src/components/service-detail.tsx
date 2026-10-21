import Image from "next/image";
import Link from "next/link";
import { localizePath, type Locale } from "@/lib/i18n";
import type { ServiceContent } from "@/content/types";
import { hasPhone, site } from "@/lib/site";
import { Breadcrumbs } from "./breadcrumbs";
import { Icon } from "./icons";
import { Reveal } from "./reveal";
import { Section } from "./section";

interface ServiceDetailProps {
  locale: Locale;
  service: ServiceContent;
  related: ServiceContent[];
  labels: {
    home: string;
    services: string;
    related: string;
    faq: string;
    contactTitle: string;
    contactBody: string;
    contactCta: string;
    readMore: string;
    allServices: string;
    photoCaption: string;
  };
}

/**
 * Service detail page.
 *
 * The narrative order — what it is, why it matters, how it runs, what you get,
 * common objections — is the structure that works for this subject matter and
 * the one search engines reward: it answers the informational query first and
 * the commercial one last.
 */
export function ServiceDetail({
  locale,
  service,
  related,
  labels,
}: ServiceDetailProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-paper pt-14 sm:pt-20">
        <div className="container-shell">
          <Breadcrumbs
            locale={locale}
            tone="light"
            className="mb-8"
            items={[
              { label: labels.home, href: "/" },
              { label: labels.services, href: "/servizi" },
              { label: service.title },
            ]}
          />

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <h1 className="text-article font-bold text-balance text-ink-950">
                {service.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lead text-pretty text-ink-800">
                {service.shortDescription}
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white p-6">
                <p className="text-body leading-relaxed text-ink-800">
                  {service.intro[0]}
                </p>
                <Link
                  href={localizePath(locale, "/contatti")}
                  className="btn-primary mt-5 w-full"
                >
                  {labels.contactCta}
                  <Icon name="arrow-right" className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Photograph: the place the work is about */}
        <figure className="container-shell mt-12">
          <div className="relative aspect-21/9 w-full overflow-hidden bg-ink-900">
            <Image
              src="/images/pont-l-abbe-high-voltage-substation-18.jpg"
              alt="A high-voltage substation seen from the outside, with insulators and overhead lines"
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
          <div className="lg:col-span-8">
            {/* Intro / normative frame */}
            <div className="space-y-5">
              {service.intro.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-body text-pretty text-ink-800"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Why */}
            <Reveal className="mt-14">
              <h2 className="text-title font-bold text-ink-950">
                {service.whyTitle}
              </h2>
              <ul className="mt-6 space-y-4">
                {service.why.map((item) => (
                  <li key={item} className="text-body leading-relaxed text-ink-800">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Process */}
            <Reveal className="mt-14">
              <h2 className="text-title font-bold text-ink-950">
                {service.processTitle}
              </h2>
              <ol className="mt-8 space-y-8">
                {service.steps.map((step) => (
                  <li key={step.title}>
                    <h3 className="text-lead font-semibold text-ink-950">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-body leading-relaxed text-ink-800">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* Deliverables */}
            <Reveal className="mt-14">
              <h2 className="text-title font-bold text-ink-950">
                {service.deliverablesTitle}
              </h2>
              <ul className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="text-body leading-relaxed text-ink-800"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* FAQ */}
            <Reveal className="mt-14">
              <h2 className="text-title font-bold text-ink-950">
                {labels.faq}
              </h2>
              <dl className="mt-6 space-y-6">
                {service.faq.map((item) => (
                  <div key={item.question}>
                    <dt className="text-body font-semibold text-ink-950">
                      {item.question}
                    </dt>
                    <dd className="mt-2 text-body leading-relaxed text-ink-800">
                      {item.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

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
                  <ul className="mt-4 space-y-2">
                    {related.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={localizePath(locale, `/servizi/${item.slug}`)}
                          className="group flex items-start gap-2.5 text-body text-ink-800 transition hover:text-ink-950"
                        >
                          <Icon
                            name="arrow-right"
                            className="mt-1 size-4 shrink-0 text-brand-600 transition group-hover:translate-x-0.5"
                          />
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={localizePath(locale, "/servizi")}
                    className="mt-5 inline-flex items-center gap-2 text-small font-semibold text-brand-700 transition hover:text-brand-800"
                  >
                    {labels.allServices}
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
