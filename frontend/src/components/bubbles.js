import React from "react";
import "../styles/bubbles.css";

const Bubbles = () => {
  // Generate optimized bubbles for better performance
  const bubbles = Array.from({ length: 25 }).map((_, i) => {
    const size = Math.floor(Math.random() * 60) + 15; // 15-75px 
    const variant = Math.floor(Math.random() * 2) + 1; // 1-2 for simpler variants
    const animationDuration = Math.floor(Math.random() * 8) + 10; // 10-18s 
    const initialBottom = Math.floor(Math.random() * 30); // Start lower 
    const finalBottom = Math.floor(Math.random() * 20) + 100; // End higher
    const translateX = Math.floor(Math.random() * 200) - 100; // -100 to 100px 
    const initialOpacity = (Math.random() * 0.3) + 0.4; // 0.4-0.7 
    
    // Simpler background positions
    const bgPositions = ["30% 30%", "70% 30%", "50% 60%"];
    const bgPos = bgPositions[Math.floor(Math.random() * bgPositions.length)];
    
    // Reduce delay complexity for performance
    const animationDelay = (i * 0.3) % 5;

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
