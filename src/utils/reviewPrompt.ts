/**
 * Review Prompt System
 * Smart prompts to request user reviews after usage
 */

export interface ReviewPromptData {
  installDate: number;
  lastPromptDate: number | null;
  extractionCount: number; // Number of extraction sessions
  totalEmailsExtracted: number; // Lifetime total of all emails extracted
  hasReviewed: boolean;
  dontAskAgain: boolean;
  promptCount: number;
}

const STORAGE_KEY = "whois_mail:reviewPrompt";

// Configuration
const CONFIG = {
  MIN_DAYS_BEFORE_PROMPT: 2, // Wait 2 days after install
  MIN_EXTRACTIONS: 3, // Wait for at least 3 successful extractions
  DAYS_BETWEEN_PROMPTS: 7, // Wait 7 days between prompts if user declines
  MAX_PROMPTS: 3, // Maximum number of times to prompt
};

/**
 * Get review prompt data from storage
 */
export async function getReviewPromptData(): Promise<ReviewPromptData> {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  const data = result[STORAGE_KEY];

  if (!data) {
    // First time - initialize
    const initialData: ReviewPromptData = {
      installDate: Date.now(),
      lastPromptDate: null,
      extractionCount: 0,
      totalEmailsExtracted: 0,
      hasReviewed: false,
      dontAskAgain: false,
      promptCount: 0,
    };
    await chrome.storage.local.set({ [STORAGE_KEY]: initialData });
    return initialData;
  }

  return data;
}

/**
 * Update review prompt data
 */
export async function updateReviewPromptData(
  updates: Partial<ReviewPromptData>
): Promise<void> {
  const current = await getReviewPromptData();
  const updated = { ...current, ...updates };
  await chrome.storage.local.set({ [STORAGE_KEY]: updated });
}

/**
 * Record a successful extraction
 * @param emailCount - Number of emails extracted in this session
 */
export async function recordExtraction(emailCount: number = 0): Promise<void> {
  const data = await getReviewPromptData();
  await updateReviewPromptData({
    extractionCount: data.extractionCount + 1,
    totalEmailsExtracted: data.totalEmailsExtracted + emailCount,
  });
}

/**
 * Get total emails extracted across all sessions
 */
export async function getTotalEmailsExtracted(): Promise<number> {
  const data = await getReviewPromptData();
  return data.totalEmailsExtracted;
}

/**
 * Check if we should show the review prompt
 */
export async function shouldShowReviewPrompt(): Promise<boolean> {
  const data = await getReviewPromptData();

  // Don't show if user has reviewed or opted out
  if (data.hasReviewed || data.dontAskAgain) {
    return false;
  }

  // Don't show if we've reached max prompts
  if (data.promptCount >= CONFIG.MAX_PROMPTS) {
    return false;
  }

  // Check minimum days since install
  const daysSinceInstall =
    (Date.now() - data.installDate) / (1000 * 60 * 60 * 24);
  if (daysSinceInstall < CONFIG.MIN_DAYS_BEFORE_PROMPT) {
    return false;
  }

  // Check minimum extractions
  if (data.extractionCount < CONFIG.MIN_EXTRACTIONS) {
    return false;
  }

  // Check if enough time passed since last prompt
  if (data.lastPromptDate !== null) {
    const daysSinceLastPrompt =
      (Date.now() - data.lastPromptDate) / (1000 * 60 * 60 * 24);
    if (daysSinceLastPrompt < CONFIG.DAYS_BETWEEN_PROMPTS) {
      return false;
    }
  }

  return true;
}

/**
 * Mark that the prompt was shown
 */
export async function markPromptShown(): Promise<void> {
  const data = await getReviewPromptData();
  await updateReviewPromptData({
    lastPromptDate: Date.now(),
    promptCount: data.promptCount + 1,
  });
}

/**
 * Mark that user has reviewed
 */
export async function markAsReviewed(): Promise<void> {
  await updateReviewPromptData({
    hasReviewed: true,
  });
}

/**
 * Mark that user doesn't want to be asked again
 */
export async function markDontAskAgain(): Promise<void> {
  await updateReviewPromptData({
    dontAskAgain: true,
  });
}

/**
 * Open Chrome Web Store review page
 */
export function openReviewPage(): void {
  const reviewUrl =
    "https://chromewebstore.google.com/detail/whoisextractor-email-tool/hlkfbiaphhmngdlcfgfagfjicbadomnj/reviews";
  chrome.tabs.create({ url: reviewUrl });
}

/**
 * Get days since install (for display)
 */
export async function getDaysSinceInstall(): Promise<number> {
  const data = await getReviewPromptData();
  return Math.floor((Date.now() - data.installDate) / (1000 * 60 * 60 * 24));
}

/**
 * Reset review prompt data (for testing)
 */
export async function resetReviewPromptData(): Promise<void> {
  await chrome.storage.local.remove(STORAGE_KEY);
}
