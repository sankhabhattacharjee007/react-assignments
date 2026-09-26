import React, { useState } from 'react';
import { SearchIcon, CloseIcon, CrosshairIcon } from './Icons';

export default function SearchBar({ onSearch, onUseCurrentLocation, isLoading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  const handleLocationClick = () => {
    setQuery('');
    if (onUseCurrentLocation) {
      onUseCurrentLocation();
    }
  };

  return (
    <div className="search-section">
      <form className="search-bar-form" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <span className="search-icon-adornment">
            <SearchIcon size={20} />
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Search city (e.g., London, Tokyo, New York)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
          />
          {query && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={handleClear}
              title="Clear input"
              aria-label="Clear input"
            >
              <CloseIcon size={16} />
            </button>
          )}
        </div>

        {onUseCurrentLocation && (
          <button
            type="button"
            className="location-btn"
            onClick={handleLocationClick}
            disabled={isLoading}
            title="Use current device location"
            aria-label="Use current device location"
          >
            <CrosshairIcon size={18} />
          </button>
        )}

        <button
          type="submit"
          className="search-submit-btn"
          disabled={isLoading || !query.trim()}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
}
