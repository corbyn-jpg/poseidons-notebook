import React from 'react';
import { motion } from 'framer-motion';
import '../styles/card.css';

const Card = ({ image, title, description }) => {
  return (
    <div className="prop-card">
      <motion.div whileHover={{ y: -5 }}>
        <img src={image} alt={title} className="prop-image" />
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="wave-divider"></div>
      </motion.div>
    </div>
  );
};

export default Card;
