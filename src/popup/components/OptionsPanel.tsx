import { useState } from "react";
import type { OptionsPanelProps, SeparatorType } from "~types";
import { SEPARATOR_OPTIONS } from "~types";

export function OptionsPanel({
  options,
  onOptionsChange,
  disabled,
  emailCount,
}: OptionsPanelProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [keywordInput, setKeywordInput] = useState("");

  const handleSortToggle = () => {
    if (emailCount > 50000) {
      const confirmed = confirm(
        `You have ${emailCount.toLocaleString()} emails. Sorting may take a while. Continue?`
      );
      if (!confirmed) return;
    }
    onOptionsChange({ ...options, sort: !options.sort });
  };

  const handleDedupeToggle = () => {
    onOptionsChange({ ...options, dedupe: !options.dedupe });
  };

  const handleSeparatorChange = (separator: string) => {
    onOptionsChange({ ...options, separator });
  };

  const handleGroupByChange = (groupBy: "domain" | "none") => {
    onOptionsChange({ ...options, groupBy });
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim()) {
      const newKeywords = [...(options.keywords || []), keywordInput.trim()];
      onOptionsChange({ ...options, keywords: newKeywords });
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (index: number) => {
    const newKeywords = [...(options.keywords || [])];
    newKeywords.splice(index, 1);
    onOptionsChange({ ...options, keywords: newKeywords });
  };

  return (
    <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">Options</h3>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-xs text-primary-600 hover:text-primary-800"
        >
          {showAdvanced ? "Hide" : "Show"} Advanced
        </button>
      </div>

      {/* Basic Options */}
      <div className="grid grid-cols-2 gap-3">
        {/* Sort Toggle */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={options.sort}
            onChange={handleSortToggle}
            disabled={disabled}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 disabled:opacity-50"
          />
          <span className="text-sm text-gray-700">Sort A-Z</span>
        </label>

        {/* Dedupe Toggle */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={options.dedupe}
            onChange={handleDedupeToggle}
            disabled={disabled}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 disabled:opacity-50"
          />
          <span className="text-sm text-gray-700">Remove Duplicates</span>
        </label>
      </div>

      {/* Separator Selection */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Output Separator
        </label>
        <select
          value={options.separator}
          onChange={(e) => handleSeparatorChange(e.target.value)}
          disabled={disabled}
          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value={SEPARATOR_OPTIONS.newline}>New Line</option>
          <option value={SEPARATOR_OPTIONS.comma}>Comma (,)</option>
          <option value={SEPARATOR_OPTIONS.semicolon}>Semicolon (;)</option>
          <option value={SEPARATOR_OPTIONS.pipe}>Pipe (|)</option>
          <option value={SEPARATOR_OPTIONS.tab}>Tab</option>
        </select>
      </div>

      {/* Advanced Options */}
      {showAdvanced && (
        <div className="space-y-3 pt-3 border-t border-gray-300">
          {/* Group By */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Group By
            </label>
            <select
              value={options.groupBy || "none"}
              onChange={(e) =>
                handleGroupByChange(e.target.value as "domain" | "none")
              }
              disabled={disabled}
              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="none">None</option>
              <option value="domain">By Domain</option>
            </select>
          </div>

          {/* Keyword Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Keyword Filters (optional)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddKeyword()}
                placeholder="Add keyword..."
                disabled={disabled}
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100"
              />
              <button
                type="button"
                onClick={handleAddKeyword}
                disabled={disabled || !keywordInput.trim()}
                className="px-3 py-1.5 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>

            {/* Keywords List */}
            {options.keywords && options.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {options.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-800 rounded text-xs"
                  >
                    {keyword}
                    <button
                      type="button"
                      onClick={() => handleRemoveKeyword(index)}
                      disabled={disabled}
                      className="hover:text-primary-900"
                      aria-label={`Remove keyword: ${keyword}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
