import React from 'react';
import Bubbles from '../components/bubbles';
import Navbar from '../components/navbar';
import Card from '../components/card';
import Footer from '../components/footer';
import HeroSection from '../components/heroSection';
import '../styles/landingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <Bubbles />
      <Navbar />
      <HeroSection />

      <div className="value-props">
        <Card title="Log Sightings" description="Record marine life encounters in seconds." />
        <Card title="Track Species" description="Build your personal species database." />
        <Card title="Contribute to Science" description="Share anonymized data with researchers." />
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
