import Link from "next/link";
import { localizePath, type Locale } from "@/lib/i18n";
import type { Messages } from "@/messages";
import { Icon } from "./icons";
import { Reveal } from "./reveal";

interface ServicesProps {
  locale: Locale;
  dict: Messages;
}

/**
 * The services as a menu.
 *
 * One sheet of paper with the six engagements set as rows: the name, what it
 * covers, and the standards it touches on the right. Rows are separated by
 * space, not by rules, and there are no cards and no icons.
 */
export function Services({ locale, dict }: ServicesProps) {
  const { services } = dict;

  return (
    <section id="servizi" className="bg-white py-16 sm:py-24">
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <h2 className="text-title font-bold text-balance text-ink-950">
              {services.title}
            </h2>
            <p className="mt-5 max-w-sm text-body text-ink-800">
              {services.subtitle}
            </p>
          </Reveal>

          <Reveal delay={90} className="lg:col-span-7">
            <ul className="bg-paper px-6 py-2 sm:px-9">
              {services.items.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={localizePath(locale, `/servizi/${item.slug}`)}
                    className="group grid gap-3 py-8 sm:grid-cols-12 sm:gap-6"
                  >
                    <span className="sm:col-span-8">
                      <span className="text-lead font-semibold text-ink-950 transition group-hover:text-brand-700">
                        {item.title}
                      </span>
                      <span className="mt-2 block max-w-xl text-body text-ink-800">
                        {item.description}
                      </span>
                    </span>
                    <span className="sm:col-span-3 sm:col-start-10 sm:self-start sm:text-right">
                      <span className="block text-small text-ink-600">
                        {item.tags.join(" · ")}
                      </span>
                    </span>
                    <span className="sm:col-span-1 sm:col-start-12 sm:justify-self-end sm:self-start">
                      <Icon
                        name="arrow-right"
                        className="size-5 text-ink-400 transition group-hover:translate-x-1 group-hover:text-brand-600"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
