import { useState, useEffect, useCallback, useRef } from "react";
import type {
  ExtractionOptions,
  ExtractionStatus,
  Message,
  BatchMessage,
  CompleteMessage,
  ErrorMessage,
} from "~types";

export function useExtractor() {
  const [status, setStatus] = useState<ExtractionStatus>("idle");
  const [emails, setEmails] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const portRef = useRef<chrome.runtime.Port | null>(null);
  const sessionIdRef = useRef<string | null>(null);

  // Initialize port connection on mount
  useEffect(() => {
    connectToBackground();

    return () => {
      disconnectFromBackground();
    };
  }, []);

  const connectToBackground = () => {
    try {
      const port = chrome.runtime.connect({ name: "popup" });
      portRef.current = port;

      port.onMessage.addListener(handleMessage);

      port.onDisconnect.addListener(() => {
        console.log("Popup: Disconnected from background");
        portRef.current = null;
      });

      console.log("Popup: Connected to background");
    } catch (err) {
      console.error("Failed to connect to background:", err);
      setError("Failed to connect to background service");
    }
  };

  const disconnectFromBackground = () => {
    if (portRef.current) {
      portRef.current.disconnect();
      portRef.current = null;
    }
  };

  const handleMessage = useCallback((message: Message) => {
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
        // Show memory warning to user
        const shouldContinue = confirm(
          `${message.message}\n\nMemory usage is high. Continue processing?`
        );
        if (!shouldContinue && portRef.current) {
          cancel();
        }
        break;

      default:
        console.warn("Popup: Unknown message type:", message.type);
    }
  }, []);

  const handleBatchMessage = (message: BatchMessage) => {
    if (message.id !== sessionIdRef.current) return;

    // Append new emails
    setEmails((prev) => [...prev, ...message.emails]);
    setProgress(message.progressPercent);
    setTotalCount(message.totalCount);
  };

  const handleCompleteMessage = (message: CompleteMessage) => {
    if (message.id !== sessionIdRef.current) return;

    setStatus("completed");
    setProgress(100);
    setTotalCount(message.totalCount);
  };

  const handleErrorMessage = (message: ErrorMessage) => {
    if (message.id !== sessionIdRef.current) return;

    setStatus("error");
    setError(message.message);
  };

  const startExtraction = useCallback(
    async (input: string | File, options: ExtractionOptions) => {
      if (!portRef.current) {
        setError("Not connected to background service");
        return;
      }

      // Reset state
      setStatus("processing");
      setEmails([]);
      setProgress(0);
      setTotalCount(0);
      setError(null);

      // Generate session ID
      const sessionId = `session-${Date.now()}-${Math.random()}`;
      sessionIdRef.current = sessionId;

      try {
        let inputData: string;

        // Handle file input
        if (input instanceof File) {
          // Check file size
          const fileSize = input.size;
          if (fileSize >= 2 * 1024 * 1024) {
            // ≥ 2 MB
            const confirmed = confirm(
              "Large input detected — processing will run in background. Continue?"
            );
            if (!confirmed) {
              setStatus("idle");
              return;
            }
          }

          // Read file
          inputData = await input.text();
        } else {
          inputData = input;
        }

        // Send start message
        portRef.current.postMessage({
          type: "start",
          id: sessionId,
          input: inputData,
          options,
        });
      } catch (err) {
        console.error("Failed to start extraction:", err);
        setStatus("error");
        setError(err instanceof Error ? err.message : "Failed to start extraction");
      }
    },
    []
  );

  const cancel = useCallback(() => {
    if (!portRef.current || !sessionIdRef.current) return;

    portRef.current.postMessage({
      type: "cancel",
      id: sessionIdRef.current,
    });

    setStatus("cancelled");
    sessionIdRef.current = null;
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setEmails([]);
    setProgress(0);
    setTotalCount(0);
    setError(null);
    sessionIdRef.current = null;
  }, []);

  return {
    status,
    emails,
    progress,
    totalCount,
    error,
    startExtraction,
    cancel,
    reset,
    isProcessing: status === "processing",
    isCompleted: status === "completed",
    isError: status === "error",
  };
}
