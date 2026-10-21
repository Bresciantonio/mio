import type { Messages } from "@/messages";
import { Reveal } from "./reveal";

interface TrustBarProps {
  dict: Messages;
}

/**
 * Who the work is for.
 *
 * A typographic list, not a logo wall: the sector names in four columns, one
 * per line, with the heading kept in the first three columns of the grid.
 * No ticks, no marquee, no boxes — the column edges do the organising.
 */
export function TrustBar({ dict }: TrustBarProps) {
  const items = dict.trust.items;

  return (
    <section className="bg-paper py-14 sm:py-16">
      <div className="container-shell grid gap-8 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
          <h2 className="text-title font-bold text-ink-950">{dict.trust.title}</h2>
          <p className="mt-4 max-w-sm text-body text-ink-800">
            {dict.trust.subtitle}
          </p>
        </Reveal>

        <Reveal delay={90} className="lg:col-span-8">
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <li
                key={item}
                className="text-lead leading-relaxed font-medium text-ink-900"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
