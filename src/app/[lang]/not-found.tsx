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
      <div>
        <p className="text-[clamp(4rem,12vw,8rem)] leading-none font-bold tracking-tight text-ink-950">
          404
        </p>
        <h1 className="mt-6 text-title font-bold text-ink-950">
          {safeLocale === "it" ? "Pagina non trovata" : "Page not found"}
        </h1>
        <p className="mt-3 max-w-md text-body leading-relaxed text-ink-800">
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
