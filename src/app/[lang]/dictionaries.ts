import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { dictionaries } from "@/messages";
import { isLocale } from "@/lib/i18n";
import type { Messages } from "@/messages";

/**
 * Resolve the message bundle for the current `[lang]` segment.
 * Using `next/root-params` means no prop-drilling: any Server Component or
 * server-side utility can call `getDictionary()` directly.
 */
export async function getDictionary(): Promise<Messages> {
  const locale = await lang();
  if (!isLocale(locale)) notFound();
  return dictionaries[locale];
}
