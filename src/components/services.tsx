import Link from "next/link";
import { localizePath, type Locale } from "@/lib/i18n";
import type { Messages } from "@/messages";
import { Icon } from "./icons";
import type { IconName } from "./icons";
import { Reveal } from "./reveal";
import { Section, SectionHeader } from "./section";

interface ServicesProps {
  locale: Locale;
  dict: Messages;
}

export function Services({ locale, dict }: ServicesProps) {
  return (
    <Section id="servizi" tone="white">
      <SectionHeader
        eyebrow={dict.services.eyebrow}
        title={dict.services.title}
        subtitle={dict.services.subtitle}
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dict.services.items.map((item, index) => (
          <Reveal key={item.title} delay={(index % 3) * 90}>
            <article className="card group relative h-full overflow-hidden p-7 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-600/5">
              <div
                aria-hidden="true"
                className="absolute -top-16 -right-16 h-36 w-36 rounded-full bg-brand-50 transition-transform duration-500 group-hover:scale-[1.8]"
              />
              <div className="relative">
                <span className="grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon name={item.icon as IconName} className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink-950">
                  {/* Stretched link: the whole card is the click target. */}
                  <Link
                    href={localizePath(locale, `/servizi/${item.slug}`)}
                    className="before:absolute before:inset-0 before:content-['']"
                  >
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-600">
                  {item.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-ink-50 px-2.5 py-1 text-[11px] font-medium text-ink-600"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
