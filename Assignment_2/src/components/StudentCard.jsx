import React from 'react';

const StudentCard = ({
  name,
  rollNo,
  department,
  semester,
  cgpa,
  email,
  batch
}) => {
  const getCgpaStatus = (score) => {
    if (score >= 9.5) return { label: 'Outstanding (O)', badgeClass: 'grade-outstanding' };
    if (score >= 9.0) return { label: 'Excellent (A+)', badgeClass: 'grade-excellent' };
    if (score >= 8.0) return { label: 'Very Good (A)', badgeClass: 'grade-verygood' };
    if (score >= 7.0) return { label: 'Good (B+)', badgeClass: 'grade-good' };
    return { label: 'Satisfactory (B)', badgeClass: 'grade-pass' };
  };

  const { label: gradeLabel, badgeClass: gradeClass } = getCgpaStatus(cgpa);
  const cgpaPercentage = Math.min(Math.max((cgpa / 10) * 100, 0), 100);

  return (
    <div className="student-card">
      <div className="card-top-bar">
        <span className="semester-pill">{semester}</span>
        <span className="roll-number-tag">{rollNo}</span>
      </div>

      <div className="card-body">
        <div className="student-identity">
          <h3 className="student-name">{name}</h3>
          <p className="student-department" title={department}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            <span>{department}</span>
          </p>
        </div>

        <div className="cgpa-section">
          <div className="cgpa-info-header">
            <span className="cgpa-label">Cumulative GPA</span>
            <div className={`grade-badge ${gradeClass}`}>
              {gradeLabel}
            </div>
          </div>

          <div className="cgpa-score-row">
            <div className="cgpa-score-display">
              <span className="cgpa-number">{Number(cgpa).toFixed(2)}</span>
              <span className="cgpa-scale">/ 10.0</span>
            </div>
            <div className="cgpa-percentage-indicator">
              <span>{Math.round(cgpaPercentage)}%</span>
            </div>
          </div>

          <div className="cgpa-bar-track">
            <div
              className={`cgpa-bar-fill ${gradeClass}`}
              style={{ width: `${cgpaPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-title">Roll Number</span>
            <span className="detail-data font-mono">{rollNo}</span>
          </div>
          <div className="detail-item">
            <span className="detail-title">Academic Batch</span>
            <span className="detail-data">{batch || semester}</span>
          </div>
          <div className="detail-item full-width">
            <span className="detail-title">Email ID</span>
            <span className="detail-data text-ellipsis" title={email}>{email}</span>
          </div>
        </div>

        <div className="card-actions">
          <a
            href={`mailto:${email}`}
            className="contact-btn"
            title={`Send email to ${name}`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>Contact Student</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
