import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Hero } from "@/components/home/Hero";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { MoreWork } from "@/components/home/MoreWork";
import { Archive } from "@/components/home/Archive";
import { Capabilities } from "@/components/home/Capabilities";
import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";
import { site } from "@/lib/site";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: `${site.url}/${lang}`,
    email: `mailto:${site.email}`,
    jobTitle: dict.hero.role,
    description: dict.meta.description,
    address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "CO" },
    affiliation: { "@type": "CollegeOrUniversity", name: site.university },
    knowsAbout: ["TypeScript", "React", "Next.js", "Node.js", "Python", "FastAPI", "PostgreSQL", "Payroll software", "Distributed systems"],
    sameAs: [site.github.url, site.x.url, site.instagram.url],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
      <Hero dict={dict} />
      <FeaturedWork locale={lang} dict={dict} />
      <MoreWork locale={lang} dict={dict} />
      <Archive locale={lang} dict={dict} />
      <Capabilities locale={lang} dict={dict} />
      <About dict={dict} />
      <Contact dict={dict} />
    </>
  );
}
