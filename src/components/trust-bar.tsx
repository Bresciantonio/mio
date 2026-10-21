import type { Messages } from "@/messages";
import { Icon } from "./icons";
import { Reveal } from "./reveal";

interface TrustBarProps {
  dict: Messages;
}

export function TrustBar({ dict }: TrustBarProps) {
  const items = dict.trust.items;
  const loop = [...items, ...items];

  return (
    <section className="border-b border-ink-100 bg-white py-10">
      <div className="container-shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.16em] text-ink-500 uppercase">
            {dict.trust.title}
          </p>
          <p className="mt-2 text-sm text-ink-500">{dict.trust.subtitle}</p>
        </Reveal>
      </div>

      <div className="relative mt-8 overflow-hidden">
        <p className="sr-only">{items.join(", ")}</p>
        <div aria-hidden="true" className="flex w-max animate-marquee gap-12 pr-12">
          {loop.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap text-ink-400"
            >
              <Icon name="check" className="size-4 text-brand-500" />
              {item}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
      </div>
    </section>
  );
}
