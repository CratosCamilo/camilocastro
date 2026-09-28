import Image from "next/image";
import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import type { Shot } from "@/content/projects";
import { t } from "@/lib/i18n";
import styles from "./Device.module.css";

type DeviceProps = {
  shot: Shot;
  locale: Locale;
  /** `sizes` for the screenshot, relative to the viewport. */
  sizes: string;
  eager?: boolean;
  className?: string;
  style?: CSSProperties;
};

/**
 * A screenshot inside a flat, ink-drawn device. The device follows the screenshot:
 * a laptop for desktop captures, a phone for vertical ones, a tablet for 4:3 ones and
 * a browser window for crops of a page (its screen keeps the image's own proportions).
 */
export function Device({ shot, locale, sizes, eager = false, className, style }: DeviceProps) {
  const kind = shot.device ?? "browser";
  const orient = shot.src.width >= shot.src.height ? "landscape" : "portrait";
  const vars = {
    "--pos": shot.position ?? "center top",
    "--ratio": `${shot.src.width} / ${shot.src.height}`,
    ...style,
  } as CSSProperties;

  return (
    <div className={[styles.device, className].filter(Boolean).join(" ")} data-kind={kind} data-orient={orient} style={vars}>
      <div className={styles.body}>
        {kind === "browser" && (
          <div className={styles.bar} aria-hidden="true">
            <i />
            <i />
            <i />
            <span />
          </div>
        )}
        <div className={styles.screen} data-print>
          <Image
            src={shot.src}
            alt={t(shot.alt, locale)}
            className={`${styles.img} print`}
            placeholder="blur"
            sizes={sizes}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : undefined}
          />
        </div>
      </div>
      {kind === "laptop" && <div className={styles.base} aria-hidden="true" />}
    </div>
  );
}
