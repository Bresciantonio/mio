import it from "./it.json";
import en from "./en.json";
import type { Locale } from "@/lib/i18n";

/**
 * The shape of every message bundle is defined by the Italian dictionary.
 * The `dictionaries` object below is typed as `Record<Locale, Messages>`, so
 * TypeScript fails the build if the English file is missing (or has extra)
 * keys compared to the Italian one.
 */
export type Messages = typeof it;

export const dictionaries: Record<Locale, Messages> = { it, en };
