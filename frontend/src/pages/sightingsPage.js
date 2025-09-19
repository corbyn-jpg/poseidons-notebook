// src/pages/sightingsPage.js
import React, { useState, useEffect } from 'react';
import Bubbles from '../components/bubbles';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import searchIcon from '../assets/search.png';
import addIcon from '../assets/add.png';
import '../styles/sightings.css';

const SightingsPage = () => {
  const [sightings, setSightings] = useState([]);
  const [species, setSpecies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpeciesModalOpen, setIsSpeciesModalOpen] = useState(false);
  const [selectedSighting, setSelectedSighting] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');
  const [formData, setFormData] = useState({
    species_id: '',
    sighting_date: new Date().toISOString().split('T')[0],
    location: '',
    depth_meters: '',
    notes: ''
  });

  // Fetch sightings and species data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        setDebugInfo(`Token found: ${!!token}`);
        
        if (!token) {
          setError('Please log in to view sightings');
          setLoading(false);
          return;
        }

        // Fetch sightings
        const sightingsResponse = await fetch('http://localhost:5000/api/sightings', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        setDebugInfo(prev => prev + ` | Sightings status: ${sightingsResponse.status}`);
        
        if (!sightingsResponse.ok) {
          if (sightingsResponse.status === 401) {
            throw new Error('Please log in to view sightings');
          }
          if (sightingsResponse.status === 500) {
            // Try to get more details about the error
            const errorData = await sightingsResponse.text();
            throw new Error(`Server error: ${errorData}`);
          }
          throw new Error(`HTTP error! status: ${sightingsResponse.status}`);
        }
        
        const sightingsData = await sightingsResponse.json();
        setSightings(sightingsData);
        
        // Fetch species for the dropdown
        const speciesResponse = await fetch('http://localhost:5000/api/species');
        setDebugInfo(prev => prev + ` | Species status: ${speciesResponse.status}`);
        
        if (!speciesResponse.ok) {
          throw new Error(`HTTP error! status: ${speciesResponse.status}`);
        }
        
        const speciesData = await speciesResponse.json();
        setSpecies(speciesData);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openModal = (sighting = null) => {
    if (sighting) {
      setSelectedSighting(sighting);
      setFormData({
        species_id: sighting.species_id,
        sighting_date: new Date(sighting.sighting_date).toISOString().split('T')[0],
        location: sighting.location,
        depth_meters: sighting.depth_meters,
        notes: sighting.notes || ''
      });
    } else {
      setSelectedSighting(null);
      setFormData({
        species_id: '',
        sighting_date: new Date().toISOString().split('T')[0],
        location: '',
        depth_meters: '',
        notes: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSighting(null);
  };

  const openSpeciesModal = () => {
    setIsSpeciesModalOpen(true);
  };

  const closeSpeciesModal = () => {
    setIsSpeciesModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = selectedSighting 
        ? `http://localhost:5000/api/sightings/${selectedSighting.sighting_id}`
        : 'http://localhost:5000/api/sightings';
      
      const method = selectedSighting ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (selectedSighting) {
        // Update existing sighting in the list
        setSightings(prev => prev.map(s => 
          s.sighting_id === selectedSighting.sighting_id ? result : s
        ));
      } else {
        // Add new sighting to the list
        setSightings(prev => [result, ...prev]);
      }
      
      closeModal();
    } catch (err) {
      console.error('Error saving sighting:', err);
      setError('Failed to save sighting. Please try again.');
    }
  };

  const handleDelete = async (sightingId) => {
    if (!window.confirm('Are you sure you want to delete this sighting?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/sightings/${sightingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Remove the sighting from the list
      setSightings(prev => prev.filter(s => s.sighting_id !== sightingId));
    } catch (err) {
      console.error('Error deleting sighting:', err);
      setError('Failed to delete sighting. Please try again.');
    }
  };

  const filteredSightings = sightings.filter(sighting => {
    const searchLower = searchTerm.toLowerCase();
    return (
      sighting.Species?.common_name?.toLowerCase().includes(searchLower) ||
      sighting.Species?.scientific_name?.toLowerCase().includes(searchLower) ||
      sighting.location.toLowerCase().includes(searchLower) ||
      (sighting.notes && sighting.notes.toLowerCase().includes(searchLower))
    );
  });

  const getImageUrl = (imagePath) => {
    if (imagePath && imagePath.startsWith('http')) {
      return imagePath;
    }
    return imagePath ? `http://localhost:5000${imagePath}` : 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'200\' viewBox=\'0 0 300 200\'%3E%3Crect width=\'300\' height=\'200\' fill=\'%230f1849\'/%3E%3Ctext x=\'150\' y=\'100\' font-family=\'Arial\' font-size=\'14\' fill=\'%23ffffff\' text-anchor=\'middle\'%3EImage Not Available%3C/text%3E%3C/svg%3E';
  };

  if (loading) {
    return (
      <div className="sightings-container">
        <div className="loading-spinner">Loading your sightings...</div>
      </div>
    );
  }

  return (
    <div className="sightings-container">
      <Bubbles />
      <Navbar />
      <div className="sightings-content">
        {/* Header Section */}
        <div className="sightings-header">
          <h1 className="sightings-main-title">My Sightings</h1>
          <p className="sightings-subtitle">Track your marine life observations</p>
        </div>

        {error && (
          <div className="error-message">
            <h3>Error Loading Data</h3>
            <p>{error}</p>
            <p className="debug-info">Debug: {debugInfo}</p>
            <button onClick={() => window.location.reload()} className="retry-btn">
              Retry
            </button>
          </div>
        )}

        {/* Controls */}
        <div className="sightings-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search sightings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon"><img src={searchIcon} alt="Search" className="nav-icon" /></span>
          </div>
          
          <button className="add-sighting-btn" onClick={() => openModal()}>
            <img src={addIcon} alt="Add" className="nav-icon" />
            Add Sighting
          </button>
        </div>

        {/* Sightings List */}
        <div className="sightings-list">
          {filteredSightings.map((sighting) => (
            <div key={sighting.sighting_id} className="sighting-card">
              <div className="sighting-image-container">
                <img 
                  src={getImageUrl(sighting.Species?.image_url)} 
                  alt={sighting.Species?.common_name || 'Unknown species'}
                  className="sighting-image"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'200\' viewBox=\'0 0 300 200\'%3E%3Crect width=\'300\' height=\'200\' fill=\'%230f1849\'/%3E%3Ctext x=\'150\' y=\'100\' font-family=\'Arial\' font-size=\'14\' fill=\'%23ffffff\' text-anchor=\'middle\'%3EImage Not Available%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              
              <div className="sighting-info">
                <h3 className="species-name">{sighting.Species?.common_name || 'Unknown Species'}</h3>
                <p className="scientific-name"><em>{sighting.Species?.scientific_name || 'Species not found'}</em></p>
                
                <div className="sighting-details">
                  <div className="detail-item">
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">{new Date(sighting.sighting_date).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Location:</span>
                    <span className="detail-value">{sighting.location}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Depth:</span>
                    <span className="detail-value">{sighting.depth_meters}m</span>
                  </div>
                  {sighting.notes && (
                    <div className="detail-item">
                      <span className="detail-label">Notes:</span>
                      <span className="detail-value">{sighting.notes}</span>
                    </div>
                  )}
                </div>
                
                <div className="sighting-actions">
                  <button className="edit-btn" onClick={() => openModal(sighting)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(sighting.sighting_id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSightings.length === 0 && !error && (
          <div className="no-results">
            {sightings.length === 0 ? (
              <>
                <h3>No sightings yet</h3>
                <p>Start by adding your first sighting!</p>
                <button className="add-sighting-btn" onClick={() => openModal()}>
                  <img src={addIcon} alt="Add" className="nav-icon" />
                  Add Your First Sighting
                </button>
              </>
            ) : (
              <>
                <h3>No sightings found</h3>
                <p>Try adjusting your search criteria</p>
              </>
            )}
          </div>
        )}

        {/* Add/Edit Sighting Modal */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={closeModal}>×</button>
              
              <div className="modal-header">
                <h2>{selectedSighting ? 'Edit Sighting' : 'Add New Sighting'}</h2>
              </div>
              
              <form className="sighting-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="species_id">Species *</label>
                  <select
                    id="species_id"
                    name="species_id"
                    value={formData.species_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a species</option>
                    {species.map(sp => (
                      <option key={sp.species_id} value={sp.species_id}>
                        {sp.common_name} ({sp.scientific_name})
                      </option>
                    ))}
                  </select>
                  <button type="button" className="text-link" onClick={openSpeciesModal}>
                    Can't find the species? Add it to the database
                  </button>
                </div>
                
                <div className="form-group">
                  <label htmlFor="sighting_date">Date *</label>
                  <input
                    type="date"
                    id="sighting_date"
                    name="sighting_date"
                    value={formData.sighting_date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="location">Location *</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Great Barrier Reef, Australia"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="depth_meters">Depth (meters) *</label>
                  <input
                    type="number"
                    id="depth_meters"
                    name="depth_meters"
                    value={formData.depth_meters}
                    onChange={handleInputChange}
                    min="0"
                    step="0.1"
                    placeholder="e.g., 12.5"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="notes">Notes</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any additional observations..."
                    rows="3"
                  />
                </div>
                
                <div className="form-actions">
                  <button type="button" onClick={closeModal}>Cancel</button>
                  <button type="submit">{selectedSighting ? 'Update' : 'Add'} Sighting</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Species Modal (for adding new species) */}
        {isSpeciesModalOpen && (
          <div className="modal-overlay" onClick={closeSpeciesModal}>
            <div className="modal-content species-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={closeSpeciesModal}>×</button>
              
              <div className="modal-header">
                <h2>Add New Species</h2>
                <p>This will redirect you to the species page to add a new species to the database.</p>
              </div>
              
              <div className="modal-buttons">
                <button className='modal-cancel' type="button" onClick={closeSpeciesModal}>Cancel</button>
                <button className='modal-species' type="button" onClick={() => window.location.href = '/species'}>
                  Go to Species Page
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SightingsPage;