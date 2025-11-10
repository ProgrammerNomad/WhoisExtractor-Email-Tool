import React from "react";

interface ProgressBarProps {
  progress: number;
  isExtracting: boolean;
  totalCount: number;
  onCancel?: () => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  isExtracting,
  totalCount,
  onCancel,
}) => {
  if (!isExtracting && progress === 0) {
    return null;
  }

  return (
    <div className="bg-white border-2 border-brand-lightBlue rounded-xl p-6 mb-6 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <span className="text-base font-bold text-text-dark">
            {isExtracting ? "Extracting..." : "Extraction Complete"}
          </span>
          <span className="text-sm font-semibold text-brand-blue bg-brand-lightBlue px-4 py-1 rounded-full">
            {totalCount.toLocaleString()} emails found
          </span>
        </div>
        {isExtracting && onCancel && (
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold bg-brand-red text-white rounded-lg hover:bg-red-700 transition-all duration-200 shadow hover:shadow-md"
          >
            <i className="fas fa-times mr-2"></i>
            Cancel
          </button>
        )}
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
        <div
          className={`h-3 rounded-full transition-all duration-300 ${
            isExtracting
              ? "bg-brand-blue"
              : "bg-brand-green"
          }`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      
      <div className="mt-2 text-sm font-medium text-text-muted">
        {progress.toFixed(1)}% complete
      </div>
    </div>
  );
};
