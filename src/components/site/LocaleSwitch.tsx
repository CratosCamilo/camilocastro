"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, localeLabel, locales, type Locale } from "@/i18n/config";
import styles from "./Header.module.css";

/** Persist an explicit language choice so the root URL redirects to it next time. */
function rememberLocale(next: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
}

/** EN / ES. Keeps the current path and scroll position, and remembers the choice for `/`. */
export function LocaleSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(en|es)(?=\/|$)/, "");

  return (
    <nav aria-label={label} className={styles.locales}>
      {locales.map((l, i) => (
        <span key={l} className={styles.localeItem}>
          {i > 0 && (
            <span className={styles.localeSep} aria-hidden="true">
              /
            </span>
          )}
          <Link
            href={`/${l}${rest}`}
            hrefLang={l}
            lang={l}
            scroll={false}
            className={styles.locale}
            aria-current={l === locale ? "true" : undefined}
            onClick={() => rememberLocale(l)}
          >
            <abbr title={localeLabel[l].long}>{localeLabel[l].short}</abbr>
          </Link>
        </span>
      ))}
    </nav>
  );
}
