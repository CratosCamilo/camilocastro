import { ImageResponse } from "next/og";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { focusLinePaths } from "@/lib/focus-lines";
import { OG, ogFonts } from "@/lib/og";

export const alt = "Camilo Castro — Full-stack developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(hasLocale(lang) ? lang : "en");
  const [light, medium, dense] = focusLinePaths({ width: 1200, height: 630, cx: 960, cy: 300, count: 150, clear: [150, 280], seed: 2026 });

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: OG.paper, color: OG.ink }}>
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", left: 0, top: 0, opacity: 0.1 }}>
          <path d={light} fill={OG.ink} opacity="0.45" />
          <path d={medium} fill={OG.ink} opacity="0.75" />
          <path d={dense} fill={OG.ink} />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", padding: "48px 64px 44px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Mono", fontSize: 20, letterSpacing: 1, textTransform: "uppercase", borderBottom: `1px solid ${OG.ink}33`, paddingBottom: 14 }}>
            <span>{dict.meta.ogSubtitle}</span>
            <span style={{ color: OG.ink3 }}>Vol. 01 — 2026</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", fontFamily: "Display", fontSize: 212, lineHeight: 0.8, textTransform: "uppercase", letterSpacing: -2 }}>
              <span>Camilo</span>
              <span>Castro</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "14px 12px",
                background: OG.accent,
                color: OG.onAccent,
                fontFamily: "JP",
                fontSize: 104,
                lineHeight: 1,
                transform: "rotate(-6deg)",
                border: `5px solid ${OG.accent}`,
                boxShadow: `inset 0 0 0 4px ${OG.onAccent}`,
                marginRight: 40,
              }}
            >
              <span>戦</span>
              <span>え</span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: `3px solid ${OG.ink}`, paddingTop: 16 }}>
            <span style={{ fontFamily: "Bold", fontSize: 40, textTransform: "uppercase" }}>{dict.meta.ogTagline}</span>
            <span style={{ fontFamily: "Mono", fontSize: 20, color: OG.ink3 }}>github.com/CratosCamilo</span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
