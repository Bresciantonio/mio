import { type Locale } from "@/lib/i18n";
import { hasAddress, hasLinkedin, hasPhone, site } from "@/lib/site";
import type { Messages } from "@/messages";
import { ContactForm } from "./contact-form";
import { Icon } from "./icons";
import { Reveal } from "./reveal";
import { Section, SectionHeader } from "./section";

interface ContactSectionProps {
  locale: Locale;
  dict: Messages;
}

export function ContactSection({ locale, dict }: ContactSectionProps) {
  const { contact } = dict;
  const { details } = contact;

  // Only the details that are filled in are published: an empty value means
  // "not confirmed yet" and the row is dropped rather than faked.
  const items = [
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
  ].filter((item): item is NonNullable<typeof item> => item !== null);

  const missingDetails = !hasPhone || !hasAddress;

  return (
    <Section id="contatti" tone="white">
      <SectionHeader
        eyebrow={contact.eyebrow}
        title={contact.title}
        subtitle={contact.subtitle}
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-12">
        {/* Details */}
        <Reveal className="lg:col-span-5">
          <div className="flex h-full flex-col gap-6">
            <div className="rounded-2xl border border-ink-100 bg-paper p-7">
              <h3 className="text-base font-semibold text-ink-950">
                {details.title}
              </h3>
              <ul className="mt-5 space-y-4">
                {items.map((item) => (
                  <li key={item.label} className="flex items-start gap-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-brand-600 shadow-sm">
                      <Icon name={item.icon} className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium tracking-wide text-ink-500 uppercase">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="mt-0.5 block text-sm font-medium break-words text-ink-900 hover:text-brand-700"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-sm font-medium text-ink-900">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              {missingDetails ? (
                <p className="mt-5 border-t border-ink-100 pt-4 text-xs leading-relaxed text-ink-500">
                  {details.pending}
                </p>
              ) : null}
            </div>

            <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6">
              <p className="flex items-center gap-2 text-sm font-semibold text-brand-800">
                <span className="size-2 animate-pulse-soft rounded-full bg-brand-500" />
                {details.availabilityLabel}
              </p>
              <p className="mt-1 text-sm text-brand-900/80">{site.availability}</p>
            </div>

            {hasLinkedin ? (
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink-600 transition hover:text-brand-700"
              >
                <Icon name="linkedin" className="size-4" />
                LinkedIn
              </a>
            ) : null}
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={120} className="lg:col-span-7">
          <ContactForm
            locale={locale}
            dict={dict}
            services={contact.services}
          />
        </Reveal>
      </div>
    </Section>
  );
}
