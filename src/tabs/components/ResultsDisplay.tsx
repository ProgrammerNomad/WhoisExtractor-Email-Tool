import React from "react";

interface ResultsDisplayProps {
  results: string[];
  groupBy: "domain" | "none" | "count";
  separator: string;
  groupByCount?: number;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  groupBy,
  separator,
  groupByCount = 50,
}) => {
  const groupedResults = React.useMemo(() => {
    if (groupBy === "none") {
      return { all: results };
    }

    if (groupBy === "count") {
      // Group by count
      const groups: Record<string, string[]> = {};
      for (let i = 0; i < results.length; i += groupByCount) {
        const groupNum = Math.floor(i / groupByCount) + 1;
        groups[`Group ${groupNum}`] = results.slice(i, i + groupByCount);
      }
      return groups;
    }

    // Group by domain
    const groups: Record<string, string[]> = {};
    results.forEach((email) => {
      const domain = email.split("@")[1] || "invalid";
      if (!groups[domain]) {
        groups[domain] = [];
      }
      groups[domain].push(email);
    });

    return groups;
  }, [results, groupBy, groupByCount]);

  if (results.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-text-muted bg-white">
        <div className="text-center">
          <svg
            className="mx-auto h-16 w-16 mb-4 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <p className="text-lg font-medium text-text-dark">No emails extracted yet</p>
          <p className="text-sm mt-2 text-text-muted">
            Paste text or upload a file to get started
          </p>
        </div>
      </div>
    );
  }

  if (groupBy === "none") {
    return (
      <div className="h-full overflow-auto bg-white">
        <pre className="text-sm text-text-dark whitespace-pre-wrap break-all font-mono p-4">
          {results.join(separator)}
        </pre>
      </div>
    );
  }

  // Display grouped
  return (
    <div className="h-full overflow-auto bg-white">
      <div className="space-y-4 p-4">
        {Object.entries(groupedResults)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([groupName, emails]) => (
            <div
              key={groupName}
              className="border-2 border-brand-lightBlue bg-white rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-border-gray">
                <h4 className="font-bold text-brand-blue text-base">
                  {groupBy === "domain" ? `@${groupName}` : groupName}
                </h4>
                <span className="text-xs font-semibold text-text-muted bg-brand-lightBlue px-3 py-1 rounded-full">
                  {emails.length} email{emails.length !== 1 ? "s" : ""}
                </span>
              </div>
              <pre className="text-sm text-text-dark whitespace-pre-wrap break-all font-mono">
                {emails.join(separator)}
              </pre>
            </div>
          ))}
      </div>
    </div>
  );
};
