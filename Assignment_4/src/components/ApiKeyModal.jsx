import React, { useState } from 'react';
import { CloseIcon, KeyIcon } from './Icons';
import { DEFAULT_API_KEY } from '../services/weatherApi';

export default function ApiKeyModal({
  isOpen,
  onClose,
  apiKey,
  onSaveApiKey
}) {
  const [keyInput, setKeyInput] = useState(apiKey || DEFAULT_API_KEY);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveApiKey(keyInput.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <KeyIcon size={22} className="modal-key-icon" />
            <h2 className="modal-title">API Key Configuration</h2>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <CloseIcon size={20} />
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSave} className="api-key-form">
            <label className="form-label" htmlFor="apiKeyInput">
              OpenWeatherMap API Key
            </label>
            <input
              id="apiKeyInput"
              type="text"
              className="api-key-input"
              placeholder="Paste your 32-character API key..."
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              required
            />

            <div className="api-guidance-box">
              <p className="guidance-title">OpenWeatherMap Activation Notice</p>
              <ul className="guidance-steps">
                <li>
                  Active Key: <code className="key-code">{apiKey || DEFAULT_API_KEY}</code>
                </li>
                <li>
                  New OpenWeatherMap keys typically take <strong>10 to 60 minutes</strong> after registration to activate across OpenWeatherMap's servers.
                </li>
                <li>
                  Once activated by OpenWeatherMap, all weather metrics will load automatically.
                </li>
              </ul>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setKeyInput(DEFAULT_API_KEY)}
              >
                Reset Default Key
              </button>
              <button type="submit" className="btn btn-primary">
                {savedSuccess ? 'Saved ✓' : 'Save & Fetch'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
