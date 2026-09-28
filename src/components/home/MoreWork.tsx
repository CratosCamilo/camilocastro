import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { more, type SideProject } from "@/content/projects";
import { Chapter } from "@/components/Chapter";
import { Showcase } from "@/components/device/Showcase";
import { t } from "@/lib/i18n";
import styles from "./MoreWork.module.css";

/** Column spans per row, in reading order: two uneven pairs, then a row of three. */
const SPANS = [7, 5, 5, 7, 4, 4, 4];

export function MoreWork({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className={styles.section} aria-labelledby="more-title">
      <div className="container">
        <Chapter
          label={dict.more.label}
          variant="sub"
          lines={locale === "es" ? ["Más proyectos"] : ["More work"]}
          lede={dict.more.lede}
          titleId="more-title"
        />
        <ul role="list" className={styles.grid}>
          {more.map((p, i) => (
            <li key={p.slug} className={styles.cell} style={{ "--span": SPANS[i] ?? 6 } as CSSProperties}>
              <Card project={p} locale={locale} dict={dict} span={SPANS[i] ?? 6} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Card({ project: p, locale, dict, span }: { project: SideProject; locale: Locale; dict: Dictionary; span: number }) {
  const main = p.links.live ?? p.links.code;
  return (
    <article className={styles.card} aria-labelledby={`more-${p.slug}`}>
      <Showcase showcase={p.showcase} locale={locale} area={(span / 12) * 0.92} className={styles.stage} />
      <div className={styles.body}>
        <p className="mono muted" data-reveal>
          {t(p.kind, locale)} <span aria-hidden="true">·</span> {p.year}
        </p>
        <h3 id={`more-${p.slug}`} className={styles.title} data-reveal>
          {main ? (
            <a href={main} target="_blank" rel="noopener noreferrer">
              {p.name}
              <span className="visually-hidden"> ({dict.a11y.newTab})</span>
              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </a>
          ) : (
            p.name
          )}
        </h3>
        <p className={styles.subtitle} data-reveal>
          {t(p.title, locale)}
        </p>
      </div>
    </article>
  );
}
