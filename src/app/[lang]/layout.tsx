import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { hasLocale, locales, ogLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { InkFilters } from "@/components/InkFilters";
import { RevealObserver } from "@/components/RevealObserver";
import { site } from "@/lib/site";
import "../globals.css";

/* Latin covers both languages (á é í ó ú ñ ¿ ¡). Only what the design uses is loaded:
   Archivo with its width axis, Plex Sans' weight axis, one Plex Mono weight. */
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const plexSans = IBM_Plex_Sans({ subsets: ["latin"], variable: "--font-plex", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: "400", variable: "--font-plex-mono", display: "swap" });
/* Dela Gothic One, subset to the handful of Japanese glyphs used as ornaments (≈3 KB). */
const dela = localFont({ src: "../../fonts/dela-gothic-one-subset.woff2", variable: "--font-dela", display: "block", preload: true });

/** Runs before first paint: marks JS as available and applies a stored theme choice. */
const bootScript = `(function(){var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.dataset.theme=t}catch(e){}})();`;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.title, template: `%s — ${site.name}` },
    description: dict.meta.description,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.github.url }],
    creator: site.name,
    keywords: ["Camilo Castro", "full-stack developer", "desarrollador full-stack", "Next.js", "React", "TypeScript", "Python", "FastAPI", "Bucaramanga", "Colombia"],
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", es: "/es", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      url: `/${lang}`,
      title: dict.meta.title,
      description: dict.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      creator: site.x.handle,
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1eee6" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0e0d" },
  ],
  colorScheme: "light dark",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} ${dela.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          {dict.a11y.skip}
        </a>
        <InkFilters />
        <Header locale={lang} dict={dict} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer dict={dict} />
        <RevealObserver />
      </body>
    </html>
  );
}
