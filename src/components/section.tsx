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
      className={cn("scroll-mt-24 py-16 sm:py-24", tones[tone], className)}
    >
      <div className="container-shell">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: Tone;
  className?: string;
}

/**
 * Section heading.
 *
 * No label above the title: the title says which section it is and the
 * sentence under it says what it holds. Headings are left-aligned — the page
 * has one centred moment at most, and it is not this one.
 */
export function SectionHeader({
  title,
  subtitle,
  align = "left",
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
      <h2
        className={cn(
          "text-title font-bold text-balance",
          isDark ? "text-white" : "text-ink-950",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-5 text-body text-pretty",
            isDark ? "text-ink-100/80" : "text-ink-800",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
