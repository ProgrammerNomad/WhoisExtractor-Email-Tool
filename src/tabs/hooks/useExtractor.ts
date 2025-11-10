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

  // Note: Port connection disabled - using client-side extraction for now
  // Background worker communication will be implemented later

  const startExtraction = useCallback(
    (input: string, options: ExtractionOptions) => {
      // Reset state
      setState({
        isExtracting: true,
        progress: 0,
        totalCount: 0,
        results: [],
        error: null,
      });

      // Perform client-side extraction
      setTimeout(() => {
        try {
          // Improved email regex with word boundaries to avoid capturing invalid prefixes
          const emailRegex = /\b[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9][a-zA-Z0-9.-]*\.[a-zA-Z]{2,}\b/g;
          const matches = input.match(emailRegex) || [];
          
          let emails = matches.map(email => {
            // Clean up any trailing dots or hyphens
            return email.replace(/[.-]+$/, '').toLowerCase();
          });
          
          // Apply dedupe
          if (options.dedupe) {
            emails = [...new Set(emails)];
          }
          
          // Apply keyword filter if enabled
          if (options.keywordsEnabled && options.keywords.length > 0) {
            emails = emails.filter(email => {
              return !options.keywords.some(keyword => 
                email.toLowerCase().includes(keyword.toLowerCase())
              );
            });
          }
          
          // Apply string filter
          if (options.filterStrings.length > 0) {
            if (options.filterType === "include") {
              emails = emails.filter(email => 
                options.filterStrings.some(str => 
                  email.toLowerCase().includes(str.toLowerCase())
                )
              );
            } else {
              emails = emails.filter(email => 
                !options.filterStrings.some(str => 
                  email.toLowerCase().includes(str.toLowerCase())
                )
              );
            }
          }
          
          // Apply lowercase conversion
          if (options.lowercase) {
            emails = emails.map(email => email.toLowerCase());
          }
          
          // Apply numeric domain removal
          if (options.removeNumeric) {
            emails = emails.filter(email => {
              const domain = email.split('@')[1];
              return domain && !/^\d+\.\d+\.\d+\.\d+$/.test(domain);
            });
          }
          
          // Apply sorting
          if (options.sort) {
            emails.sort();
          }
          
          setState({
            isExtracting: false,
            progress: 100,
            totalCount: emails.length,
            results: emails,
            error: null,
          });
        } catch (error) {
          setState(prev => ({
            ...prev,
            isExtracting: false,
            error: error instanceof Error ? error.message : "Extraction failed",
          }));
        }
      }, 100);
    },
    []
  );

  const handleCancel = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isExtracting: false,
    }));
  }, []);

  const clearResults = useCallback(() => {
    setState({
      isExtracting: false,
      progress: 0,
      totalCount: 0,
      results: [],
      error: null,
    });
  }, []);

  return {
    ...state,
    startExtraction,
    handleCancel,
    clearResults,
  };
};
