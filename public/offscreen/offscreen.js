/**
 * Offscreen page script
 * Handles both direct extraction (small inputs) and Web Worker orchestration (large inputs)
 * Relays results back to background service worker
 */

console.log("Offscreen JS: Script file loaded!");

// Port connection to background
let backgroundPort = null;

// Active worker instance
let activeWorker = null;

/**
 * Initialize connection to background service worker
 */
function initializeConnection() {
  console.log("Offscreen: Attempting to connect to background...");
  backgroundPort = chrome.runtime.connect({ name: "offscreen" });

  backgroundPort.onMessage.addListener((message) => {
    console.log("Offscreen: Message received from background:", message.type);
    handleMessage(message);
  });

  backgroundPort.onDisconnect.addListener(() => {
    console.log("Offscreen: Disconnected from background");
    cleanup();
  });

  console.log("Offscreen: Connected to background successfully");
}

/**
 * Handle incoming messages from background
 */
function handleMessage(message) {
  switch (message.type) {
    case "start-direct":
      handleDirectExtraction(message);
      break;

    case "start-worker":
      handleWorkerExtraction(message);
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
async function handleDirectExtraction(message) {
  const { id, input, options } = message;
  console.log("Offscreen: Direct extraction started for session:", id);

  try {
    // Simple regex extraction
    const emailRegex = /\b[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9][a-zA-Z0-9.-]*\.[a-zA-Z]{2,}\b/g;
    const matches = input.match(emailRegex) || [];
    
    let emails = matches.map(email => email.replace(/[.-]+$/, '').toLowerCase());
    
    // Apply dedupe
    if (options.dedupe) {
      emails = [...new Set(emails)];
    }
    
    console.log(`Offscreen: Found ${emails.length} emails via direct extraction`);
    
    // Send batch
    sendBatchToBackground(id, emails, 100, emails.length);
    
    // Send completion
    sendCompleteToBackground(id, emails.length, false);
  } catch (error) {
    console.error("Offscreen: Direct extraction error:", error);
    sendErrorToBackground(
      id,
      error instanceof Error ? error.message : "Extraction failed"
    );
  }
}

/**
 * Handle worker-based extraction (for large inputs ≥ 256 KB)
 */
function handleWorkerExtraction(message) {
  console.log("Offscreen: Worker extraction started for session:", message.id);
  
  try {
    // Terminate existing worker if any
    if (activeWorker) {
      activeWorker.terminate();
    }

    // Create new Web Worker - using inline worker as fallback
    const workerCode = `
      console.log("Worker: Starting...");
      
      // Web Worker for email parsing
      let abort = false;
      let currentSessionId = null;

      self.onmessage = async (event) => {
        const message = event.data;
        console.log("Worker: Message received:", message.type);

        if (message.type === "start-worker") {
          await handleStart(message);
        } else if (message.type === "cancel") {
          abort = true;
        }
      };

      async function handleStart(message) {
        const { id, input, options } = message;
        abort = false;
        currentSessionId = id;

        const seen = new Set();
        const batchSize = 1000;
        let batch = [];

        try {
          // Simple chunk processing
          const chunkSize = 262144; // 256 KB
          const emailRegex = /\\b[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9][a-zA-Z0-9.-]*\\.[a-zA-Z]{2,}\\b/g;
          
          console.log("Worker: Processing input of length:", input.length);
          
          for (let i = 0; i < input.length; i += chunkSize) {
            if (abort) {
              self.postMessage({ type: "complete", id, totalCount: 0, sorted: false });
              return;
            }

            const chunk = input.slice(i, i + chunkSize + 1024); // 1KB overlap
            let match;
            emailRegex.lastIndex = 0;

            while ((match = emailRegex.exec(chunk)) !== null) {
              const email = match[0].replace(/[.-]+$/, '').toLowerCase();
              if (!seen.has(email)) {
                seen.add(email);
                batch.push(email);
              }
            }

            // Send batch
            if (batch.length >= batchSize) {
              self.postMessage({
                type: "batch",
                id,
                emails: batch,
                progressPercent: Math.round((i / input.length) * 100),
                totalCount: seen.size
              });
              batch = [];
            }
          }

          // Send remaining
          if (batch.length > 0) {
            self.postMessage({
              type: "batch",
              id,
              emails: batch,
              progressPercent: 100,
              totalCount: seen.size
            });
          }

          console.log("Worker: Completed, found", seen.size, "emails");
          
          self.postMessage({
            type: "complete",
            id,
            totalCount: seen.size,
            sorted: false
          });
        } catch (error) {
          console.error("Worker: Error:", error);
          self.postMessage({
            type: "error",
            id,
            message: error.message || "Worker error"
          });
        }
      }
    `;

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(blob);
    activeWorker = new Worker(workerUrl);

    // Listen for messages from worker
    activeWorker.onmessage = (event) => {
      console.log("Offscreen: Message from worker:", event.data.type);
      // Relay worker messages to background
      if (backgroundPort) {
        backgroundPort.postMessage(event.data);
      }
    };

    activeWorker.onerror = (error) => {
      console.error("Offscreen: Worker error:", error);
      sendErrorToBackground(message.id, error.message);
      activeWorker?.terminate();
      activeWorker = null;
    };

    // Start worker processing
    activeWorker.postMessage(message);
    console.log("Offscreen: Worker message sent");
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
function handleCancel(id) {
  console.log("Offscreen: Cancellation requested for session:", id);
  if (activeWorker) {
    activeWorker.postMessage({ type: "cancel", id });
    activeWorker.terminate();
    activeWorker = null;
  }
}

/**
 * Send batch results to background
 */
function sendBatchToBackground(id, emails, progressPercent, totalCount) {
  if (!backgroundPort) return;

  backgroundPort.postMessage({
    type: "batch",
    id,
    emails,
    progressPercent,
    totalCount,
  });
}

/**
 * Send completion message to background
 */
function sendCompleteToBackground(id, totalCount, sorted) {
  if (!backgroundPort) return;

  backgroundPort.postMessage({
    type: "complete",
    id,
    totalCount,
    sorted,
  });
}

/**
 * Send error message to background
 */
function sendErrorToBackground(id, errorMessage) {
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
function cleanup() {
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
console.log("Offscreen: Script loaded at:", new Date().toISOString());
console.log("Offscreen: chrome.runtime available:", typeof chrome !== 'undefined' && typeof chrome.runtime !== 'undefined');

try {
  console.log("Offscreen: Calling initializeConnection...");
  initializeConnection();
  console.log("Offscreen: initializeConnection completed");
} catch (error) {
  console.error("Offscreen: Failed to initialize connection:", error);
  console.error("Offscreen: Error stack:", error.stack);
}

// Cleanup on unload
self.addEventListener("beforeunload", cleanup);
