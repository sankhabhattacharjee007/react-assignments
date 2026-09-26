import React from 'react';

const Navbar = ({ onOpenAddModal, totalEmployees }) => {
  return (
    <header className="portal-header">
      <div className="navbar">
        <div className="brand-section">
          <div className="brand-icon">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm-9-1a2 2 0 0 1 4 0v1h-4V6zm9 13H5V9h14v10z"></path>
              <circle cx="12" cy="14" r="2"></circle>
            </svg>
          </div>
          <div>
            <h1 className="portal-title">Farm Employee Directory</h1>
            <p className="portal-subtitle">Agricultural Operations &amp; Staff Management Portal</p>
          </div>
        </div>

        <div className="navbar-actions">
          <div className="header-badges">
            <span className="badge badge-accent">Assignment 3</span>
            <span className="badge badge-subtle">{totalEmployees} On Duty</span>
          </div>

          <button
            type="button"
            className="btn-primary"
            onClick={onOpenAddModal}
            id="add-employee-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Add Employee</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
