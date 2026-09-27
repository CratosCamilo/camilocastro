import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import styles from "./Footer.module.css";

export function Footer({ dict }: { dict: Dictionary }) {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.continued}>
          <span className={styles.tsuzuku} lang="ja" aria-hidden="true">
            つづく
          </span>
          <span className="mono">{dict.footer.continued} →</span>
        </p>
        <div className={styles.meta}>
          <p className="mono">
            © {year} {dict.footer.rights}
          </p>
          <p className="mono muted">{dict.footer.colophon}</p>
          <div className={styles.links}>
            <a className="ink-link" href={site.source} target="_blank" rel="noopener noreferrer">
              {dict.footer.source}
              <span className="visually-hidden"> ({dict.a11y.newTab})</span>
              <span className="arrow up" aria-hidden="true">
                ↗
              </span>
            </a>
            <a className="ink-link" href="#main">
              {dict.a11y.backToTop}
              <span className="arrow" aria-hidden="true">
                ↑
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
