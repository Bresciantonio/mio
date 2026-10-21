import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { isLocale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { PrivacyContent } from "@/components/privacy-content";
import { getDictionary } from "../dictionaries";

interface PrivacyPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { lang: localeParam } = await params;
  if (!isLocale(localeParam)) return {};

  return {
    title: "Privacy policy",
    description:
      localeParam === "it"
        ? "Informativa sul trattamento dei dati personali."
        : "Information on the processing of personal data.",
    metadataBase: new URL(site.url),
    alternates: {
      canonical: `/${localeParam}/privacy`,
      languages: { it: "/it/privacy", en: "/en/privacy" },
    },
    openGraph: {
      title: "Privacy policy",
      url: `/${localeParam}/privacy`,
      siteName: site.name,
    },
    robots: { index: false, follow: true },
  };
}

export default async function PrivacyPage() {
  const locale = await lang();
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary();

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="container-shell">
        <p className="eyebrow text-brand-600">
          <span className="h-px w-6 bg-current" aria-hidden="true" />
          {dict.footer.privacy}
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
          {locale === "it" ? "Privacy policy" : "Privacy policy"}
        </h1>
        <div className="mt-10">
          <PrivacyContent locale={locale} />
        </div>
      </div>
    </section>
  );
}
