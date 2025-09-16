// HeroSection.js
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/heroSection.css";

const HeroSection = ({
  backgroundImage,
  title,
  description,
  buttonText,
  buttonLink,
}) => {
  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="hero-overlay">
        <h1>{title}</h1>
        <p>{description}</p>
        <Link to={buttonLink}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="hero-btn"
          >
            {buttonText}
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
