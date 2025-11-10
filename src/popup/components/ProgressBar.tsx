import type { ProgressBarProps } from "~types";

export function ProgressBar({
  progress,
  totalCount,
  status,
}: ProgressBarProps) {
  const getStatusColor = () => {
    switch (status) {
      case "processing":
        return "bg-primary-600";
      case "completed":
        return "bg-green-600";
      case "error":
        return "bg-red-600";
      case "cancelled":
        return "bg-gray-600";
      default:
        return "bg-gray-300";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "processing":
        return "Processing...";
      case "completed":
        return "Complete!";
      case "error":
        return "Error";
      case "cancelled":
        return "Cancelled";
      default:
        return "Ready";
    }
  };

  return (
    <div className="space-y-2">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${getStatusColor()}`}
          style={{ width: `${Math.min(progress, 100)}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* Status Info */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">
          {getStatusText()} {status === "processing" && `${progress}%`}
        </span>
        {totalCount > 0 && (
          <span className="font-semibold text-primary-700">
            {totalCount.toLocaleString()} emails found
          </span>
        )}
      </div>
    </div>
  );
}
