/**
 * Unit tests for email deduplication
 */

import { deduplicateEmails } from "../../src/utils/dedup";

describe("Email Deduplication", () => {
  test("removes exact duplicates", () => {
    const emails = [
      "test@example.com",
      "test@example.com",
      "hello@world.com",
    ];

    const deduplicated = deduplicateEmails(emails);

    expect(deduplicated).toHaveLength(2);
    expect(deduplicated).toContain("test@example.com");
    expect(deduplicated).toContain("hello@world.com");
  });

  test("removes case-insensitive duplicates", () => {
    const emails = [
      "TEST@EXAMPLE.COM",
      "test@example.com",
      "Test@Example.Com",
    ];

    const deduplicated = deduplicateEmails(emails);

    expect(deduplicated).toHaveLength(1);
    expect(deduplicated[0].toLowerCase()).toBe("test@example.com");
  });

  test("preserves order of first occurrence", () => {
    const emails = [
      "first@test.com",
      "second@test.com",
      "first@test.com",
      "third@test.com",
    ];

    const deduplicated = deduplicateEmails(emails);

    expect(deduplicated).toEqual([
      "first@test.com",
      "second@test.com",
      "third@test.com",
    ]);
  });

  test("handles empty array", () => {
    const emails: string[] = [];
    const deduplicated = deduplicateEmails(emails);

    expect(deduplicated).toHaveLength(0);
  });

  test("handles single email", () => {
    const emails = ["single@test.com"];
    const deduplicated = deduplicateEmails(emails);

    expect(deduplicated).toEqual(["single@test.com"]);
  });

  test("handles all unique emails", () => {
    const emails = [
      "one@test.com",
      "two@test.com",
      "three@test.com",
    ];

    const deduplicated = deduplicateEmails(emails);

    expect(deduplicated).toHaveLength(3);
    expect(deduplicated).toEqual(emails);
  });
});
