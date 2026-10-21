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

/**
 * The closing band.
 *
 * The consultant's city, full width, with the words in one half of it and a
 * single action. The text never crosses the middle line: the photograph is
 * the picture, the words are the invitation.
 */
export function CtaBanner({ locale, dict }: CtaBannerProps) {
  const { cta } = dict;

  return (
    <section className="relative isolate flex min-h-[30rem] items-end overflow-hidden bg-ink-950 sm:min-h-[34rem] lg:min-h-[38rem]">
      {/*
        The one moving picture on the site: the same solar plant the hero
        shows, in motion. Silent, looping, decorative — with a poster frame
        for anyone who asks for reduced motion.
      */}
      <video
        className="absolute inset-0 size-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/agrivoltaics-pilot-plant-at-heggelbach-farm-in-poster.jpg"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source
          src="/images/agrivoltaics-pilot-plant-at-heggelbach-farm-in.webm"
          type="video/webm"
        />
      </video>
      {/* Neutral scrim: a flat veil, so the words stay legible on the picture. */}
      <div aria-hidden="true" className="absolute inset-0 bg-ink-950/60" />

      <div className="container-shell relative w-full py-20 sm:py-24">
        <Reveal>
          <div className="max-w-xl lg:ml-auto">
            <h2 className="text-title font-bold text-balance text-white">
              {cta.title}
            </h2>
            <p className="mt-5 text-lead text-pretty text-ink-100/85">
              {cta.subtitle}
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                href={localizePath(locale, "/contatti")}
                className="btn bg-white text-ink-950 hover:-translate-y-0.5 hover:bg-ink-50"
              >
                {cta.primary}
                <Icon name="arrow-right" className="size-4" />
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="text-small font-semibold text-white underline decoration-white/40 underline-offset-4 transition hover:decoration-white"
              >
                {cta.secondary}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
