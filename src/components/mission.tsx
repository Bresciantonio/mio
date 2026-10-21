import type { Messages } from "@/messages";
import { Reveal } from "./reveal";

interface MissionProps {
  dict: Messages;
}

/**
 * Why the practice exists.
 *
 * Two statements set as text — a mission and a vision — and the four
 * principles as a plain list. No cards: the difference between a claim and
 * its list is the type size, not a border.
 */
export function Mission({ dict }: MissionProps) {
  const { mission } = dict;

  return (
    <section id="perche-esisto" className="bg-white py-16 sm:py-24">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <h2 className="text-title font-bold text-ink-950">{mission.title}</h2>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-8">
            <p className="max-w-3xl text-subtitle font-medium text-pretty text-ink-950">
              {mission.mission}
            </p>
            <p className="mt-8 max-w-3xl text-lead text-pretty text-ink-800">
              {mission.vision}
            </p>
          </Reveal>
        </div>

        <Reveal delay={140} className="mt-16 sm:mt-20">
          <h3 className="text-subtitle font-semibold text-ink-950">
            {mission.principlesTitle}
          </h3>
          <ul className="mt-8 grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {mission.principles.map((principle) => (
              <li key={principle.title}>
                <h4 className="text-subtitle font-semibold text-ink-950">
                  {principle.title}
                </h4>
                <p className="mt-2 max-w-md text-body text-ink-800">
                  {principle.description}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
