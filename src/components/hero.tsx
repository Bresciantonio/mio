import Image from "next/image";
import Link from "next/link";
import { localizePath, type Locale } from "@/lib/i18n";
import type { Messages } from "@/messages";
import { Icon } from "./icons";
import { Reveal } from "./reveal";

interface HeroProps {
  locale: Locale;
  dict: Messages;
}

/**
 * First screen.
 *
 * A split: the copy on the left, one photograph on the right that fills the
 * column from edge to edge. The picture is the subject's own world (a solar
 * plant seen from the air), not a stock mood shot, and it carries the screen
 * on its own — the headline does not have to shout over it.
 */
export function Hero({ locale, dict }: HeroProps) {
  const { hero } = dict;

  return (
    <section className="bg-ink-950 text-white">
      <div className="container-shell grid gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-24">
        {/* Copy */}
        <div className="lg:col-span-8">
          <Reveal>
            <h1 className="text-display font-bold text-white">{hero.title}</h1>
          </Reveal>

          <Reveal delay={90}>
            <p className="mt-7 max-w-xl text-lead text-pretty text-ink-100/85">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={170}>
            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                href={localizePath(locale, "/contatti")}
                className="btn-primary"
              >
                {hero.primaryCta}
                <Icon name="arrow-right" className="size-4" />
              </Link>
              <Link
                href={localizePath(locale, "/servizi")}
                className="text-small font-semibold text-brand-300 underline decoration-brand-300/40 underline-offset-4 transition hover:text-brand-200 hover:decoration-brand-200"
              >
                {hero.secondaryCta}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={230}>
            <p className="mt-7 flex max-w-lg items-start gap-2.5 text-small text-ink-200">
              <Icon name="shield-check" className="mt-0.5 size-5 shrink-0 text-brand-400" />
              {hero.trustNote}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6">
              {hero.stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {stat.value}
                  </dd>
                  <dt className="mt-2 text-small text-ink-200">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Photograph — the subject's world, credited in the footer */}
        <Reveal delay={140} className="lg:col-span-4">
          <figure className="flex h-full flex-col">
            <div className="relative min-h-[18rem] flex-1 overflow-hidden bg-ink-900 sm:aspect-3/4 lg:aspect-auto lg:min-h-0">
              <Image
                src="/images/aerial-picture-of-an-agrivoltaics-solar-plant.jpg"
                alt="Aerial view of a solar plant: rows of photovoltaic panels between strips of grass"
                fill
                priority
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-micro text-ink-300">
              {hero.photoCaption}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
