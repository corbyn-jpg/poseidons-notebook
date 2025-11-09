import React from "react";
import "../styles/bubbles.css";

const Bubbles = () => {
  // Generate 40 bubbles with enhanced physics-based properties
  const bubbles = Array.from({ length: 40 }).map((_, i) => {
    const size = Math.floor(Math.random() * 80) + 8; // 8-88px
    const isEven = i % 2 === 0;
    const animationDuration = Math.floor(Math.random() * 12) + 6; // 6-18s for smoother motion
    const initialBottom = -120; // Start below screen
    const finalBottom = Math.floor(Math.random() * 150) + 100; // End above screen
    const translateX = Math.floor(Math.random() * 400) - 200; // -200 to 200px
    const delay = Math.random() * 8; // 0-8s staggered start
    const maxOpacity = Math.random() * 0.4 + 0.3; // 0.3-0.7 opacity variation

    return (
      <div
        key={i}
        className="bubble"
        style={{
          "--size": `${size}px`,
          "--initial-bottom": `${initialBottom}px`,
          "--final-bottom": `${finalBottom}vh`,
          "--translate-x": `${translateX}px`,
          "--duration": `${animationDuration}s`,
          "--delay": `${delay}s`,
          "--max-opacity": maxOpacity,
          "--bg-pos": isEven ? "top right" : "center left",
          left: `${Math.floor(Math.random() * 120) - 10}vw`, // -10vw to 110vw for off-screen start
        }}
      />
    );
  });

  return <div className="bubbles-container">{bubbles}</div>;
};

export default Bubbles;
