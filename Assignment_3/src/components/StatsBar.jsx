import React from 'react';

const StatsBar = ({ totalCount, filteredCount, departmentCount, genderCounts }) => {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-icon-wrapper red-primary">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <div className="stat-content">
          <span className="stat-label">Total Employees</span>
          <span className="stat-value">{totalCount}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper red-rose">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <div className="stat-content">
          <span className="stat-label">Farm Divisions</span>
          <span className="stat-value">{departmentCount}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper red-crimson">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <div className="stat-content">
          <span className="stat-label">Matching Filter</span>
          <span className="stat-value">{filteredCount}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper red-subtle">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
          </svg>
        </div>
        <div className="stat-content">
          <span className="stat-label">Gender Diversity</span>
          <div className="gender-mini-breakdown">
            <span>M: <strong>{genderCounts.male}</strong></span>
            <span>&bull;</span>
            <span>F: <strong>{genderCounts.female}</strong></span>
            {genderCounts.other > 0 && (
              <>
                <span>&bull;</span>
                <span>O: <strong>{genderCounts.other}</strong></span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
