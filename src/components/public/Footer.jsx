import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="logo-text">Fixit<span className="gold-text">Meet</span></span>
          </Link>
          <p className="footer-tagline">Fast. Reliable. Verified Professionals.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><FiFacebook /></a>
            <a href="#" aria-label="Twitter"><FiTwitter /></a>
            <a href="#" aria-label="Instagram"><FiInstagram /></a>
            <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Platform</h4>
            <Link to="/services">All Services</Link>
            <Link to="/providers">Provider Directory</Link>
            <Link to="/how-it-works">How It Works</Link>
            <Link to="/pricing">Pricing</Link>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/blog">Blog</Link>
          </div>
          <div className="footer-col">
            <h4>Pro Section</h4>
            <Link to="/partner-register">Become a Partner</Link>
            <Link to="/login">Partner Login</Link>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} FixitMeet. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;