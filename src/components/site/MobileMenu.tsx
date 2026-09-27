"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { NavItem } from "./NavLinks";
import styles from "./Header.module.css";

type Labels = { open: string; close: string; nav: string };

/** Small-screen navigation: a full-height panel with the chapters set large. */
export function MobileMenu({ locale, items, labels }: { locale: Locale; items: NavItem[]; labels: Labels }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);

  // Close when the route changes (e.g. switching language from inside the menu).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusables = Array.from(panelRef.current.querySelectorAll<HTMLElement>("a[href], button"));
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault();
        lastEl?.focus();
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault();
        firstEl?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={styles.menuButton}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.menuText}>{open ? labels.close : labels.open}</span>
        <span className={styles.menuIcon} data-open={open || undefined} aria-hidden="true">
          <span />
          <span />
        </span>
      </button>
      <div
        ref={panelRef}
        id={panelId}
        className={styles.menuPanel}
        data-open={open || undefined}
        role="dialog"
        aria-modal="true"
        aria-label={labels.nav}
        hidden={!open}
      >
        <nav aria-label={labels.nav}>
          <ol role="list" className={styles.menuList}>
            {items.map((item, i) => (
              <li key={item.id} style={{ ["--i" as string]: i }}>
                <Link href={`/${locale}#${item.id}`} className={styles.menuLink} onClick={() => setOpen(false)}>
                  <span className={styles.menuNo} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <p className={styles.menuSeal} aria-hidden="true" lang="ja">
          戦え
        </p>
      </div>
    </>
  );
}
