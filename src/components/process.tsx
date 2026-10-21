import type { Messages } from "@/messages";
import { Reveal } from "./reveal";

interface ProcessProps {
  dict: Messages;
}

/**
 * The method, printed as an itinerary.
 *
 * Four stages with their duration on the right, then a closing bar that says
 * what the client is holding at the end. No step numbers: the order is the
 * order of the list.
 */
export function Process({ dict }: ProcessProps) {
  const { process } = dict;

  return (
    <section id="metodo" className="bg-paper py-16 sm:py-24">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <h2 className="text-title font-bold text-balance text-ink-950">
              {process.title}
            </h2>
            <p className="mt-5 max-w-md text-body text-ink-800">
              {process.subtitle}
            </p>
          </Reveal>

          <Reveal delay={90} className="lg:col-span-8">
            <ol className="space-y-8">
              {process.steps.map((step) => (
                <li
                  key={step.title}
                  className="grid gap-2 sm:grid-cols-12 sm:gap-6"
                >
                  <div className="sm:col-span-7">
                    <h3 className="text-lead font-semibold text-ink-950">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-md text-body text-ink-800">
                      {step.description}
                    </p>
                  </div>
                  <p className="text-small font-medium text-ink-600 tabular-nums sm:col-span-5 sm:text-right">
                    {step.duration}
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-10 bg-ink-950 px-6 py-6 text-body leading-relaxed text-white">
              {process.outcome}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
