// LandingPage.js
import Bubbles from "../components/bubbles";
import Card from "../components/card";
import Footer from "../components/footer";
import HeroSection from "../components/heroSection";
import heroImage from "../assets/heroImage.gif";
import LogSightings from "../assets/sighting.jpeg";
import TrackSpecies from "../assets/species.jpeg";
import Science from "../assets/contributions.jpeg";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/titleWave.css";
import "../styles/navbar.css";
import "@fontsource/raleway";

const LandingPage = () => {
  return (
    <div className="container">
      <Bubbles />
      <header className="navbar">
        <Link to="/" className="navbar-logo-link">
          <img src={logo} alt="Poseidon's Notebook" className="navbar-logo" />
          <div className="content">
            <h1>
              <span className="stroke-text">Poseidon's Notebook</span>
              <span className="fill-text">Poseidon's Notebook</span>
            </h1>
          </div>
        </Link>
      </header>
      <HeroSection
        backgroundImage={heroImage}
        title="Discover the Depths"
        description="Log sightings, track species, and contribute to marine science."
        buttonText="Get Started"
        buttonLink="/signup"
      />

      <div className="value-props">
        <Card
          image={LogSightings}
          title="Log Sightings"
          description="Record marine life encounters in seconds."
          showButton={false}
        />
        <Card
          image={TrackSpecies}
          title="Track Species"
          description="Build your personal species database."
          showButton={false}
        />
        <Card
          image={Science}
          title="Contribute to Science"
          description="Share anonymized data with researchers."
          showButton={false}
        />
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
