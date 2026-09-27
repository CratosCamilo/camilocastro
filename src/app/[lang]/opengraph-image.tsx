import { readFile } from "node:fs/promises";
import { join } from "node:path";
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

/* Same composition as the site's cover: art panel, slanted gutter, name, seal across the join. */
const L = 64;
const R = 1136;
const TOP = 96;
const YL = 330; // bottom-left of the art panel
const YR = 304; // bottom-right (higher: the gutter slants up)
const B = 4; // frame width

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(hasLocale(lang) ? lang : "en");
  const art = await readFile(join(process.cwd(), "assets", "og", "prologue.jpg"));
  const src = `data:image/jpeg;base64,${art.toString("base64")}`;
  const [light, medium, dense] = focusLinePaths({ width: 1200, height: 630, cx: 1072, cy: 318, count: 150, clear: [120, 230], seed: 2026 });

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: OG.paper, color: OG.ink }}>
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", left: 0, top: 0, opacity: 0.1 }}>
          <path d={light} fill={OG.ink} opacity="0.45" />
          <path d={medium} fill={OG.ink} opacity="0.75" />
          <path d={dense} fill={OG.ink} />
        </svg>

        <div style={{ position: "absolute", left: L, right: 1200 - R, top: 40, display: "flex", justifyContent: "space-between", fontFamily: "Mono", fontSize: 18, letterSpacing: 1, textTransform: "uppercase", borderBottom: `1px solid ${OG.ink}33`, paddingBottom: 12 }}>
          <span>{dict.meta.ogSubtitle}</span>
          <span style={{ color: OG.ink3 }}>Vol. 01 — 2026</span>
        </div>

        {/* art panel */}
        <div style={{ position: "absolute", left: L, top: TOP, width: R - L, height: YL - TOP, display: "flex", border: `${B}px solid ${OG.ink}`, background: "#121110", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> */}
          <img src={src} alt="" width={R - L} height={YL - TOP} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 42%" }} />
        </div>
        {/* slanted gutter: paper cut below the slant, then the frame along it */}
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", left: 0, top: 0 }}>
          <polygon points={`${L - 2},${YL + 2} ${R + 2},${YL + 2} ${R + 2},${YR} ${L - 2},${YL}`} fill={OG.paper} />
          <line x1={L} y1={YL - B / 2} x2={R} y2={YR - B / 2} stroke={OG.ink} strokeWidth={B} />
        </svg>
        <div style={{ position: "absolute", left: L + 18, top: TOP + 18, display: "flex", padding: "7px 12px 6px", background: OG.paper, border: `2px solid ${OG.ink}`, fontFamily: "Mono", fontSize: 14, letterSpacing: 1, textTransform: "uppercase" }}>
          {lang === "es" ? "Prólogo" : "Prologue"}
        </div>

        <div style={{ position: "absolute", left: L - 4, top: 362, display: "flex", fontFamily: "Display", fontSize: 150, lineHeight: 0.8, textTransform: "uppercase", letterSpacing: -2 }}>
          Camilo Castro
        </div>

        {/* the seal, stamped across the gutter */}
        <div
          style={{
            position: "absolute",
            left: 1024,
            top: 226,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "12px 10px",
            background: OG.accent,
            color: OG.onAccent,
            fontFamily: "JP",
            fontSize: 74,
            lineHeight: 1,
            transform: "rotate(-6deg)",
            border: `5px solid ${OG.accent}`,
            boxShadow: `inset 0 0 0 3px ${OG.onAccent}`,
          }}
        >
          <span>戦</span>
          <span>え</span>
        </div>

        <div style={{ position: "absolute", left: L, right: 1200 - R, bottom: 40, display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: `3px solid ${OG.ink}`, paddingTop: 16 }}>
          <span style={{ fontFamily: "Bold", fontSize: 38, textTransform: "uppercase" }}>{dict.meta.ogTagline}</span>
          <span style={{ fontFamily: "Mono", fontSize: 19, color: OG.ink3 }}>github.com/CratosCamilo</span>
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
