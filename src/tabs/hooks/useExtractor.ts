import { useState, useEffect, useRef, useCallback } from "react";
import type { ExtractionOptions } from "../components/OptionsPanel";

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
  const sessionIdRef = useRef<string | null>(null);

  // Connect to background service worker
  useEffect(() => {
    const port = chrome.runtime.connect({ name: "tool" });
    portRef.current = port;

    port.onMessage.addListener((message) => {
      if (message.type === "batch") {
        // Streaming batch of emails
        setState((prev) => ({
          ...prev,
          results: [...prev.results, ...message.emails],
          progress: message.progressPercent,
          totalCount: message.totalCount,
        }));
      } else if (message.type === "complete") {
        // Extraction completed
        setState((prev) => ({
          ...prev,
          isExtracting: false,
          progress: 100,
        }));
      } else if (message.type === "error") {
        // Error occurred
        setState((prev) => ({
          ...prev,
          isExtracting: false,
          error: message.message,
        }));
      } else if (message.type === "memoryWarning") {
        // Memory warning
        const shouldContinue = confirm(
          `Memory usage high: ${message.message}\n\nContinue extraction?`
        );
        if (shouldContinue) {
          port.postMessage({
            type: "memoryWarning-continue",
            id: sessionIdRef.current,
          });
        } else {
          handleCancel();
        }
      }
    });

    port.onDisconnect.addListener(() => {
      console.log("Disconnected from background");
      portRef.current = null;
    });

    return () => {
      port.disconnect();
    };
  }, []);

  const startExtraction = useCallback(
    (input: string, options: ExtractionOptions) => {
      if (!portRef.current) {
        console.error("Port not connected");
        return;
      }

      // Generate session ID
      const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      sessionIdRef.current = sessionId;

      // Reset state
      setState({
        isExtracting: true,
        progress: 0,
        totalCount: 0,
        results: [],
        error: null,
      });

      // Send extraction request
      portRef.current.postMessage({
        type: "start",
        id: sessionId,
        input,
        options,
      });
    },
    []
  );

  const handleCancel = useCallback(() => {
    if (portRef.current && sessionIdRef.current) {
      portRef.current.postMessage({
        type: "cancel",
        id: sessionIdRef.current,
      });
      setState((prev) => ({
        ...prev,
        isExtracting: false,
      }));
    }
  }, []);

  const clearResults = useCallback(() => {
    setState({
      isExtracting: false,
      progress: 0,
      totalCount: 0,
      results: [],
      error: null,
    });
    sessionIdRef.current = null;
  }, []);

  return {
    ...state,
    startExtraction,
    handleCancel,
    clearResults,
  };
};
