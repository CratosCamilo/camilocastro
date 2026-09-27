import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hasLocale, locales } from "@/i18n/config";
import { featured, getFeatured } from "@/content/projects";
import { OG, ogFonts } from "@/lib/og";

export const alt = "Case study — Camilo Castro";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.flatMap((lang) => featured.map((p) => ({ lang, slug: p.slug })));
}

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = hasLocale(lang) ? lang : "en";
  const project = getFeatured(slug) ?? featured[0];
  const index = featured.indexOf(project) + 1;
  const cover = await readFile(join(process.cwd(), "assets", "og", `${project.slug}.jpg`));
  const src = `data:image/jpeg;base64,${cover.toString("base64")}`;
  const focus = project.panels[0].items[0].shot.position ?? "center";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: OG.paper, color: OG.ink, padding: "44px 48px", gap: 40 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 520 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <span style={{ fontFamily: "Mono", fontSize: 19, letterSpacing: 1, textTransform: "uppercase", color: OG.accent }}>
              {locale === "es" ? "Caso" : "Case"} {String(index).padStart(2, "0")} — {project.name}
            </span>
            <span style={{ display: "flex", borderTop: `6px solid ${OG.ink}`, paddingTop: 18, fontFamily: "Display", fontSize: 92, lineHeight: 0.86, textTransform: "uppercase" }}>
              {project.title[locale]}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, background: OG.accent, color: OG.onAccent, fontFamily: "JP", fontSize: 36, transform: "rotate(-5deg)" }}>
              戦
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: "Bold", fontSize: 30, textTransform: "uppercase" }}>Camilo Castro</span>
              <span style={{ fontFamily: "Mono", fontSize: 17, color: OG.ink3 }}>
                {locale === "es" ? "Desarrollador full-stack" : "Full-stack developer"}
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, border: `4px solid ${OG.ink}`, overflow: "hidden", background: "#e7e3d8" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> */}
          <img src={src} alt="" width={560} height={534} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: focus }} />
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
