/**
 * Chrome storage utilities for settings persistence
 * Wraps chrome.storage.local with type-safe methods
 */

import { DEFAULT_SETTINGS, STORAGE_KEY } from "~types";
import type { Settings } from "~types";

/**
 * Get settings from chrome.storage.local
 * @returns Settings object with defaults merged
 */
export async function getSettings(): Promise<Settings> {
  try {
    const result = await chrome.storage.local.get(STORAGE_KEY);
    const stored = result[STORAGE_KEY] as Partial<Settings> | undefined;

    // Merge with defaults to ensure all fields exist
    return {
      ...DEFAULT_SETTINGS,
      ...stored,
    };
  } catch (error) {
    console.error("Error getting settings:", error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Save settings to chrome.storage.local
 * @param settings - Settings object to save
 */
export async function saveSettings(settings: Settings): Promise<void> {
  try {
    await chrome.storage.local.set({ [STORAGE_KEY]: settings });
  } catch (error) {
    console.error("Error saving settings:", error);
    throw error;
  }
}

/**
 * Update partial settings (merges with existing)
 * @param partialSettings - Partial settings to update
 */
export async function updateSettings(
  partialSettings: Partial<Settings>
): Promise<Settings> {
  try {
    const current = await getSettings();
    const updated = { ...current, ...partialSettings };
    await saveSettings(updated);
    return updated;
  } catch (error) {
    console.error("Error updating settings:", error);
    throw error;
  }
}

/**
 * Reset settings to defaults
 */
export async function resetSettings(): Promise<Settings> {
  try {
    await saveSettings(DEFAULT_SETTINGS);
    return DEFAULT_SETTINGS;
  } catch (error) {
    console.error("Error resetting settings:", error);
    throw error;
  }
}

/**
 * Get a specific setting value
 * @param key - Settings key
 * @returns Value of the setting
 */
export async function getSetting<K extends keyof Settings>(
  key: K
): Promise<Settings[K]> {
  const settings = await getSettings();
  return settings[key];
}

/**
 * Set a specific setting value
 * @param key - Settings key
 * @param value - Value to set
 */
export async function setSetting<K extends keyof Settings>(
  key: K,
  value: Settings[K]
): Promise<void> {
  await updateSettings({ [key]: value } as Partial<Settings>);
}

/**
 * Check if privacy notice has been shown
 * @returns True if privacy notice was shown
 */
export async function hasPrivacyNoticeBeenShown(): Promise<boolean> {
  const shown = await getSetting("privacyNoticeShown");
  return shown;
}

/**
 * Mark privacy notice as shown
 */
export async function markPrivacyNoticeShown(): Promise<void> {
  await setSetting("privacyNoticeShown", true);
}

/**
 * Listen for settings changes
 * @param callback - Callback function when settings change
 * @returns Cleanup function to remove listener
 */
export function onSettingsChange(
  callback: (newSettings: Settings) => void
): () => void {
  const listener = (
    changes: { [key: string]: chrome.storage.StorageChange },
    areaName: string
  ) => {
    if (areaName === "local" && changes[STORAGE_KEY]) {
      const newValue = changes[STORAGE_KEY].newValue as Settings;
      callback(newValue);
    }
  };

  chrome.storage.onChanged.addListener(listener);

  // Return cleanup function
  return () => {
    chrome.storage.onChanged.removeListener(listener);
  };
}

/**
 * Clear all storage data (use with caution)
 */
export async function clearAllData(): Promise<void> {
  try {
    await chrome.storage.local.clear();
  } catch (error) {
    console.error("Error clearing storage:", error);
    throw error;
  }
}
