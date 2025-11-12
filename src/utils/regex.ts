/**
 * Email extraction regex patterns and utilities
 * Uses incremental .exec() scanning to avoid loading entire input into memory
 */

import type { ExtractionOptions } from "../types";

// Improved email regex with word boundaries to avoid invalid prefixes
export const EMAIL_REGEX = /\b[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9][a-zA-Z0-9.-]*\.[a-zA-Z]{2,}\b/g;

/**
 * Extract and clean an individual email
 * @param rawEmail - Raw email match from regex
 * @returns Cleaned email string
 */
function cleanEmail(rawEmail: string): string {
  // Clean up trailing dots or hyphens
  return rawEmail.replace(/[.-]+$/, '').toLowerCase();
}

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
    const email = cleanEmail(match[0]);

    // Deduplicate: only add if not seen before
    if (!seen.has(email)) {
      seen.add(email);
      newEmails.push(email);
    }
  }

  return newEmails;
}

/**
 * Apply all extraction options to a list of emails
 * @param emails - Raw extracted emails
 * @param options - Extraction options to apply
 * @returns Processed emails array
 */
export function applyOptions(emails: string[], options: ExtractionOptions): string[] {
  let processed = [...emails];

  // Apply keyword filter (exclude mode)
  if (options.keywordsEnabled && options.keywords.length > 0) {
    processed = processed.filter(email => {
      const lowerEmail = email.toLowerCase();
      const [localPart, domainPart] = lowerEmail.split('@');
      
      return !options.keywords.some(keyword => {
        const lowerKeyword = keyword.toLowerCase().trim();
        
        // Skip empty keywords
        if (!lowerKeyword) return false;
        
        // Pattern 1: Keyword ends with @ (e.g., "admin@", "support@")
        // Match if email starts with this pattern
        if (lowerKeyword.endsWith('@')) {
          const prefix = lowerKeyword.slice(0, -1);
          return localPart === prefix || localPart.startsWith(prefix + '+');
        }
        
        // Pattern 2: Keyword starts with @ (e.g., "@contact", "@gmail")
        // Match if keyword appears in domain or local part
        if (lowerKeyword.startsWith('@')) {
          const suffix = lowerKeyword.slice(1);
          return domainPart.includes(suffix) || localPart.includes(suffix);
        }
        
        // Pattern 3: Domain-only keyword (e.g., "qq.com", "yahoo.com")
        // Match if it's the exact domain or subdomain
        if (lowerKeyword.includes('.')) {
          return domainPart === lowerKeyword || domainPart.endsWith('.' + lowerKeyword);
        }
        
        // Pattern 4: Generic keyword (e.g., "admin", "support", "webmaster")
        // Match if found in local part OR domain
        return localPart.includes(lowerKeyword) || domainPart.includes(lowerKeyword);
      });
    });
  }

  // Apply string filter (include or exclude)
  if (options.filterStrings.length > 0) {
    if (options.filterType === "include") {
      processed = processed.filter(email => 
        options.filterStrings.some(str => 
          email.toLowerCase().includes(str.toLowerCase())
        )
      );
    } else {
      processed = processed.filter(email => 
        !options.filterStrings.some(str => 
          email.toLowerCase().includes(str.toLowerCase())
        )
      );
    }
  }

  // Apply lowercase conversion (already done in extraction, but ensure consistency)
  if (options.lowercase) {
    processed = processed.map(email => email.toLowerCase());
  }

  // Apply numeric domain removal
  if (options.removeNumeric) {
    processed = processed.filter(email => {
      const domain = email.split('@')[1];
      return domain && !/^\d+\.\d+\.\d+\.\d+$/.test(domain);
    });
  }

  // Apply deduplication (already done during extraction, but ensure)
  if (options.dedupe) {
    processed = [...new Set(processed)];
  }

  // Apply sorting (only if reasonable count)
  if (options.sort && processed.length <= 50000) {
    processed.sort();
  }

  return processed;
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

