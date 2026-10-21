import Image from "next/image";
import type { Messages } from "@/messages";
import { Reveal } from "./reveal";

interface TestimonialsProps {
  dict: Messages;
}

/**
 * References.
 *
 * The quotations are the section: set large, in reading text, with the
 * attribution under each one and the columns offset so the eye moves. The
 * stars and the quotation cards are gone — a rating of five out of five
 * says nothing that the sentence does not say better.
 */
export function Testimonials({ dict }: TestimonialsProps) {
  const { testimonials } = dict;

  return (
    <section id="referenze" className="bg-paper py-16 sm:py-24">
      <div className="container-shell grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
          <h2 className="text-title font-bold text-balance text-ink-950">
            {testimonials.title}
          </h2>
          <p className="mt-5 max-w-sm text-body text-ink-800">
            {testimonials.subtitle}
          </p>
        </Reveal>

        <div className="lg:col-span-8">
          <div className="space-y-14">
            {testimonials.items.map((item, index) => (
              <Reveal
                key={item.name}
                delay={index * 80}
                className={index % 2 === 1 ? "sm:pl-8" : "sm:pr-8"}
              >
                <figure>
                  <blockquote className="text-subtitle font-medium text-pretty text-ink-950">
                    «{item.quote}»
                  </blockquote>
                  <figcaption className="mt-5 text-small text-ink-600">
                    <span className="font-semibold text-ink-950">{item.name}</span> ·{" "}
                    {item.role} · {item.company}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mt-14 sm:pl-8">
            <figure className="flex flex-col gap-5 sm:flex-row sm:items-end">
              <div className="relative aspect-square w-40 shrink-0 overflow-hidden bg-ink-900">
                <Image
                  src="/images/pont-l-abbe-high-voltage-substation-18.jpg"
                  alt="A high-voltage substation seen from the outside, with insulators and overhead lines"
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>
              <figcaption className="text-small text-ink-600">
                {testimonials.photoCaption}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={160} className="mt-10 sm:pl-8">
            <p className="max-w-2xl text-small text-ink-600">
              {testimonials.disclaimer}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
