"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds. */
  delay?: number;
}

/**
 * Fades content up the first time it enters the viewport.
 *
 * The class toggle keeps the component a Server-Component-friendly wrapper.
 * Two safety nets matter here:
 *
 * 1. `prefers-reduced-motion` shows the content immediately.
 * 2. IntersectionObserver callbacks are delivered during the rendering update.
 *    If the tab is backgrounded (or the browser throttles rendering) that
 *    callback can be delayed indefinitely, which would leave the content
 *    invisible. A timer plus a `visibilitychange` listener re-check the
 *    element so it can never stay hidden.
 *
 * With JavaScript disabled entirely, the `<noscript>` style in the root layout
 * forces every `.reveal` element visible.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => el.classList.add("is-visible");

    // Respect reduced motion: show immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal();
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -64px 0px" },
    );

    observer.observe(el);

    // Safety net: reveal anything already on screen, and re-check when the
    // tab becomes visible again.
    const check = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) reveal();
    };

    const timer = window.setTimeout(check, 600);
    const onVisibilityChange = () => {
      if (!document.hidden) check();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
