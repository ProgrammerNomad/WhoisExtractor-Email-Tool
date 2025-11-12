import { useState, useEffect, useRef, useCallback } from "react";
import type { ExtractionOptions } from "../components/OptionsPanel";
import type { Message, BatchMessage, CompleteMessage, ErrorMessage } from "../../types";

interface ExtractionState {
  isExtracting: boolean;
  progress: number;
  totalCount: number;
  results: string[];
  error: string | null;
}

export const useExtractor = () => {
  const [state, setState] = useState<ExtractionState>({
    isExtracting: false,
    progress: 0,
    totalCount: 0,
    results: [],
    error: null,
  });

  const portRef = useRef<chrome.runtime.Port | null>(null);
  const currentSessionIdRef = useRef<string | null>(null);

  // Initialize Port connection to background
  useEffect(() => {
    const port = chrome.runtime.connect({ name: "tool" });
    portRef.current = port;

    // Listen for messages from background
    port.onMessage.addListener((message: Message) => {
      handleBackgroundMessage(message);
    });

    port.onDisconnect.addListener(() => {
      console.log("useExtractor: Disconnected from background");
      portRef.current = null;
    });

    console.log("useExtractor: Connected to background");

    // Cleanup on unmount
    return () => {
      if (portRef.current) {
        portRef.current.disconnect();
        portRef.current = null;
      }
    };
  }, []);

  /**
   * Handle messages from background service worker
   */
  const handleBackgroundMessage = useCallback((message: Message) => {
    // Only process messages for current session
    if (message.id !== currentSessionIdRef.current) {
      return;
    }

    switch (message.type) {
      case "batch":
        handleBatchMessage(message as BatchMessage);
        break;

      case "complete":
        handleCompleteMessage(message as CompleteMessage);
        break;

      case "error":
        handleErrorMessage(message as ErrorMessage);
        break;

      case "memoryWarning":
        console.warn("Memory warning:", message);
        // Could show UI warning here in the future
        break;

      default:
        console.warn("useExtractor: Unknown message type:", message.type);
    }
  }, []);

  /**
   * Handle batch results from worker
   */
  const handleBatchMessage = useCallback((message: BatchMessage) => {
    setState((prev) => ({
      ...prev,
      results: [...prev.results, ...message.emails],
      progress: message.progressPercent,
      totalCount: message.totalCount,
    }));
  }, []);

  /**
   * Handle extraction completion
   */
  const handleCompleteMessage = useCallback((message: CompleteMessage) => {
    setState((prev) => ({
      ...prev,
      isExtracting: false,
      progress: 100,
      totalCount: message.totalCount,
    }));
    currentSessionIdRef.current = null;
  }, []);

  /**
   * Handle errors
   */
  const handleErrorMessage = useCallback((message: ErrorMessage) => {
    setState((prev) => ({
      ...prev,
      isExtracting: false,
      error: message.message,
    }));
    currentSessionIdRef.current = null;
  }, []);

  /**
   * Start extraction via background worker
   */
  const startExtraction = useCallback(
    (input: string, options: ExtractionOptions) => {
      if (!portRef.current) {
        setState((prev) => ({
          ...prev,
          error: "Not connected to background service. Please refresh the page.",
        }));
        return;
      }

      // Generate unique session ID
      const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      currentSessionIdRef.current = sessionId;

      // Reset state
      setState({
        isExtracting: true,
        progress: 0,
        totalCount: 0,
        results: [],
        error: null,
      });

      // Send start message to background
      portRef.current.postMessage({
        type: "start",
        id: sessionId,
        input,
        options,
      });

      console.log("useExtractor: Extraction started, session:", sessionId);
    },
    []
  );

  /**
   * Cancel extraction
   */
  const handleCancel = useCallback(() => {
    if (portRef.current && currentSessionIdRef.current) {
      portRef.current.postMessage({
        type: "cancel",
        id: currentSessionIdRef.current,
      });
    }

    setState((prev) => ({
      ...prev,
      isExtracting: false,
    }));

    currentSessionIdRef.current = null;
  }, []);

  /**
   * Clear results
   */
  const clearResults = useCallback(() => {
    setState({
      isExtracting: false,
      progress: 0,
      totalCount: 0,
      results: [],
      error: null,
    });
    currentSessionIdRef.current = null;
  }, []);

  return {
    ...state,
    startExtraction,
    handleCancel,
    clearResults,
  };
};
