import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { archive } from "@/content/projects";
import { Chapter } from "@/components/Chapter";
import { t } from "@/lib/i18n";
import styles from "./Archive.module.css";

export function Archive({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const a = dict.archive;
  return (
    <section className={styles.section} aria-labelledby="archive-title">
      <div className="container">
        <Chapter label={a.label} variant="sub" lines={[a.title]} lede={a.lede} titleId="archive-title" />
        <details className={styles.details}>
          <summary className={`btn ${styles.summary}`}>
            {a.toggle} <span className="mono">({archive.length})</span>
            <span className={styles.chevron} aria-hidden="true">
              ↓
            </span>
          </summary>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col" className="mono">{a.year}</th>
                <th scope="col" className="mono">{a.project}</th>
                <th scope="col" className="mono">{a.what}</th>
                <th scope="col" className="mono">{a.tech}</th>
                <th scope="col" className="mono">{a.link}</th>
              </tr>
            </thead>
            <tbody>
              {archive.map((item) => (
                <tr key={item.name}>
                  <td className={`mono ${styles.year}`}>{item.year}</td>
                  <th scope="row" className={styles.name}>
                    {item.name}
                  </th>
                  <td className={styles.what}>{t(item.what, locale)}</td>
                  <td className={styles.tech}>
                    <ul className="tags">
                      {item.tech.map((x) => (
                        <li key={x} className="tag">
                          {x}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className={styles.link} data-empty={item.link ? undefined : ""}>
                    {item.link ? (
                      <a className="ink-link" href={item.link.href} target="_blank" rel="noopener noreferrer">
                        {item.link.label}
                        <span className="visually-hidden">: {item.name} ({dict.a11y.newTab})</span>
                        <span className="arrow up" aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    ) : (
                      <>
                        <span className="mono muted" aria-hidden="true">
                          —
                        </span>
                        <span className="visually-hidden">{dict.work.private}</span>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </div>
    </section>
  );
}
