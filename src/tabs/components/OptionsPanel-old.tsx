import React from "react";

export interface ExtractionOptions {
  sort: boolean;
  dedupe: boolean;
  separator: string;
  keywords: string[];
  groupBy: "domain" | "none" | "count";
  groupByCount?: number;
  removeNumeric: boolean;
  extractionType: "email" | "url";
  filterType: "include" | "exclude";
  filterStrings: string[];
  lowercase: boolean;
  customSeparator?: string;
}

interface OptionsPanelProps {
  options: ExtractionOptions;
  setOptions: (options: ExtractionOptions) => void;
  isExtracting: boolean;
  totalCount: number;
}

const SEPARATOR_OPTIONS = [
  { value: "\n", label: "New Line" },
  { value: ", ", label: "Comma" },
  { value: "; ", label: "Semicolon" },
  { value: " | ", label: "Pipe" },
  { value: " : ", label: "Colon" },
  { value: "\t", label: "Tab" },
  { value: "custom", label: "Custom" },
];

const DEFAULT_KEYWORDS = [
  "whois", "domain", "dns", "proxy", "priv", "regi", "webmaster", 
  "protc", "obsc", "anonymiz", "@contac", "host", "gandi", "support",
  "qq.com", "naver.com", "hxmail.com", "pro.net", "xell.hk", "corp.com",
  "wix", ".html", "163", "139", "126"
];

export const OptionsPanel: React.FC<OptionsPanelProps> = ({
  options,
  setOptions,
  isExtracting,
  totalCount,
}) => {
  const [keywordInput, setKeywordInput] = React.useState("");
  const sortThreshold = 50000; // From copilot instructions

  const handleAddKeyword = () => {
    if (keywordInput.trim()) {
      setOptions({
        ...options,
        keywords: [...options.keywords, keywordInput.trim()],
      });
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (index: number) => {
    setOptions({
      ...options,
      keywords: options.keywords.filter((_, i) => i !== index),
    });
  };

  const showSortWarning = options.sort && totalCount > sortThreshold;

  return (
    <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Options
      </h3>

      {/* Deduplication Toggle */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Remove Duplicates
        </label>
        <button
          type="button"
          onClick={() => setOptions({ ...options, dedupe: !options.dedupe })}
          disabled={isExtracting}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            options.dedupe ? "bg-blue-600" : "bg-gray-300"
          } ${isExtracting ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              options.dedupe ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Sort Toggle */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Sort Results
        </label>
        <button
          type="button"
          onClick={() => setOptions({ ...options, sort: !options.sort })}
          disabled={isExtracting}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            options.sort ? "bg-blue-600" : "bg-gray-300"
          } ${isExtracting ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              options.sort ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
      {showSortWarning && (
        <div className="text-xs text-orange-600 bg-orange-50 dark:bg-orange-900/20 p-2 rounded">
          ⚠ Sorting {totalCount.toLocaleString()} emails may impact performance
        </div>
      )}

      {/* Remove Numeric Emails Toggle */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Remove Numeric Emails
        </label>
        <button
          type="button"
          onClick={() =>
            setOptions({ ...options, removeNumeric: !options.removeNumeric })
          }
          disabled={isExtracting}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            options.removeNumeric ? "bg-blue-600" : "bg-gray-300"
          } ${isExtracting ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              options.removeNumeric ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Separator Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Separator
        </label>
        <select
          value={SEPARATOR_OPTIONS.findIndex((opt) => opt.value === options.separator)}
          onChange={(e) =>
            setOptions({
              ...options,
              separator: SEPARATOR_OPTIONS[parseInt(e.target.value)].value,
            })
          }
          disabled={isExtracting}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {SEPARATOR_OPTIONS.map((opt, idx) => (
            <option key={idx} value={idx}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Group By Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Group By
        </label>
        <select
          value={options.groupBy}
          onChange={(e) =>
            setOptions({
              ...options,
              groupBy: e.target.value as "domain" | "none",
            })
          }
          disabled={isExtracting}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="none">None</option>
          <option value="domain">By Domain</option>
        </select>
      </div>

      {/* Keyword Filtering */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Filter by Keywords
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddKeyword()}
            placeholder="Add keyword..."
            disabled={isExtracting}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            onClick={handleAddKeyword}
            disabled={isExtracting || !keywordInput.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Add
          </button>
        </div>
        {options.keywords.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {options.keywords.map((keyword, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
              >
                {keyword}
                <button
                  onClick={() => handleRemoveKeyword(idx)}
                  disabled={isExtracting}
                  className="ml-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
