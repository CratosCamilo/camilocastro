import Link from "next/link";
import { Seal } from "@/components/Seal";
import styles from "./not-found.module.css";

/*
 * Rendered inside the [lang] layout. The locale isn't passed to not-found files,
 * so the page speaks both languages at once — which suits a blank panel.
 */
export default function NotFound() {
  return (
    <section className={`container ${styles.wrap}`} aria-labelledby="nf-title">
      <div className={`${styles.panel} tone`}>
        <Seal glyphs={["白"]} className={styles.seal} />
      </div>
      <div className={styles.text}>
        <p className="mono muted">404</p>
        <h1 id="nf-title" className={styles.title}>
          <span lang="en">This panel was left blank.</span>
          <span lang="es" className={styles.alt}>
            Esta viñeta quedó en blanco.
          </span>
        </h1>
        <p className={styles.body}>
          <span lang="en">The page you’re looking for doesn’t exist or has moved.</span>{" "}
          <span lang="es">La página que buscas no existe o cambió de lugar.</span>
        </p>
        <div className={styles.links}>
          <Link className="btn btn--solid" href="/en" hrefLang="en" lang="en">
            Back to the start
          </Link>
          <Link className="btn" href="/es" hrefLang="es" lang="es">
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
