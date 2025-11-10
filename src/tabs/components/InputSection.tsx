import React from "react";

interface InputSectionProps {
  input: string;
  setInput: (value: string) => void;
  onExtract: () => void;
  onClear: () => void;
  isExtracting: boolean;
  onFileUpload: (file: File) => void;
}

export const InputSection: React.FC<InputSectionProps> = ({
  input,
  setInput,
  onExtract,
  onClear,
  isExtracting,
  onFileUpload,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const inputSize = new Blob([input]).size;
  const isLargeInput = inputSize >= 2 * 1024 * 1024; // 2 MB

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <textarea
          className="w-full h-64 px-4 py-3 border-2 border-border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue resize-none font-mono text-sm text-text-dark placeholder-text-muted"
          placeholder="Paste your text containing email addresses here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isExtracting}
        />
        <div className="mt-2 flex items-center justify-between text-xs text-text-muted">
          <span>Size: {(inputSize / 1024).toFixed(2)} KB</span>
          {isLargeInput && (
            <span className="text-orange-600 font-semibold bg-orange-50 px-2 py-1 rounded">
              ⚠ Large input - processing will run in background
            </span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-text-dark mb-2">
          Or Upload File
        </label>
        <input
          type="file"
          accept=".txt,.csv,.log,.json,.xml,.html"
          onChange={handleFileChange}
          disabled={isExtracting}
          className="block w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-lightBlue file:text-brand-blue hover:file:bg-blue-100"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={onExtract}
          disabled={!input.trim() || isExtracting}
          className="flex-1 px-6 py-3 bg-brand-blue text-white rounded-lg hover:bg-brand-darkBlue disabled:bg-gray-400 disabled:text-gray-200 dark:disabled:bg-gray-600 dark:disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
        >
          {isExtracting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Extracting...
            </span>
          ) : (
            <>
              <i className="fas fa-search mr-2"></i>
              Extract Emails
            </>
          )}
        </button>
        <button
          onClick={onClear}
          disabled={isExtracting}
          className="px-6 py-3 bg-brand-red text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:text-gray-200 dark:disabled:bg-gray-600 dark:disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
        >
          <i className="fas fa-redo mr-2"></i>
          Reset
        </button>
      </div>
    </div>
  );
};
