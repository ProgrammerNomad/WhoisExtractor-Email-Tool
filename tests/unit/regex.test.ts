/**
 * Unit tests for email regex extraction
 */

import { extractEmails } from "../../src/utils/regex";

describe("Email Regex Extraction", () => {
  test("extracts valid email addresses", () => {
    const text = "Contact us at hello@example.com or support@test.org";
    const seen = new Set<string>();
    const emails = extractEmails(text, seen);

    expect(emails).toContain("hello@example.com");
    expect(emails).toContain("support@test.org");
    expect(emails).toHaveLength(2);
  });

  test("handles email addresses with dots and hyphens", () => {
    const text = "john.doe@my-company.co.uk";
    const seen = new Set<string>();
    const emails = extractEmails(text, seen);

    expect(emails).toContain("john.doe@my-company.co.uk");
  });

  test("handles email addresses with numbers", () => {
    const text = "user123@domain456.com";
    const seen = new Set<string>();
    const emails = extractEmails(text, seen);

    expect(emails).toContain("user123@domain456.com");
  });

  test("deduplicates emails (case-insensitive)", () => {
    const text = "HELLO@EXAMPLE.COM and hello@example.com";
    const seen = new Set<string>();
    const emails = extractEmails(text, seen);

    expect(emails).toHaveLength(1);
    expect(emails[0].toLowerCase()).toBe("hello@example.com");
  });

  test("respects existing seen set", () => {
    const text1 = "test@example.com";
    const text2 = "test@example.com and new@example.com";
    
    const seen = new Set<string>();
    const emails1 = extractEmails(text1, seen);
    const emails2 = extractEmails(text2, seen);

    expect(emails1).toHaveLength(1);
    expect(emails2).toHaveLength(1); // Only new@example.com
    expect(emails2).toContain("new@example.com");
  });

  test("handles text with no emails", () => {
    const text = "This text has no email addresses!";
    const seen = new Set<string>();
    const emails = extractEmails(text, seen);

    expect(emails).toHaveLength(0);
  });

  test("handles empty string", () => {
    const text = "";
    const seen = new Set<string>();
    const emails = extractEmails(text, seen);

    expect(emails).toHaveLength(0);
  });

  test("extracts emails from HTML-like content", () => {
    const text = '<a href="mailto:contact@company.com">Email us</a>';
    const seen = new Set<string>();
    const emails = extractEmails(text, seen);

    expect(emails).toContain("contact@company.com");
  });

  test("handles multiple emails on same line", () => {
    const text = "abc@test.com, def@test.com; ghi@test.com";
    const seen = new Set<string>();
    const emails = extractEmails(text, seen);

    expect(emails).toHaveLength(3);
    expect(emails).toContain("abc@test.com");
    expect(emails).toContain("def@test.com");
    expect(emails).toContain("ghi@test.com");
  });
});
