// src/Footer.js
import React from 'react';
import './Footer.css';
import HelpAssistant from '../../HelpAssistant';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h1 style={{color:'orange'}}>About Us</h1>
          <p>We are a team of passionate developers building awesome web applications.</p>
        </div>
        <div className="footer-section">
          <h1  style={{color:'orange'}}>Contact</h1>
          <p>Email: contact@example.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div className="footer-section">
          <h1  style={{color:'orange'}}>Follow Us</h1>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 MyCompany. All rights reserved.</p>
      </div>
      {/* <HelpAssistant/> */}
    </footer>
  );
};

export default Footer;
