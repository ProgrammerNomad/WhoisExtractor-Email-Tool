/**
 * Email extraction regex patterns and utilities
 * Uses incremental .exec() scanning to avoid loading entire input into memory
 */

// Email regex pattern - adjust strictness as needed
// Matches: username@domain.tld
export const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

/**
 * Extract emails from a text chunk using incremental regex scanning
 * @param chunk - Text chunk to scan
 * @param seen - Set of already seen emails (for deduplication)
 * @returns Array of new unique emails found in this chunk
 */
export function extractEmails(chunk: string, seen: Set<string>): string[] {
  const newEmails: string[] = [];
  let match: RegExpExecArray | null;

  // Reset regex lastIndex to ensure fresh scan
  EMAIL_REGEX.lastIndex = 0;

  // Use .exec() in a loop for incremental scanning
  while ((match = EMAIL_REGEX.exec(chunk)) !== null) {
    const email = match[0].toLowerCase();

    // Deduplicate: only add if not seen before
    if (!seen.has(email)) {
      seen.add(email);
      newEmails.push(email);
    }
  }

  return newEmails;
}

/**
 * Validate if a string is a valid email format
 * @param email - Email string to validate
 * @returns True if valid email format
 */
export function isValidEmail(email: string): boolean {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

/**
 * Check if email is purely numeric (e.g., 123@456.com)
 * @param email - Email to check
 * @returns True if username is purely numeric
 */
export function isNumericEmail(email: string): boolean {
  const username = email.split("@")[0];
  return /^\d+$/.test(username);
}

/**
 * Filter emails by keyword list
 * @param emails - Array of emails to filter
 * @param keywords - Keywords to match (case-insensitive)
 * @returns Filtered emails containing at least one keyword
 */
export function filterByKeywords(
  emails: string[],
  keywords: string[]
): string[] {
  if (!keywords || keywords.length === 0) {
    return emails;
  }

  const lowerKeywords = keywords.map((k) => k.toLowerCase());

  return emails.filter((email) => {
    const lowerEmail = email.toLowerCase();
    return lowerKeywords.some((keyword) => lowerEmail.includes(keyword));
  });
}

/**
 * Group emails by domain
 * @param emails - Array of emails
 * @returns Map of domain to emails array
 */
export function groupByDomain(emails: string[]): Map<string, string[]> {
  const grouped = new Map<string, string[]>();

  emails.forEach((email) => {
    const domain = email.split("@")[1] || "unknown";
    if (!grouped.has(domain)) {
      grouped.set(domain, []);
    }
    grouped.get(domain)!.push(email);
  });

  return grouped;
}
