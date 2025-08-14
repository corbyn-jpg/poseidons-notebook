import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImage from '../assets/heroImage.png';
import '../styles/heroSection.css';

const HeroSection = () => {
  return (
    <section 
      className="hero-section"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-overlay">
        <h1>Discover the Depths</h1>
        <p>Log sightings, track species, and contribute to marine science.</p>
        <Link to="/signup">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="hero-btn"
          >
            Get Started
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
