import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`modern-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo-link">
          <span className="logo-text">Fixit<span className="gold-text">Meet</span></span>
        </Link>
        <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
          <Link to="/providers" onClick={() => setMobileMenuOpen(false)}>Providers</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          <div className="mobile-actions">
            <Link to="/login" className="login-link-mobile" onClick={() => setMobileMenuOpen(false)}>Log In</Link>
            <Link to="/register" className="signup-btn-mobile" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
          </div>
        </nav>
        <div className="header-actions">
          <Link to="/login" className="login-link">Log In</Link>
          <Link to="/register" className="signup-btn">Sign Up</Link>
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;