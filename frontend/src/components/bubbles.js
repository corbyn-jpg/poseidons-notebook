import React from "react";
import "../styles/bubbles.css";

const Bubbles = () => {
  // Generate modern bubbles with enhanced properties
  const bubbles = Array.from({ length: 45 }).map((_, i) => {
    const size = Math.floor(Math.random() * 80) + 8; // 8-88px for better variety
    const variant = Math.floor(Math.random() * 3) + 1; // 1-3 for different animation styles
    const animationDuration = Math.floor(Math.random() * 12) + 8; // 8-20s for smoother movement
    const initialBottom = Math.floor(Math.random() * 50); // Start lower for better effect
    const finalBottom = Math.floor(Math.random() * 30) + 100; // End higher
    const translateX = Math.floor(Math.random() * 400) - 200; // -200 to 200px for more movement
    const initialOpacity = (Math.random() * 0.4) + 0.3; // 0.3-0.7 for subtle variation
    
    // Create more varied background positions
    const bgPositions = [
      "25% 25%", "75% 30%", "40% 60%", "60% 20%", "30% 70%", "80% 50%"
    ];
    const bgPos = bgPositions[Math.floor(Math.random() * bgPositions.length)];
    
    // Stagger animation delays for better visual flow
    const animationDelay = (i * 0.2) % animationDuration;

    return (
      <div
        key={i}
        className={`bubble variant-${variant}`}
        style={{
          "--size": `${size}px`,
          "--initial-bottom": `${initialBottom}vh`,
          "--final-bottom": `${finalBottom}vh`,
          "--translate-x": `${translateX}px`,
          "--duration": `${animationDuration}s`,
          "--bg-pos": bgPos,
          "--initial-opacity": initialOpacity,
          left: `${Math.floor(Math.random() * 110)}vw`, // Allow some overflow for edge effects
          animationDelay: `-${animationDelay}s`, // Negative delay for continuous effect
        }}
      />
    );
  });

  return <div className="bubbles-container">{bubbles}</div>;
};

export default Bubbles;
