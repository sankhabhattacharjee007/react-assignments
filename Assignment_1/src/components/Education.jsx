import React from 'react';

const Education = () => {
  const educationHistory = [
    {
      step: '01 / Current',
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Techno India University',
      duration: '2021 - Present',
      status: 'Current Degree (4th Year)',
      isCurrent: true,
      description:
        'Comprehensive study of Computer Applications, Software Engineering, Object-Oriented Programming (Java, C++), Data Structures & Algorithms, Database Systems (RDBMS & SQL), Web Technologies, and Operating Systems.',
    },
    {
      step: '02 / Higher Secondary',
      degree: 'Higher Secondary (Class 12 - Science)',
      institution: 'West Bengal Council (WBCHSE)',
      duration: 'Completed',
      status: 'Senior Secondary',
      isCurrent: false,
      description:
        'Major focus in Mathematics, Physics, and Computer Application/Science. Built fundamental analytical reasoning, logic building, and foundational procedural coding.',
    },
    {
      step: '03 / Secondary School',
      degree: 'Secondary Examination (Class 10 - Madhyamik)',
      institution: 'West Bengal Board (WBBSE)',
      duration: 'Completed',
      status: 'Secondary School',
      isCurrent: false,
      description:
        'Graduated with strong academic performance, excelling in Mathematics, Physical Sciences, and developing an early fascination with computing and logical problem solving.',
    },
  ];

  return (
    <section className="section-container" id="education">
      <div className="section-header">
        <span className="section-tag">&lt;academic_path /&gt;</span>
        <h2 className="section-title">
          Educational <span className="red-text">Journey</span>
        </h2>
        <p className="section-subtitle">
          Academic milestones and institutional qualifications shaping my technical foundation.
        </p>
      </div>

      <div className="education-grid">
        {educationHistory.map((item, index) => (
          <div
            className={`education-card ${item.isCurrent ? 'education-card-current' : ''}`}
            key={index}
          >
            <div className="education-card-top">
              <span className="education-step-tag">{item.step}</span>
              <span className="education-badge">{item.duration}</span>
            </div>

            <div className="education-card-body">
              <h3 className="education-degree">{item.degree}</h3>
              <div className="education-inst">{item.institution}</div>
              <div className="education-status-tag">
                <span>●</span> {item.status}
              </div>
              <p className="education-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
