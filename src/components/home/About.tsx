import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { Chapter } from "@/components/Chapter";
import { Seal } from "@/components/Seal";
import styles from "./About.module.css";

export function About({ dict }: { dict: Dictionary }) {
  const a = dict.about;
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className="container">
        <Chapter n={3} label={dict.chapter} lines={[a.title]} jp="経歴" titleId="about-title" />

        <div className={styles.grid}>
          <div className={styles.side}>
            <p className={styles.pull} data-reveal>
              {a.pull}
            </p>
            <figure className={styles.motto} data-reveal>
              <Seal className={styles.seal} />
              <figcaption className={styles.mottoText}>
                <span className={styles.mottoWord} lang="ja">
                  {a.motto.word}
                </span>
                <span className="mono">{a.motto.reading}</span>
                <span className={styles.mottoNote}>{a.motto.note}</span>
              </figcaption>
            </figure>
          </div>

          <div className={styles.main}>
            {a.paragraphs.map((p, i) => (
              <p
                key={i}
                className={i === 0 ? styles.first : styles.paragraph}
                data-reveal
                style={{ "--delay": `${i * 60}ms` } as CSSProperties}
              >
                {p}
              </p>
            ))}
            <dl className={styles.facts} data-reveal>
              {a.facts.map((f) => (
                <div key={f.term} className={styles.fact}>
                  <dt className="mono muted">{f.term}</dt>
                  <dd>{f.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
