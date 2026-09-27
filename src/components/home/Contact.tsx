import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import { FocusLines } from "./FocusLines";
import { CopyEmail } from "./CopyEmail";
import styles from "./Contact.module.css";

export function Contact({ dict }: { dict: Dictionary }) {
  const c = dict.contact;
  const socials = [
    { name: "GitHub", ...site.github },
    { name: "X", ...site.x },
    { name: "Instagram", ...site.instagram },
  ];

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.panel}>
        <div className={styles.lines} aria-hidden="true">
          <FocusLines width={1600} height={900} cx={1280} cy={300} count={150} clear={[180, 360]} seed={404} />
        </div>
        <div className={`container ${styles.inner}`}>
          <div className={styles.meta}>
            <span className="mono">
              {dict.chapter} 04 <span aria-hidden="true">—</span> {dict.nav.contact}
            </span>
            <span className={styles.jp} aria-hidden="true" lang="ja">
              連絡
            </span>
          </div>

          <h2 id="contact-title" className={styles.title} data-reveal="lines">
            <span className="line">
              <span className="line__inner">{c.title}</span>
            </span>
          </h2>
          <p className={styles.lede} data-reveal>
            {c.lede}
          </p>

          <div className={styles.emailRow} data-reveal>
            <a className={styles.email} href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <CopyEmail email={site.email} labels={{ copy: c.copy, copied: c.copied, aria: c.copyLabel }} />
          </div>

          <div className={styles.elsewhere} data-reveal>
            <span className="mono">{c.elsewhere}</span>
            <ul role="list" className={styles.socials}>
              {socials.map((s) => (
                <li key={s.name}>
                  <a className={styles.social} href={s.url} target="_blank" rel="noopener noreferrer me">
                    <span className={styles.socialName}>{s.name}</span>
                    <span className="mono">{s.handle}</span>
                    <span className="visually-hidden"> ({dict.a11y.newTab})</span>
                    <span className={styles.socialArrow} aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
