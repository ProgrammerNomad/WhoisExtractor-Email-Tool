/**
 * Supported Languages Configuration
 * Top 10 languages by total speakers worldwide
 */

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean; // Right-to-left text direction
}

export const SUPPORTED_LANGUAGES: Language[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
  },
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    flag: "🇨🇳",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    flag: "🇮🇳",
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
    rtl: true,
  },
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇵🇹",
  },
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    flag: "🇷🇺",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
  },
];

export const DEFAULT_LANGUAGE = "en";

/**
 * Get language by code
 */
export function getLanguage(code: string): Language | undefined {
  return SUPPORTED_LANGUAGES.find((lang) => lang.code === code);
}

/**
 * Detect browser language
 * Falls back to English if not supported
 */
export function detectBrowserLanguage(): string {
  // Get browser language (e.g., "en-US", "hi-IN")
  const browserLang = navigator.language || (navigator as any).userLanguage;
  
  // Extract primary language code (e.g., "en" from "en-US")
  const primaryLang = browserLang.split("-")[0].toLowerCase();
  
  // Check if supported
  const isSupported = SUPPORTED_LANGUAGES.some(
    (lang) => lang.code === primaryLang
  );
  
  return isSupported ? primaryLang : DEFAULT_LANGUAGE;
}
