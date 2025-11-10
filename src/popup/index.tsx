import { useState, useEffect } from "react";
import { InputSection } from "./components/InputSection";
import { OptionsPanel } from "./components/OptionsPanel";
import { ResultsDisplay } from "./components/ResultsDisplay";
import { ProgressBar } from "./components/ProgressBar";
import { ExportButtons } from "./components/ExportButtons";
import { useExtractor } from "./hooks/useExtractor";
import { useSettings } from "./hooks/useSettings";
import { hasPrivacyNoticeBeenShown, markPrivacyNoticeShown } from "~utils/storage";
import type { ExtractionOptions } from "~types";
import { SEPARATOR_OPTIONS } from "~types";
import "./index.css";

function IndexPopup() {
  const { settings, loading: settingsLoading } = useSettings();
  const {
    status,
    emails,
    progress,
    totalCount,
    error,
    startExtraction,
    cancel,
    reset,
    isProcessing,
    isCompleted,
  } = useExtractor();

  const [inputText, setInputText] = useState("");
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(false);

  const [options, setOptions] = useState<ExtractionOptions>({
    sort: true,
    dedupe: true,
    separator: SEPARATOR_OPTIONS.newline,
    keywords: [],
    groupBy: "none",
  });

  // Check for first-run privacy notice
  useEffect(() => {
    checkPrivacyNotice();
  }, []);

  const checkPrivacyNotice = async () => {
    const shown = await hasPrivacyNoticeBeenShown();
    if (!shown) {
      setShowPrivacyNotice(true);
    }
  };

  const handlePrivacyNoticeDismiss = async () => {
    await markPrivacyNoticeShown();
    setShowPrivacyNotice(false);
  };

  const handleExtract = async () => {
    const input = inputFile || inputText;

    if (!input) {
      alert("Please provide text or upload a file");
      return;
    }

    await startExtraction(input, options);
  };

  const handleCancel = () => {
    cancel();
  };

  const handleReset = () => {
    reset();
    setInputText("");
    setInputFile(null);
  };

  if (settingsLoading) {
    return (
      <div className="w-[600px] h-[700px] flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="spinner mx-auto mb-3" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[600px] h-[700px] bg-white overflow-hidden flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">WhoisExtractor</h1>
            <p className="text-xs text-primary-100">Email Extraction Tool</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-primary-100">Local Processing</div>
            <div className="text-xs font-medium">No Data Upload</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-6 space-y-6">
          {/* Input Section */}
          <section>
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              1. Input
            </h2>
            <InputSection
              onTextChange={setInputText}
              onFileChange={setInputFile}
              disabled={isProcessing}
            />
          </section>

          {/* Options Section */}
          <section>
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              2. Options
            </h2>
            <OptionsPanel
              options={options}
              onOptionsChange={setOptions}
              disabled={isProcessing}
              emailCount={totalCount}
            />
          </section>

          {/* Action Buttons */}
          <section>
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              3. Extract
            </h2>
            <div className="flex gap-3">
              {!isProcessing && !isCompleted && (
                <button
                  type="button"
                  onClick={handleExtract}
                  disabled={!inputText && !inputFile}
                  className="flex-1 px-6 py-3 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all"
                >
                  Extract Emails
                </button>
              )}

              {isProcessing && (
                <>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 px-6 py-3 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-md transition-all"
                  >
                    Cancel
                  </button>
                </>
              )}

              {isCompleted && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 px-6 py-3 text-sm font-semibold text-primary-700 bg-primary-50 border-2 border-primary-300 rounded-lg hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-sm transition-all"
                >
                  Start New Extraction
                </button>
              )}
            </div>
          </section>

          {/* Progress */}
          {(isProcessing || isCompleted) && (
            <section>
              <ProgressBar
                progress={progress}
                totalCount={totalCount}
                status={status}
              />
            </section>
          )}

          {/* Error Display */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-red-900">Error</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {(isProcessing || emails.length > 0) && (
            <section>
              <h2 className="text-sm font-semibold text-gray-700 mb-3">
                4. Results
              </h2>
              <ResultsDisplay emails={emails} isProcessing={isProcessing} />
            </section>
          )}

          {/* Export */}
          {emails.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-gray-700 mb-3">
                5. Export
              </h2>
              <ExportButtons
                emails={emails}
                disabled={isProcessing}
                separator={options.separator}
              />
            </section>
          )}
        </div>
      </main>

      {/* Privacy Notice */}
      {showPrivacyNotice && (
        <div className="privacy-notice">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-blue-600 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-blue-900">
                Privacy Notice
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                Processing is local and not uploaded. You may opt-in to server
                processing in Settings.
              </p>
              <button
                type="button"
                onClick={handlePrivacyNoticeDismiss}
                className="mt-3 px-4 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IndexPopup;
