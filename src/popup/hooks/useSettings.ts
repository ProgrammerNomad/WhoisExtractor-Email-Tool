import { useState, useEffect } from "react";
import { getSettings, updateSettings, onSettingsChange } from "~utils/storage";
import type { Settings } from "~types";

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  // Listen for settings changes
  useEffect(() => {
    const cleanup = onSettingsChange((newSettings) => {
      setSettings(newSettings);
    });

    return cleanup;
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const loaded = await getSettings();
      setSettings(loaded);
      setError(null);
    } catch (err) {
      console.error("Failed to load settings:", err);
      setError(err instanceof Error ? err.message : "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async <K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => {
    try {
      const updated = await updateSettings({ [key]: value } as Partial<Settings>);
      setSettings(updated);
      setError(null);
    } catch (err) {
      console.error("Failed to update setting:", err);
      setError(err instanceof Error ? err.message : "Failed to update setting");
      throw err;
    }
  };

  const saveSettings = async (newSettings: Partial<Settings>) => {
    try {
      const updated = await updateSettings(newSettings);
      setSettings(updated);
      setError(null);
    } catch (err) {
      console.error("Failed to save settings:", err);
      setError(err instanceof Error ? err.message : "Failed to save settings");
      throw err;
    }
  };

  return {
    settings,
    loading,
    error,
    updateSetting,
    saveSettings,
    reload: loadSettings,
  };
}
