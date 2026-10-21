import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { dictionaries } from "@/messages";
import { isLocale } from "@/lib/i18n";
import { isBeta, site } from "@/lib/site";
import { JsonLd, organizationJsonLd, webSiteJsonLd } from "@/components/json-ld";
import { BetaBanner } from "@/components/beta-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDictionary } from "./dictionaries";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Required by Cache Components (`cacheComponents: true`): every root
 * parameter needs at least one value or the build fails.
 */
export function generateStaticParams() {
  return [{ lang: "it" }, { lang: "en" }];
}

interface MetadataProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { lang: localeParam } = await params;
  if (!isLocale(localeParam)) return {};

  const dict = dictionaries[localeParam];

  return {
    metadataBase: new URL(site.url),
    applicationName: site.name,
    title: {
      default: dict.meta.title,
      template: `%s · ${site.name}`,
    },
    description: dict.meta.description,
    alternates: {
      canonical: `/${localeParam}`,
      languages: {
        it: "/it",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: localeParam === "it" ? "it_IT" : "en_US",
      alternateLocale: localeParam === "it" ? "en_US" : "it_IT",
      url: `/${localeParam}`,
      siteName: site.name,
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      images: ["/opengraph-image"],
    },
    twitter: {
      card: dict.meta.twitterCard as "summary_large_image",
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      images: ["/opengraph-image"],
    },
    // While the site is a beta the pages are not indexed: the content is not
    // final yet, and a `noindex` is cheaper to undo than a deindexing.
    robots: isBeta ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export default async function RootLayout(
  props: LayoutProps<"/[lang]">,
) {
  const locale = await lang();
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-ink-900">
        {/*
          Scroll-reveal fallback. Without JavaScript the IntersectionObserver
          never runs, so every `.reveal` element would stay at `opacity: 0` and
          the page would render blank. This style is only applied when
          scripting is disabled.
        */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#contenuto"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          {dict.common.skipToContent}
        </a>
        {isBeta ? <BetaBanner dict={dict} /> : null}
        <SiteHeader locale={locale} dict={dict} />
        <main id="contenuto" className="flex-1">
          {props.children}
        </main>
        <SiteFooter locale={locale} dict={dict} />
        <JsonLd
          data={organizationJsonLd({
            name: site.name,
            legalName: site.legalName,
            url: site.url,
            email: site.email,
            telephone: site.phone,
            address: site.address.full,
            linkedin: site.linkedin,
          })}
        />
        <JsonLd
          data={webSiteJsonLd({
            name: site.name,
            url: site.url,
            description: dict.meta.description,
          })}
        />
      </body>
    </html>
  );
}
