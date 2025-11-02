import React from 'react';
import Bubbles from '../components/bubbles';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import '../styles/legal.css';

const PrivacyPolicy = () => {
  return (
    <div className="legal-container">
      <Bubbles />
      <Navbar />
      <div className="legal-content">
        <div className="legal-header">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: November 2, 2025</p>
        </div>

        <div className="legal-section">
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as:</p>
          <ul>
            <li><strong>Account Information:</strong> Username, email address, and password</li>
            <li><strong>Profile Information:</strong> Optional profile details and preferences</li>
            <li><strong>Sighting Data:</strong> Marine species observations, locations, dates, and photos</li>
            <li><strong>Usage Data:</strong> How you interact with our platform</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process and display your marine life sightings</li>
            <li>Facilitate scientific research and conservation efforts</li>
            <li>Communicate with you about the service</li>
            <li>Monitor and analyze platform usage</li>
            <li>Ensure platform security and prevent fraud</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>3. Information Sharing</h2>
          <p>We may share your information in the following circumstances:</p>
          <ul>
            <li><strong>Scientific Research:</strong> Anonymized sighting data with marine research institutions</li>
            <li><strong>Conservation Efforts:</strong> Aggregated data with conservation organizations</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect rights and safety</li>
            <li><strong>With Consent:</strong> Any other sharing will be done with your explicit consent</li>
          </ul>
          <p>We do not sell personal information to third parties.</p>
        </div>

        <div className="legal-section">
          <h2>4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
          </p>
        </div>

        <div className="legal-section">
          <h2>5. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. Sighting data may be retained indefinitely for scientific and conservation purposes, but will be anonymized when possible.
          </p>
        </div>

        <div className="legal-section">
          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access and update your account information</li>
            <li>Request deletion of your personal data</li>
            <li>Opt out of certain communications</li>
            <li>Request a copy of your data</li>
            <li>Withdraw consent where applicable</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>7. Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies to enhance your experience, analyze usage, and remember your preferences. You can control cookie settings through your browser. See our Cookie Policy for more details.
          </p>
        </div>

        <div className="legal-section">
          <h2>8. Third-Party Services</h2>
          <p>
            Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
          </p>
        </div>

        <div className="legal-section">
          <h2>9. Children's Privacy</h2>
          <p>
            Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will take steps to delete the information.
          </p>
        </div>

        <div className="legal-section">
          <h2>10. International Users</h2>
          <p>
            If you are accessing our service from outside South Africa, please note that your information may be transferred to and processed in South Africa, where our servers are located.
          </p>
        </div>

        <div className="legal-section">
          <h2>11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
          </p>
        </div>

        <div className="legal-section">
          <h2>12. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy;