import React from 'react';
import StudentCard from './StudentCard';

const StudentList = ({ students, currentSort, onResetFilters }) => {
  return (
    <section className="student-list-container">
      <div className="list-meta-bar">
        <div className="results-count">
          Showing <strong>{students.length}</strong> {students.length === 1 ? 'student' : 'students'}
          {currentSort !== 'none' && (
            <span className="active-sort-indicator">
              (Sorted by CGPA: {currentSort === 'desc' ? 'Highest first' : 'Lowest first'})
            </span>
          )}
        </div>
      </div>

      {students.length > 0 ? (
        <div className="cards-grid">
          {students.map((student) => (
            <StudentCard
              key={student.id || student.rollNo}
              name={student.name}
              rollNo={student.rollNo}
              department={student.department}
              semester={student.semester}
              cgpa={student.cgpa}
              email={student.email}
              batch={student.batch}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state-card">
          <div className="empty-icon-bubble">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </div>
          <h3 className="empty-title">No Students Found</h3>
          <p className="empty-desc">
            No student matches the current search query or department filter.
          </p>
          {onResetFilters && (
            <button className="reset-filter-btn" onClick={onResetFilters}>
              Reset Filters
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default StudentList;
