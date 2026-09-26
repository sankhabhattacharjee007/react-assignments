import React from 'react';

const About = () => {
  return (
    <section className="section-container" id="about">
      <div className="section-header">
        <span className="section-tag">&lt;identity /&gt;</span>
        <h2 className="section-title">
          About <span className="red-text">Me</span>
        </h2>
        <p className="section-subtitle">
          A dedicated coder bridging foundational computer science principles with modern software craftsmanship.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-bio-card">
          <div className="card-subhead">
            <span className="subhead-dot">●</span> Biography & Passion
          </div>
          <p className="about-bio-text">
            Hello! I am <strong>Sankha Bhattacharjee</strong>, currently pursuing my 4th (final) year of
            <strong> Bachelor of Computer Applications (BCA)</strong> at <strong>Techno India University</strong>.
          </p>
          <p className="about-bio-text">
            I define myself as an authentic <strong>code enthusiast</strong>. Whether it's dissecting core data structures in C/C++, writing structured object-oriented code in Java and Python, or developing sleek, fully responsive user interfaces in React and JavaScript, I relish the challenge of transforming complex algorithmic ideas into clean, functional reality.
          </p>
          <p className="about-bio-text" style={{ marginBottom: 0 }}>
            My goal is to continuously refine my coding proficiency, write maintainable codebases, and contribute to forward-thinking engineering teams and innovative software projects.
          </p>
        </div>

        <div className="info-card">
          <div className="card-subhead">
            <span className="subhead-dot">●</span> Quick Information
          </div>
          <div className="info-list">
            <div className="info-row">
              <span className="info-key">Name:</span>
              <span className="info-val">Sankha Bhattacharjee</span>
            </div>
            <div className="info-row">
              <span className="info-key">Status:</span>
              <span className="info-val">BCA 4th Year (Undergraduate)</span>
            </div>
            <div className="info-row">
              <span className="info-key">University:</span>
              <span className="info-val">Techno India University</span>
            </div>
            <div className="info-row">
              <span className="info-key">Focus:</span>
              <span className="info-val">Full-Stack Dev & Algorithms</span>
            </div>
            <div className="info-row">
              <span className="info-key">Location:</span>
              <span className="info-val">Kolkata, West Bengal, India</span>
            </div>
            <div className="info-row">
              <span className="info-key">Availability:</span>
              <span className="info-val" style={{ color: '#ef4444' }}>Open for Internships & Roles</span>
            </div>
          </div>
        </div>
      </div>

      <div className="about-stats-banner">
        <div className="about-stat-item">
          <div className="stat-number">4th</div>
          <div className="stat-label">Year BCA Finalist</div>
        </div>
        <div className="about-stat-item">
          <div className="stat-number">6+</div>
          <div className="stat-label">Core Languages Mastered</div>
        </div>
        <div className="about-stat-item">
          <div className="stat-number">100%</div>
          <div className="stat-label">Passion for Coding</div>
        </div>
        <div className="about-stat-item">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Problem-Solving Drive</div>
        </div>
      </div>
    </section>
  );
};

export default About;
