import Link from "next/link";
import { lang } from "next/root-params";
import { dictionaries } from "@/messages";
import { isLocale, localizePath } from "@/lib/i18n";
import { Icon } from "@/components/icons";

export default async function NotFound() {
  const locale = await lang();
  const safeLocale = isLocale(locale) ? locale : "it";
  const dict = dictionaries[safeLocale];

  return (
    <section className="grid min-h-[70vh] place-items-center bg-paper px-6 py-24">
      <div className="text-center">
        <p className="text-7xl font-bold tracking-tight text-brand-600">404</p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-ink-950 sm:text-3xl">
          {safeLocale === "it" ? "Pagina non trovata" : "Page not found"}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-600">
          {safeLocale === "it"
            ? "Il contenuto che cerchi non esiste o è stato spostato."
            : "The content you are looking for does not exist or has been moved."}
        </p>
        <Link href={localizePath(safeLocale, "/")} className="btn-primary mt-7">
          {dict.common.backToHome}
          <Icon name="arrow-right" className="size-4" />
        </Link>
      </div>
    </section>
  );
}
