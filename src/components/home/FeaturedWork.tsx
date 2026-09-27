import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { featured, type FeaturedProject } from "@/content/projects";
import { Chapter } from "@/components/Chapter";
import { Panels } from "@/components/work/Panels";
import { href, pad, t } from "@/lib/i18n";
import styles from "./FeaturedWork.module.css";

export function FeaturedWork({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <div className="container">
        <Chapter
          n={1}
          label={dict.chapter}
          lines={locale === "es" ? ["Trabajo", "seleccionado"] : ["Selected", "work"]}
          jp="作品"
          lede={dict.work.lede}
          titleId="work-title"
        />
        <ol role="list" className={styles.list}>
          {featured.map((project, i) => (
            <li key={project.slug}>
              <Spread project={project} index={i} total={featured.length} locale={locale} dict={dict} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

type SpreadProps = { project: FeaturedProject; index: number; total: number; locale: Locale; dict: Dictionary };

function Spread({ project: p, index, total, locale, dict }: SpreadProps) {
  const caseHref = href(locale, `/work/${p.slug}`);
  const titleId = `project-${p.slug}`;
  return (
    <article className={styles.spread} data-flip={index % 2 === 1 || undefined} aria-labelledby={titleId}>
      <Link href={caseHref} className={styles.media} tabIndex={-1} aria-hidden="true">
        <Panels rows={p.panels} locale={locale} />
      </Link>

      <div className={styles.text}>
        <div className={styles.sticky}>
          <div className={styles.head} data-reveal>
            <p className={styles.index}>
              <span className={styles.indexNo}>{pad(index + 1)}</span>
              <span className="mono muted">
                {dict.work.of} {pad(total)}
              </span>
            </p>
            <span className="stamp" data-tone={p.status.tone}>
              {t(p.status.label, locale)}
            </span>
          </div>

          <p className={`mono ${styles.kicker}`} data-reveal>
            {p.name} <span aria-hidden="true">·</span> {t(p.kind, locale)}
          </p>
          <h3 id={titleId} className={styles.title} data-reveal>
            <Link href={caseHref}>{t(p.title, locale)}</Link>
          </h3>
          <p className={styles.client} data-reveal>
            {t(p.client, locale)}
          </p>
          <p className={styles.summary} data-reveal>
            {t(p.summary, locale)}
          </p>

          <ul className={styles.highlights} data-reveal>
            {p.highlights.map((h, i) => (
              <li key={i}>{t(h, locale)}</li>
            ))}
          </ul>

          <div className={styles.stack} data-reveal>
            <span className="mono muted">{dict.work.stack}</span>
            <ul className="tags">
              {p.stack.map((s) => (
                <li key={s} className="tag">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.links} data-reveal>
            <Link className="btn btn--solid" href={caseHref}>
              {dict.work.caseStudy}
              <span className="visually-hidden">: {t(p.title, locale)}</span>
              <span aria-hidden="true">→</span>
            </Link>
            {p.links.live && (
              <a className="ink-link" href={p.links.live} target="_blank" rel="noopener noreferrer">
                {dict.work.visit}
                <span className="arrow up" aria-hidden="true">
                  ↗
                </span>
                <span className="visually-hidden"> ({dict.a11y.newTab})</span>
              </a>
            )}
            {p.links.code?.[0] && (
              <a className="ink-link" href={p.links.code[0]} target="_blank" rel="noopener noreferrer">
                {dict.work.source}
                <span className="arrow up" aria-hidden="true">
                  ↗
                </span>
                <span className="visually-hidden"> ({dict.a11y.newTab})</span>
              </a>
            )}
            {!p.links.live && !p.links.code && <span className="mono muted">{dict.work.private}</span>}
          </div>
        </div>
      </div>
    </article>
  );
}
