import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import StatsBar from './components/StatsBar';
import FilterControls from './components/FilterControls';
import EmployeeCard from './components/EmployeeCard';
import EmployeeTable from './components/EmployeeTable';
import EmployeeModal from './components/EmployeeModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import { initialEmployees, FARM_DEPARTMENTS } from './data/initialEmployees';

function App() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [notification, setNotification] = useState(null);

  const departments = useMemo(() => {
    return FARM_DEPARTMENTS;
  }, []);

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesDept =
        selectedDepartment === 'All' || emp.department === selectedDepartment;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        emp.name.toLowerCase().includes(q) ||
        emp.empId.toLowerCase().includes(q) ||
        emp.phone.toLowerCase().includes(q) ||
        emp.department.toLowerCase().includes(q) ||
        (emp.role && emp.role.toLowerCase().includes(q)) ||
        emp.localAddress.toLowerCase().includes(q) ||
        emp.permanentAddress.toLowerCase().includes(q);

      return matchesDept && matchesSearch;
    });
  }, [employees, searchQuery, selectedDepartment]);

  const genderCounts = useMemo(() => {
    const counts = { male: 0, female: 0, other: 0 };
    employees.forEach((e) => {
      const g = (e.gender || '').toLowerCase();
      if (g === 'female') counts.female += 1;
      else if (g === 'male') counts.male += 1;
      else counts.other += 1;
    });
    return counts;
  }, [employees]);

  const handleOpenAddModal = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleSaveEmployee = (formData) => {
    if (editingEmployee) {
      setEmployees((prev) =>
        prev.map((item) => (item.id === formData.id ? formData : item))
      );
      setNotification({
        type: 'success',
        message: `Updated records for ${formData.name} (${formData.empId})`
      });
    } else {
      setEmployees((prev) => [formData, ...prev]);
      setNotification({
        type: 'success',
        message: `Successfully added ${formData.name} to ${formData.department}`
      });
    }
  };

  const handleRequestDelete = (employee) => {
    setDeleteTarget(employee);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setEmployees((prev) => prev.filter((item) => item.id !== deleteTarget.id));
    setNotification({
      type: 'danger',
      message: `Removed ${deleteTarget.name} (${deleteTarget.empId}) from directory`
    });
    setDeleteTarget(null);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('All');
  };

  const hasActiveFilters = searchQuery.trim() !== '' || selectedDepartment !== 'All';

  return (
    <div className="portal-app">
      <Toast notification={notification} onClose={() => setNotification(null)} />

      <Navbar
        onOpenAddModal={handleOpenAddModal}
        totalEmployees={employees.length}
      />

      <main className="portal-main">
        <StatsBar
          totalCount={employees.length}
          filteredCount={filteredEmployees.length}
          departmentCount={departments.length}
          genderCounts={genderCounts}
        />

        <FilterControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          departments={departments}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        <section className="directory-results-container">
          <div className="results-header">
            <span className="results-label">
              Showing <strong>{filteredEmployees.length}</strong> of{' '}
              <strong>{employees.length}</strong> farm employees
              {selectedDepartment !== 'All' && (
                <span className="filter-active-tag"> &bull; {selectedDepartment}</span>
              )}
            </span>
          </div>

          {filteredEmployees.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="cards-grid">
                {filteredEmployees.map((employee) => (
                  <EmployeeCard
                    key={employee.id || employee.empId}
                    employee={employee}
                    onEdit={handleOpenEditModal}
                    onDelete={handleRequestDelete}
                  />
                ))}
              </div>
            ) : (
              <EmployeeTable
                employees={filteredEmployees}
                onEdit={handleOpenEditModal}
                onDelete={handleRequestDelete}
              />
            )
          ) : (
            <div className="empty-state-card">
              <div className="empty-icon-bubble">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </div>
              <h3 className="empty-title">No Farm Employees Found</h3>
              <p className="empty-desc">
                No employee matched the search keyword "{searchQuery}" in{' '}
                {selectedDepartment === 'All' ? 'any department' : selectedDepartment}.
              </p>
              <div className="empty-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleResetFilters}
                >
                  Clear All Filters
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleOpenAddModal}
                >
                  + Add New Employee
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEmployee}
        initialData={editingEmployee}
      />

      <DeleteConfirmModal
        employee={deleteTarget}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

export default App;
