import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { featured } from "@/content/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...featured.map((p) => `/work/${p.slug}`)];
  const lastModified = new Date();
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])),
          "x-default": `${site.url}/en${path}`,
        },
      },
    })),
  );
}
