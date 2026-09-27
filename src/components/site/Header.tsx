import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { href } from "@/lib/i18n";
import { LocaleSwitch } from "./LocaleSwitch";
import { MobileMenu } from "./MobileMenu";
import { NavLinks, type NavItem } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.css";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const items: NavItem[] = [
    { id: "work", label: dict.nav.work },
    { id: "capabilities", label: dict.nav.capabilities },
    { id: "about", label: dict.nav.about },
    { id: "contact", label: dict.nav.contact },
  ];

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href={href(locale)} className={styles.brand} aria-label={dict.a11y.home}>
          <span className={styles.mark} aria-hidden="true" lang="ja">
            戦
          </span>
          <span className={styles.name}>Camilo Castro</span>
        </Link>
        <NavLinks locale={locale} items={items} label={dict.a11y.primaryNav} />
        <div className={styles.controls}>
          <LocaleSwitch locale={locale} label={dict.a11y.language} />
          <ThemeToggle labels={{ toDark: dict.a11y.toDark, toLight: dict.a11y.toLight }} />
          <MobileMenu
            locale={locale}
            items={items}
            labels={{ open: dict.a11y.menu, close: dict.a11y.closeMenu, nav: dict.a11y.primaryNav }}
          />
        </div>
      </div>
      <span className={styles.progress} aria-hidden="true" />
    </header>
  );
}
