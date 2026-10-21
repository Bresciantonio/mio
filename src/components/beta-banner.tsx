import type { Messages } from "@/messages";

/**
 * Beta notice.
 *
 * Rendered above the header on every page while the site is in beta
 * (`SITE_STATUS=beta`, the default). It is a server component: no client
 * JavaScript, no dismiss button — the notice has to stay visible for the
 * whole preview, otherwise "beta" stops meaning anything.
 */
export function BetaBanner({ dict }: { dict: Messages }) {
  return (
    <div className="bg-accent-50">
      <div className="container-shell flex flex-col items-center gap-1 py-2.5 text-center sm:flex-row sm:justify-center sm:gap-3 sm:text-left">
        <span className="text-xs font-semibold tracking-[0.16em] text-accent-700 uppercase">
          {dict.beta.label}
        </span>
        <p className="text-[13px] leading-snug text-accent-900/85">
          {dict.beta.message}
        </p>
      </div>
    </div>
  );
}
