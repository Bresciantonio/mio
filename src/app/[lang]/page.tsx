import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { isLocale } from "@/lib/i18n";
import { About } from "@/components/about";
import { BlogPreview } from "@/components/blog-preview";
import { Calculator } from "@/components/calculator";
import { ContactSection } from "@/components/contact-section";
import { Credentials } from "@/components/credentials";
import { CtaBanner } from "@/components/cta-banner";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { Mission } from "@/components/mission";
import { Newsletter } from "@/components/newsletter";
import { Process } from "@/components/process";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";
import { TrustBar } from "@/components/trust-bar";
import { getDictionary } from "./dictionaries";

export default async function HomePage() {
  const locale = await lang();
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary();

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <TrustBar dict={dict} />
      <Calculator dict={dict} />
      <Mission dict={dict} />
      <About dict={dict} />
      <Services locale={locale} dict={dict} />
      <Process dict={dict} />
      <Credentials dict={dict} />
      <Testimonials dict={dict} />
      <BlogPreview
        locale={locale}
        labels={{
          title: dict.blogPreview.title,
          subtitle: dict.blogPreview.subtitle,
          allPosts: dict.blogPreview.allPosts,
          readingTime: dict.blogPreview.readingTime,
        }}
      />
      <Faq
        title={dict.faq.title}
        subtitle={dict.faq.subtitle}
        items={dict.faq.items}
      />
      <CtaBanner locale={locale} dict={dict} />
      <Newsletter locale={locale} labels={dict.newsletter} />
      <ContactSection locale={locale} dict={dict} />
    </>
  );
}
