import { useState, useEffect } from "react";
import type { ExtractionOptions } from "../components/OptionsPanel";

const STORAGE_KEY = "whois_mail:settings";

interface Settings {
  chunkSize: number;
  batchSize: number;
  sortThreshold: number;
  maxSetSize: number;
  keywords: string[];
  removeNumeric: boolean;
  privacyNoticeShown: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  chunkSize: 262144, // 256 KB
  batchSize: 1000,
  sortThreshold: 50000,
  maxSetSize: 200000,
  keywords: [],
  removeNumeric: true,
  privacyNoticeShown: false,
};

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
