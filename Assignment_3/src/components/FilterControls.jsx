import React from 'react';

const FilterControls = ({
  searchQuery,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  departments,
  viewMode,
  onViewModeChange,
  onResetFilters,
  hasActiveFilters
}) => {
  return (
    <div className="filter-controls-container">
      <div className="controls-bar">
        <div className="search-box">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, ID, phone, role, or address..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            id="employee-search-input"
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-btn"
              onClick={() => onSearchChange('')}
              title="Clear search"
            >
              &times;
            </button>
          )}
        </div>

        <div className="filter-dropdown-wrapper">
          <label htmlFor="department-select" className="filter-label">
            Department:
          </label>
          <select
            id="department-select"
            className="select-input"
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
          >
            <option value="All">All Departments ({departments.length})</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div className="view-toggle-group">
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => onViewModeChange('grid')}
            title="Card Grid View"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span>Cards</span>
          </button>
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => onViewModeChange('table')}
            title="Directory Table View"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            <span>Table</span>
          </button>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            className="btn-reset-compact"
            onClick={onResetFilters}
            title="Reset Search & Filters"
          >
            Reset
          </button>
        )}
      </div>

      <div className="department-pills-bar">
        <button
          type="button"
          className={`dept-pill ${selectedDepartment === 'All' ? 'active' : ''}`}
          onClick={() => onDepartmentChange('All')}
        >
          All
        </button>
        {departments.map((dept) => (
          <button
            key={dept}
            type="button"
            className={`dept-pill ${selectedDepartment === dept ? 'active' : ''}`}
            onClick={() => onDepartmentChange(dept)}
          >
            {dept}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterControls;
