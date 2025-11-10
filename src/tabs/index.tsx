import React, { useState, useEffect } from "react";
import "./index.css";
import { InputSection } from "./components/InputSection";
import { OptionsPanel, type ExtractionOptions } from "./components/OptionsPanel";
import { ProgressBar } from "./components/ProgressBar";
import { ResultsDisplay } from "./components/ResultsDisplay";
import { ExportButtons } from "./components/ExportButtons";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { useExtractor } from "./hooks/useExtractor";
import { useSettings } from "./hooks/useSettings";

function TabsIndex() {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState<ExtractionOptions>({
    sort: true,
    dedupe: true,
    separator: "\n",
    keywords: [],
    groupBy: "none",
    removeNumeric: true,
    extractionType: "email",
    filterType: "exclude",
    filterStrings: [],
    lowercase: true,
    customSeparator: undefined,
    groupByCount: 50,
  });

  const {
    isExtracting,
    progress,
    totalCount,
    results,
    error,
    startExtraction,
    handleCancel,
    clearResults,
  } = useExtractor();

  const { settings, getDefaultOptions, loading: settingsLoading } = useSettings();

  // Initialize options from settings
  useEffect(() => {
    if (!settingsLoading) {
      setOptions(getDefaultOptions());
    }
  }, [settingsLoading]);

  // Show privacy notice on first run
  useEffect(() => {
    if (!settingsLoading && !settings.privacyNoticeShown) {
      const timer = setTimeout(() => {
        alert(
          "Privacy Notice:\n\n" +
            "All email extraction is processed locally in your browser and is NOT uploaded to any server.\n\n" +
            "Your data stays on your device."
        );
        chrome.storage.local.set({
          "whois_mail:settings": { ...settings, privacyNoticeShown: true },
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [settingsLoading, settings]);

  const handleExtract = () => {
    if (input.trim()) {
      startExtraction(input, options);
    }
  };

  const handleClear = () => {
    setInput("");
    clearResults();
  };

  const handleFileUpload = async (file: File) => {
    try {
      const text = await file.text();
      setInput(text);
      
      // Auto-extract for files
      const fileSize = file.size;
      if (fileSize >= 2 * 1024 * 1024) {
        const shouldContinue = confirm(
          `Large file detected (${(fileSize / 1024 / 1024).toFixed(2)} MB).\n\n` +
            "Processing will run in background and may take a while.\n\n" +
            "Continue?"
        );
        if (!shouldContinue) return;
      }
      
      startExtraction(text, options);
    } catch (error) {
      alert("Failed to read file: " + (error as Error).message);
    }
  };

  if (settingsLoading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-brand-blue border-t-transparent mb-4"></div>
          <div className="text-text-dark font-medium">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="bg-brand-blue shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Email Address Extractor
              </h1>
              <p className="text-sm text-blue-100 mt-1">
                Extract email addresses from any raw text data with advanced filtering options
              </p>
            </div>
            <div className="flex items-center gap-4">
              {totalCount > 0 && (
                <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                  <span className="text-2xl font-bold text-white">
                    {totalCount.toLocaleString()}
                  </span>
                  <span className="text-sm text-blue-100 ml-2">
                    email{totalCount !== 1 ? "s" : ""} found
                  </span>
                </div>
              )}
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-brand-red rounded-lg p-4 shadow">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-brand-red mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-text-dark font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <ProgressBar
          progress={progress}
          isExtracting={isExtracting}
          totalCount={totalCount}
          onCancel={handleCancel}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Input Only */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-md rounded-xl p-6 border border-border-gray">
              <h2 className="text-xl font-bold text-text-dark mb-4">Input Text</h2>
              <InputSection
                input={input}
                setInput={setInput}
                onExtract={handleExtract}
                onClear={handleClear}
                isExtracting={isExtracting}
                onFileUpload={handleFileUpload}
              />
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-md rounded-xl p-6 border border-border-gray h-[calc(100vh-12rem)]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-text-dark">
                  Extracted Emails
                </h2>
              </div>
              
              {/* Export Buttons */}
              <div className="mb-4">
                <ExportButtons
                  results={results}
                  separator={options.separator === "custom" ? (options.customSeparator || "\n") : options.separator}
                  disabled={isExtracting}
                />
              </div>

              {/* Results Display */}
              <div className="h-[calc(100%-8rem)] border border-border-gray rounded-lg overflow-hidden bg-bg-primary">
                <ResultsDisplay
                  results={results}
                  groupBy={options.groupBy}
                  separator={options.separator === "custom" ? (options.customSeparator || "\n") : options.separator}
                  groupByCount={options.groupByCount}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Options Panel - Full Width Below */}
        <div className="mt-6">
          <OptionsPanel
            options={options}
            setOptions={setOptions}
            isExtracting={isExtracting}
            totalCount={totalCount}
          />
        </div>
      </main>
    </div>
  );
}

export default TabsIndex;
