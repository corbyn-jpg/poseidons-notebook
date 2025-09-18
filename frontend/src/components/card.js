// Card.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Make sure to import motion
import "../styles/card.css";

const Card = ({ image, title, description, learn, to, showButton = true }) => {
  const navigate = useNavigate();
  
  const onButtonClick = () => {
    if (to) {
      navigate(to);
    }
  };
  
  return (
    <div className="prop-card">
      <motion.div whileHover={{ y: -5 }}>
        <img src={image} alt={title} className="prop-image" />
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="wave-divider"></div>
        {showButton && (
          <button onClick={onButtonClick} className="card-button">
            {learn}
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default Card;