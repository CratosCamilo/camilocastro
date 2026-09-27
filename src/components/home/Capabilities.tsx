import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Chapter } from "@/components/Chapter";
import styles from "./Capabilities.module.css";

export function Capabilities({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.capabilities;
  return (
    <section id="capabilities" className={styles.section} aria-labelledby="capabilities-title">
      <div className="container">
        <Chapter
          n={2}
          label={dict.chapter}
          lines={locale === "es" ? ["Lo que", "hago"] : ["What", "I do"]}
          jp="技術"
          lede={c.lede}
          titleId="capabilities-title"
        />

        <ol role="list" className={styles.areas}>
          {c.areas.map((area, i) => (
            <li key={area.title} className={styles.area} data-reveal style={{ "--delay": `${i * 90}ms` } as CSSProperties}>
              <span className={styles.areaNo} aria-hidden="true">
                {String.fromCharCode(65 + i)}
              </span>
              <h3 className={styles.areaTitle}>{area.title}</h3>
              <p className={styles.areaBody}>{area.body}</p>
              <ul className="tags">
                {area.tags.map((tag) => (
                  <li key={tag} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className={styles.lower}>
          <div className={styles.process}>
            <h3 className={`mono ${styles.subhead}`}>{c.processTitle}</h3>
            <ol role="list" className={styles.steps}>
              {c.process.map((step, i) => (
                <li key={step.title} className={styles.step} data-reveal style={{ "--delay": `${i * 90}ms` } as CSSProperties}>
                  <span className={styles.stepNo} aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className={styles.stepTitle}>{step.title}</h4>
                    <p className={styles.stepBody}>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.toolbox}>
            <h3 className={`mono ${styles.subhead}`}>{c.toolboxTitle}</h3>
            <dl className={styles.tools} data-reveal>
              {c.toolbox.map((group) => (
                <div key={group.group} className={styles.toolGroup}>
                  <dt className="mono muted">{group.group}</dt>
                  <dd>
                    {group.items.map((item, i) => (
                      <span key={item}>
                        {item}
                        {i < group.items.length - 1 && (
                          <span className={styles.dot} aria-hidden="true">
                            {" "}
                            ·{" "}
                          </span>
                        )}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
