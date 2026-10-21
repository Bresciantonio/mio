import Link from "next/link";
import { localizePath, type Locale } from "@/lib/i18n";
import type { ServiceContent } from "@/content/types";
import { hasPhone, site } from "@/lib/site";
import { Breadcrumbs } from "./breadcrumbs";
import { Icon, type IconName } from "./icons";
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
      <section className="relative overflow-hidden border-b border-ink-100 bg-paper">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-24 size-[28rem] rounded-full bg-brand-100/50 blur-3xl"
        />
        <div className="container-shell relative py-14 sm:py-20">
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

          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow text-brand-600">
                <span className="h-px w-6 bg-current" aria-hidden="true" />
                {service.eyebrow}
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance text-ink-950 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
                {service.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-ink-600">
                {service.shortDescription}
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="card p-6">
                <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={service.icon as IconName} className="size-6" />
                </span>
                <p className="mt-4 text-sm leading-relaxed text-ink-600">
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
                  className="text-base leading-relaxed text-pretty text-ink-700 sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Why */}
            <Reveal className="mt-14">
              <h2 className="text-2xl font-bold tracking-tight text-ink-950 sm:text-3xl">
                {service.whyTitle}
              </h2>
              <ul className="mt-6 space-y-4">
                {service.why.map((item) => (
                  <li key={item} className="flex gap-3.5">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
                      <Icon name="check" className="size-3.5" strokeWidth={2.6} />
                    </span>
                    <span className="text-base leading-relaxed text-ink-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Process */}
            <Reveal className="mt-14">
              <h2 className="text-2xl font-bold tracking-tight text-ink-950 sm:text-3xl">
                {service.processTitle}
              </h2>
              <ol className="mt-8 space-y-8">
                {service.steps.map((step, index) => (
                  <li key={step.title} className="relative pl-14">
                    <span className="absolute top-0 left-0 grid size-9 place-items-center rounded-full bg-ink-950 text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    {index < service.steps.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="absolute top-11 bottom-[-2rem] left-[1.125rem] w-px bg-ink-100"
                      />
                    ) : null}
                    <h3 className="text-lg font-semibold tracking-tight text-ink-950">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-ink-600">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* Deliverables */}
            <Reveal className="mt-14">
              <h2 className="text-2xl font-bold tracking-tight text-ink-950 sm:text-3xl">
                {service.deliverablesTitle}
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-ink-100 bg-paper p-4"
                  >
                    <Icon
                      name="file-check"
                      className="size-5 shrink-0 text-brand-600"
                    />
                    <span className="text-sm leading-relaxed text-ink-700">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* FAQ */}
            <Reveal className="mt-14">
              <h2 className="text-2xl font-bold tracking-tight text-ink-950 sm:text-3xl">
                {labels.faq}
              </h2>
              <dl className="mt-6 divide-y divide-ink-100 border-y border-ink-100">
                {service.faq.map((item) => (
                  <div key={item.question} className="py-5">
                    <dt className="text-base font-semibold text-ink-950">
                      {item.question}
                    </dt>
                    <dd className="mt-2 text-base leading-relaxed text-ink-600">
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
              <div className="card p-6">
                <h2 className="text-lg font-semibold tracking-tight text-ink-950">
                  {labels.contactTitle}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {labels.contactBody}
                </p>
                <ul className="mt-5 space-y-3 text-sm">
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="flex items-center gap-2.5 text-ink-700 transition hover:text-brand-700"
                    >
                      <Icon name="mail" className="size-4 text-brand-600" />
                      {site.email}
                    </a>
                  </li>
                  {hasPhone ? (
                    <li>
                      <a
                        href={`tel:${site.phoneHref}`}
                        className="flex items-center gap-2.5 text-ink-700 transition hover:text-brand-700"
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
                <div className="card mt-6 p-6">
                  <h2 className="text-sm font-semibold tracking-wide text-ink-950 uppercase">
                    {labels.related}
                  </h2>
                  <ul className="mt-4 space-y-1">
                    {related.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={localizePath(locale, `/servizi/${item.slug}`)}
                          className="group flex items-start gap-2.5 rounded-lg p-2.5 text-sm text-ink-700 transition hover:bg-ink-50 hover:text-ink-950"
                        >
                          <Icon
                            name="arrow-right"
                            className="mt-0.5 size-4 shrink-0 text-brand-600 transition group-hover:translate-x-0.5"
                          />
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={localizePath(locale, "/servizi")}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition hover:text-brand-800"
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
