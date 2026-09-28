import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { featured, type FeaturedProject } from "@/content/projects";
import { Chapter } from "@/components/Chapter";
import { Showcase } from "@/components/device/Showcase";
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

/** One project: its screens staged on devices, and only the essentials beside them. */
function Spread({ project: p, index, total, locale, dict }: SpreadProps) {
  const caseHref = href(locale, `/work/${p.slug}`);
  const titleId = `project-${p.slug}`;
  const flip = index % 2 === 1;
  return (
    <article className={styles.spread} data-flip={flip || undefined} aria-labelledby={titleId}>
      <Link href={caseHref} className={styles.media} tabIndex={-1} aria-hidden="true">
        <Showcase showcase={p.showcase} locale={locale} area={0.62} flip={flip} />
      </Link>

      <div className={styles.text}>
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
          {p.name}
        </p>
        <h3 id={titleId} className={styles.title} data-reveal>
          <Link href={caseHref}>{t(p.title, locale)}</Link>
        </h3>
        <p className={styles.tagline} data-reveal>
          {t(p.tagline, locale)}
        </p>

        <ul className="tags" data-reveal aria-label={dict.work.stack}>
          {p.stack.slice(0, 4).map((s) => (
            <li key={s} className="tag">
              {s}
            </li>
          ))}
        </ul>

        <div className={styles.links} data-reveal>
          <Link className="btn btn--solid" href={caseHref}>
            {dict.work.caseStudy}
            <span className="visually-hidden">: {t(p.title, locale)}</span>
            <span aria-hidden="true">→</span>
          </Link>
          {p.links.live && (
            <a className="ink-link" href={p.links.live} target="_blank" rel="noopener noreferrer">
              {dict.work.visit}
              <span className="visually-hidden"> ({dict.a11y.newTab})</span>
              <span className="arrow up" aria-hidden="true">
                ↗
              </span>
            </a>
          )}
          {!p.links.live && p.links.code?.[0] && (
            <a className="ink-link" href={p.links.code[0]} target="_blank" rel="noopener noreferrer">
              {dict.work.source}
              <span className="visually-hidden"> ({dict.a11y.newTab})</span>
              <span className="arrow up" aria-hidden="true">
                ↗
              </span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
