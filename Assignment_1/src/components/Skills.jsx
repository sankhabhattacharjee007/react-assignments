import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      category: 'Programming Languages',
      icon: '{ }',
      skills: ['C & C++', 'Java', 'Python', 'JavaScript', 'SQL', 'HTML5 & CSS3'],
    },
    {
      category: 'Web & Frameworks',
      icon: '</>',
      skills: ['React.js', 'Node.js', 'Express.js', 'REST APIs', 'Vite', 'Responsive UI'],
    },
    {
      category: 'Tools & Databases',
      icon: '[ ]',
      skills: ['Git & GitHub', 'VS Code', 'MySQL', 'MongoDB', 'Postman', 'Linux CLI'],
    },
  ];

  return (
    <section className="section-container" id="skills">
      <div className="section-header">
        <span className="section-tag">&lt;tech_stack /&gt;</span>
        <h2 className="section-title">
          Skills & <span className="red-text">Languages</span>
        </h2>
        <p className="section-subtitle">
          Core languages, frameworks, and developer workflows I apply when solving problems.
        </p>
      </div>

      <div className="skills-grid">
        {skillCategories.map((cat, idx) => (
          <div className="skill-category-card" key={idx}>
            <div className="skill-card-head">
              <div className="skill-icon-bubble">{cat.icon}</div>
              <h3 className="skill-cat-name">{cat.category}</h3>
            </div>

            <div className="skill-chips-grid">
              {cat.skills.map((skill, sIdx) => (
                <div className="skill-chip-item" key={sIdx}>
                  <span className="skill-dot"></span>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
