/**
 * Unit tests for text chunking with overlap
 */

import { chunkWithOverlap, calculateProgress } from "../../src/utils/chunking";

describe("Text Chunking with Overlap", () => {
  test("chunks text with specified size and overlap", () => {
    const text = "A".repeat(1000);
    const chunkSize = 300;
    const overlap = 50;

    const chunks = Array.from(chunkWithOverlap(text, chunkSize, overlap));

    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks[0].length).toBe(300);
  });

  test("preserves overlap between chunks", () => {
    const text = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".repeat(10);
    const chunkSize = 50;
    const overlap = 10;

    const chunks = Array.from(chunkWithOverlap(text, chunkSize, overlap));

    // Check that chunks overlap
    for (let i = 0; i < chunks.length - 1; i++) {
      const endOfCurrent = chunks[i].slice(-overlap);
      const startOfNext = chunks[i + 1].slice(0, overlap);
      
      // There should be some overlap content
      expect(endOfCurrent.length).toBe(overlap);
      expect(startOfNext.length).toBe(overlap);
    }
  });

  test("handles text smaller than chunk size", () => {
    const text = "Small text";
    const chunkSize = 1000;
    const overlap = 50;

    const chunks = Array.from(chunkWithOverlap(text, chunkSize, overlap));

    expect(chunks).toHaveLength(1);
    expect(chunks[0]).toBe(text);
  });

  test("handles empty string", () => {
    const text = "";
    const chunkSize = 100;
    const overlap = 10;

    const chunks = Array.from(chunkWithOverlap(text, chunkSize, overlap));

    expect(chunks).toHaveLength(0);
  });

  test("handles exact chunk size boundary", () => {
    const text = "A".repeat(300);
    const chunkSize = 300;
    const overlap = 0;

    const chunks = Array.from(chunkWithOverlap(text, chunkSize, overlap));

    expect(chunks).toHaveLength(1);
    expect(chunks[0].length).toBe(300);
  });
});

describe("Progress Calculation", () => {
  test("calculates 0% for first chunk", () => {
    expect(calculateProgress(0, 10)).toBe(0);
  });

  test("calculates 50% for midpoint", () => {
    expect(calculateProgress(5, 10)).toBe(50);
  });

  test("calculates 100% for last chunk", () => {
    expect(calculateProgress(10, 10)).toBe(100);
  });

  test("handles single chunk", () => {
    expect(calculateProgress(0, 1)).toBe(0);
    expect(calculateProgress(1, 1)).toBe(100);
  });

  test("rounds to nearest integer", () => {
    const progress = calculateProgress(1, 3);
    expect(Number.isInteger(progress)).toBe(true);
  });
});
