import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { isLocale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { PrivacyContent } from "@/components/privacy-content";

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

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container-shell">
        <h1 className="text-display font-bold text-ink-950">
          {locale === "it" ? "Privacy policy" : "Privacy policy"}
        </h1>
        <div className="mt-10">
          <PrivacyContent locale={locale} />
        </div>
      </div>
    </section>
  );
}
