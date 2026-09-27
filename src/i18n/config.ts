export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const hasLocale = (value: string | undefined): value is Locale =>
  !!value && (locales as readonly string[]).includes(value);

/** Open Graph locale codes. Spanish content is written for a Colombian/LatAm reader. */
export const ogLocale: Record<Locale, string> = { en: "en_US", es: "es_CO" };

export const localeLabel: Record<Locale, { short: string; long: string }> = {
  en: { short: "EN", long: "English" },
  es: { short: "ES", long: "Español" },
};

/** Cookie that remembers an explicit language choice so `/` redirects to it. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** A string written in both languages. */
export type Localized = Record<Locale, string>;
