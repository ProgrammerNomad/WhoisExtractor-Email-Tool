/**
 * Language Hook
 * Manages language state, auto-detection, and persistence
 */

import { useState, useEffect, useCallback } from "react";
import { detectBrowserLanguage, DEFAULT_LANGUAGE, getLanguage } from "../i18n/languages";
import { translations, type SupportedLanguageCode } from "../i18n/translations";

const STORAGE_KEY = "whois_mail:language";

export function useLanguage() {
  const [language, setLanguageState] = useState<SupportedLanguageCode>(DEFAULT_LANGUAGE);
  const [isLoading, setIsLoading] = useState(true);

  // Load language from storage or detect browser language
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const result = await chrome.storage.local.get(STORAGE_KEY);
        const storedLanguage = result[STORAGE_KEY];

        if (storedLanguage && translations[storedLanguage as SupportedLanguageCode]) {
          // Use stored language
          setLanguageState(storedLanguage as SupportedLanguageCode);
          
          // Update document direction for RTL languages
          const lang = getLanguage(storedLanguage);
          document.documentElement.dir = lang?.rtl ? "rtl" : "ltr";
          document.documentElement.lang = storedLanguage;
        } else {
          // Auto-detect browser language
          const detected = detectBrowserLanguage();
          
          // Only use detected language if we have translations for it
          if (translations[detected as SupportedLanguageCode]) {
            setLanguageState(detected as SupportedLanguageCode);
            // Save detected language
            await chrome.storage.local.set({ [STORAGE_KEY]: detected });
            
            // Update document direction for RTL languages
            const lang = getLanguage(detected);
            document.documentElement.dir = lang?.rtl ? "rtl" : "ltr";
            document.documentElement.lang = detected;
          }
        }
      } catch (error) {
        console.error("Failed to load language:", error);
        setLanguageState(DEFAULT_LANGUAGE);
      } finally {
        setIsLoading(false);
      }
    };

    loadLanguage();
  }, []);

  // Listen for storage changes to sync language across all components
  useEffect(() => {
    const handleStorageChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: string
    ) => {
      if (areaName === "local" && changes[STORAGE_KEY]) {
        const newLanguage = changes[STORAGE_KEY].newValue as SupportedLanguageCode;
        if (newLanguage && translations[newLanguage]) {
          setLanguageState(newLanguage);
          
          // Update document direction for RTL languages
          const lang = getLanguage(newLanguage);
          document.documentElement.dir = lang?.rtl ? "rtl" : "ltr";
          document.documentElement.lang = newLanguage;
        }
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  // Change language and persist to storage
  const setLanguage = useCallback(async (newLanguage: SupportedLanguageCode) => {
    try {
      setLanguageState(newLanguage);
      await chrome.storage.local.set({ [STORAGE_KEY]: newLanguage });
      
      // Update document direction for RTL languages
      const lang = getLanguage(newLanguage);
      document.documentElement.dir = lang?.rtl ? "rtl" : "ltr";
      document.documentElement.lang = newLanguage;
    } catch (error) {
      console.error("Failed to save language:", error);
    }
  }, []);

  // Get current translations
  const t = translations[language] || translations[DEFAULT_LANGUAGE];

  // Get language info
  const currentLanguage = getLanguage(language);

  return {
    language,
    setLanguage,
    t,
    currentLanguage,
    isLoading,
  };
}

/**
 * Simple translation helper with variable interpolation
 * Usage: translate("results.count", { count: 5 })
 * Output: "5 email addresses found"
 */
export function interpolate(text: string, variables?: Record<string, string | number>): string {
  if (!variables) return text;

  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key]?.toString() || match;
  });
}
