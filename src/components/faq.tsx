"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./icons";
import { Reveal } from "./reveal";
import { Section, SectionHeader } from "./section";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: FaqItem[];
}

export function Faq({ eyebrow, title, subtitle, items }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" tone="paper">
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {items.map((item, index) => {
          const open = openIndex === index;
          const panelId = `faq-panel-${index}`;
          const buttonId = `faq-button-${index}`;
          return (
            <Reveal key={item.question} delay={index * 60}>
              <div
                className={cn(
                  "card overflow-hidden",
                  open && "border-brand-200 shadow-lg shadow-brand-600/5",
                )}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-base font-semibold text-ink-950">
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-full border transition-colors",
                        open
                          ? "border-brand-600 bg-brand-600 text-white"
                          : "border-ink-200 text-ink-500",
                      )}
                    >
                      <Icon
                        name="chevron-down"
                        className={cn("size-4 transition-transform", open && "rotate-180")}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm leading-relaxed text-ink-600">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
