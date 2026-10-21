import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./reveal";

type Tone = "white" | "paper" | "ink";

const tones: Record<Tone, string> = {
  white: "bg-white text-ink-900",
  paper: "bg-paper text-ink-900",
  ink: "bg-ink-950 text-white",
};

interface SectionProps {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}

export function Section({ id, tone = "white", className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-20 sm:py-24 lg:py-28",
        tones[tone],
        className,
      )}
    >
      <div className="container-shell">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: Tone;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "white",
  className,
}: SectionHeaderProps) {
  const centered = align === "center";
  const isDark = tone === "ink";

  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        centered ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      <p
        className={cn(
          "eyebrow",
          centered && "justify-center",
          isDark ? "text-brand-300" : "text-brand-600",
        )}
      >
        <span className="h-px w-6 bg-current" aria-hidden="true" />
        {eyebrow}
        {centered && <span className="h-px w-6 bg-current" aria-hidden="true" />}
      </p>
      <h2
        className={cn(
          "mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[2.6rem] lg:leading-[1.1]",
          isDark ? "text-white" : "text-ink-950",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed text-pretty sm:text-lg",
            isDark ? "text-ink-100/80" : "text-ink-600",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
