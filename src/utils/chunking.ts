/**
 * Text chunking utilities with boundary preservation
 * Ensures email tokens are not split across chunk boundaries
 */

/**
 * Generator function that yields text chunks with overlap
 * @param text - Full text to chunk
 * @param chunkSize - Size of each chunk in bytes (default 256 KB)
 * @param overlap - Overlap size in bytes to preserve boundaries (default 1 KB)
 * @yields Text chunks with overlap
 */
export function* chunkWithOverlap(
  text: string,
  chunkSize: number = 262144, // 256 KB
  overlap: number = 1024 // 1 KB
): Generator<string, void, unknown> {
  const textLength = text.length;

  for (let i = 0; i < textLength; i += chunkSize - overlap) {
    const end = Math.min(i + chunkSize, textLength);
    yield text.slice(i, end);

    // Break if we've reached the end
    if (end >= textLength) {
      break;
    }
  }
}

/**
 * Split text into chunks synchronously (returns array)
 * Use this for smaller inputs where generator is not needed
 * @param text - Text to split
 * @param chunkSize - Size of each chunk in bytes
 * @param overlap - Overlap size in bytes
 * @returns Array of text chunks
 */
export function splitIntoChunks(
  text: string,
  chunkSize: number = 262144,
  overlap: number = 1024
): string[] {
  const chunks: string[] = [];
  const textLength = text.length;

  for (let i = 0; i < textLength; i += chunkSize - overlap) {
    const end = Math.min(i + chunkSize, textLength);
    chunks.push(text.slice(i, end));

    if (end >= textLength) {
      break;
    }
  }

  return chunks;
}

/**
 * Calculate the number of chunks for a given text size
 * @param textSize - Size of text in bytes
 * @param chunkSize - Chunk size in bytes
 * @param overlap - Overlap size in bytes
 * @returns Number of chunks
 */
export function calculateChunkCount(
  textSize: number,
  chunkSize: number = 262144,
  overlap: number = 1024
): number {
  if (textSize <= chunkSize) {
    return 1;
  }

  return Math.ceil((textSize - overlap) / (chunkSize - overlap));
}

/**
 * Calculate progress percentage based on processed chunks
 * @param currentChunk - Current chunk index (0-based)
 * @param totalChunks - Total number of chunks
 * @returns Progress percentage (0-100)
 */
export function calculateProgress(
  currentChunk: number,
  totalChunks: number
): number {
  if (totalChunks === 0) return 0;
  return Math.min(Math.round(((currentChunk + 1) / totalChunks) * 100), 100);
}

/**
 * Get the byte size of a string
 * @param text - Text to measure
 * @returns Size in bytes
 */
export function getByteSize(text: string): number {
  return new Blob([text]).size;
}

/**
 * Format byte size to human-readable string
 * @param bytes - Size in bytes
 * @returns Formatted string (e.g., "1.5 MB")
 */
export function formatByteSize(bytes: number): string {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
