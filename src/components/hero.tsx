import Link from "next/link";
import { localizePath, type Locale } from "@/lib/i18n";
import type { Messages } from "@/messages";
import { Icon } from "./icons";
import { Reveal } from "./reveal";

interface HeroProps {
  locale: Locale;
  dict: Messages;
}

export function Hero({ locale, dict }: HeroProps) {
  const { hero } = dict;

  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[30rem] w-[52rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-40 h-72 w-72 rounded-full bg-accent-500/15 blur-[110px]"
      />

      <div className="container-shell relative grid items-center gap-14 py-20 sm:py-24 lg:grid-cols-12 lg:gap-10 lg:py-28">
        {/* Copy */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-brand-300 backdrop-blur">
              <Icon name="bolt" className="size-3.5" />
              {hero.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.6rem] lg:leading-[1.05]">
              {hero.titleLead}{" "}
              <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-accent-300 bg-clip-text text-transparent">
                {hero.titleAccent}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-ink-100/85 sm:text-lg">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={localizePath(locale, "/contatti")}
                className="btn-primary"
              >
                {hero.primaryCta}
                <Icon name="arrow-right" className="size-4" />
              </Link>
              <Link
                href={localizePath(locale, "/#servizi")}
                className="btn-ghost-light"
              >
                {hero.secondaryCta}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-5 flex items-center gap-2 text-sm text-ink-300">
              <Icon name="shield-check" className="size-4 shrink-0 text-brand-400" />
              {hero.trustNote}
            </p>
          </Reveal>

          <Reveal delay={360}>
            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {hero.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="order-2 mt-1 text-xs font-medium text-ink-300 sm:text-sm">
                    {stat.label}
                  </dt>
                  <dd className="order-1 text-2xl font-bold text-white sm:text-3xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Visual panel */}
        <Reveal delay={200} className="lg:col-span-5">
          <div className="relative">
            <div className="card relative overflow-hidden !border-white/10 !bg-white/[0.04] !shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <p className="text-xs font-medium text-ink-300">
                    {hero.panel.kpi}
                  </p>
                  <p className="mt-1 text-lg font-bold text-white">
                    {hero.panel.delta}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/15 px-2.5 py-1 text-xs font-semibold text-brand-300">
                  <span className="size-1.5 animate-pulse-soft rounded-full bg-brand-400" />
                  {hero.panel.legend[1]}
                </span>
              </div>

              <div className="p-5">
                <svg
                  viewBox="0 0 400 220"
                  className="h-auto w-full"
                  role="img"
                  aria-label={hero.panel.caption}
                >
                  <defs>
                    <linearGradient id="areaAfter" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[40, 90, 140, 190].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="400"
                      y2={y}
                      stroke="rgba(255,255,255,0.07)"
                      strokeWidth="1"
                    />
                  ))}
                  {/* Before */}
                  <polyline
                    points="0,180 50,170 100,178 150,150 200,158 250,130 300,140 350,118 400,126"
                    fill="none"
                    stroke="#7499c0"
                    strokeWidth="2"
                    strokeDasharray="5 6"
                    strokeLinecap="round"
                  />
                  {/* After */}
                  <path
                    d="M0,190 50,175 100,150 150,140 200,108 250,96 300,72 350,60 400,48 L400,220 L0,220 Z"
                    fill="url(#areaAfter)"
                  />
                  <polyline
                    points="0,190 50,175 100,150 150,140 200,108 250,96 300,72 350,60 400,48"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="mt-4 flex items-center justify-between text-xs text-ink-300">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-0.5 w-4 bg-[#7499c0]" />
                    {hero.panel.legend[0]}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-0.5 w-4 bg-brand-400" />
                    {hero.panel.legend[1]}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 border-t border-white/10 px-5 py-3.5 text-xs text-ink-300">
                <Icon name="chart" className="size-4 text-brand-400" />
                {hero.panel.caption}
              </div>
            </div>

            {/* Floating chips */}
            <div className="absolute -left-4 -top-5 hidden animate-float rounded-2xl border border-white/10 bg-ink-900/90 px-4 py-3 shadow-xl backdrop-blur sm:block">
              <p className="text-[11px] text-ink-300">M&amp;V verified</p>
              <p className="text-sm font-bold text-brand-300">−32%</p>
            </div>
            <div className="absolute -bottom-5 -right-3 hidden animate-float-slow rounded-2xl border border-white/10 bg-ink-900/90 px-4 py-3 shadow-xl backdrop-blur sm:block">
              <p className="text-[11px] text-ink-300">{hero.panel.badge}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
