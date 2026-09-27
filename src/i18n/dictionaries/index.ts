import type { Locale } from "../config";
import { en, type DictionaryShape } from "./en";
import { es } from "./es";

export type Dictionary = DictionaryShape;

const dictionaries: Record<Locale, Dictionary> = { en, es };

/** Dictionaries are plain objects imported by Server Components only; they never reach the client bundle. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
