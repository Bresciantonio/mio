import type { Messages } from "@/messages";
import { Reveal } from "./reveal";

interface FaqProps {
  title: string;
  subtitle: string;
  items: Messages["faq"]["items"];
}

/**
 * Frequently asked questions, as reading text.
 *
 * The question runs into its own answer and the whole thing reads like the
 * notes at the back of a programme. An accordion hides half the answers
 * behind a click and adds a row of boxes to the page; on a page that must
 * answer a buyer's doubts, everything stays open.
 */
export function Faq({ title, subtitle, items }: FaqProps) {
  return (
    <section id="faq" className="bg-paper py-16 sm:py-24">
      <div className="container-shell grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
          <h2 className="text-title font-bold text-balance text-ink-950">
            {title}
          </h2>
          <p className="mt-5 max-w-sm text-body text-ink-800">{subtitle}</p>
        </Reveal>

        <Reveal delay={80} className="lg:col-span-8">
          <div className="gap-14 sm:columns-2 [&>p]:mb-5 [&>p]:break-inside-avoid">
            {items.map((item) => (
              <p key={item.question} className="text-body text-ink-800">
                <span className="font-semibold text-ink-950">{item.question}</span>{" "}
                {item.answer}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
