import React, { useState, useEffect } from "react";
import "../styles/sightings.css";

const SightingsPage = () => {
  const [sightings, setSightings] = useState([]);
  const [species, setSpecies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isNewSpecies, setIsNewSpecies] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    species_id: "",
    common_name: "",
    scientific_name: "",
    category: "",
    location: "",
    date: new Date().toISOString().split("T")[0],
    depth: "",
    notes: "",
    image_url: "",
  });

  // Fetch sightings and species
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [sightingsRes, speciesRes] = await Promise.all([
        fetch("/api/sightings"),
        fetch("/api/species"),
      ]);

      if (!sightingsRes.ok || !speciesRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const [sightingsData, speciesData] = await Promise.all([
        sightingsRes.json(),
        speciesRes.json(),
      ]);

      setSightings(sightingsData);
      setSpecies(speciesData);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSpeciesChange = (e) => {
    const speciesId = e.target.value;
    if (speciesId === "new") {
      setIsNewSpecies(true);
      setFormData((prev) => ({
        ...prev,
        species_id: "",
        common_name: "",
        scientific_name: "",
        category: "",
      }));
    } else {
      setIsNewSpecies(false);
      const selectedSpecies = species.find((s) => s.species_id == speciesId);
      setFormData((prev) => ({
        ...prev,
        species_id: speciesId,
        common_name: selectedSpecies?.common_name || "",
        scientific_name: selectedSpecies?.scientific_name || "",
        category: selectedSpecies?.category || "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/sightings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create sighting");
      }

      const newSighting = await response.json();
      setSightings((prev) => [newSighting, ...prev]);
      setShowForm(false);
      resetForm();
      setError(null);
    } catch (err) {
      console.error("Error creating sighting:", err);
      setError("Failed to log sighting. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      species_id: "",
      common_name: "",
      scientific_name: "",
      category: "",
      location: "",
      date: new Date().toISOString().split("T")[0],
      depth: "",
      notes: "",
      image_url: "",
    });
    setIsNewSpecies(false);
  };

  if (loading) {
    return <div className="loading">Loading sightings...</div>;
  }

  return (
    <div className="sightings-container">
      <div className="sightings-content">
        <div className="sightings-header">
          <h1>Marine Sightings Log</h1>
          <p>
            Record your underwater encounters and contribute to our database
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button
          className="add-sighting-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "+ Log New Sighting"}
        </button>

        {showForm && (
          <div className="sighting-form-container">
            <h2>Log a Sighting</h2>
            <form onSubmit={handleSubmit} className="sighting-form">
              <div className="form-group">
                <label>Species:</label>
                <select
                  value={isNewSpecies ? "new" : formData.species_id}
                  onChange={handleSpeciesChange}
                  required={!isNewSpecies}
                >
                  <option value="">Select a species</option>
                  {species.map((sp) => (
                    <option key={sp.species_id} value={sp.species_id}>
                      {sp.common_name} ({sp.scientific_name})
                    </option>
                  ))}
                  <option value="new">+ Add New Species</option>
                </select>
              </div>

              {isNewSpecies && (
                <div className="new-species-fields">
                  <div className="form-group">
                    <label>Common Name *</label>
                    <input
                      type="text"
                      name="common_name"
                      value={formData.common_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Scientific Name *</label>
                    <input
                      type="text"
                      name="scientific_name"
                      value={formData.scientific_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select category</option>
                      <option value="Fish">Fish</option>
                      <option value="Marine Mammal">Marine Mammal</option>
                      <option value="Sea Turtle">Sea Turtle</option>
                      <option value="Cephalopod">Cephalopod</option>
                      <option value="Crustacean">Crustacean</option>
                      <option value="Coral">Coral</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label>Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Great Barrier Reef, Australia"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Depth (meters)</label>
                  <input
                    type="number"
                    name="depth"
                    value={formData.depth}
                    onChange={handleInputChange}
                    placeholder="e.g., 15.5"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Describe your sighting, behavior observed, water conditions, etc."
                  rows="3"
                />
              </div>

              <button type="submit" className="submit-btn">
                Log Sighting
              </button>
            </form>
          </div>
        )}

        <div className="sightings-list">
          <h2>Recent Sightings</h2>
          {sightings.length === 0 ? (
            <div className="no-sightings">
              <p>No sightings recorded yet. Be the first to log a sighting!</p>
            </div>
          ) : (
            sightings.map((sighting) => (
              <div key={sighting.sighting_id} className="sighting-card">
                <div className="sighting-image">
                  <img
                    src={
                      sighting.image_url ||
                      sighting.Species?.image_url ||
                      "/images/default-sighting.jpg"
                    }
                    alt={sighting.Species?.common_name}
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%230f1849'/%3E%3Ctext x='150' y='100' font-family='Arial' font-size='14' fill='%23ffffff' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <div className="sighting-info">
                  <h3>{sighting.Species?.common_name || "Unknown Species"}</h3>
                  <p className="scientific-name">
                    <em>
                      {sighting.Species?.scientific_name || "Not specified"}
                    </em>
                  </p>
                  <div className="sighting-details">
                    <span className="location">📍 {sighting.location}</span>
                    <span className="date">
                      📅 {new Date(sighting.sighting_date).toLocaleDateString()}
                    </span>
                    {sighting.depth && (
                      <span className="depth">🌊 {sighting.depth}m</span>
                    )}
                  </div>
                  {sighting.notes && <p className="notes">{sighting.notes}</p>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SightingsPage;
