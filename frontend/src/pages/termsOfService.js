import React from 'react';
import Bubbles from '../components/bubbles';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import '../styles/legal.css';

const TermsOfService = () => {
  return (
    <div className="legal-container">
      <Bubbles />
      <Navbar />
      <div className="legal-content">
        <div className="legal-header">
          <h1>Terms of Service</h1>
          <p className="last-updated">Last updated: November 2, 2025</p>
        </div>

        <div className="legal-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Poseidon's Notebook ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </div>

        <div className="legal-section">
          <h2>2. Description of Service</h2>
          <p>
            Poseidon's Notebook is a platform for marine life documentation and citizen science. Users can contribute sightings of marine species, access educational content, and participate in conservation efforts. The Service is provided free of charge for educational and conservation purposes.
          </p>
        </div>

        <div className="legal-section">
          <h2>3. User Responsibilities</h2>
          <p>Users agree to:</p>
          <ul>
            <li>Provide accurate and truthful information when submitting sightings</li>
            <li>Respect marine life and follow ethical observation practices</li>
            <li>Not submit false, misleading, or harmful content</li>
            <li>Comply with all applicable local, state, and national laws</li>
            <li>Respect the intellectual property rights of others</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>4. Content and Data</h2>
          <p>
            By submitting content to Poseidon's Notebook, you grant us a non-exclusive, royalty-free license to use, display, and distribute your contributions for scientific research, education, and conservation purposes. You retain ownership of your original content.
          </p>
          <p>
            All submitted data may be used for scientific research and conservation efforts. Personal information will be handled according to our Privacy Policy.
          </p>
        </div>

        <div className="legal-section">
          <h2>5. Prohibited Uses</h2>
          <p>You may not use our Service:</p>
          <ul>
            <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
            <li>To violate any international, federal, provincial, or state regulations or laws</li>
            <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
            <li>To submit false or misleading information</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>6. Account Termination</h2>
          <p>
            We reserve the right to terminate or suspend accounts and bar access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
        </div>

        <div className="legal-section">
          <h2>7. Disclaimer</h2>
          <p>
            The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, this Company excludes all representations, warranties, conditions and all other terms of any kind.
          </p>
        </div>

        <div className="legal-section">
          <h2>8. Limitation of Liability</h2>
          <p>
            In no event shall Poseidon's Notebook, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the Service.
          </p>
        </div>

        <div className="legal-section">
          <h2>9. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
          </p>
        </div>

        <div className="legal-section">
          <h2>10. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <div className="contact-info">
            <p>Email: legal@poseidonsnotebook.com</p>
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

export default TermsOfService;