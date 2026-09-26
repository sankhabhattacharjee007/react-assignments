import React from 'react';

const DeleteConfirmModal = ({ employee, onConfirm, onCancel }) => {
  if (!employee) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div
        className="modal-container delete-dialog"
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
      >
        <div className="delete-dialog-content">
          <div className="delete-icon-wrapper">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>

          <h3 className="delete-title">Delete Employee Record?</h3>
          <p className="delete-desc">
            Are you sure you want to remove <strong>{employee.name}</strong> (
            <span className="font-mono">{employee.empId}</span>) from the <em>{employee.department}</em> division?
          </p>
          <p className="delete-warning">
            This action cannot be undone. All local and permanent address records will be permanently deleted from state.
          </p>
        </div>

        <div className="modal-footer delete-footer">
          <button
            type="button"
            className="btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-danger"
            onClick={onConfirm}
            id="confirm-delete-btn"
          >
            Yes, Delete Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
