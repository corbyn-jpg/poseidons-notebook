import React from 'react';
import Bubbles from '../components/bubbles';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import '../styles/legal.css';

const CookiePolicy = () => {
  return (
    <div className="legal-container">
      <Bubbles />
      <Navbar />
      <div className="legal-content">
        <div className="legal-header">
          <h1>Cookie Policy</h1>
          <p className="last-updated">Last updated: November 2, 2025</p>
        </div>

        <div className="legal-section">
          <h2>1. What Are Cookies</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site.
          </p>
        </div>

        <div className="legal-section">
          <h2>2. How We Use Cookies</h2>
          <p>We use cookies for several purposes:</p>
          <ul>
            <li><strong>Authentication:</strong> To keep you logged in as you navigate our platform</li>
            <li><strong>Preferences:</strong> To remember your settings and preferences</li>
            <li><strong>Security:</strong> To protect against fraudulent activity and enhance security</li>
            <li><strong>Analytics:</strong> To understand how our platform is used and improve our services</li>
            <li><strong>Functionality:</strong> To enable certain features and enhance user experience</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>3. Types of Cookies We Use</h2>
          
          <h3>Essential Cookies</h3>
          <p>
            These cookies are necessary for the website to function properly. They enable basic functions like page navigation, access to secure areas, and authentication. The website cannot function properly without these cookies.
          </p>
          
          <h3>Functional Cookies</h3>
          <p>
            These cookies allow the website to remember choices you make (such as language preferences or region) and provide enhanced, more personal features.
          </p>
          
          <h3>Analytics Cookies</h3>
          <p>
            These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our platform.
          </p>
          
          <h3>Performance Cookies</h3>
          <p>
            These cookies collect information about how you use our website, such as which pages you visit most often and any error messages you receive.
          </p>
        </div>

        <div className="legal-section">
          <h2>4. Third-Party Cookies</h2>
          <p>
            Some cookies on our site are set by third-party services that appear on our pages. We use Google Analytics to help analyze how our website is used. These services may set their own cookies to track your activity across multiple websites.
          </p>
        </div>

        <div className="legal-section">
          <h2>5. Managing Cookies</h2>
          <p>
            You can control and manage cookies in various ways. Please note that removing or blocking cookies can impact your user experience and parts of our website may no longer be fully accessible.
          </p>
          
          <h3>Browser Settings</h3>
          <p>Most browsers allow you to:</p>
          <ul>
            <li>View what cookies are stored on your device</li>
            <li>Delete all cookies or individual cookies</li>
            <li>Block third-party cookies</li>
            <li>Block cookies from particular sites</li>
            <li>Block all cookies from being set</li>
          </ul>
          
          <h3>Browser-Specific Instructions</h3>
          <p>For detailed instructions on managing cookies:</p>
          <ul>
            <li><strong>Chrome:</strong> Settings &gt; Privacy and Security &gt; Cookies</li>
            <li><strong>Firefox:</strong> Options &gt; Privacy &amp; Security &gt; Cookies</li>
            <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Cookies</li>
            <li><strong>Edge:</strong> Settings &gt; Cookies and Site Permissions</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>6. Local Storage</h2>
          <p>
            In addition to cookies, we may use local storage technologies to store information locally on your device. This includes your authentication tokens and user preferences. Local storage can be cleared through your browser settings.
          </p>
        </div>

        <div className="legal-section">
          <h2>7. Cookie Consent</h2>
          <p>
            By continuing to use our website, you consent to our use of cookies as described in this policy. You can withdraw your consent at any time by adjusting your browser settings or contacting us.
          </p>
        </div>

        <div className="legal-section">
          <h2>8. Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by updating the "Last updated" date at the top of this policy.
          </p>
        </div>

        <div className="legal-section">
          <h2>9. More Information</h2>
          <p>
            For more information about cookies and online privacy, visit:
          </p>
          <ul>
            <li><a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a></li>
            <li><a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer">www.youronlinechoices.com</a></li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
          </p>
          <div className="contact-info">
            <p>Email: privacy@poseidonsnotebook.com</p>
            <p>Address: Marine Conservation Institute<br />
            123 Ocean Drive<br />
            Cape Town, South Africa</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CookiePolicy;