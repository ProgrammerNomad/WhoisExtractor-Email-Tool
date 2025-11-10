import { useState, useRef, type ChangeEvent } from "react";
import type { InputSectionProps } from "~types";

export function InputSection({
  onTextChange,
  onFileChange,
  disabled,
}: InputSectionProps) {
  const [inputMethod, setInputMethod] = useState<"text" | "file">("text");
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onTextChange(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFileName(file.name);
      onFileChange(file);
    } else {
      setFileName("");
      onFileChange(null);
    }
  };

  const handleClearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFileName("");
    onFileChange(null);
  };

  return (
    <div className="space-y-3">
      {/* Input Method Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          type="button"
          onClick={() => setInputMethod("text")}
          disabled={disabled}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            inputMethod === "text"
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-gray-500 hover:text-gray-700"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Paste Text
        </button>
        <button
          type="button"
          onClick={() => setInputMethod("file")}
          disabled={disabled}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            inputMethod === "file"
              ? "text-primary-600 border-b-2 border-primary-600"
              : "text-gray-500 hover:text-gray-700"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Upload File
        </button>
      </div>

      {/* Text Input */}
      {inputMethod === "text" && (
        <div>
          <label htmlFor="text-input" className="sr-only">
            Paste text to extract emails
          </label>
          <textarea
            id="text-input"
            placeholder="Paste your text here to extract email addresses..."
            onChange={handleTextChange}
            disabled={disabled}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm font-mono resize-y"
          />
          <p className="mt-1 text-xs text-gray-500">
            Supports plain text, CSV, or any text format
          </p>
        </div>
      )}

      {/* File Input */}
      {inputMethod === "file" && (
        <div>
          <label
            htmlFor="file-input"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="mb-1 text-sm text-gray-600">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">TXT, CSV, or any text file</p>
            </div>
            <input
              id="file-input"
              ref={fileInputRef}
              type="file"
              accept=".txt,.csv,.log,.json,text/*"
              onChange={handleFileChange}
              disabled={disabled}
              className="hidden"
            />
          </label>

          {fileName && (
            <div className="mt-2 flex items-center justify-between px-3 py-2 bg-primary-50 border border-primary-200 rounded-md">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-primary-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium text-primary-900">
                  {fileName}
                </span>
              </div>
              <button
                type="button"
                onClick={handleClearFile}
                disabled={disabled}
                className="text-primary-600 hover:text-primary-800 disabled:opacity-50"
                aria-label="Remove file"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
