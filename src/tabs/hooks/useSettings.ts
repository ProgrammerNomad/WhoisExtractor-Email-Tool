import { useState, useEffect } from "react";
import type { ExtractionOptions } from "../components/OptionsPanel";
import { DEFAULT_SETTINGS, STORAGE_KEY, type Settings } from "~types";

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  // Load settings from chrome.storage.local
  useEffect(() => {
    chrome.storage.local.get([STORAGE_KEY], (result) => {
      if (result[STORAGE_KEY]) {
        setSettings({ ...DEFAULT_SETTINGS, ...result[STORAGE_KEY] });
      }
      setLoading(false);
    });
  }, []);

  // Save settings to chrome.storage.local
  const saveSettings = (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    chrome.storage.local.set({ [STORAGE_KEY]: updated });
  };

  // Get default extraction options from settings
  const getDefaultOptions = (): ExtractionOptions => ({
    sort: true,
    dedupe: true,
    separator: "\n",
    keywords: settings.keywords,
    keywordsEnabled: settings.keywordsEnabled, // Restore from saved settings
    groupBy: "none",
    removeNumeric: settings.removeNumeric,
    extractionType: "email",
    filterType: "exclude",
    filterStrings: [],
    lowercase: true,
    customSeparator: undefined,
    groupByCount: 50,
  });

  return {
    settings,
    saveSettings,
    getDefaultOptions,
    loading,
  };
};
