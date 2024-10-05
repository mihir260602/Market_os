import React, { useState } from 'react';
import './Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Add this if using npm

const Footer = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
  
    const handleSubscribe = (e) => {
      e.preventDefault();
      // Add your subscribe logic here
      console.log('Subscribed:', { name, email });
    };
  
  return (
    <footer className="footer">
      {/* Subscribe Section */}
      <div className="subscribe-section">
    <div className="subscribe-content">
        <h4>Elevate your expertise with curated insights</h4>
        <p>Subscribe to stay connected!</p>
        <form className="subscribe-form">
            <input
                type="email"
                placeholder="Enter your email"
                required
            />
            <button type="submit">Subscribe</button>
        </form>
    </div>
</div>
      <div className="footer-main">
        {/* Company Info */}
        <div className="footer-section">
          <h4>Company</h4>
          <a href="/about-us">About Us</a>
          <a href="/capability">Capability</a>
          <a href="/blogs">Blogs</a>
          <a href="/press-release">Press Release</a>
          <a href="/career">Career</a>
        </div>
        {/* Industry Info */}
        <div className="footer-section">
          <h4>Industry</h4>
          <a href="/financial-services">Financial Services</a>
          <a href="/edtech">EdTech</a>
          <a href="/pharma-healthcare">Pharma & Healthcare</a>
        </div>
        {/* Services Info */}
        <div className="footer-section">
          <h4>Services</h4>
          <a href="/drupal">Drupal</a>
          <a href="/audit">Drupal Audit</a>
          <a href="/webrtc">WebRTC</a>
        </div>
        {/* Alliances Info */}
        <div className="footer-section">
          <h4>Alliances</h4>
          <a href="/acquia">Acquia</a>
          <a href="/aws">AWS</a>
        </div>
        {/* Certifications */}
        <div className="footer-section certifications">
          <h4>Certifications</h4>
          <img src="https://www.drupal.org/files/cta/graphic/Generic%20Drupal%20Certified%20Partner%20Badge_0.png" alt="Certification 1" />
          <img src="https://www.acquia.com/themes/custom/juice/images/partner/community-level-partner.png" alt="Certification 2" />
          {/* <img src="https://www.valuebound.com/sites/default/files/inline-images/aws-partners_0.png" alt="Certification 3" /> */}
          <img src="https://assets.goodfirms.co/badges/color-badge/top-web-design-companies.svg" alt="Certification 3" />
        </div>
      </div>

      <div className="footer-bottom">
        {/* Social Media Icons */}
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <p>&copy; 2024 Valuebound. All rights reserved.</p>
        {/* Footer Links */}
        <div className="footer-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-conditions">Terms of Use</a>
          <a href="/career">Career</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
