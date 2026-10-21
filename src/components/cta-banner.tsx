import Link from "next/link";
import { localizePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import type { Messages } from "@/messages";
import { Icon } from "./icons";
import { Reveal } from "./reveal";

interface CtaBannerProps {
  locale: Locale;
  dict: Messages;
}

export function CtaBanner({ locale, dict }: CtaBannerProps) {
  const { cta } = dict;

  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-brand-500/20 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-accent-500/15 blur-[110px]"
      />
      <div className="container-shell relative py-20 text-center sm:py-24">
        <Reveal>
          <p className="eyebrow justify-center text-brand-300">
            <span className="h-px w-6 bg-current" aria-hidden="true" />
            {cta.eyebrow}
            <span className="h-px w-6 bg-current" aria-hidden="true" />
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            {cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-100/80 sm:text-lg">
            {cta.subtitle}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={localizePath(locale, "/contatti")} className="btn-primary">
              {cta.primary}
              <Icon name="arrow-right" className="size-4" />
            </Link>
            <a href={`mailto:${site.email}`} className="btn-ghost-light">
              {cta.secondary}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
