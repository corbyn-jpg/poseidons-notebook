import React from "react";
import "../styles/bubbles.css";

const Bubbles = () => {
  // Generate 35 bubbles for better performance while maintaining visual appeal
  const bubbles = Array.from({ length: 35 }).map((_, i) => {
    const size = Math.floor(Math.random() * 95) + 5; // 5-100px
    const isEven = i % 2 === 0;
    const animationDuration = Math.floor(Math.random() * 10) + 3; // 3-13s
    const initialBottom = -200; // Always start below the page bottom
    const finalBottom = window.innerHeight + 200; // End above the viewport
    const translateX = Math.floor(Math.random() * 300) - 100; // -100 to 200px

    return (
      <div
        key={i}
        className="bubble"
        style={{
          "--size": `${size}px`,
          "--initial-bottom": `${initialBottom}px`,
          "--final-bottom": `${finalBottom}px`,
          "--translate-x": `${translateX}px`,
          "--duration": `${animationDuration}s`,
          "--bg-pos": isEven ? "top right" : "center",
          left: `${Math.floor(Math.random() * 100)}%`,
        }}
      />
    );
  });

  return <div className="bubbles-container">{bubbles}</div>;
};

export default Bubbles;
