import type { ExportButtonsProps } from "~types";

export function ExportButtons({
  emails,
  disabled,
  separator,
}: ExportButtonsProps) {
  const handleCopy = async () => {
    try {
      const text = emails.join(separator);
      await navigator.clipboard.writeText(text);
      // Show success notification (could use a toast library)
      alert("Copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
      alert("Failed to copy to clipboard");
    }
  };

  const handleExportTxt = () => {
    const text = emails.join(separator);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `emails-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCsv = () => {
    // CSV format: one email per row
    const csv = emails.map((email) => `"${email}"`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `emails-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-2">
      {/* Copy Button */}
      <button
        type="button"
        onClick={handleCopy}
        disabled={disabled || emails.length === 0}
        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Copy all emails to clipboard"
      >
        <div className="flex items-center justify-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Copy
        </div>
      </button>

      {/* Export TXT Button */}
      <button
        type="button"
        onClick={handleExportTxt}
        disabled={disabled || emails.length === 0}
        className="px-4 py-2 text-sm font-medium text-primary-700 bg-primary-50 border border-primary-300 rounded-md hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Export as .txt file"
      >
        <div className="flex items-center justify-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          .TXT
        </div>
      </button>

      {/* Export CSV Button */}
      <button
        type="button"
        onClick={handleExportCsv}
        disabled={disabled || emails.length === 0}
        className="px-4 py-2 text-sm font-medium text-primary-700 bg-primary-50 border border-primary-300 rounded-md hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Export as .csv file"
      >
        <div className="flex items-center justify-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          .CSV
        </div>
      </button>
    </div>
  );
}
