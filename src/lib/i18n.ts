import type { Locale, Localized } from "@/i18n/config";

/** Pick the string for the active locale. */
export const t = (value: Localized, locale: Locale): string => value[locale];

/** Build a locale-prefixed path: href("es", "/work/kiln") → "/es/work/kiln". */
export const href = (locale: Locale, path = ""): string => `/${locale}${path === "/" ? "" : path}`;

/** Two-digit index used for chapters and cases: 1 → "01". */
export const pad = (n: number): string => String(n).padStart(2, "0");
