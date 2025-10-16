// src/pages/sightingsPage.js
import React, { useState, useEffect } from "react";
import Bubbles from "../components/bubbles";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import searchIcon from "../assets/search.png";
import addIcon from "../assets/add.png";
import "../styles/sightings.css";
import { apiUrl, getImageUrl } from '../api';

const SightingsPage = () => {
  const [sightings, setSightings] = useState([]);
  const [species, setSpecies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpeciesModalOpen, setIsSpeciesModalOpen] = useState(false);
  const [isNewSpeciesModalOpen, setIsNewSpeciesModalOpen] = useState(false);
  const [selectedSighting, setSelectedSighting] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    species_id: "",
    sighting_date: new Date().toISOString().split("T")[0],
    location: "",
    depth_meters: "",
    notes: "",
  });
  const [newSpeciesData, setNewSpeciesData] = useState({
    common_name: "",
    scientific_name: "",
    category: "Fish",
    conservation_status: "LC",
    avg_depth_range: "",
    habitat: "",
    image_url: "",
    description: "",
    size_range: "",
    diet: "",
    geographic_range: "",
  });

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen || isSpeciesModalOpen || isNewSpeciesModalOpen) {
      document.body.style.overflow = "hidden";
      // Force lower z-index on navbar and footer
      const navbar = document.querySelector(".navbar");
      const footer = document.querySelector(".footer");

      if (navbar) navbar.style.zIndex = "1";
      if (footer) footer.style.zIndex = "1";
    } else {
      document.body.style.overflow = "unset";
      // Reset z-index on navbar and footer
      const navbar = document.querySelector(".navbar");
      const footer = document.querySelector(".footer");

      if (navbar) navbar.style.zIndex = "";
      if (footer) footer.style.zIndex = "";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen, isSpeciesModalOpen, isNewSpeciesModalOpen]);

  // Fetch sightings and species data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        // Fetch sightings
  const sightingsResponse = await fetch(apiUrl('/sightings'), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!sightingsResponse.ok) {
          if (sightingsResponse.status === 401) {
            throw new Error("Please log in to view sightings");
          }
          throw new Error(`HTTP error! status: ${sightingsResponse.status}`);
        }

        const sightingsData = await sightingsResponse.json();
        setSightings(sightingsData);

        // Fetch species for the dropdown
  const speciesResponse = await fetch(apiUrl('/species'));
        if (!speciesResponse.ok) {
          throw new Error(`HTTP error! status: ${speciesResponse.status}`);
        }

        const speciesData = await speciesResponse.json();
        setSpecies(speciesData);

        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
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
        sighting_date: new Date(sighting.sighting_date)
          .toISOString()
          .split("T")[0],
        location: sighting.location,
        depth_meters: sighting.depth_meters,
        notes: sighting.notes || "",
      });
    } else {
      setSelectedSighting(null);
      setFormData({
        species_id: "",
        sighting_date: new Date().toISOString().split("T")[0],
        location: "",
        depth_meters: "",
        notes: "",
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

  const openNewSpeciesModal = () => {
    setIsNewSpeciesModalOpen(true);
    setIsSpeciesModalOpen(false);
  };

  const closeNewSpeciesModal = () => {
    setIsNewSpeciesModalOpen(false);
    setNewSpeciesData({
      common_name: "",
      scientific_name: "",
      category: "Fish",
      conservation_status: "LC",
      avg_depth_range: "",
      habitat: "",
      image_url: "",
      description: "",
      size_range: "",
      diet: "",
      geographic_range: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewSpeciesInputChange = (e) => {
    const { name, value } = e.target;
    setNewSpeciesData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const url = selectedSighting
        ? apiUrl(`/api/sightings/${selectedSighting.sighting_id}`)
  : apiUrl('/sightings');

      const method = selectedSighting ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (selectedSighting) {
        // Update existing sighting in the list
        setSightings((prev) =>
          prev.map((s) =>
            s.sighting_id === selectedSighting.sighting_id ? result : s
          )
        );
      } else {
        // Add new sighting to the list
        setSightings((prev) => [result, ...prev]);
      }

      closeModal();
    } catch (err) {
      console.error("Error saving sighting:", err);
      setError("Failed to save sighting. Please try again.");
    }
  };

  const handleNewSpeciesSubmit = async (e) => {
    e.preventDefault();
    try {
  const response = await fetch(apiUrl('/species'), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSpeciesData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newSpecies = await response.json();

      // Add the new species to our local state
      setSpecies((prev) => [...prev, newSpecies]);

      // Set the new species as selected in the sightings form
      setFormData((prev) => ({
        ...prev,
        species_id: newSpecies.species_id,
      }));

      // Close the new species modal and open the sightings modal
      closeNewSpeciesModal();
      setIsModalOpen(true);
    } catch (err) {
      console.error("Error saving new species:", err);
      setError("Failed to save new species. Please try again.");
    }
  };

  const handleDelete = async (sightingId) => {
    if (!window.confirm("Are you sure you want to delete this sighting?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(apiUrl(`/api/sightings/${sightingId}`), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove the sighting from the list
      setSightings((prev) => prev.filter((s) => s.sighting_id !== sightingId));
    } catch (err) {
      console.error("Error deleting sighting:", err);
      setError("Failed to delete sighting. Please try again.");
    }
  };

  const filteredSightings = sightings.filter((sighting) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      sighting.Species?.common_name?.toLowerCase().includes(searchLower) ||
      sighting.Species?.scientific_name?.toLowerCase().includes(searchLower) ||
      sighting.location.toLowerCase().includes(searchLower) ||
      (sighting.notes && sighting.notes.toLowerCase().includes(searchLower))
    );
  });

  // use helper getImageUrl from api.js

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
          <p className="sightings-subtitle">
            Track your marine life observations
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}

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
            <span className="search-icon">
              <img src={searchIcon} alt="Search" className="nav-icon" />
            </span>
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
                  alt={sighting.Species?.common_name || "Unknown species"}
                  className="sighting-image"
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%230f1849'/%3E%3Ctext x='150' y='100' font-family='Arial' font-size='14' fill='%23ffffff' text-anchor='middle'%3EImage Not Available%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>

              <div className="sighting-info">
                <h3 className="species-name">
                  {sighting.Species?.common_name || "Unknown Species"}
                </h3>
                <p className="scientific-name">
                  <em>
                    {sighting.Species?.scientific_name || "Species not found"}
                  </em>
                </p>

                <div className="sighting-details">
                  <div className="detail-item">
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">
                      {new Date(sighting.sighting_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Location:</span>
                    <span className="detail-value">{sighting.location}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Depth:</span>
                    <span className="detail-value">
                      {sighting.depth_meters}m
                    </span>
                  </div>
                  {sighting.notes && (
                    <div className="detail-item">
                      <span className="detail-label">Notes:</span>
                      <span className="detail-value">{sighting.notes}</span>
                    </div>
                  )}
                </div>

                <div className="sighting-actions">
                  <button
                    className="edit-btn"
                    onClick={() => openModal(sighting)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(sighting.sighting_id)}
                  >
                    Delete
                  </button>
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
                <button
                  className="add-sighting-btn"
                  onClick={() => openModal()}
                >
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
              <button className="close-button" onClick={closeModal}>
                ×
              </button>

              <div className="modal-header">
                <h2>
                  {selectedSighting ? "Edit Sighting" : "Add New Sighting"}
                </h2>
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
                    {species.map((sp) => (
                      <option key={sp.species_id} value={sp.species_id}>
                        {sp.common_name} ({sp.scientific_name})
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="text-link"
                    onClick={openSpeciesModal}
                  >
                    Can't find the species? Add a new species
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
                  <button type="button" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit">
                    {selectedSighting ? "Update" : "Add"} Sighting
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Species Selection Modal */}
        {isSpeciesModalOpen && (
          <div className="modal-overlay" onClick={closeSpeciesModal}>
            <div
              className="modal-content species-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-button" onClick={closeSpeciesModal}>
                ×
              </button>

              <div className="modal-header">
                <h2>Species Options</h2>
                <p>What would you like to do?</p>
              </div>

              <div className="species-options-container">
                <button
                  type="button"
                  className="species-option-btn"
                  onClick={() => (window.location.href = "/species")}
                >
                  Browse All Species
                </button>
                <button
                  type="button"
                  className="species-option-btn"
                  onClick={openNewSpeciesModal}
                >
                  Add New Species
                </button>
                <button
                  type="button"
                  className="species-option-cancel-btn"
                  onClick={closeSpeciesModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add New Species Modal */}
        {isNewSpeciesModalOpen && (
          <div className="modal-overlay" onClick={closeNewSpeciesModal}>
            <div
              className="modal-content new-species-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-button" onClick={closeNewSpeciesModal}>
                ×
              </button>

              <div className="modal-header">
                <h2>Add New Species</h2>
                <p>Add a new species to the database</p>
              </div>

              <form className="sighting-form" onSubmit={handleNewSpeciesSubmit}>
                <div className="form-group">
                  <label htmlFor="common_name">Common Name *</label>
                  <input
                    type="text"
                    id="common_name"
                    name="common_name"
                    value={newSpeciesData.common_name}
                    onChange={handleNewSpeciesInputChange}
                    placeholder="e.g., Blue Spotted Stingray"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="scientific_name">Scientific Name *</label>
                  <input
                    type="text"
                    id="scientific_name"
                    name="scientific_name"
                    value={newSpeciesData.scientific_name}
                    onChange={handleNewSpeciesInputChange}
                    placeholder="e.g., Taeniura lymma"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={newSpeciesData.category}
                    onChange={handleNewSpeciesInputChange}
                    required
                  >
                    <option value="Fish">Fish</option>
                    <option value="Marine Mammal">Marine Mammal</option>
                    <option value="Sea Turtle">Sea Turtle</option>
                    <option value="Cephalopod">Cephalopod</option>
                    <option value="Crustacean">Crustacean</option>
                    <option value="Coral">Coral</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="conservation_status">
                    Conservation Status *
                  </label>
                  <select
                    id="conservation_status"
                    name="conservation_status"
                    value={newSpeciesData.conservation_status}
                    onChange={handleNewSpeciesInputChange}
                    required
                  >
                    <option value="LC">Least Concern (LC)</option>
                    <option value="NT">Near Threatened (NT)</option>
                    <option value="VU">Vulnerable (VU)</option>
                    <option value="EN">Endangered (EN)</option>
                    <option value="CR">Critically Endangered (CR)</option>
                    <option value="DD">Data Deficient (DD)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="avg_depth_range">Average Depth Range</label>
                  <input
                    type="text"
                    id="avg_depth_range"
                    name="avg_depth_range"
                    value={newSpeciesData.avg_depth_range}
                    onChange={handleNewSpeciesInputChange}
                    placeholder="e.g., 1-20m"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="habitat">Habitat</label>
                  <input
                    type="text"
                    id="habitat"
                    name="habitat"
                    value={newSpeciesData.habitat}
                    onChange={handleNewSpeciesInputChange}
                    placeholder="e.g., Coral Reef, Sandy Bottom"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="image_url">Image URL</label>
                  <input
                    type="text"
                    id="image_url"
                    name="image_url"
                    value={newSpeciesData.image_url}
                    onChange={handleNewSpeciesInputChange}
                    placeholder="e.g., /images/species/blue-spotted-stingray.jpeg"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={newSpeciesData.description}
                    onChange={handleNewSpeciesInputChange}
                    placeholder="Describe the species..."
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="size_range">Size Range</label>
                  <input
                    type="text"
                    id="size_range"
                    name="size_range"
                    value={newSpeciesData.size_range}
                    onChange={handleNewSpeciesInputChange}
                    placeholder="e.g., 30-35 cm disc width"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="diet">Diet</label>
                  <input
                    type="text"
                    id="diet"
                    name="diet"
                    value={newSpeciesData.diet}
                    onChange={handleNewSpeciesInputChange}
                    placeholder="e.g., Carnivore, Omnivore, Herbivore"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="geographic_range">Geographic Range</label>
                  <input
                    type="text"
                    id="geographic_range"
                    name="geographic_range"
                    value={newSpeciesData.geographic_range}
                    onChange={handleNewSpeciesInputChange}
                    placeholder="e.g., Indo-Pacific region"
                  />
                </div>

                <div className="form-actions">
                  <button type="button" onClick={closeNewSpeciesModal}>
                    Cancel
                  </button>
                  <button type="submit">Add Species</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SightingsPage;
