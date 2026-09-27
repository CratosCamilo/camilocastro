import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Fonts for next/og (Satori reads TTF/OTF/WOFF, not WOFF2). All are SIL OFL. */
export async function ogFonts() {
  const dir = join(process.cwd(), "assets", "og-fonts");
  const [display, bold, mono, jp] = await Promise.all([
    readFile(join(dir, "Archivo-ExtraCondensedBlack.ttf")),
    readFile(join(dir, "Archivo-CondensedExtraBold.ttf")),
    readFile(join(dir, "IBMPlexMono-Medium.ttf")),
    readFile(join(dir, "DelaGothicOne-subset.ttf")),
  ]);
  return [
    { name: "Display", data: display, weight: 900 as const, style: "normal" as const },
    { name: "Bold", data: bold, weight: 800 as const, style: "normal" as const },
    { name: "Mono", data: mono, weight: 500 as const, style: "normal" as const },
    { name: "JP", data: jp, weight: 400 as const, style: "normal" as const },
  ];
}

export const OG = {
  paper: "#f1eee6",
  ink: "#141312",
  ink3: "#66615a",
  accent: "#d6311f",
  onAccent: "#f8f4ec",
} as const;
