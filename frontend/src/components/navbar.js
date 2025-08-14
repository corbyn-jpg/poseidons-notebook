import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <header className="landing-header">
      <img src={logo} alt="Poseidon's Notebook" className="landing-logo" />
      <Link to="/login" className="get-started-btn">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Get Started
        </motion.button>
      </Link>
    </header>
  );
};

export default Navbar;
