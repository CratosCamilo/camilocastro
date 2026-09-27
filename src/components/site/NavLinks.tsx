"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import styles from "./Header.module.css";

export type NavItem = { id: string; label: string };

/** Primary navigation with a scroll-spy: the chapter you are reading is marked current. */
export function NavLinks({ locale, items, label }: { locale: Locale; items: NavItem[]; label: string }) {
  const pathname = usePathname();
  const onHome = pathname === `/${locale}`;
  const [spied, setSpied] = useState<string | null>(null);

  useEffect(() => {
    if (!onHome) return;
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setSpied(hit.target.id);
        else if (window.scrollY < window.innerHeight * 0.5) setSpied(null);
      },
      { rootMargin: "-42% 0px -52% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onHome, items]);

  const current = onHome ? spied : pathname.startsWith(`/${locale}/work/`) ? "work" : null;

  return (
    <nav aria-label={label} className={styles.nav}>
      <ol role="list" className={styles.navList}>
        {items.map((item, i) => (
          <li key={item.id}>
            <Link
              href={`/${locale}#${item.id}`}
              className={styles.navLink}
              aria-current={current === item.id ? "true" : undefined}
            >
              <span className={styles.navNo} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={styles.navLabel}>{item.label}</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
