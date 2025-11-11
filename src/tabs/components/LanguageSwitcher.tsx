/**
 * Language Switcher Component
 * Dropdown to select language
 */

import React, { useState, useRef, useEffect } from "react";
import { SUPPORTED_LANGUAGES } from "../i18n/languages";
import { useLanguage } from "../hooks/useLanguage";
import type { SupportedLanguageCode } from "../i18n/translations";

export function LanguageSwitcher() {
  const { language, setLanguage, currentLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = (code: string) => {
    setLanguage(code as SupportedLanguageCode);
    setIsOpen(false);
  };

  // Show all available languages
  const availableLanguages = SUPPORTED_LANGUAGES;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20 transition-colors text-white"
        title="Change Language"
      >
        <span className="text-lg">{currentLanguage?.flag || "🌐"}</span>
        <span className="hidden sm:inline text-sm font-medium">
          {currentLanguage?.nativeName || "Language"}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white dark:bg-bg-secondary border border-border-gray dark:border-gray-700 overflow-hidden z-50">
          <div className="py-1">
            {availableLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  language === lang.code
                    ? "bg-brand-light dark:bg-brand-dark/20 text-brand-blue dark:text-brand-blue"
                    : "text-text-primary dark:text-white"
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <div className="flex-1">
                  <div className="font-medium">{lang.nativeName}</div>
                  <div className="text-xs text-text-muted dark:text-gray-400">
                    {lang.name}
                  </div>
                </div>
                {language === lang.code && (
                  <svg
                    className="w-5 h-5 text-brand-blue"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
