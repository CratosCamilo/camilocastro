import Image from "next/image";
import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import type { PanelRow } from "@/content/projects";
import { t } from "@/lib/i18n";

type PanelsProps = {
  rows: PanelRow[];
  locale: Locale;
  /** Fraction of the viewport the whole panel group spans on wide screens (for `sizes`). */
  area?: number;
  /** Load the first image eagerly (above-the-fold case-study hero). */
  eager?: boolean;
};

/** A manga page: rows of bordered frames with gutters. Images print in with halftone dots. */
export function Panels({ rows, locale, area = 0.64, eager = false }: PanelsProps) {
  let index = 0;
  return (
    <div className="panels">
      {rows.map((row, r) => (
        <div
          key={r}
          className="panel-row"
          data-count={row.items.length}
          style={{ "--ratio": row.ratio } as CSSProperties}
        >
          {row.items.map((item) => {
            const i = index++;
            const wide = Math.round((item.span / 12) * area * 100);
            const mobile = row.items.length === 2 ? 50 : 100;
            return (
              <div
                key={i}
                className="panel"
                data-print
                style={
                  {
                    "--span": item.span,
                    "--mratio": row.mobileRatio ?? "4 / 3",
                    "--pos": item.shot.position ?? "center",
                    "--delay": `${i * 130}ms`,
                  } as CSSProperties
                }
              >
                <Image
                  src={item.shot.src}
                  alt={t(item.shot.alt, locale)}
                  className="panel__media print"
                  placeholder="blur"
                  sizes={`(max-width: 760px) ${mobile}vw, (max-width: 1100px) ${Math.round((item.span / 12) * 100)}vw, ${wide}vw`}
                  loading={eager && i === 0 ? "eager" : "lazy"}
                  fetchPriority={eager && i === 0 ? "high" : undefined}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
