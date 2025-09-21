// src/pages/contributionspage.js
import React from 'react';
import Bubbles from '../components/bubbles';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import CommunityIcon from '../assets/community.png';
import ResearchIcon from '../assets/research.png';
import EffortsIcon from '../assets/efforts.png';
import HealthIcon from '../assets/health.png';
import HeartIcon from '../assets/heart.png';
import FirstIcon from '../assets/medal1.png';
import SecondIcon from '../assets/medal2.png';
import ThirdIcon from '../assets/medal3.png';
import '../styles/contributions.css';

const ContributionsPage = () => {
  const handleDonateClick = () => {
    window.open('https://www.wwf.org.za/our_work/oceans/', '_blank');
  };

  return (
    <div className="contributions-container">
      <Bubbles />
      <Navbar />
      <div className="contributions-content">
        {/* Header Section */}
        <div className="contributions-header">
          <h1 className="contributions-main-title">Your Contributions</h1>
          <p className="contributions-subtitle">Making a difference in marine conservation</p>
        </div>

        {/* Thank You Section */}
        <div className="thank-you-section">
          <div className="thank-you-card">
            <h2>Thank You for Your Contributions!</h2>
            <p>
              Every sighting you report and every species you add helps build our understanding of 
              marine ecosystems and contributes to global conservation efforts.
            </p>
            <div className="thank-you-icon"><img src={HeartIcon} /></div>
          </div>
        </div>


        {/* Impact Section */}
        <div className="impact-section">
          <h2>How Your Contributions Help</h2>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="icon"><img src={ResearchIcon} /></div>
              <h3>Scientific Research</h3>
              <p>
                Your sightings provide valuable data for researchers studying marine biodiversity, 
                migration patterns, and population trends.
              </p>
            </div>
            <div className="impact-card">
              <div className="icon"><img src={EffortsIcon} /></div>
              <h3>Conservation Efforts</h3>
              <p>
                Data about species locations and behaviors helps identify critical habitats 
                that need protection and informs conservation strategies.
              </p>
            </div>
            <div className="impact-card">
              <div className="icon"><img src={HealthIcon} /></div>
              <h3>Ecosystem Health</h3>
              <p>
                By tracking species sightings, we can monitor the health of marine ecosystems 
                and detect changes or threats early.
              </p>
            </div>
            <div className="impact-card">
              <div className="icon"><img src={CommunityIcon} /></div>
              <h3>Community Building</h3>
              <p>
                Your contributions help build a community of citizen scientists who share 
                knowledge and passion for marine conservation.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="stats-section">
          <h2>Community Impact</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">1,247+</div>
              <div className="stat-label">Species Documented</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">8,956+</div>
              <div className="stat-label">Sightings Recorded</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">634+</div>
              <div className="stat-label">Active Contributors</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">27+</div>
              <div className="stat-label">Research Projects Supported</div>
            </div>
          </div>
        </div>

        {/* How to Contribute Section */}
        <div className="contribute-section">
          <h2>How to Make Contributions</h2>
          <div className="contribute-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Report Sightings</h3>
                <p>Log your marine life observations with details like location, depth, and behavior.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Add New Species</h3>
                <p>Contribute information about species not yet in our database.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Verify Data</h3>
                <p>Help review and confirm sightings submitted by other community members.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Share Knowledge</h3>
                <p>Contribute your expertise through species descriptions and identification help.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Section */}
        <div className="donation-section">
          <div className="donation-card">
            <h3>Support Ocean Conservation</h3>
            <p>
              Your contributions through our platform help with data collection and research. 
              If you'd like to further support marine conservation efforts, consider donating 
              to organizations working directly to protect our oceans.
            </p>
            <button className="donate-btn" onClick={handleDonateClick}>
              Support WWF Oceans
            </button>
            <p className="donation-note">
              You will be redirected to the World Wildlife Fund's ocean conservation page
            </p>
          </div>
        </div>

        {/* Recognition Section */}
        <div className="recognition-section">
          <h2>Contributor Recognition</h2>
          <p>
            We periodically highlight outstanding contributors who have made significant 
            contributions to our marine database. Top contributors receive special recognition 
            and opportunities to collaborate with research partners.
          </p>
          <div className="recognition-badges">
            <div className="badge">
              <div className="icon"> <img src={FirstIcon} /></div>
              <h4>Master Marine Biologist</h4>
              <p>100+ verified contributions</p>
            </div>
            <div className="badge">
              <div className="icon"> <img src={SecondIcon} /></div>
              <h4>Ocean Explorer</h4>
              <p>50+ verified contributions</p>
            </div>
            <div className="badge">
              <div className="icon"> <img src={ThirdIcon} /></div>
              <h4>Marine enthusiast</h4>
              <p>25+ verified contributions</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <h2>Ready to Make a Difference?</h2>
          <p>Your next observation could provide crucial data for marine conservation.</p>
          <div className="cta-buttons">
            <a href="/sightings" className="cta-btn primary">
              Report a Sighting
            </a>
            <a href="/species" className="cta-btn secondary">
              Browse Species
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContributionsPage;