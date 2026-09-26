import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar" id="navbar">
      <div className="nav-container">
        <a href="#hero" className="nav-logo" onClick={closeMenu}>
          <span>Sankha</span>
          <span style={{ fontWeight: 400 }}>Bhattacharjee</span>
        </a>

        <button
          className="nav-toggle-btn"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          id="nav-toggle-btn"
        >
          {isOpen ? '✕' : '☰'}
        </button>

        <ul className={`nav-links ${isOpen ? 'nav-open' : ''}`} id="nav-menu">
          <li>
            <a href="#about" className="nav-link" onClick={closeMenu}>
              About
            </a>
          </li>
          <li>
            <a href="#education" className="nav-link" onClick={closeMenu}>
              Education
            </a>
          </li>
          <li>
            <a href="#skills" className="nav-link" onClick={closeMenu}>
              Skills & Languages
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-link" onClick={closeMenu}>
              Contact
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-cta-btn" onClick={closeMenu}>
              Let's Talk →
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
