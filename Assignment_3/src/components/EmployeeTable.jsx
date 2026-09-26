import React from 'react';

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  return (
    <div className="table-responsive-wrapper">
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name &amp; Role</th>
            <th>Department</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Local Address</th>
            <th>Permanent Address</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id || emp.empId}>
              <td className="font-mono text-emp-id">{emp.empId}</td>
              <td>
                <div className="table-name-cell">
                  <span className="name-bold">{emp.name}</span>
                  {emp.role && <span className="role-subtle">{emp.role}</span>}
                </div>
              </td>
              <td>
                <span className="table-dept-tag">{emp.department}</span>
              </td>
              <td>
                <span className={`gender-badge small ${emp.gender.toLowerCase()}`}>
                  {emp.gender}
                </span>
              </td>
              <td className="font-mono text-nowrap">{emp.phone}</td>
              <td className="address-col" title={emp.localAddress}>
                {emp.localAddress}
              </td>
              <td className="address-col" title={emp.permanentAddress}>
                {emp.permanentAddress}
              </td>
              <td>
                <div className="table-actions">
                  <button
                    type="button"
                    className="action-icon-btn edit"
                    onClick={() => onEdit(emp)}
                    title={`Edit ${emp.name}`}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="action-icon-btn delete"
                    onClick={() => onDelete(emp)}
                    title={`Delete ${emp.name}`}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
