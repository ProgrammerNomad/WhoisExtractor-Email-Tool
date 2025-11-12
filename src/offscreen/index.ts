/**
 * Offscreen page script
 * Handles both direct extraction (small inputs) and Web Worker orchestration (large inputs)
 * Relays results back to background service worker
 */

import { chunkWithOverlap, calculateProgress } from "../utils/chunking";
import { extractEmails, applyOptions } from "../utils/regex";
import type {
  Message,
  StartDirectMessage,
  StartWorkerMessage,
  BatchMessage,
  CompleteMessage,
} from "../types";

// Port connection to background
let backgroundPort: chrome.runtime.Port | null = null;

// Active worker instance
let activeWorker: Worker | null = null;

/**
 * Initialize connection to background service worker
 */
function initializeConnection(): void {
  backgroundPort = chrome.runtime.connect({ name: "offscreen" });

  backgroundPort.onMessage.addListener((message: Message) => {
    handleMessage(message);
  });

  backgroundPort.onDisconnect.addListener(() => {
    console.log("Offscreen: Disconnected from background");
    cleanup();
  });

  console.log("Offscreen: Connected to background");
}

/**
 * Handle incoming messages from background
 */
function handleMessage(message: Message): void {
  switch (message.type) {
    case "start-direct":
      handleDirectExtraction(message as StartDirectMessage);
      break;

    case "start-worker":
      handleWorkerExtraction(message as StartWorkerMessage);
      break;

    case "cancel":
      handleCancel(message.id);
      break;

    default:
      console.warn("Offscreen: Unknown message type:", message.type);
  }
}

/**
 * Handle direct extraction (for small inputs < 256 KB)
 */
async function handleDirectExtraction(
  message: StartDirectMessage
): Promise<void> {
  const { id, input, options } = message;

  try {
    const seen = new Set<string>();
    const batchSize = 1000;
    let batch: string[] = [];

    const chunkSize = 262144; // 256 KB
    const overlap = 1024; // 1 KB
    const chunks = Array.from(chunkWithOverlap(input, chunkSize, overlap));
    const totalChunks = chunks.length;

    // Extract emails from all chunks
    for (let i = 0; i < totalChunks; i++) {
      const chunk = chunks[i];
      const newEmails = extractEmails(chunk, seen);

      batch.push(...newEmails);

      // Send batch if full
      if (batch.length >= batchSize) {
        sendBatchToBackground(
          id,
          batch,
          calculateProgress(i, totalChunks),
          seen.size
        );
        batch = [];
      }
    }

    // Send remaining batch
    if (batch.length > 0) {
      sendBatchToBackground(id, batch, 100, seen.size);
    }

    // Apply final options to all extracted emails
    const allEmails = Array.from(seen);
    const finalEmails = applyOptions(allEmails, options);

    // Send completion
    sendCompleteToBackground(id, finalEmails.length, options.sort);
  } catch (error) {
    sendErrorToBackground(
      id,
      error instanceof Error ? error.message : "Extraction failed"
    );
  }
}

/**
 * Handle worker-based extraction (for large inputs ≥ 256 KB)
 */
function handleWorkerExtraction(message: StartWorkerMessage): void {
  try {
    // Terminate existing worker if any
    if (activeWorker) {
      activeWorker.terminate();
    }

    // Create new Web Worker
    activeWorker = new Worker(
      new URL("../worker/parser.worker.ts", import.meta.url),
      { type: "module" }
    );

    // Listen for messages from worker
    activeWorker.onmessage = (event: MessageEvent) => {
      // Relay worker messages to background
      if (backgroundPort) {
        backgroundPort.postMessage(event.data);
      }
    };

    activeWorker.onerror = (error: ErrorEvent) => {
      console.error("Offscreen: Worker error:", error);
      sendErrorToBackground(message.id, error.message);
      activeWorker?.terminate();
      activeWorker = null;
    };

    // Start worker processing
    activeWorker.postMessage(message);
  } catch (error) {
    console.error("Offscreen: Failed to create worker:", error);
    sendErrorToBackground(
      message.id,
      error instanceof Error ? error.message : "Worker creation failed"
    );
  }
}

/**
 * Handle cancellation
 */
function handleCancel(id: string): void {
  if (activeWorker) {
    activeWorker.postMessage({ type: "cancel", id });
    activeWorker.terminate();
    activeWorker = null;
  }
}

/**
 * Send batch results to background
 */
function sendBatchToBackground(
  id: string,
  emails: string[],
  progressPercent: number,
  totalCount: number
): void {
  if (!backgroundPort) return;

  const message: BatchMessage = {
    type: "batch",
    id,
    emails,
    progressPercent,
    totalCount,
  };

  backgroundPort.postMessage(message);
}

/**
 * Send completion message to background
 */
function sendCompleteToBackground(
  id: string,
  totalCount: number,
  sorted: boolean
): void {
  if (!backgroundPort) return;

  const message: CompleteMessage = {
    type: "complete",
    id,
    totalCount,
    sorted,
  };

  backgroundPort.postMessage(message);
}

/**
 * Send error message to background
 */
function sendErrorToBackground(id: string, errorMessage: string): void {
  if (!backgroundPort) return;

  backgroundPort.postMessage({
    type: "error",
    id,
    message: errorMessage,
  });
}

/**
 * Cleanup resources
 */
function cleanup(): void {
  if (activeWorker) {
    activeWorker.terminate();
    activeWorker = null;
  }

  if (backgroundPort) {
    backgroundPort.disconnect();
    backgroundPort = null;
  }
}

// Initialize when script loads
initializeConnection();

// Cleanup on unload
self.addEventListener("beforeunload", cleanup);
