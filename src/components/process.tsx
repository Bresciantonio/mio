import type { Messages } from "@/messages";
import { Reveal } from "./reveal";
import { Section, SectionHeader } from "./section";

interface ProcessProps {
  dict: Messages;
}

export function Process({ dict }: ProcessProps) {
  return (
    <Section id="metodo" tone="white">
      <SectionHeader
        eyebrow={dict.process.eyebrow}
        title={dict.process.title}
        subtitle={dict.process.subtitle}
      />

      <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dict.process.steps.map((step, index) => (
          <Reveal key={step.number} delay={index * 100}>
            <li className="card relative h-full p-7">
              <span className="text-4xl font-bold tracking-tight text-brand-100">
                {step.number}
              </span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink-950">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {step.description}
              </p>
              {index < dict.process.steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 -right-5 hidden h-px w-4 bg-ink-100 lg:block"
                />
              ) : null}
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
