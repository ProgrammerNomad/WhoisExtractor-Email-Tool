/**
 * Background Service Worker
 * Opens tool tab on icon click
 * Brokers communication between tool page and offscreen page
 * Manages offscreen page lifecycle
 * Detects extension updates
 */

import type { Message, StartMessage } from "../types";
import { markUpdateAvailable } from "../utils/updateNotification";

// Port connections
const toolPorts = new Map<string, chrome.runtime.Port>();
let offscreenPort: chrome.runtime.Port | null = null;

// Offscreen page state
let offscreenPageCreated = false;

/**
 * Open or focus the tool page tab
 */
async function openToolPage(): Promise<void> {
  const toolUrl = chrome.runtime.getURL("tabs/index.html");
  
  // Check if tool page is already open
  const tabs = await chrome.tabs.query({});
  const existingTab = tabs.find(tab => tab.url === toolUrl);
  
  if (existingTab && existingTab.id) {
    // Focus existing tab
    await chrome.tabs.update(existingTab.id, { active: true });
    await chrome.windows.update(existingTab.windowId!, { focused: true });
  } else {
    // Open new tab
    await chrome.tabs.create({ url: toolUrl });
  }
}

/**
 * Handle extension icon click
 */
chrome.action.onClicked.addListener(() => {
  openToolPage();
});

/**
 * Handle keyboard shortcut
 */
chrome.commands.onCommand.addListener((command) => {
  if (command === "open-tool-page") {
    openToolPage();
  }
});

/**
 * Create offscreen document if it doesn't exist
 */
async function ensureOffscreenPage(): Promise<void> {
  try {
    // Check if offscreen document already exists
    const existingContexts = await chrome.runtime.getContexts({
      contextTypes: [chrome.runtime.ContextType.OFFSCREEN_DOCUMENT],
    });

    if (existingContexts.length > 0) {
      console.log("Background: Offscreen page already exists");
      
      // If we have an existing context but no port, the connection is stale
      if (!offscreenPort) {
        console.log("Background: Offscreen exists but port is dead, recreating...");
        await chrome.offscreen.closeDocument();
        offscreenPageCreated = false;
      } else {
        offscreenPageCreated = true;
        return;
      }
    }

    // Create offscreen document
    await chrome.offscreen.createDocument({
      url: chrome.runtime.getURL("offscreen/offscreen.html"),
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
 * Handle port connections from tool page and offscreen
 */
chrome.runtime.onConnect.addListener((port) => {
  console.log("Background: Port connected:", port.name);

  if (port.name === "tool") {
    handleToolConnection(port);
  } else if (port.name === "offscreen") {
    handleOffscreenConnection(port);
  }
});

/**
 * Handle tool page port connection
 */
function handleToolConnection(port: chrome.runtime.Port): void {
  const portId = `tool-${Date.now()}`;
  toolPorts.set(portId, port);

  port.onMessage.addListener(async (message: Message) => {
    await handleToolMessage(message, portId);
  });

  port.onDisconnect.addListener(() => {
    console.log("Background: Tool page disconnected:", portId);
    toolPorts.delete(portId);
  });
}

/**
 * Handle offscreen port connection
 */
function handleOffscreenConnection(port: chrome.runtime.Port): void {
  console.log("Background: Offscreen port connected");
  offscreenPort = port;

  port.onMessage.addListener((message: Message) => {
    // Relay messages from offscreen to all connected tool pages
    toolPorts.forEach((toolPort) => {
      try {
        toolPort.postMessage(message);
      } catch (error) {
        console.error("Background: Failed to relay to tool page:", error);
      }
    });
  });

  port.onDisconnect.addListener(() => {
    console.log("Background: Offscreen disconnected");
    offscreenPort = null;
    offscreenPageCreated = false;
    
    // Try to close and recreate offscreen document
    chrome.offscreen.closeDocument().catch(() => {
      console.log("Background: No offscreen document to close");
    });
  });
}

/**
 * Handle messages from tool page
 */
async function handleToolMessage(
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
    console.error("Background: Error handling tool message:", error);

    // Send error back to tool page
    const toolPort = toolPorts.get(portId);
    if (toolPort) {
      toolPort.postMessage({
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

  try {
    // Ensure offscreen page exists
    await ensureOffscreenPage();

    // Wait for offscreen port to connect (retry up to 2 seconds)
    let retries = 0;
    const maxRetries = 20; // 20 * 100ms = 2 seconds max wait
    
    while (!offscreenPort && retries < maxRetries) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      retries++;
      
      if (retries % 5 === 0) {
        console.log(`Background: Waiting for offscreen port... (${retries * 100}ms)`);
      }
    }

    if (!offscreenPort) {
      throw new Error("Failed to connect to offscreen page after 2 seconds");
    }
    
    console.log(`Background: Offscreen port connected after ${retries * 100}ms`);

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
  } catch (error) {
    console.error("Background: Error in handleStartMessage:", error);
    
    // Send error back to all tool pages
    toolPorts.forEach((toolPort) => {
      try {
        toolPort.postMessage({
          type: "error",
          id,
          message: error instanceof Error ? error.message : "Failed to start extraction",
        });
      } catch (err) {
        console.error("Background: Failed to send error:", err);
      }
    });
  }
}

/**
 * Handle extension installation and updates
 */
chrome.runtime.onInstalled.addListener((details) => {
  console.log("WhoisExtractor: Email Tool installed", details.reason);

  if (details.reason === "install") {
    // First-time installation
    console.log("Welcome to WhoisExtractor: Email Tool!");
  } else if (details.reason === "update") {
    const previousVersion = details.previousVersion;
    const currentVersion = chrome.runtime.getManifest().version;
    console.log(`Updated from ${previousVersion} to ${currentVersion}`);
  }
});

/**
 * Listen for extension updates
 * Fires when an update is available but not installed yet
 */
chrome.runtime.onUpdateAvailable.addListener(async (details) => {
  console.log(`Update available: version ${details.version}`);
  
  // Store update information
  await markUpdateAvailable(details.version);
  
  // Notify all connected tool pages about the update
  toolPorts.forEach((toolPort) => {
    try {
      toolPort.postMessage({
        type: "update-available",
        version: details.version,
      });
    } catch (error) {
      console.error("Background: Failed to notify tool page about update:", error);
    }
  });
  
  // Note: We don't auto-reload here to avoid interrupting user work
  // User will be prompted with UpdateNotification component in the tool page
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
