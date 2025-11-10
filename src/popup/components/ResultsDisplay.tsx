import { useRef, useEffect } from "react";
import type { ResultsDisplayProps } from "~types";

export function ResultsDisplay({
  emails,
  isProcessing,
}: ResultsDisplayProps) {
  const resultsRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new results come in
  useEffect(() => {
    if (resultsRef.current && isProcessing) {
      resultsRef.current.scrollTop = resultsRef.current.scrollHeight;
    }
  }, [emails.length, isProcessing]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">Results</h3>
        {emails.length > 0 && (
          <span className="text-xs text-gray-500">
            {emails.length.toLocaleString()} email
            {emails.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      <div
        ref={resultsRef}
        className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md bg-white overflow-y-auto font-mono text-sm"
      >
        {emails.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            {isProcessing
              ? "Processing... Results will appear here"
              : "Extracted emails will appear here"}
          </div>
        ) : (
          <div className="space-y-0.5">
            {emails.map((email, index) => (
              <div
                key={`${email}-${index}`}
                className="text-gray-800 hover:bg-gray-50 px-1 py-0.5 rounded"
              >
                {email}
              </div>
            ))}
          </div>
        )}

        {isProcessing && emails.length > 0 && (
          <div className="mt-2 text-center">
            <div className="inline-flex items-center gap-2 text-primary-600 text-sm">
              <svg
                className="animate-spin h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Loading more...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
