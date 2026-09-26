import React from 'react';

const Header = () => {
  return (
    <header className="hero-section" id="hero">
      <div className="section-container">
        <div className="hero-content-centered">
          <div className="hero-status-pill">
            <span className="status-dot"></span>
            <span>BCA 4th Year &bull; Techno India University</span>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="red-accent">Sankha Bhattacharjee</span>
          </h1>

          <div className="hero-subtitle-bar">
            <span className="meta-chip">
              <span>Role:</span> <strong>Code Enthusiast</strong>
            </span>
            <span className="meta-chip">
              <span>Degree:</span> <strong>BCA (4th Year)</strong>
            </span>
            <span className="meta-chip">
              <span>Campus:</span> <strong>Techno India University</strong>
            </span>
          </div>

          <p className="hero-description">
            Passionate programmer deeply enthusiastic about writing clean code,
            solving algorithmic problems, and developing modern, responsive web applications.
            Always curious, exploring new programming languages, and continuously expanding my technical skills.
          </p>

          <div className="hero-actions">
            <a href="#about" className="btn-primary" id="hero-about-btn">
              <span>About Me</span>
              <span>↓</span>
            </a>
            <a href="#skills" className="btn-secondary" id="hero-skills-btn">
              <span>Skills & Languages</span>
              <span>&lt;/&gt;</span>
            </a>
            <a href="#contact" className="btn-secondary" id="hero-contact-btn">
              <span>Get In Touch</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
