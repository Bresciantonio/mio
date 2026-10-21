import type { Messages } from "@/messages";
import { Icon } from "./icons";
import { Reveal } from "./reveal";
import { Section, SectionHeader } from "./section";

interface AboutProps {
  dict: Messages;
}

export function About({ dict }: AboutProps) {
  const { about } = dict;

  return (
    <Section id="chi-sono" tone="paper">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Portrait */}
        <Reveal className="lg:col-span-5">
          <div className="relative mx-auto max-w-sm">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-brand-500/15 to-accent-500/15" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-ink-100 bg-gradient-to-br from-ink-900 via-ink-800 to-brand-900 shadow-2xl">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 20%, rgba(52,211,153,0.5), transparent 45%), radial-gradient(circle at 80% 90%, rgba(251,191,36,0.35), transparent 40%)",
                }}
              />
              <div className="absolute inset-0 grid place-items-center">
                <span className="text-7xl font-bold tracking-tight text-white/15">
                  AB
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-ink-950/85 to-transparent p-5">
                <div>
                  <p className="text-base font-bold text-white">{about.signature}</p>
                  <p className="text-xs text-ink-200">Senior Energy Consultant</p>
                </div>
                <span className="grid size-11 place-items-center rounded-full bg-white/10 text-brand-300 backdrop-blur">
                  <Icon name="bolt" className="size-5" />
                </span>
              </div>
            </div>
            <div className="absolute -right-4 top-6 rounded-2xl border border-ink-100 bg-white px-4 py-3 shadow-xl">
              <p className="text-xl font-bold text-brand-600">15+</p>
              <p className="text-[11px] font-medium text-ink-500">
                {dict.credentials.stats[0].label}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="lg:col-span-7">
          <SectionHeader
            eyebrow={about.eyebrow}
            title={about.title}
            align="left"
          />

          <Reveal delay={120}>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-700">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <div className="mt-8 space-y-4">
            {about.highlights.map((highlight, index) => (
              <Reveal key={highlight.title} delay={index * 80}>
                <div className="flex gap-4">
                  <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                    <Icon name="check" className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-ink-950">
                      {highlight.title}
                    </h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink-600">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
