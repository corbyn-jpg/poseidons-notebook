import React from "react";
import { Link } from "react-router-dom";
import Bubbles from "../components/bubbles";
import Navbar from "../components/navbar";
import Card from "../components/card";
import Footer from "../components/footer";
import HeroSection from "../components/heroSection";
import heroImage from "../assets/heroImage.gif";
import LogSightings from "../assets/LogSightings.jpeg";
import TrackSpecies from "../assets/TrackSpecies.jpeg";
import Science from "../assets/Science.jpeg";
import "@fontsource/raleway";
import "../styles/landingPage.css";

const HomePage = () => {
  return (
    <div className="container">
      <Bubbles />
      <Navbar />
      <HeroSection
        backgroundImage={heroImage}
        title="Your Marine Discoveries Await"
        description="Continue your journey - log new sightings, track species you've encountered, and contribute to marine conservation efforts."
        buttonText="Log New Sighting"
        buttonLink="/sightings"
      />

      <div className="value-props">
        <Card
          image={LogSightings}
          title="Log New Sightings"
          description="Document your latest marine discoveries with our quick-entry system."
          learn={"Log a Sighting"}
          to="/sightings"
        />
        <Card
          image={TrackSpecies}
          title="Your Species Collection"
          description="Review and manage the marine life you've encountered on your journeys."
          learn={"View Species"}
          to="/species"
        />
        <Card
          image={Science}
          title="Your Scientific Impact"
          description="See how your contributions are helping advance marine research worldwide."
          learn={"View Contributions"}
          to="/contributions"
        />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
