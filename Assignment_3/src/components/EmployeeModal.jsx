import React, { useState, useEffect } from 'react';
import { FARM_DEPARTMENTS, GENDER_OPTIONS } from '../data/initialEmployees';

const EmployeeModal = ({ isOpen, onClose, onSave, initialData }) => {
  const isEditMode = Boolean(initialData);

  const [formData, setFormData] = useState({
    empId: '',
    name: '',
    department: FARM_DEPARTMENTS[0],
    gender: 'Male',
    phone: '',
    role: '',
    localAddress: '',
    permanentAddress: ''
  });

  const [sameAddress, setSameAddress] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        empId: initialData.empId || '',
        name: initialData.name || '',
        department: initialData.department || FARM_DEPARTMENTS[0],
        gender: initialData.gender || 'Male',
        phone: initialData.phone || '',
        role: initialData.role || '',
        localAddress: initialData.localAddress || '',
        permanentAddress: initialData.permanentAddress || ''
      });
      setSameAddress(initialData.localAddress === initialData.permanentAddress && initialData.localAddress !== '');
    } else {
      setFormData({
        empId: `FRM-${Math.floor(100 + Math.random() * 900)}`,
        name: '',
        department: FARM_DEPARTMENTS[0],
        gender: 'Male',
        phone: '',
        role: '',
        localAddress: '',
        permanentAddress: ''
      });
      setSameAddress(false);
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'localAddress' && sameAddress) {
        updated.permanentAddress = value;
      }
      return updated;
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSameAddressToggle = (e) => {
    const checked = e.target.checked;
    setSameAddress(checked);
    if (checked) {
      setFormData((prev) => ({ ...prev, permanentAddress: prev.localAddress }));
      if (errors.permanentAddress) {
        setErrors((prev) => ({ ...prev, permanentAddress: null }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Employee name is required';
    if (!formData.empId.trim()) newErrors.empId = 'Employee ID is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\s\-()]{7,18}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.localAddress.trim()) newErrors.localAddress = 'Local address is required';
    if (!formData.permanentAddress.trim()) newErrors.permanentAddress = 'Permanent address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSave({
      ...formData,
      id: initialData ? initialData.id : Date.now()
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isEditMode ? (
                  <>
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </>
                ) : (
                  <>
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </>
                )}
              </svg>
            </div>
            <div>
              <h2 className="modal-title">
                {isEditMode ? 'Edit Employee Details' : 'Add New Farm Employee'}
              </h2>
              <p className="modal-subtitle">
                {isEditMode
                  ? `Updating record for ${initialData?.name} (${initialData?.empId})`
                  : 'Enter official farm employee information for directory tracking'}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            title="Close modal"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="empId" className="form-label required">
                Employee ID
              </label>
              <input
                type="text"
                id="empId"
                name="empId"
                className={`form-input font-mono ${errors.empId ? 'input-error' : ''}`}
                value={formData.empId}
                onChange={handleChange}
                placeholder="e.g. FRM-109"
              />
              {errors.empId && <span className="field-error">{errors.empId}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="name" className="form-label required">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-input ${errors.name ? 'input-error' : ''}`}
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Gurpreet Singh"
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="department" className="form-label required">
                Farm Department
              </label>
              <select
                id="department"
                name="department"
                className="form-select"
                value={formData.department}
                onChange={handleChange}
              >
                {FARM_DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="gender" className="form-label required">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="form-select"
                value={formData.gender}
                onChange={handleChange}
              >
                {GENDER_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label required">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                className={`form-input font-mono ${errors.phone ? 'input-error' : ''}`}
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
              />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="role" className="form-label">
                Farm Role / Designation
              </label>
              <input
                type="text"
                id="role"
                name="role"
                className="form-input"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Field Supervisor / Agronomist"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="localAddress" className="form-label required">
                Local Address (Farm / Nearby Quarters)
              </label>
              <textarea
                id="localAddress"
                name="localAddress"
                rows="2"
                className={`form-textarea ${errors.localAddress ? 'input-error' : ''}`}
                value={formData.localAddress}
                onChange={handleChange}
                placeholder="e.g. Staff Quarters Block B, Room 14, GreenField Farm Estate"
              />
              {errors.localAddress && <span className="field-error">{errors.localAddress}</span>}
            </div>

            <div className="form-group full-width checkbox-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={sameAddress}
                  onChange={handleSameAddressToggle}
                  className="custom-checkbox"
                />
                <span>Permanent address is same as local address</span>
              </label>
            </div>

            <div className="form-group full-width">
              <label htmlFor="permanentAddress" className="form-label required">
                Permanent Address (Native Residence)
              </label>
              <textarea
                id="permanentAddress"
                name="permanentAddress"
                rows="2"
                disabled={sameAddress}
                className={`form-textarea ${errors.permanentAddress ? 'input-error' : ''} ${
                  sameAddress ? 'input-disabled' : ''
                }`}
                value={formData.permanentAddress}
                onChange={handleChange}
                placeholder="e.g. House No. 201, Village Rampur, Dist. Karnal, Haryana"
              />
              {errors.permanentAddress && (
                <span className="field-error">{errors.permanentAddress}</span>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              id="save-employee-btn"
            >
              {isEditMode ? 'Update Employee' : 'Save Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;
