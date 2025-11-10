/**
 * Email deduplication utilities
 * Handles case-insensitive deduplication and sorting with memory safety
 */

/**
 * Deduplicate emails array (case-insensitive)
 * @param emails - Array of emails
 * @returns Deduplicated array of emails
 */
export function deduplicateEmails(emails: string[]): string[] {
  const seen = new Set<string>();
  const unique: string[] = [];

  for (const email of emails) {
    const normalized = email.toLowerCase();
    if (!seen.has(normalized)) {
      seen.add(normalized);
      unique.push(email);
    }
  }

  return unique;
}

/**
 * Merge two arrays of emails and deduplicate
 * @param existing - Existing emails array
 * @param newEmails - New emails to merge
 * @returns Merged and deduplicated array
 */
export function mergeAndDedupe(
  existing: string[],
  newEmails: string[]
): string[] {
  const combined = [...existing, ...newEmails];
  return deduplicateEmails(combined);
}

/**
 * Sort emails alphabetically (case-insensitive)
 * Only use for arrays ≤ sortThreshold (default 50,000)
 * @param emails - Array of emails to sort
 * @returns Sorted array
 */
export function sortEmails(emails: string[]): string[] {
  return [...emails].sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );
}

/**
 * Check if sorting is safe based on email count
 * @param count - Number of emails
 * @param threshold - Maximum safe count (default 50,000)
 * @returns True if safe to sort
 */
export function isSortingSafe(count: number, threshold: number = 50000): boolean {
  return count <= threshold;
}

/**
 * Group and sort emails by domain
 * @param emails - Array of emails
 * @returns Sorted emails grouped by domain
 */
export function sortByDomain(emails: string[]): string[] {
  return [...emails].sort((a, b) => {
    const domainA = a.split("@")[1] || "";
    const domainB = b.split("@")[1] || "";

    // Compare domains first
    const domainCompare = domainA.localeCompare(domainB);
    if (domainCompare !== 0) {
      return domainCompare;
    }

    // If domains are equal, compare full emails
    return a.localeCompare(b);
  });
}

/**
 * Remove numeric-only emails (e.g., 123@domain.com)
 * @param emails - Array of emails
 * @returns Filtered array without numeric emails
 */
export function removeNumericEmails(emails: string[]): string[] {
  return emails.filter((email) => {
    const username = email.split("@")[0];
    return !/^\d+$/.test(username);
  });
}

/**
 * Create a deduplication Set from an array of emails
 * @param emails - Array of emails
 * @returns Set of lowercase emails
 */
export function createEmailSet(emails: string[]): Set<string> {
  const set = new Set<string>();
  emails.forEach((email) => set.add(email.toLowerCase()));
  return set;
}

/**
 * Check if memory usage is safe for current Set size
 * @param setSize - Current Set size
 * @param maxSize - Maximum safe size (default 200,000)
 * @returns True if memory usage is safe
 */
export function isMemorySafe(setSize: number, maxSize: number = 200000): boolean {
  return setSize <= maxSize;
}
