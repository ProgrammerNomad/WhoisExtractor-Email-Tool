/**
 * Background Service Worker
 * Brokers communication between popup and offscreen page
 * Manages offscreen page lifecycle
 */

import type { Message, StartMessage } from "../types";

// Port connections
const popupPorts = new Map<string, chrome.runtime.Port>();
let offscreenPort: chrome.runtime.Port | null = null;

// Offscreen page state
let offscreenPageCreated = false;

/**
 * Create offscreen document if it doesn't exist
 */
async function ensureOffscreenPage(): Promise<void> {
  if (offscreenPageCreated) {
    return;
  }

  try {
    // Check if offscreen document already exists
    const existingContexts = await chrome.runtime.getContexts({
      contextTypes: [chrome.runtime.ContextType.OFFSCREEN_DOCUMENT],
    });

    if (existingContexts.length > 0) {
      offscreenPageCreated = true;
      return;
    }

    // Create offscreen document
    await chrome.offscreen.createDocument({
      url: chrome.runtime.getURL("offscreen.html"),
      reasons: [chrome.offscreen.Reason.WORKERS],
      justification: "Run Web Worker for email extraction processing",
    });

    offscreenPageCreated = true;
    console.log("Background: Offscreen page created");
  } catch (error) {
    console.error("Background: Failed to create offscreen page:", error);
    throw error;
  }
}

/**
 * Handle port connections from popup and offscreen
 */
chrome.runtime.onConnect.addListener((port) => {
  console.log("Background: Port connected:", port.name);

  if (port.name === "popup") {
    handlePopupConnection(port);
  } else if (port.name === "offscreen") {
    handleOffscreenConnection(port);
  }
});

/**
 * Handle popup port connection
 */
function handlePopupConnection(port: chrome.runtime.Port): void {
  const portId = `popup-${Date.now()}`;
  popupPorts.set(portId, port);

  port.onMessage.addListener(async (message: Message) => {
    await handlePopupMessage(message, portId);
  });

  port.onDisconnect.addListener(() => {
    console.log("Background: Popup disconnected:", portId);
    popupPorts.delete(portId);
  });
}

/**
 * Handle offscreen port connection
 */
function handleOffscreenConnection(port: chrome.runtime.Port): void {
  offscreenPort = port;

  port.onMessage.addListener((message: Message) => {
    // Relay messages from offscreen to all connected popups
    popupPorts.forEach((popupPort) => {
      try {
        popupPort.postMessage(message);
      } catch (error) {
        console.error("Background: Failed to relay to popup:", error);
      }
    });
  });

  port.onDisconnect.addListener(() => {
    console.log("Background: Offscreen disconnected");
    offscreenPort = null;
    offscreenPageCreated = false;
  });
}

/**
 * Handle messages from popup
 */
async function handlePopupMessage(
  message: Message,
  portId: string
): Promise<void> {
  try {
    if (message.type === "start") {
      await handleStartMessage(message as StartMessage);
    } else if (message.type === "cancel") {
      // Forward cancel to offscreen
      if (offscreenPort) {
        offscreenPort.postMessage(message);
      }
    }
  } catch (error) {
    console.error("Background: Error handling popup message:", error);

    // Send error back to popup
    const popupPort = popupPorts.get(portId);
    if (popupPort) {
      popupPort.postMessage({
        type: "error",
        id: message.id || "unknown",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

/**
 * Handle start extraction message
 * Decides whether to use direct extraction or Web Worker based on input size
 */
async function handleStartMessage(message: StartMessage): Promise<void> {
  const { input, options, id } = message;

  // Ensure offscreen page exists
  await ensureOffscreenPage();

  // Wait a bit for offscreen port to connect
  if (!offscreenPort) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  if (!offscreenPort) {
    throw new Error("Failed to connect to offscreen page");
  }

  // Determine input size
  const inputSize =
    typeof input === "string"
      ? new Blob([input]).size
      : input.byteLength;

  console.log(
    `Background: Input size: ${(inputSize / 1024).toFixed(2)} KB`
  );

  // Decide extraction strategy based on size
  if (inputSize < 262144) {
    // Small input (< 256 KB): Use direct offscreen extraction
    console.log("Background: Using direct extraction");
    offscreenPort.postMessage({
      type: "start-direct",
      id,
      input: typeof input === "string" ? input : new TextDecoder().decode(input),
      options,
    });
  } else {
    // Large input (≥ 256 KB): Use Web Worker
    console.log("Background: Using Web Worker extraction");
    offscreenPort.postMessage({
      type: "start-worker",
      id,
      input: typeof input === "string" ? input : new TextDecoder().decode(input),
      options,
    });
  }
}

/**
 * Handle extension installation
 */
chrome.runtime.onInstalled.addListener((details) => {
  console.log("WhoisExtractor: Email Tool installed", details.reason);

  if (details.reason === "install") {
    // First-time installation
    console.log("Welcome to WhoisExtractor: Email Tool!");
  }
});

/**
 * Cleanup on extension suspend (Manifest V3)
 */
self.addEventListener("suspend", () => {
  console.log("Background: Service worker suspending, cleaning up...");

  // Close offscreen page
  if (offscreenPageCreated) {
    chrome.offscreen.closeDocument().catch((error) => {
      console.error("Background: Failed to close offscreen:", error);
    });
  }
});

export {};
