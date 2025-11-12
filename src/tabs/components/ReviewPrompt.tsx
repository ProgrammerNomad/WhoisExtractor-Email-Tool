/**
 * Review Prompt Modal Component
 * Shows a friendly prompt asking users to review the extension
 */

import React, { useEffect, useState } from "react";
import {
  shouldShowReviewPrompt,
  markPromptShown,
  markAsReviewed,
  markDontAskAgain,
  openReviewPage,
  getDaysSinceInstall,
  getReviewPromptData,
} from "~utils/reviewPrompt";
import { useLanguage, interpolate } from "../hooks/useLanguage";

export const ReviewPrompt: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [days, setDays] = useState(0);
  const [extractionCount, setExtractionCount] = useState(0);
  const [totalEmails, setTotalEmails] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    checkAndShowPrompt();
  }, []);

  const checkAndShowPrompt = async () => {
    const shouldShow = await shouldShowReviewPrompt();
    if (shouldShow) {
      const daysSinceInstall = await getDaysSinceInstall();
      const data = await getReviewPromptData();
      setDays(daysSinceInstall);
      setExtractionCount(data.extractionCount);
      setTotalEmails(data.totalEmailsExtracted);
      setIsVisible(true);
      await markPromptShown();
    }
  };

  const handleRateNow = async () => {
    await markAsReviewed();
    openReviewPage();
    setIsVisible(false);
  };

  const handleLater = () => {
    setIsVisible(false);
  };

  const handleDontAsk = async () => {
    await markDontAskAgain();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 p-6 animate-scaleIn">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-3">
          {t.review.title}
        </h3>

        {/* Message */}
        <p className="text-center text-gray-600 dark:text-gray-300 mb-2">
          {interpolate(t.review.message, { days, count: extractionCount })}
        </p>
        
        {/* Total Emails Extracted - Highlight */}
        {totalEmails > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-6">
            <p className="text-center text-sm text-gray-700 dark:text-gray-300">
              {interpolate(t.review.totalExtracted || "You've extracted <strong>{{total}}</strong> emails so far!", { total: totalEmails.toLocaleString() })}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="space-y-3">
          {/* Rate Now */}
          <button
            onClick={handleRateNow}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            {t.review.rateNow}
          </button>

          {/* Later */}
          <button
            onClick={handleLater}
            className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            {t.review.later}
          </button>

          {/* Don't Ask */}
          <button
            onClick={handleDontAsk}
            className="w-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm py-2 transition-colors duration-200 focus:outline-none"
          >
            {t.review.dontAsk}
          </button>
        </div>
      </div>
    </div>
  );
};
