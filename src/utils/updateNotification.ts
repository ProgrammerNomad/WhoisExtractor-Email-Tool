/**
 * Update Notification Utility
 * Handles Chrome extension update detection and notification
 */

export interface UpdateData {
  updateAvailable: boolean;
  newVersion?: string;
  lastCheckTime?: number;
  userDismissed?: boolean;
}

const STORAGE_KEY = 'whois_mail:updateData';

/**
 * Get stored update data from local storage
 */
export async function getUpdateData(): Promise<UpdateData> {
  try {
    const result = await chrome.storage.local.get(STORAGE_KEY);
    return result[STORAGE_KEY] || {
      updateAvailable: false,
      userDismissed: false
    };
  } catch (error) {
    console.error('Error getting update data:', error);
    return {
      updateAvailable: false,
      userDismissed: false
    };
  }
}

/**
 * Save update data to local storage
 */
export async function saveUpdateData(data: UpdateData): Promise<void> {
  try {
    await chrome.storage.local.set({ [STORAGE_KEY]: data });
  } catch (error) {
    console.error('Error saving update data:', error);
  }
}

/**
 * Mark that an update is available
 */
export async function markUpdateAvailable(version: string): Promise<void> {
  await saveUpdateData({
    updateAvailable: true,
    newVersion: version,
    lastCheckTime: Date.now(),
    userDismissed: false
  });
}

/**
 * Mark that user dismissed the update notification
 */
export async function dismissUpdate(): Promise<void> {
  const data = await getUpdateData();
  await saveUpdateData({
    ...data,
    userDismissed: true
  });
}

/**
 * Check if update notification should be shown
 * Returns true if update is available and user hasn't dismissed it
 */
export async function shouldShowUpdateNotification(): Promise<boolean> {
  const data = await getUpdateData();
  return data.updateAvailable && !data.userDismissed;
}

/**
 * Reload extension to apply update
 */
export function reloadExtension(): void {
  chrome.runtime.reload();
}

/**
 * Clear update data (used after update is applied)
 */
export async function clearUpdateData(): Promise<void> {
  await saveUpdateData({
    updateAvailable: false,
    userDismissed: false
  });
}

/**
 * Manually check for updates (use sparingly - Chrome auto-checks every few hours)
 * This should only be called in specific scenarios (e.g., user manually clicks "Check for Updates")
 */
export async function manualUpdateCheck(): Promise<{ status: string; version?: string }> {
  try {
    const result = await chrome.runtime.requestUpdateCheck();
    
    if (result.status === 'update_available' && result.version) {
      await markUpdateAvailable(result.version);
      return { status: 'update_available', version: result.version };
    }
    
    return { status: result.status };
  } catch (error) {
    console.error('Error checking for updates:', error);
    return { status: 'error' };
  }
}
