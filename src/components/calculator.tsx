"use client";

import { useId, useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import type { Messages } from "@/messages";
import { Icon } from "./icons";
import { Reveal } from "./reveal";

interface CalculatorProps {
  dict: Messages;
}

/**
 * The live thing.
 *
 * One honest model instead of a dashboard mock: the visitor enters the annual
 * energy bill and reads the order of magnitude a full diagnosis can address.
 * The range is the interval documented in energy audits (8–15%), it is stated
 * in the copy, and it is not a quote — the page says so where the number is.
 */
export function Calculator({ dict }: CalculatorProps) {
  const { calculator } = dict;
  const inputId = useId();
  const [spend, setSpend] = useState(calculator.example);

  const result = useMemo(() => {
    const low = Math.round((spend * calculator.range[0]) / 100);
    const high = Math.round((spend * calculator.range[1]) / 100);
    return { low, high };
  }, [spend, calculator.range]);

  const format = (value: number) =>
    new Intl.NumberFormat("it-IT", { maximumFractionDigits: 0 }).format(value);

  return (
    <section className="bg-ink-950 py-16 text-white sm:py-24">
      <div className="container-shell grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-5">
          <h2 className="text-title font-bold text-white">{calculator.title}</h2>
          <p className="mt-5 max-w-md text-lead text-pretty text-ink-100/80">
            {calculator.subtitle}
          </p>
        </Reveal>

        <Reveal delay={90} className="lg:col-span-7">
          <div className="bg-ink-900 p-7 sm:p-9">
            <label
              htmlFor={inputId}
              className="block text-small font-medium text-ink-100"
            >
              {calculator.label}
            </label>

            <div className="mt-3 flex items-baseline gap-2">
              <span aria-hidden="true" className="text-2xl text-ink-300">
                €
              </span>
              <input
                id={inputId}
                type="number"
                inputMode="numeric"
                min={0}
                step={10000}
                value={spend}
                onChange={(event) =>
                  setSpend(Math.max(0, Number(event.target.value) || 0))
                }
                className="w-full max-w-xs border-b border-white/25 bg-transparent pb-1 text-4xl font-bold tracking-tight text-white tabular-nums focus:border-brand-400 focus:outline-none"
              />
            </div>

            <input
              type="range"
              min={50000}
              max={5000000}
              step={50000}
              value={Math.min(5000000, Math.max(50000, spend || 50000))}
              onChange={(event) => setSpend(Number(event.target.value))}
              aria-label={calculator.sliderLabel}
              className="mt-6 w-full accent-brand-400"
            />

            <div className="mt-10">
              <p className="text-3xl font-bold tracking-tight text-brand-300 tabular-nums sm:text-4xl">
                € {format(result.low)} – € {format(result.high)}
              </p>
              <p className="mt-2 text-small font-medium text-ink-100">
                {calculator.resultLabel}
              </p>
              <p className="mt-2 text-small text-ink-200">{calculator.resultNote}</p>
            </div>

            <p
              className={cn(
                "mt-6 flex items-start gap-2.5 text-micro text-ink-300",
              )}
            >
              <Icon name="alert" className="mt-0.5 size-4 shrink-0" />
              {calculator.disclaimer}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
