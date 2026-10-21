import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      // The brand mark is the one gradient on the site: it is the logo.
      // taste-skill-ignore
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-xl bg-linear-to-br from-brand-500 to-brand-700 text-white", // taste-skill-ignore
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2 4 14h6l-1 8 9-12h-6l1-8Z" />
      </svg>
    </span>
  );
}
