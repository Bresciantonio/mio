import type { Messages } from "@/messages";
import { Icon } from "./icons";
import { Reveal } from "./reveal";
import { Section, SectionHeader } from "./section";

interface CredentialsProps {
  dict: Messages;
}

export function Credentials({ dict }: CredentialsProps) {
  const { credentials } = dict;

  return (
    <Section id="credenziali" tone="paper">
      <SectionHeader
        eyebrow={credentials.eyebrow}
        title={credentials.title}
        subtitle={credentials.subtitle}
      />

      {/* Stats */}
      <dl className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {credentials.stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 80}>
            <div className="card p-6 text-center">
              <dd className="text-3xl font-bold tracking-tight text-brand-600 sm:text-4xl">
                {stat.value}
              </dd>
              <dt className="mt-2 text-sm font-medium text-ink-600">
                {stat.label}
              </dt>
            </div>
          </Reveal>
        ))}
      </dl>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        {/* Certifications */}
        <Reveal>
          <div className="card h-full p-7">
            <h3 className="flex items-center gap-2 text-base font-semibold text-ink-950">
              <Icon name="file-check" className="size-5 text-brand-600" />
              {dict.credentials.certifications.length} certificazioni &amp;
              riconoscimenti
            </h3>
            <ul className="mt-5 space-y-3">
              {credentials.certifications.map((certification) => (
                <li key={certification} className="flex gap-3 text-sm text-ink-700">
                  <Icon
                    name="check"
                    className="mt-0.5 size-4 shrink-0 text-brand-500"
                  />
                  {certification}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Timeline */}
        <Reveal delay={120}>
          <div className="card h-full p-7">
            <h3 className="flex items-center gap-2 text-base font-semibold text-ink-950">
              <Icon name="clock" className="size-5 text-brand-600" />
              Percorso professionale
            </h3>
            <ol className="mt-5 space-y-5">
              {credentials.timeline.map((item) => (
                <li key={item.period} className="relative border-l border-ink-100 pl-5">
                  <span className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-brand-500" />
                  <p className="text-xs font-semibold tracking-wide text-brand-700 uppercase">
                    {item.period}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-ink-950">
                    {item.role}
                  </p>
                  <p className="text-sm text-ink-600">{item.org}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
