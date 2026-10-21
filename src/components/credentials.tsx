import type { Messages } from "@/messages";
import { Reveal } from "./reveal";

interface CredentialsProps {
  dict: Messages;
}

/**
 * Certifications and career.
 *
 * Two lists of names, side by side: what he is certified for, and where he
 * has done it. The figures already live in the first screen — repeating them
 * here in four more boxes only diluted them.
 */
export function Credentials({ dict }: CredentialsProps) {
  const { credentials } = dict;

  return (
    <section id="credenziali" className="bg-white py-16 sm:py-24">
      <div className="container-shell grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-5">
          <h2 className="text-title font-bold text-balance text-ink-950">
            {credentials.title}
          </h2>
          <p className="mt-5 max-w-sm text-body text-ink-800">
            {credentials.subtitle}
          </p>
        </Reveal>

        <div className="grid gap-12 sm:grid-cols-2 lg:col-span-7">
          <Reveal delay={80}>
            <h3 className="text-subtitle font-semibold text-ink-950">
              {credentials.certificationsTitle}
            </h3>
            <ul className="mt-6 space-y-4">
              {credentials.certifications.map((certification) => (
                <li
                  key={certification}
                  className="text-subtitle leading-relaxed font-medium text-ink-900"
                >
                  {certification}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150}>
            <h3 className="text-subtitle font-semibold text-ink-950">
              {credentials.timelineTitle}
            </h3>
            <ol className="mt-6 space-y-6">
              {credentials.timeline.map((item) => (
                <li key={item.period}>
                  <p className="text-small text-ink-600">{item.period}</p>
                  <p className="mt-1 font-semibold text-ink-950">{item.role}</p>
                  <p className="text-body text-ink-800">{item.org}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
