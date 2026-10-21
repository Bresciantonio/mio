import type { Messages } from "@/messages";
import { Icon } from "./icons";
import { Reveal } from "./reveal";
import { Section, SectionHeader } from "./section";

interface TestimonialsProps {
  dict: Messages;
}

export function Testimonials({ dict }: TestimonialsProps) {
  return (
    <Section id="referenze" tone="white">
      <SectionHeader
        eyebrow={dict.testimonials.eyebrow}
        title={dict.testimonials.title}
        subtitle={dict.testimonials.subtitle}
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {dict.testimonials.items.map((item, index) => (
          <Reveal key={item.name} delay={index * 100}>
            <figure className="card relative flex h-full flex-col p-7">
              <span
                aria-hidden="true"
                className="absolute -top-3 right-6 text-5xl leading-none font-bold text-brand-100"
              >
                &rdquo;
              </span>
              <div className="flex gap-0.5 text-accent-400" aria-label="5/5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 20 20" className="size-4 fill-current">
                    <path d="M10 1.5 12.6 7l6 .5-4.6 4 1.4 5.9L10 14.4 4.6 17.4 6 11.5 1.4 7.5l6-.5L10 1.5Z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-700">
                {item.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-ink-100 pt-4">
                <p className="text-sm font-semibold text-ink-950">{item.name}</p>
                <p className="text-xs text-ink-500">
                  {item.role} · {item.company}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal delay={150}>
        <p className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-2 text-center text-xs text-ink-400">
          <Icon name="alert" className="size-3.5 shrink-0" />
          {dict.testimonials.disclaimer}
        </p>
      </Reveal>
    </Section>
  );
}
