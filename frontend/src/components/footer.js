import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="landing-footer">
      <div className="footer-section">
        <h4>Explore</h4>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/species">Species Database</Link></li>
          <li><Link to="/maps">Dive Maps</Link></li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Resources</h4>
        <ul>
          <li><Link to="/guides">Marine Life Guides</Link></li>
          <li><Link to="/tips">Conservation Tips</Link></li>
          <li><Link to="/partners">Research Partners</Link></li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Legal</h4>
        <ul>
          <li><Link to="/terms">Terms of Service</Link></li>
          <li><Link to="/privacy">Privacy Policy</Link></li>
          <li><Link to="/cookies">Cookie Policy</Link></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
