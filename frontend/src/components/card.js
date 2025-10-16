// Card.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/card.css";

const Card = ({ image, title, description, learn, to, showButton = true, icon }) => {
  const navigate = useNavigate();
  
  const onButtonClick = () => {
    if (to) {
      navigate(to);
    }
  };
  
  return (
    <div className="card-container">
      <div className="card">
        {/* Image container - always visible */}
        <div className="card-image-container">
          {/*
            image may be:
              - a full http(s) URL (from DB)
              - a data: URL
              - a module import/static asset (e.g. /static/media/..)
              - a backend-served path like /images/species/.. (should be resolved via api)
            Rules:
              - Use full/http/data URLs as-is
              - If it starts with '/images/' call getImageUrl so backend static middleware can serve it
              - Otherwise assume a module/static import path and use it directly
          */}
          <img src={image || ''} alt={title} className="prop-image" />
          {/* Gradient overlay that slides up */}
          <div className="card-overlay">
            <div className="card-content">
              {/* Icon displayed above title */}
              {icon && (
                <div className="card-icon">
                  <img src={icon} alt={`${title} icon`} />
                </div>
              )}
              <h3>{title}</h3>
              <p>{description}</p>
              <div className="wave-divider"></div>
              {showButton && (
                <button onClick={onButtonClick} className="card-button">
                  {learn}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;