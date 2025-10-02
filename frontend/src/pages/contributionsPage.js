// src/pages/contributionspage.js
import React from 'react';
import Bubbles from '../components/bubbles';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Card from '../components/card';
import ResearchImage from '../assets/researchImage.jpeg'; 
import ConservationImage from '../assets/conservationImage.jpeg';
import EcosystemImage from '../assets/ecosystemImage.jpeg';
import CommunityImage from '../assets/communityImage.jpeg';
import RecognitionImage1 from '../assets/recognition1.jpeg';
import RecognitionImage2 from '../assets/recognition2.jpeg';
import RecognitionImage3 from '../assets/recognition3.jpeg';
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

  // Impact card data with proper images and icons
  const impactCards = [
    {
      image: ResearchImage, 
      icon: ResearchIcon,
      title: "Scientific Research",
      description: "Your sightings provide valuable data for researchers studying marine biodiversity, migration patterns, and population trends.",
      showButton: false
    },
    {
      image: ConservationImage,
      icon: EffortsIcon,
      title: "Conservation Efforts",
      description: "Data about species locations and behaviors helps identify critical habitats that need protection and informs conservation strategies.",
      showButton: false
    },
    {
      image: EcosystemImage,
      icon: HealthIcon,
      title: "Ecosystem Health",
      description: "By tracking species sightings, we can monitor the health of marine ecosystems and detect changes or threats early.",
      showButton: false
    },
    {
      image: CommunityImage,
      icon: CommunityIcon,
      title: "Community Building",
      description: "Your contributions help build a community of citizen scientists who share knowledge and passion for marine conservation.",
      showButton: false
    }
  ];

  // Recognition card data with proper images and icons
  const recognitionCards = [
    {
      image: RecognitionImage1,
      icon: FirstIcon,
      title: "Master Marine Biologist",
      description: "100+ verified contributions",
      showButton: false
    },
    {
      image: RecognitionImage2,
      icon: SecondIcon,
      title: "Ocean Explorer",
      description: "50+ verified contributions",
      showButton: false
    },
    {
      image: RecognitionImage3,
      icon: ThirdIcon,
      title: "Marine Enthusiast",
      description: "25+ verified contributions",
      showButton: false
    }
  ];

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
            <div className="thank-you-icon"><img src={HeartIcon} alt="Heart icon" /></div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="impact-section">
          <h2>How Your Contributions Help</h2>
          <div className="impact-grid">
            {impactCards.map((card, index) => (
              <Card
                key={index}
                image={card.image}
                title={card.title}
                description={card.description}
                showButton={card.showButton}
                icon={card.icon} // Pass icon as prop
              />
            ))}
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
          <div className="recognition-grid">
            {recognitionCards.map((card, index) => (
              <Card
                key={index}
                image={card.image}
                title={card.title}
                description={card.description}
                showButton={card.showButton}
                icon={card.icon} // Pass icon as prop
              />
            ))}
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