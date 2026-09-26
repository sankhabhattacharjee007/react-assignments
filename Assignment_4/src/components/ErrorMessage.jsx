import React from 'react';
import { AlertCircleIcon, RefreshCwIcon } from './Icons';

export default function ErrorMessage({ error, onRetry }) {
  if (!error) return null;

  const isAuthError = error.includes('401') || error.toLowerCase().includes('api key') || error.toLowerCase().includes('activation');
  const isNotFoundError = error.includes('404') || error.toLowerCase().includes('not found');

  return (
    <div className="error-card glass-panel" role="alert">
      <div className="error-icon-wrapper">
        <AlertCircleIcon size={30} className="error-icon" />
      </div>

      <div className="error-content">
        <h3 className="error-title">
          {isAuthError
            ? 'Activating Weather Service'
            : isNotFoundError
            ? 'Location Not Found'
            : 'Unable to Load Weather'}
        </h3>
        <p className="error-description">
          {isAuthError
            ? 'Your OpenWeatherMap key is registered and currently completing activation on OpenWeatherMap servers (typically takes a few minutes). Please click Retry below.'
            : error}
        </p>

        {onRetry && (
          <div className="error-actions-group">
            <button type="button" className="btn btn-primary" onClick={onRetry}>
              <RefreshCwIcon size={16} /> Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
