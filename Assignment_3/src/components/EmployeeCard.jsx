import React from 'react';

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  const {
    empId,
    name,
    department,
    gender,
    phone,
    role,
    localAddress,
    permanentAddress
  } = employee;

  const getGenderBadgeClass = (g) => {
    if (g === 'Female') return 'gender-badge female';
    if (g === 'Male') return 'gender-badge male';
    return 'gender-badge other';
  };

  return (
    <div className="employee-card">
      <div className="card-top-bar">
        <span className="emp-id-tag font-mono">{empId}</span>
        <span className={getGenderBadgeClass(gender)}>{gender}</span>
      </div>

      <div className="card-body">
        <div className="employee-identity">
          <h3 className="employee-name">{name}</h3>
          {role && <p className="employee-role">{role}</p>}
          <div className="employee-dept-badge" title={department}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span>{department}</span>
          </div>
        </div>

        <div className="contact-row">
          <span className="info-label">Phone:</span>
          <a href={`tel:${phone.replace(/\s+/g, '')}`} className="phone-link font-mono">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>{phone}</span>
          </a>
        </div>

        <div className="address-section">
          <div className="address-item">
            <div className="address-header">
              <span className="address-badge local">Local Address</span>
            </div>
            <p className="address-text" title={localAddress}>
              {localAddress}
            </p>
          </div>

          <div className="address-item">
            <div className="address-header">
              <span className="address-badge permanent">Permanent Address</span>
            </div>
            <p className="address-text" title={permanentAddress}>
              {permanentAddress}
            </p>
          </div>
        </div>

        <div className="card-actions">
          <button
            type="button"
            className="action-btn btn-edit"
            onClick={() => onEdit(employee)}
            title={`Edit details of ${name}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            <span>Edit</span>
          </button>

          <button
            type="button"
            className="action-btn btn-delete"
            onClick={() => onDelete(employee)}
            title={`Delete ${name}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
