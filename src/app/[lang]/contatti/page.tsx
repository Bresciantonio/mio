import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { dictionaries } from "@/messages";
import { isLocale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { ContactSection } from "@/components/contact-section";
import { getDictionary } from "../dictionaries";

interface ContactPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { lang: localeParam } = await params;
  if (!isLocale(localeParam)) return {};

  const dict = dictionaries[localeParam];

  return {
    title: dict.contact.title,
    description: dict.contact.subtitle,
    metadataBase: new URL(site.url),
    alternates: {
      canonical: `/${localeParam}/contatti`,
      languages: { it: "/it/contatti", en: "/en/contatti" },
    },
    openGraph: {
      title: dict.contact.title,
      description: dict.contact.subtitle,
      url: `/${localeParam}/contatti`,
      siteName: site.name,
    },
  };
}

export default async function ContactPage() {
  const locale = await lang();
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary();

  return <ContactSection locale={locale} dict={dict} headingLevel="h1" />;
}
