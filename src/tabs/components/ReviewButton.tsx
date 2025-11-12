/**
 * Review Button Component
 * Permanent button in footer to allow users to review anytime
 */

import React from "react";
import { openReviewPage, markAsReviewed } from "~utils/reviewPrompt";
import { useLanguage } from "../hooks/useLanguage";

export const ReviewButton: React.FC = () => {
  const { t } = useLanguage();

  const handleClick = async () => {
    await markAsReviewed();
    openReviewPage();
  };

  return (
    <button
      onClick={handleClick}
      className="text-xs text-brand-blue hover:text-brand-darkBlue hover:underline flex items-center gap-2 cursor-pointer bg-transparent border-none p-0"
      title={t.common.review}
    >
      <svg
        className="w-4 h-4"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span>{t.common.review}</span>
    </button>
  );
};
