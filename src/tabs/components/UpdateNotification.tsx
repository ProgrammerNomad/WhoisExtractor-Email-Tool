import React from 'react';
import { useLanguage, interpolate } from '../hooks/useLanguage';
import { dismissUpdate, reloadExtension } from '../../utils/updateNotification';

interface UpdateNotificationProps {
  version: string;
  onDismiss: () => void;
}

export function UpdateNotification({ version, onDismiss }: UpdateNotificationProps) {
  const { t } = useLanguage();

  const handleUpdate = () => {
    reloadExtension();
  };

  const handleDismiss = async () => {
    await dismissUpdate();
    onDismiss();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4 animate-scaleIn">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t.update.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-1">
              {interpolate(t.update.message, { version })}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t.update.description}
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleUpdate}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            {t.update.updateNow}
          </button>
          <button
            onClick={handleDismiss}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
          >
            {t.update.later}
          </button>
        </div>
      </div>
    </div>
  );
}
