/**
 * Translation Index
 * Import and export all language translations
 */

import { en } from "./en";
import { hi } from "./hi";
import { es } from "./es";
import { zh } from "./zh";
import { fr } from "./fr";
import { ar } from "./ar";
import { pt } from "./pt";
import { ru } from "./ru";
import { ja } from "./ja";
import { de } from "./de";

export const translations = {
  en,
  hi,
  es,
  zh,
  fr,
  ar,
  pt,
  ru,
  ja,
  de,
};

export type SupportedLanguageCode = keyof typeof translations;
