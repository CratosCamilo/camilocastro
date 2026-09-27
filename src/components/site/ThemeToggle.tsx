"use client";

import { useSyncExternalStore, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import styles from "./Header.module.css";

type Theme = "light" | "dark";

const media = () => window.matchMedia("(prefers-color-scheme: dark)");

function readTheme(): Theme {
  const attr = document.documentElement.dataset.theme;
  if (attr === "light" || attr === "dark") return attr;
  return media().matches ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const mq = media();
  mq.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    mq.removeEventListener("change", onChange);
  };
}

/**
 * Light ↔ dark. The first visit follows the system; an explicit choice is stored.
 * Where supported, the new theme spreads like ink from the button (View Transitions).
 */
export function ThemeToggle({ labels }: { labels: { toDark: string; toLight: string } }) {
  const theme = useSyncExternalStore<Theme | null>(subscribe, readTheme, () => null);

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* storage unavailable: the choice lasts for this page view */
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof document.startViewTransition !== "function") {
      apply();
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const root = document.documentElement.style;
    root.setProperty("--vt-x", `${rect.left + rect.width / 2}px`);
    root.setProperty("--vt-y", `${rect.top + rect.height / 2}px`);
    document.startViewTransition(() => flushSync(apply));
  };

  const label = theme === "dark" ? labels.toLight : labels.toDark;

  return (
    <button
      type="button"
      className={styles.theme}
      onClick={toggle}
      aria-label={theme ? label : `${labels.toDark} / ${labels.toLight}`}
      title={theme ? label : undefined}
      data-theme-state={theme ?? "unknown"}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" className={styles.themeIcon}>
        <circle cx="12" cy="12" r="9.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 2.75a9.25 9.25 0 0 1 0 18.5z" fill="currentColor" />
      </svg>
    </button>
  );
}
