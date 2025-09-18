// SpeciesPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Bubbles from '../components/bubbles';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import '../styles/species.css';

const SpeciesPage = () => {
  const [species, setSpecies] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

 // SpeciesPage.jsx - Updated useEffect with mock data
useEffect(() => {
  // Temporary mock data for testing the UI
  const mockSpecies = [
    {
      species_id: 1,
      common_name: "Clownfish",
      scientific_name: "Amphiprioninae",
      category: "Fish",
      conservation_status: "LC",
      avg_depth_range: "0-15m",
      habitat: "Coral Reef",
      image_url: "/images/species/Clownfish.jpeg",
      description: "Made famous by the movie 'Finding Nemo', these fish have a symbiotic relationship with sea anemones.",
      size_range: "8-11 cm",
      diet: "Omnivore",
      geographic_range: "Indo-Pacific region"
    },
    {
      species_id: 2,
      common_name: "Bottlenose Dolphin",
      scientific_name: "Tursiops truncatus",
      category: "Marine Mammal",
      conservation_status: "LC",
      avg_depth_range: "0-50m",
      habitat: "Open Ocean",
      image_url: "/images/species/Bottlenose Dolphin.jpeg",
      description: "The most familiar dolphin species, known for their intelligence and curved mouth.",
      size_range: "2-4 m",
      diet: "Carnivore",
      geographic_range: "Tropical and temperate oceans worldwide"
    },
    {
      species_id: 3,
      common_name: "Green Sea Turtle",
      scientific_name: "Chelonia mydas",
      category: "Sea Turtle",
      conservation_status: "EN",
      avg_depth_range: "0-20m",
      habitat: "Coral Reef",
      image_url: "/images/species/Green Sea Turtle.jpeg",
      description: "Named for the green color of their fat, not their shell. Primarily herbivorous as adults.",
      size_range: "1-1.2 m",
      diet: "Herbivore",
      geographic_range: "Tropical and subtropical oceans worldwide"
    }
  ];
  setSpecies(mockSpecies);
}, []);

  const openModal = (species) => {
    setSelectedSpecies(species);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSpecies(null);
  };

  const filteredSpecies = species.filter(sp => {
    const matchesSearch = sp.common_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sp.scientific_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || sp.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const statusColors = {
    LC: '#4caf50', NT: '#8bc34a', VU: '#ffc107', 
    EN: '#ff9800', CR: '#f44336', DD: '#9e9e9e'
  };

  const statusNames = {
    LC: 'Least Concern', NT: 'Near Threatened', VU: 'Vulnerable',
    EN: 'Endangered', CR: 'Critically Endangered', DD: 'Data Deficient'
  };

  return (
    <div className="species-container">
      <Bubbles />
      <Navbar />
      
      <div className="species-content">
        {/* Header Section */}
        <div className="species-header">
          <h1 className="species-main-title">Marine Species Database</h1>
          <p className="species-subtitle">Discover the incredible diversity of ocean life</p>
        </div>

        {/* Search and Filter */}
        <div className="species-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search species..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            className="category-filter"
          >
            <option value="all">All Categories</option>
            <option value="Fish">Fish</option>
            <option value="Marine Mammal">Marine Mammals</option>
            <option value="Sea Turtle">Sea Turtles</option>
            <option value="Cephalopod">Cephalopods</option>
          </select>
        </div>

        {/* Species Grid */}
        <div className="species-grid">
          {filteredSpecies.map((species) => (
            <div key={species.species_id} className="species-card" onClick={() => openModal(species)}>
              <div className="species-image-container">
                <img 
                  src={species.image_url} 
                  alt={species.common_name}
                  className="species-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200/0f1849/ffffff?text=Marine+Species';
                  }}
                />
                <div 
                  className="conservation-badge"
                  style={{backgroundColor: statusColors[species.conservation_status]}}
                >
                  {species.conservation_status}
                </div>
              </div>
              
              <div className="species-info">
                <h3 className="species-name">{species.common_name}</h3>
                <p className="scientific-name"><em>{species.scientific_name}</em></p>
                
                <div className="species-meta">
                  <span className="category-tag">{species.category}</span>
                  <span className="habitat-tag">{species.habitat}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSpecies.length === 0 && (
          <div className="no-results">
            <h3>No species found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && selectedSpecies && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={closeModal}>×</button>
              
              <div className="modal-header">
                <h2>{selectedSpecies.common_name}</h2>
                <p className="scientific-name"><em>{selectedSpecies.scientific_name}</em></p>
              </div>
              
              <div className="modal-body">
                <div className="modal-image-container">
                  <img 
                    src={selectedSpecies.image_url} 
                    alt={selectedSpecies.common_name}
                    className="modal-image"
                  />
                </div>
                
                <div className="modal-details">
                  <div className="detail-row">
                    <span className="detail-label">Conservation Status:</span>
                    <span className="detail-value status-value" style={{color: statusColors[selectedSpecies.conservation_status]}}>
                      {statusNames[selectedSpecies.conservation_status]}
                    </span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Category:</span>
                    <span className="detail-value">{selectedSpecies.category}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Habitat:</span>
                    <span className="detail-value">{selectedSpecies.habitat}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Size:</span>
                    <span className="detail-value">{selectedSpecies.size_range}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Diet:</span>
                    <span className="detail-value">{selectedSpecies.diet}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Depth Range:</span>
                    <span className="detail-value">{selectedSpecies.avg_depth_range}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Geographic Range:</span>
                    <span className="detail-value">{selectedSpecies.geographic_range}</span>
                  </div>
                  
                  <div className="description-section">
                    <h4>Description</h4>
                    <p>{selectedSpecies.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default SpeciesPage;