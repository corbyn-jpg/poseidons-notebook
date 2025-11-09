import React from "react";
import "../styles/bubbles.css";

const Bubbles = () => {
  // Generate 35 bubbles for better performance while maintaining visual appeal
  const bubbles = Array.from({ length: 35 }).map((_, i) => {
    const size = Math.floor(Math.random() * 95) + 5; // 5-100px
    const isEven = i % 2 === 0;
    const animationDuration = Math.floor(Math.random() * 10) + 3; // 3-13s
    const initialBottom = Math.floor(Math.random() * 100); // 0-100vh
    const finalBottom = Math.floor(Math.random() * 100); // 0-100vh
    const translateX = Math.floor(Math.random() * 300) - 100; // -100 to 200px

    return (
      <div
        key={i}
        className="bubble"
        style={{
          "--size": `${size}px`,
          "--initial-bottom": `${initialBottom}vh`,
          "--final-bottom": `${finalBottom}vh`,
          "--translate-x": `${translateX}px`,
          "--duration": `${animationDuration}s`,
          "--bg-pos": isEven ? "top right" : "center",
          left: `${Math.floor(Math.random() * 100)}vw`,
        }}
      />
    );
  });

  return <div className="bubbles-container">{bubbles}</div>;
};

export default Bubbles;
