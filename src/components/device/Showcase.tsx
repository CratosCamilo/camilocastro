import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import type { Showcase as ShowcaseData } from "@/content/projects";
import { Device } from "./Device";
import styles from "./Showcase.module.css";

type ShowcaseProps = {
  showcase: ShowcaseData;
  locale: Locale;
  /** Share of the viewport the stage spans on wide screens, for image `sizes`. */
  area: number;
  flip?: boolean;
  eager?: boolean;
  className?: string;
};

/** Relative width of each device inside a stage, per layout. */
const WIDTH: Record<ShowcaseData["layout"], Record<string, number>> = {
  duo: { laptop: 0.86, tablet: 0.6, phone: 0.2, browser: 0.42 },
  solo: { laptop: 0.94, tablet: 0.76, phone: 0.3, browser: 0.94 },
  phones: { phone: 0.27 },
};

const sizesFor = (share: number, area: number) =>
  `(max-width: 760px) ${Math.max(28, Math.round(share * 100))}vw, ${Math.max(12, Math.round(share * area * 100))}vw`;

/**
 * Screenshots staged as devices: a main device with a second one in front (duo),
 * a single device (solo), or a fanned row of phones (phones).
 */
export function Showcase({ showcase, locale, area, flip = false, eager = false, className }: ShowcaseProps) {
  const { layout, shots } = showcase;
  return (
    <div className={[styles.stage, className].filter(Boolean).join(" ")} data-layout={layout} data-flip={flip || undefined}>
      {shots.map((shot, i) => {
        const kind = shot.device ?? "browser";
        const share = WIDTH[layout][kind] ?? 0.4;
        const role = layout === "duo" ? (i === 0 ? styles.main : styles.side) : styles.item;
        return (
          <Device
            key={i}
            shot={shot}
            locale={locale}
            className={role}
            eager={eager && i === 0}
            sizes={sizesFor(share, area)}
            style={{ "--w": `${share * 100}%`, "--i": i, "--delay": `${i * 140}ms` } as CSSProperties}
          />
        );
      })}
    </div>
  );
}
