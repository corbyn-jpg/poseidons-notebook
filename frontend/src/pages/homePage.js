import React from 'react';
import Bubbles from '../components/bubbles';
import Navbar from '../components/navbar';
import Card from '../components/card';
import Footer from '../components/footer';
import HeroSection from '../components/heroSection';
import '../styles/landingPage.css';
import LogSightings from '../assets/LogSightings.jpeg';
import TrackSpecies from '../assets/TrackSpecies.jpeg';
import Science from '../assets/Science.jpeg';
import '@fontsource/raleway';

const homePage = () => {
  return (
    <div className="landing-container">
      <Bubbles />
      <Navbar />
      <HeroSection />

      <div className="value-props">
        <Card image={LogSightings} title="Log Sightings" description="Record marine life encounters in seconds." />
        <Card image={TrackSpecies} title="Track Species" description="Build your personal species database." />
        <Card image={Science} title="Contribute to Science" description="Share anonymized data with researchers." />
      </div>

      <Footer />
    </div>
  );
};

export default homePage;