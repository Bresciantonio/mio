import Image from "next/image";
import { type Locale } from "@/lib/i18n";
import { hasAddress, hasLinkedin, hasPhone, site } from "@/lib/site";
import type { Messages } from "@/messages";
import { ContactForm } from "./contact-form";
import { Icon } from "./icons";
import { Reveal } from "./reveal";

interface ContactSectionProps {
  locale: Locale;
  dict: Messages;
  /** The standalone contact page owns the h1; on the home page it is an h2. */
  headingLevel?: "h1" | "h2";
}

/**
 * Contact.
 *
 * The details are set as display rows — the way a sign on a door is — and the
 * briefing form sits next to them. Only the details that are really filled
 * in are published: a missing phone number does not get an invented one, it
 * does not get printed at all.
 */
export function ContactSection({
  locale,
  dict,
  headingLevel = "h2",
}: ContactSectionProps) {
  const { contact } = dict;
  const { details } = contact;

  const rows = [
    {
      icon: "mail" as const,
      label: details.emailLabel,
      value: site.email,
      href: `mailto:${site.email}`,
    },
    hasPhone
      ? {
          icon: "phone" as const,
          label: details.phoneLabel,
          value: site.phone,
          href: `tel:${site.phoneHref}`,
        }
      : null,
    {
      icon: "map-pin" as const,
      label: details.officeLabel,
      value: hasAddress ? site.address.full : site.address.city,
      href: undefined,
    },
    {
      icon: "clock" as const,
      label: details.hoursLabel,
      value: site.hours,
      href: undefined,
    },
  ].filter((row): row is NonNullable<typeof row> => row !== null);

  const missingDetails = !hasPhone || !hasAddress;

  const Heading = headingLevel;

  return (
    <section id="contatti" className="bg-white py-16 sm:py-24">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <figure className="mb-10">
              <div className="relative aspect-21/9 w-full overflow-hidden bg-ink-900">
                <Image
                  src="/images/full-milan-skyline-from-duomo-roof.jpg"
                  alt="The skyline of Milan seen from the roof of the Duomo"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-micro text-ink-600">
                {contact.photoCaption}
              </figcaption>
            </figure>

            <Heading
              className={
                headingLevel === "h1"
                  ? "text-article font-bold text-balance text-ink-950"
                  : "text-title font-bold text-balance text-ink-950"
              }
            >
              {contact.title}
            </Heading>
            {headingLevel === "h1" ? (
              <p className="mt-4 max-w-[46ch] text-lead text-ink-800">
                {contact.introLine}
              </p>
            ) : null}
            <p className="mt-5 max-w-md text-body text-ink-800">
              {contact.subtitle}
            </p>

            <Reveal delay={60}>
              <dl className="mt-10 space-y-7">
                {rows.map((row) => (
                  <div key={row.label}>
                    <dt className="flex items-center gap-2 text-small text-ink-600">
                      <Icon name={row.icon} className="size-4 text-brand-600" />
                      {row.label}
                    </dt>
                    <dd className="mt-1.5 text-subtitle leading-snug font-semibold text-ink-950">
                      {row.href ? (
                        <a
                          href={row.href}
                          className="transition hover:text-brand-700"
                        >
                          {row.value}
                        </a>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {missingDetails ? (
              <Reveal delay={100}>
                <p className="mt-8 max-w-[60ch] text-small text-ink-800">
                  {details.pending}
                </p>
              </Reveal>
            ) : null}

            <Reveal delay={140}>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <p className="flex items-center gap-2 text-small font-medium text-ink-800">
                  <span className="size-2 animate-pulse-soft rounded-full bg-brand-500" />
                  {details.availabilityLabel}: {site.availability}
                </p>
                {hasLinkedin ? (
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-small font-medium text-ink-800 transition hover:text-brand-700"
                  >
                    <Icon name="linkedin" className="size-4" />
                    LinkedIn
                  </a>
                ) : null}
              </div>
            </Reveal>
          </Reveal>

          <Reveal delay={110} className="lg:col-span-7">
            <ContactForm
              locale={locale}
              dict={dict}
              services={contact.services}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
