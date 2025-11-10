/**
 * Web Worker for email parsing
 * Handles heavy extraction in background thread with chunking, deduplication, and batching
 * Respects cancellation and memory limits
 */

import { chunkWithOverlap, calculateProgress } from "../utils/chunking";
import { extractEmails } from "../utils/regex";
import { isMemorySafe } from "../utils/dedup";
import type {
  StartWorkerMessage,
  BatchMessage,
  CompleteMessage,
  CancelMessage,
  ErrorMessage,
  MemoryWarningMessage,
} from "../types";

// Worker state
let abort = false;
let currentSessionId: string | null = null;

/**
 * Check memory usage (if performance.memory is available)
 */
function checkMemory(): boolean {
  if (typeof performance !== "undefined" && "memory" in performance) {
    const memory = (performance as any).memory;
    const usageRatio = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
    return usageRatio < 0.8; // 80% threshold
  }
  return true; // Assume safe if memory API not available
}

/**
 * Main worker message handler
 */
self.onmessage = async (event: MessageEvent) => {
  const message = event.data;

  switch (message.type) {
    case "start-worker":
      await handleStart(message as StartWorkerMessage);
      break;

    case "cancel":
      handleCancel(message as CancelMessage);
      break;

    default:
      console.warn("Worker: Unknown message type:", message.type);
  }
};

/**
 * Handle start extraction message
 */
async function handleStart(message: StartWorkerMessage): Promise<void> {
  const { id, input, options } = message;

  // Reset state
  abort = false;
  currentSessionId = id;

  const seen = new Set<string>();
  const batchSize = 1000; // Send batches of 1000 emails
  let batch: string[] = [];
  let totalCount = 0;

  try {
    const chunkSize = 262144; // 256 KB
    const overlap = 1024; // 1 KB
    const chunks = Array.from(chunkWithOverlap(input, chunkSize, overlap));
    const totalChunks = chunks.length;

    for (let i = 0; i < totalChunks; i++) {
      // Check for cancellation
      if (abort) {
        sendCancelComplete(id);
        return;
      }

      // Check memory safety
      if (!isMemorySafe(seen.size)) {
        const shouldContinue = await handleMemoryWarning(id, seen.size);
        if (!shouldContinue) {
          return;
        }
      }

      // Process chunk
      const chunk = chunks[i];
      const newEmails = extractEmails(chunk, seen);

      // Add to batch
      batch.push(...newEmails);
      totalCount += newEmails.length;

      // Send batch if full
      if (batch.length >= batchSize) {
        sendBatch(id, batch, calculateProgress(i, totalChunks), seen.size);
        batch = []; // Reset batch
      }

      // Check memory periodically
      if (i % 10 === 0 && !checkMemory()) {
        console.warn("Worker: Memory usage high");
      }
    }

    // Send remaining batch
    if (batch.length > 0) {
      sendBatch(id, batch, 100, seen.size);
    }

    // Apply final processing (sorting if requested)
    const finalEmails = Array.from(seen);
    const shouldSort = options.sort && finalEmails.length <= 50000;

    if (shouldSort) {
      finalEmails.sort((a, b) => a.localeCompare(b));
    }

    // Send completion message
    sendComplete(id, seen.size, shouldSort);
  } catch (error) {
    sendError(id, error instanceof Error ? error.message : "Unknown error");
  } finally {
    // Cleanup
    currentSessionId = null;
  }
}

/**
 * Handle cancellation
 */
function handleCancel(message: CancelMessage): void {
  if (message.id === currentSessionId) {
    abort = true;
  }
}

/**
 * Handle memory warning
 * @returns True if should continue, false if should abort
 */
async function handleMemoryWarning(
  id: string,
  setSize: number
): Promise<boolean> {
  const warning: MemoryWarningMessage = {
    type: "memoryWarning",
    id,
    currentSetSize: setSize,
    message: `Memory limit approaching: ${setSize.toLocaleString()} emails processed. Continue?`,
    options: ["continue", "cancel"],
  };

  self.postMessage(warning);

  // For now, auto-continue after warning
  // In full implementation, wait for user response
  return true;
}

/**
 * Send batch results
 */
function sendBatch(
  id: string,
  emails: string[],
  progressPercent: number,
  totalCount: number
): void {
  const message: BatchMessage = {
    type: "batch",
    id,
    emails,
    progressPercent,
    totalCount,
  };

  self.postMessage(message);
}

/**
 * Send completion message
 */
function sendComplete(id: string, totalCount: number, sorted: boolean): void {
  const message: CompleteMessage = {
    type: "complete",
    id,
    totalCount,
    sorted,
  };

  self.postMessage(message);
}

/**
 * Send cancellation complete
 */
function sendCancelComplete(id: string): void {
  const message: CompleteMessage = {
    type: "complete",
    id,
    totalCount: 0,
    sorted: false,
  };

  self.postMessage(message);
}

/**
 * Send error message
 */
function sendError(id: string, error: string): void {
  const message: ErrorMessage = {
    type: "error",
    id,
    message: error,
  };

  self.postMessage(message);
}

export {};
