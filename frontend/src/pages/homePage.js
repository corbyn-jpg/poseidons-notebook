
import React from 'react';
import Bubbles from '../components/bubbles';
import Navbar from '../components/navbar';
import Card from '../components/card';
import Footer from '../components/footer';
import HeroSection from '../components/heroSection';
import heroImage from '../assets/heroImage.gif';
import LogSightings from '../assets/LogSightings.jpeg';
import TrackSpecies from '../assets/TrackSpecies.jpeg';
import Science from '../assets/Science.jpeg';
import '@fontsource/raleway';
import '../styles/landingPage.css';

const HomePage = () => {
  return (
    <div className="container">
      <Bubbles />
      <Navbar />
      <HeroSection 
        backgroundImage={heroImage}
        title="Discover the Depths"
        description="Log sightings, track species, and contribute to marine science."
        buttonText="Get Started"
        buttonLink="/signup"
      />

      <div className="value-props">
        <Card image={LogSightings} title="Log Sightings" description="Record marine life encounters in seconds." />
        <Card image={TrackSpecies} title="Track Species" description="Build your personal species database." />
        <Card image={Science} title="Contribute to Science" description="Share anonymized data with researchers." />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;