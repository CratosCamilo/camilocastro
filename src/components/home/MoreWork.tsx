import Image from "next/image";
import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { more, type Shot, type SideProject } from "@/content/projects";
import { Chapter } from "@/components/Chapter";
import { t } from "@/lib/i18n";
import styles from "./MoreWork.module.css";

/** Column spans per row, in reading order. The first row meets at a slanted gutter; the last row has three panels. */
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
            <li
              key={p.slug}
              className={styles.cell}
              data-cut={i === 0 ? "right" : i === 1 ? "left" : undefined}
              style={{ "--span": SPANS[i] ?? 6 } as CSSProperties}
            >
              <Card project={p} locale={locale} dict={dict} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Card({ project: p, locale, dict, index }: { project: SideProject; locale: Locale; dict: Dictionary; index: number }) {
  const layout = p.layout ?? "single";
  const shots: Shot[] = [p.cover, ...(p.extra ?? [])];
  const span = SPANS[index] ?? 6;
  const sizes = (share: number) => `(max-width: 760px) ${Math.round(100 * share)}vw, ${Math.round((span / 12) * 92 * share)}vw`;

  return (
    <article className={styles.card} aria-labelledby={`more-${p.slug}`}>
      <div className={styles.frame} data-print style={{ "--delay": `${(index % 2) * 140}ms` } as CSSProperties}>
        <div className={`${styles.frameInner} print`} data-layout={layout}>
          {shots.map((shot, i) => (
            <div key={i} className={styles.shot}>
              <Image
                src={shot.src}
                alt={t(shot.alt, locale)}
                placeholder="blur"
                sizes={sizes(layout === "phones" ? 1 / 3 : layout === "split" ? 1 / 2 : 1)}
                style={{ objectPosition: shot.position ?? "center" }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.body}>
        <p className="mono muted" data-reveal>
          {t(p.kind, locale)} <span aria-hidden="true">·</span> {p.year}
        </p>
        <h3 id={`more-${p.slug}`} className={styles.title} data-reveal>
          {p.name}
        </h3>
        <p className={styles.subtitle} data-reveal>
          {t(p.title, locale)}
        </p>
        <p className={styles.summary} data-reveal>
          {t(p.summary, locale)}
        </p>
        <ul className="tags" data-reveal>
          {p.stack.map((s) => (
            <li key={s} className="tag">
              {s}
            </li>
          ))}
        </ul>
        {(p.links.live || p.links.code) && (
          <div className={styles.links} data-reveal>
            {p.links.live && (
              <a className="ink-link" href={p.links.live} target="_blank" rel="noopener noreferrer">
                {dict.work.visit}
                <span className="visually-hidden">: {p.name} ({dict.a11y.newTab})</span>
                <span className="arrow up" aria-hidden="true">
                  ↗
                </span>
              </a>
            )}
            {p.links.code && (
              <a className="ink-link" href={p.links.code} target="_blank" rel="noopener noreferrer">
                {dict.work.source}
                <span className="visually-hidden">: {p.name} ({dict.a11y.newTab})</span>
                <span className="arrow up" aria-hidden="true">
                  ↗
                </span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
