import React from "react";
import { useLanguage } from "../hooks/useLanguage";

interface ExportButtonsProps {
  results: string[];
  separator: string;
  disabled?: boolean;
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({
  results,
  separator,
  disabled = false,
}) => {
  const { t } = useLanguage();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      const text = results.join(separator);
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleExportTxt = () => {
    const text = results.join(separator);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `emails-${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportCsv = () => {
    // Create CSV with header
    const csv = ["Email Address", ...results].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `emails-${new Date().getTime()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const isDisabled = disabled || results.length === 0;

  return (
    <div className="flex gap-3">
      <button
        onClick={handleCopy}
        disabled={isDisabled}
        className="flex-1 px-6 py-3 bg-brand-green text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:text-gray-200 dark:disabled:bg-gray-600 dark:disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
      >
        {copied ? (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {t.results.copied}
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            {t.results.copyButton}
          </>
        )}
      </button>
      <button
        onClick={handleExportTxt}
        disabled={isDisabled}
        className="px-6 py-3 bg-brand-blue text-white rounded-lg hover:bg-brand-darkBlue disabled:bg-gray-400 disabled:text-gray-200 dark:disabled:bg-gray-600 dark:disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
        title={t.results.exportTxt}
      >
        <i className="fas fa-file-alt mr-2"></i>
        {t.results.exportTxt}
      </button>
      <button
        onClick={handleExportCsv}
        disabled={isDisabled}
        className="px-6 py-3 bg-brand-blue text-white rounded-lg hover:bg-brand-darkBlue disabled:bg-gray-400 disabled:text-gray-200 dark:disabled:bg-gray-600 dark:disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
        title={t.results.exportCsv}
      >
        <i className="fas fa-file-csv mr-2"></i>
        {t.results.exportCsv}
      </button>
    </div>
  );
};
