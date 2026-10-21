import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n";

/**
 * The bare `/`.
 *
 * The site is bilingual: every route lives under a locale (`/it`, `/en`) and
 * `src/proxy.ts` normally sends the visitor to the language they asked for.
 * This route is the fallback for the case where the proxy is not applied: the
 * visitor lands on the default locale instead of a 404.
 */
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
