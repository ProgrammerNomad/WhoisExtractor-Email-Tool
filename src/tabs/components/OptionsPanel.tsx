import React from "react";
import { useLanguage } from "../hooks/useLanguage";
import { DEFAULT_FILTER_KEYWORDS } from "~types";

export interface ExtractionOptions {
  sort: boolean;
  dedupe: boolean;
  separator: string;
  keywords: string[];
  keywordsEnabled: boolean;
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

export const OptionsPanel: React.FC<OptionsPanelProps> = ({
  options,
  setOptions,
  isExtracting,
  totalCount,
}) => {
  const { t } = useLanguage();
  const [keywordText, setKeywordText] = React.useState(DEFAULT_FILTER_KEYWORDS);
  const [filterStringsText, setFilterStringsText] = React.useState("");
  const sortThreshold = 50000;

  // Initialize keywords from default text when keywords are enabled but array is empty
  React.useEffect(() => {
    if (options.keywordsEnabled && options.keywords.length === 0 && keywordText) {
      const keywords = keywordText.split(',').map(k => k.trim()).filter(k => k);
      if (keywords.length > 0) {
        setOptions({ ...options, keywords });
      }
    }
  }, [options.keywordsEnabled, options.keywords.length, keywordText]); // Watch for toggle changes

  const SEPARATOR_OPTIONS_I18N = [
    { value: "\n", label: t.options.outputOptions.separators.newline },
    { value: ", ", label: t.options.outputOptions.separators.comma },
    { value: "; ", label: t.options.outputOptions.separators.semicolon },
    { value: " | ", label: t.options.outputOptions.separators.pipe },
    { value: " : ", label: "Colon" },
    { value: "\t", label: "Tab" },
    { value: "custom", label: "Custom" },
  ];

  const handleKeywordsChange = (text: string) => {
    setKeywordText(text);
    const keywords = text.split(',').map(k => k.trim()).filter(k => k);
    setOptions({ ...options, keywords });
  };

  const handleFilterStringsChange = (text: string) => {
    setFilterStringsText(text);
    const strings = text.split('\n').map(s => s.trim()).filter(s => s);
    setOptions({ ...options, filterStrings: strings });
  };

  const showSortWarning = options.sort && totalCount > sortThreshold;

  const ToggleSwitch = ({ enabled, disabled = false }: { enabled: boolean; disabled?: boolean }) => (
    <button
      type="button"
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? "bg-brand-blue" : "bg-gray-300"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* LEFT COLUMN */}
      <div className="space-y-4">
        {/* Extraction Type */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-border-gray">
          <h3 className="text-lg font-bold text-text-dark mb-4">
            {t.options.extractionType.label}
          </h3>
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            {t.options.extractionType.label}
          </label>
          <select
            value={options.extractionType}
            onChange={(e) =>
              setOptions({
                ...options,
                extractionType: e.target.value as "email" | "url",
              })
            }
            disabled={isExtracting}
            className="w-full px-4 py-3 border-2 border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue text-text-dark font-medium"
          >
            <option value="email">{t.options.extractionType.email}</option>
            <option value="url">Web URLs</option>
          </select>
        </div>
      </div>

      {/* Basic Options */}
      <div className="bg-white shadow-md rounded-xl p-6 border border-border-gray space-y-4">
        <h3 className="text-lg font-bold text-text-dark mb-2">
          {t.options.basicOptions.label}
        </h3>

        {/* Deduplication Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <label className="text-sm font-medium text-text-dark cursor-pointer">
            {t.options.basicOptions.deduplicate}
          </label>
          <div onClick={() => !isExtracting && setOptions({ ...options, dedupe: !options.dedupe })}>
            <ToggleSwitch enabled={options.dedupe} disabled={isExtracting} />
          </div>
        </div>

        {/* Sort Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <label className="text-sm font-medium text-text-dark cursor-pointer">
            {t.options.basicOptions.sort}
          </label>
          <div onClick={() => !isExtracting && setOptions({ ...options, sort: !options.sort })}>
            <ToggleSwitch enabled={options.sort} disabled={isExtracting} />
          </div>
        </div>
        {showSortWarning && (
          <div className="text-xs text-orange-700 bg-orange-50 border border-orange-200 p-3 rounded-lg">
            ⚠ Sorting {totalCount.toLocaleString()} emails may impact performance
          </div>
        )}

        {/* Lowercase Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <label className="text-sm font-medium text-text-dark cursor-pointer">
            {t.options.basicOptions.lowercase}
          </label>
          <div onClick={() => !isExtracting && setOptions({ ...options, lowercase: !options.lowercase })}>
            <ToggleSwitch enabled={options.lowercase} disabled={isExtracting} />
          </div>
        </div>

        {/* Remove Numeric Emails Toggle */}
        <div className="flex items-center justify-between py-2">
          <label className="text-sm font-medium text-text-dark cursor-pointer">
            {t.options.basicOptions.removeNumeric}
          </label>
          <div onClick={() => !isExtracting && setOptions({ ...options, removeNumeric: !options.removeNumeric })}>
            <ToggleSwitch enabled={options.removeNumeric} disabled={isExtracting} />
          </div>
        </div>
      </div>

      {/* Output Formatting */}
      <div className="bg-brand-lightBlue shadow-md rounded-xl p-6 border border-brand-blue border-opacity-20">
        <h3 className="text-lg font-bold text-brand-blue mb-4">
          {t.options.outputOptions.label}
        </h3>

        {/* Separator Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-text-dark mb-2">
            {t.options.outputOptions.separator}
          </label>
          <select
            value={options.separator === "custom" || !SEPARATOR_OPTIONS_I18N.find(opt => opt.value === options.separator) ? "custom" : options.separator}
            onChange={(e) => {
              const value = e.target.value;
              if (value !== "custom") {
                setOptions({ ...options, separator: value, customSeparator: undefined });
              } else {
                setOptions({ ...options, separator: "custom" });
              }
            }}
            disabled={isExtracting}
            className="w-full px-4 py-3 border-2 border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue text-text-dark font-medium bg-white"
          >
            {SEPARATOR_OPTIONS_I18N.map((opt, idx) => (
              <option key={idx} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Separator Input */}
        {(options.separator === "custom" || !SEPARATOR_OPTIONS_I18N.find(opt => opt.value === options.separator)) && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-dark mb-2">
              Custom Separator
            </label>
            <input
              type="text"
              value={options.customSeparator || options.separator || ""}
              onChange={(e) =>
                setOptions({ ...options, customSeparator: e.target.value, separator: "custom" })
              }
              placeholder="Enter custom separator..."
              disabled={isExtracting}
              className="w-full px-4 py-3 border-2 border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue text-text-dark font-mono bg-white"
            />
          </div>
        )}

        {/* Group By Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-text-dark mb-2">
            {t.options.outputOptions.groupByLabel}
          </label>
          <select
            value={options.groupBy}
            onChange={(e) =>
              setOptions({
                ...options,
                groupBy: e.target.value as "domain" | "none" | "count",
              })
            }
            disabled={isExtracting}
            className="w-full px-4 py-3 border-2 border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue text-text-dark font-medium bg-white"
          >
            <option value="none">None</option>
            <option value="domain">By Domain</option>
            <option value="count">By Count</option>
          </select>
        </div>

        {/* Group By Count Input */}
        {options.groupBy === "count" && (
          <div>
            <label className="block text-sm font-medium text-text-dark mb-2">
              Emails per Group
            </label>
            <input
              type="number"
              min="1"
              value={options.groupByCount || 50}
              onChange={(e) =>
                setOptions({
                  ...options,
                  groupByCount: parseInt(e.target.value) || 50,
                })
              }
              placeholder="Ex. 50"
              disabled={isExtracting}
              className="w-full px-4 py-3 border-2 border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue text-text-dark bg-white"
            />
            <p className="text-xs text-text-muted mt-2">
              Groups separated by paragraph breaks
            </p>
          </div>
        )}
      </div>
      {/* End of Output Formatting */}
    </div>
    {/* End of Left Column */}

    {/* RIGHT COLUMN */}
    <div className="space-y-4">
        {/* Advanced Filters */}
        <div className="bg-green-50 shadow-md rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-bold text-green-800 mb-4">
          {t.options.advancedFilters.label}
        </h3>

        {/* Filter Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-text-dark mb-2">
            {t.options.advancedFilters.filterMode}
          </label>
          <select
            value={options.filterType}
            onChange={(e) =>
              setOptions({
                ...options,
                filterType: e.target.value as "include" | "exclude",
              })
            }
            disabled={isExtracting}
            className="w-full px-4 py-3 border-2 border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-text-dark font-medium bg-white"
          >
            <option value="include">Only Include</option>
            <option value="exclude">Exclude</option>
          </select>
          <p className="text-xs text-text-muted mt-2">
            {options.filterType === "include"
              ? "Extract only emails containing these strings"
              : "Exclude emails containing these strings"}
          </p>
        </div>

        {/* String Filter */}
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            {t.options.advancedFilters.removeStrings}
          </label>
          <textarea
            value={filterStringsText}
            onChange={(e) => handleFilterStringsChange(e.target.value)}
            placeholder={t.options.advancedFilters.removeStringsPlaceholder}
            rows={4}
            disabled={isExtracting}
            className="w-full px-4 py-3 border-2 border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-text-dark font-mono text-sm bg-white"
          />
          <p className="text-xs text-text-muted mt-2">
            {t.options.advancedFilters.removeStringsHelp}
          </p>
        </div>
      </div>

      {/* Keyword Filter */}
      <div className="bg-white shadow-md rounded-xl p-6 border border-border-gray">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-text-dark">
                  {t.options.keywordFilter.label}
                </h3>
                <p className="text-sm text-text-muted mt-1">
                  {t.options.keywordFilter.description}
                </p>
              </div>
              <div onClick={() => !isExtracting && setOptions({ ...options, keywordsEnabled: !options.keywordsEnabled })}>
                <ToggleSwitch enabled={options.keywordsEnabled} disabled={isExtracting} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            {t.options.keywordFilter.inputLabel}
          </label>
          <textarea
            value={keywordText}
            onChange={(e) => handleKeywordsChange(e.target.value)}
            placeholder={t.options.keywordFilter.placeholder}
            rows={3}
            disabled={isExtracting || !options.keywordsEnabled}
            className="w-full px-4 py-3 border-2 border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue text-text-dark font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-text-muted">
              {options.keywordsEnabled 
                ? t.options.keywordFilter.helpEnabled
                : t.options.keywordFilter.helpDisabled
              }
            </p>
            <a
              href="https://github.com/ProgrammerNomad/WhoisExtractor-Email-Tool/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand-blue hover:text-brand-darkBlue hover:underline font-medium"
            >
              {t.options.keywordFilter.requestLink}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};
