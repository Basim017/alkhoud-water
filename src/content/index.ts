import { ar } from "./ar";
import { en, type Dictionary } from "./en";
import type { Locale } from "./shared";

export * from "./shared";
export type { Dictionary };

const dictionaries = { en, ar } as const;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
