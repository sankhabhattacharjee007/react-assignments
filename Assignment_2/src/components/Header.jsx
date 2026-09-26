import React from 'react';

const Header = ({
  portalTitle,
  portalSubtitle,
  totalStudents,
  avgCgpa,
  highestCgpa,
  cgpaSortOrder,
  onSortChange,
  searchQuery,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  departments
}) => {
  return (
    <header className="portal-header">
      <div className="navbar">
        <div className="brand-section">
          <div className="brand-icon">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
          </div>
          <div>
            <h1 className="portal-title">{portalTitle}</h1>
            <p className="portal-subtitle">{portalSubtitle}</p>
          </div>
        </div>

        <div className="header-badges">
          <span className="badge badge-accent">Assignment 2</span>
          <span className="badge badge-subtle">Props &amp; Reusability</span>
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon-wrapper blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Enrolled</span>
            <span className="stat-value">{totalStudents}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper emerald">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
              <polyline points="16 7 22 7 22 13"></polyline>
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Average CGPA</span>
            <span className="stat-value">{avgCgpa}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper amber">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="7"></circle>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Highest CGPA</span>
            <span className="stat-value">{highestCgpa}</span>
          </div>
        </div>
      </div>

      <div className="controls-bar">
        <div className="search-box">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search by student name, roll no, or branch..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => onSearchChange('')} title="Clear search">
              &times;
            </button>
          )}
        </div>

        <div className="filter-dropdown-wrapper">
          <label htmlFor="dept-filter" className="filter-label">Department:</label>
          <select
            id="dept-filter"
            className="select-input"
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
          >
            <option value="All">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="sort-controls">
          <span className="sort-label">Sort CGPA:</span>
          <div className="sort-button-group">
            <button
              type="button"
              className={`sort-btn ${cgpaSortOrder === 'none' ? 'active' : ''}`}
              onClick={() => onSortChange('none')}
              title="Default Order"
            >
              Default
            </button>
            <button
              type="button"
              className={`sort-btn ${cgpaSortOrder === 'desc' ? 'active' : ''}`}
              onClick={() => onSortChange('desc')}
              title="Highest to Lowest CGPA"
            >
              High &rarr; Low &darr;
            </button>
            <button
              type="button"
              className={`sort-btn ${cgpaSortOrder === 'asc' ? 'active' : ''}`}
              onClick={() => onSortChange('asc')}
              title="Lowest to Highest CGPA"
            >
              Low &rarr; High &uarr;
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
