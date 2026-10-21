import { Icon, type IconName } from "./icons";
import { Reveal } from "./reveal";
import { Section, SectionHeader } from "./section";

interface MissionProps {
  eyebrow: string;
  title: string;
  missionTitle: string;
  mission: string;
  visionTitle: string;
  vision: string;
  principlesTitle: string;
  principles: Array<{ title: string; description: string }>;
  icons?: string[];
}

/**
 * Mission & Vision.
 *
 * The reference site states these in two short blocks near the top of the home
 * page. It works because it answers the question every corporate visitor asks
 * first — "why should I trust this company?" — before asking them to read on.
 */
export function Mission({
  eyebrow,
  title,
  missionTitle,
  mission,
  visionTitle,
  vision,
  principlesTitle,
  principles,
  icons = ["target", "leaf", "scale", "chart"],
}: MissionProps) {
  return (
    <Section tone="ink" id="mission">
      <SectionHeader eyebrow={eyebrow} title={title} tone="ink" />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <span className="grid size-12 place-items-center rounded-xl bg-brand-400/15 text-brand-300">
              <Icon name="target" className="size-6" />
            </span>
            <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">
              {missionTitle}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-pretty text-ink-100/80">
              {mission}
            </p>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <span className="grid size-12 place-items-center rounded-xl bg-brand-400/15 text-brand-300">
              <Icon name="leaf" className="size-6" />
            </span>
            <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">
              {visionTitle}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-pretty text-ink-100/80">
              {vision}
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-12">
        <h3 className="text-sm font-semibold tracking-[0.18em] text-white/60 uppercase">
          {principlesTitle}
        </h3>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle, index) => (
            <li key={principle.title}>
              <span className="grid size-10 place-items-center rounded-lg bg-white/10 text-brand-300">
                <Icon
                  name={(icons[index % icons.length] ?? "target") as IconName}
                  className="size-5"
                />
              </span>
              <h4 className="mt-4 font-semibold tracking-tight text-white">
                {principle.title}
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-100/70">
                {principle.description}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
