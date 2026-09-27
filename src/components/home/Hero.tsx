import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";
import { Seal } from "@/components/Seal";
import prologue from "@/content/art/prologue.webp";
import { FocusLines } from "./FocusLines";
import { HeroParallax } from "./HeroParallax";
import styles from "./Hero.module.css";

/**
 * The cover is one manga page: the art panel on top, the name below, split by a
 * slanted gutter with the 戦え seal stamped across the join.
 */
export function Hero({ dict }: { dict: Dictionary }) {
  const h = dict.hero;
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.lines} aria-hidden="true">
        <FocusLines className={styles.linesWide} width={1600} height={1000} cx={1400} cy={470} />
        <FocusLines className={styles.linesNarrow} width={800} height={1400} cx={690} cy={430} count={120} clear={[130, 260]} seed={77} />
      </div>
      <div className={`tone ${styles.tone}`} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <p className="mono">
            {h.role} <span aria-hidden="true">—</span> {h.place}
          </p>
          <p className={`mono ${styles.vol}`} aria-hidden="true">
            Vol. 01 — 2026
          </p>
        </div>

        <div className={styles.page}>
          <div className={styles.art} aria-hidden="true">
            <div className={styles.artInner}>
              <Image
                src={prologue}
                alt=""
                className={styles.artImg}
                placeholder="blur"
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 1480px) 94vw, 1392px"
              />
            </div>
            <span className={`mono ${styles.caption}`}>{h.prologue}</span>
          </div>

          <h1 id="hero-title" className={styles.name}>
            <span className="line">
              <span className={`line__inner ${styles.l1}`}>{h.line1}</span>
            </span>{" "}
            <span className="line">
              <span className={`line__inner ${styles.l2}`}>{h.line2}</span>
            </span>
          </h1>

          <div className={styles.sealWrap}>
            <Seal className={styles.seal} />
            <span className="visually-hidden">{h.mottoLabel}</span>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.lede}>{h.lede}</p>
          <dl className={styles.facts}>
            {h.facts.map((f) => (
              <div key={f.term} className={styles.fact}>
                <dt className="mono muted">{f.term}</dt>
                <dd>{f.detail}</dd>
              </div>
            ))}
          </dl>
          <div className={styles.ctas}>
            <a className="btn btn--solid" href="#work">
              {h.ctaWork}
              <span aria-hidden="true">↓</span>
            </a>
            <a className="ink-link" href="#contact">
              {h.ctaContact}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
      <HeroParallax targetId="top" />
    </section>
  );
}
