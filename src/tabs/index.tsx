import React, { useState, useEffect } from "react";
import "./index.css";
import { InputSection } from "./components/InputSection";
import { OptionsPanel, type ExtractionOptions } from "./components/OptionsPanel";
import { ProgressBar } from "./components/ProgressBar";
import { ResultsDisplay } from "./components/ResultsDisplay";
import { ExportButtons } from "./components/ExportButtons";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { ReviewPrompt } from "./components/ReviewPrompt";
import { ReviewButton } from "./components/ReviewButton";
import { UpdateNotification } from "./components/UpdateNotification";
import { useExtractor } from "./hooks/useExtractor";
import { useSettings } from "./hooks/useSettings";
import { useLanguage, interpolate } from "./hooks/useLanguage";
import { recordExtraction, getTotalEmailsExtracted } from "~utils/reviewPrompt";
import { shouldShowUpdateNotification, getUpdateData } from "~utils/updateNotification";

function TabsIndex() {
  const { t, isLoading: langLoading } = useLanguage();
  const [input, setInput] = useState("");
  const [updateVersion, setUpdateVersion] = useState<string | null>(null);
  const [grandTotal, setGrandTotal] = useState<number>(0); // Lifetime total across all sessions
  const [options, setOptions] = useState<ExtractionOptions>({
    sort: true,
    dedupe: true,
    separator: "\n",
    keywords: [],
    keywordsEnabled: false,
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

  // Load grand total on mount and listen for changes
  useEffect(() => {
    const loadGrandTotal = async () => {
      const total = await getTotalEmailsExtracted();
      setGrandTotal(total);
    };

    loadGrandTotal();

    // Listen for storage changes to update grand total in real-time
    const handleStorageChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: string
    ) => {
      if (areaName === "local" && changes["whois_mail:reviewPrompt"]) {
        const newData = changes["whois_mail:reviewPrompt"].newValue;
        if (newData?.totalEmailsExtracted !== undefined) {
          setGrandTotal(newData.totalEmailsExtracted);
        }
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => chrome.storage.onChanged.removeListener(handleStorageChange);
  }, []);

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

  // Check for available updates
  useEffect(() => {
    const checkUpdate = async () => {
      const shouldShow = await shouldShowUpdateNotification();
      if (shouldShow) {
        const data = await getUpdateData();
        if (data.newVersion) {
          setUpdateVersion(data.newVersion);
        }
      }
    };
    
    checkUpdate();

    // Listen for update notifications from background worker
    const handleMessage = (message: any) => {
      if (message.type === "update-available" && message.version) {
        setUpdateVersion(message.version);
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);
    return () => chrome.runtime.onMessage.removeListener(handleMessage);
  }, []);

  const handleExtract = async () => {
    if (input.trim()) {
      await startExtraction(input, options);
      // Record successful extraction for review prompt
      // Wait a bit for extraction to complete, then record the count
      setTimeout(async () => {
        if (totalCount > 0) {
          await recordExtraction(totalCount);
        }
      }, 200);
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

  if (settingsLoading || langLoading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-brand-blue border-t-transparent mb-4"></div>
          <div className="text-text-dark font-medium">{t.common.loading}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Review Prompt Modal */}
      <ReviewPrompt />
      
      {/* Update Notification Modal */}
      {updateVersion && (
        <UpdateNotification
          version={updateVersion}
          onDismiss={() => setUpdateVersion(null)}
        />
      )}
      
      {/* Header */}
      <header className="bg-brand-blue shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                {t.header.title}
              </h1>
              <p className="text-sm text-blue-100 mt-1">
                {t.header.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Grand Total - Always visible if > 0 */}
              {grandTotal > 0 && (
                <div className="bg-white bg-opacity-10 rounded-lg px-4 py-2 border border-white border-opacity-20">
                  <div className="text-xs text-blue-100 uppercase tracking-wide mb-1">
                    {t.header.totalExtracted || "Total Extracted"}
                  </div>
                  <div className="text-xl font-bold text-white">
                    {grandTotal.toLocaleString()}
                  </div>
                </div>
              )}
              
              {/* Current Extraction Count */}
              {totalCount > 0 && (
                <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                  <div className="text-xs text-blue-100 uppercase tracking-wide mb-1">
                    {t.header.current || "Current"}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">
                      {totalCount.toLocaleString()}
                    </span>
                    <span className="text-sm text-blue-100">
                      {interpolate(t.header.emailCount, { count: totalCount })}
                    </span>
                  </div>
                </div>
              )}
              <LanguageSwitcher />
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
              <h2 className="text-xl font-bold text-text-dark mb-4">{t.input.title}</h2>
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
                  {t.results.title}
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

      {/* Footer */}
      <footer className="bg-white dark:bg-bg-secondary border-t border-border-gray mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* About */}
            <div>
              <h3 className="text-sm font-bold text-text-dark mb-3">{t.footer.about.title}</h3>
              <p className="text-xs text-text-muted">
                {t.footer.about.description}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-bold text-text-dark mb-3">{t.footer.quickLinks.title}</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/ProgrammerNomad/WhoisExtractor-Email-Tool"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-brand-blue hover:text-brand-darkBlue hover:underline flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    {t.footer.quickLinks.github}
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/ProgrammerNomad/WhoisExtractor-Email-Tool/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-brand-blue hover:text-brand-darkBlue hover:underline flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {t.footer.quickLinks.issues}
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/ProgrammerNomad/WhoisExtractor-Email-Tool/blob/main/PRIVACY.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-brand-blue hover:text-brand-darkBlue hover:underline flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    {t.footer.quickLinks.privacy}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.whoisextractor.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-brand-blue hover:text-brand-darkBlue hover:underline flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    {t.footer.quickLinks.website}
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-bold text-text-dark mb-3">{t.footer.support.title}</h3>
              <p className="text-xs text-text-muted mb-3">
                {t.footer.support.description}
              </p>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/ProgrammerNomad/WhoisExtractor-Email-Tool"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-brand-blue hover:text-brand-darkBlue hover:underline flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                    {t.footer.support.star}
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/ProgrammerNomad/WhoisExtractor-Email-Tool/fork"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-brand-blue hover:text-brand-darkBlue hover:underline flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    {t.footer.support.contribute}
                  </a>
                </li>
                <li>
                  <ReviewButton />
                </li>
              </ul>
            </div>
          </div>

          {/* Open Source Notice */}
          <div className="mt-6 pt-4 border-t border-border-gray text-center">
            <p className="text-xs text-text-muted">
              <span className="font-semibold text-brand-green">{t.footer.about.opensource}</span>
            </p>
            <p className="text-xs text-text-muted mt-1">
              {t.footer.about.message}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default TabsIndex;
