import Image from "next/image";
import type { Messages } from "@/messages";
import { Logo } from "./logo";
import { Reveal } from "./reveal";

interface AboutProps {
  dict: Messages;
}

/**
 * Who he is.
 *
 * A letter: the monogram, the paragraphs in the first person, the signature.
 * The photograph beside it is a transformer in a substation — the thing the
 * work is actually about, not a stand-in portrait.
 */
export function About({ dict }: AboutProps) {
  const { about } = dict;

  return (
    <section id="chi-sono" className="bg-paper py-16 sm:py-24">
      <div className="container-shell grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <figure>
            <div className="relative aspect-4/5 w-full overflow-hidden bg-ink-900 sm:aspect-3/4 lg:aspect-4/5">
              <Image
                src="/images/pont-l-abbe-high-voltage-substation-14.jpg"
                alt="Transformers and insulators inside a high-voltage substation"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-micro text-ink-600">
              {about.photoCaption}
            </figcaption>
          </figure>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <Logo className="size-14" />
            <h2 className="mt-8 text-title font-bold text-balance text-ink-950">
              {about.title}
            </h2>
          </Reveal>

          <Reveal delay={90}>
            <div className="mt-7 max-w-2xl space-y-5 text-body text-ink-800">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-10">
              <p className="text-subtitle font-semibold text-ink-950">
                {about.signature}
              </p>
              <p className="mt-1 text-small text-ink-600">{about.role}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
