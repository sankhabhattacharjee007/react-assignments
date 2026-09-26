import React from 'react';

export default function LoadingSpinner({ message = 'Fetching latest weather metrics...' }) {
  return (
    <div className="loading-container glass-panel" role="status" aria-live="polite">
      <div className="spinner-orb-wrapper">
        <div className="spinner-core"></div>
        <div className="spinner-orbit-ring"></div>
        <div className="spinner-pulse-ring"></div>
      </div>
      <p className="loading-text">{message}</p>
      <span className="loading-subtext">Connecting to weather satellites...</span>

      {/* Shimmer skeleton outline */}
      <div className="skeleton-preview-grid">
        <div className="skeleton-bar title-bar"></div>
        <div className="skeleton-bar temp-bar"></div>
        <div className="skeleton-cards-row">
          <div className="skeleton-mini-card"></div>
          <div className="skeleton-mini-card"></div>
          <div className="skeleton-mini-card"></div>
          <div className="skeleton-mini-card"></div>
        </div>
      </div>
    </div>
  );
}
