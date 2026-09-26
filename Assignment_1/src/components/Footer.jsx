import React from 'react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-brand-title">
            Sankha <span>Bhattacharjee</span>
          </div>
          <div className="footer-brand-text">
            BCA 4th Year Student @ Techno India University &bull; Passionate Code Enthusiast.
          </div>
        </div>

        <ul className="footer-links">
          <li>
            <a href="#hero" className="footer-link">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="footer-link">
              About
            </a>
          </li>
          <li>
            <a href="#education" className="footer-link">
              Education
            </a>
          </li>
          <li>
            <a href="#skills" className="footer-link">
              Skills & Languages
            </a>
          </li>
          <li>
            <a href="#contact" className="footer-link">
              Contact
            </a>
          </li>
        </ul>
      </div>

      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} Sankha Bhattacharjee. All rights reserved.</span>
        <button
          onClick={scrollToTop}
          className="back-to-top-btn"
          id="back-to-top"
          aria-label="Back to top"
        >
          ↑ Back to Top
        </button>
      </div>
    </footer>
  );
};

export default Footer;
