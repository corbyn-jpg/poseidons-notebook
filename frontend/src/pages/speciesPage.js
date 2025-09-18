import React, { useState, useEffect } from 'react';
import Bubbles from '../components/bubbles';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import searchIcon from '../assets/search.png';
import '../styles/species.css';

const SpeciesPage = () => {
  const [species, setSpecies] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch species data from your backend API
  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/species');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setSpecies(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching species:', err);
        setError('Failed to load species data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSpecies();
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

  // Function to get the correct image URL
  const getImageUrl = (imagePath) => {
    // If it's already a full URL, return it
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    return `http://localhost:5000${imagePath}`;
  };

  if (loading) {
    return (
      <div className="species-container">
        <div className="loading-spinner">Loading marine species...</div>
      </div>
    );
  }

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

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

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
            <span className="search-icon"><img src={searchIcon} alt="Species" className="nav-icon" /></span>
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
            <option value="Crustacean">Crustaceans</option>
          </select>
        </div>

        {/* Species Grid */}
        <div className="species-grid">
          {filteredSpecies.map((species) => (
            <div key={species.species_id} className="species-card" onClick={() => openModal(species)}>
              <div className="species-image-container">
                <img 
                  src={getImageUrl(species.image_url)} 
                  alt={species.common_name}
                  className="species-image"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'200\' viewBox=\'0 0 300 200\'%3E%3Crect width=\'300\' height=\'200\' fill=\'%230f1849\'/%3E%3Ctext x=\'150\' y=\'100\' font-family=\'Arial\' font-size=\'14\' fill=\'%23ffffff\' text-anchor=\'middle\'%3EImage Not Available%3C/text%3E%3C/svg%3E';
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
                    src={getImageUrl(selectedSpecies.image_url)} 
                    alt={selectedSpecies.common_name}
                    className="modal-image"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'200\' viewBox=\'0 0 300 200\'%3E%3Crect width=\'300\' height=\'200\' fill=\'%230f1849\'/%3E%3Ctext x=\'150\' y=\'100\' font-family=\'Arial\' font-size=\'14\' fill=\'%23ffffff\' text-anchor=\'middle\'%3EImage Not Available%3C/text%3E%3C/svg%3E';
                    }}
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