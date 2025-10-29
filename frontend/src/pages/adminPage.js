import React, { useEffect, useState } from "react";
import { apiUrl } from "../api";
import "../styles/admin.css";
import Bubbles from "../components/bubbles";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function AdminPage() {
  const [me, setMe] = useState(null);
  const [users, setUsers] = useState([]);
  const [species, setSpecies] = useState([]);
  const [sightings, setSightings] = useState([]);
  const token = localStorage.getItem("token");
  const [editingSpeciesId, setEditingSpeciesId] = useState(null);
  const [editingSpeciesData, setEditingSpeciesData] = useState({});
  const [editingSightingId, setEditingSightingId] = useState(null);
  const [editingSightingData, setEditingSightingData] = useState({});
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: null,
  });
  const [toasts, setToasts] = useState([]);
  const [speciesEditModal, setSpeciesEditModal] = useState({
    open: false,
    data: null,
  });
  const [sightingEditModal, setSightingEditModal] = useState({
    open: false,
    data: null,
  });

  useEffect(() => {
    if (!token) return;
    fetch(apiUrl("/users/me"), {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => setMe(data))
      .catch((err) => console.error(err));

    // Fetch lists (admins only endpoints)
    fetch(apiUrl("/users"), { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));

    fetch(apiUrl("/species"), { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data) => setSpecies(data))
      .catch((err) => console.error(err));

    // Admins should fetch the admin-only list of all sightings
    fetch(apiUrl("/sightings/all"), {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => setSightings(data))
      .catch((err) => console.error(err));
  }, [token]);

  const refreshUsers = async () => {
    try {
      const res = await fetch(apiUrl("/users"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error refreshing users:", error);
      showToast("Failed to refresh users", "danger");
    }
  };

  const refreshSpecies = async () => {
    try {
      const res = await fetch(apiUrl("/species"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setSpecies(data);
    } catch (error) {
      console.error("Error refreshing species:", error);
      showToast("Failed to refresh species", "danger");
    }
  };

  const refreshSightings = async () => {
    try {
      // When used in admin console, refresh uses the admin endpoint
      const res = await fetch(apiUrl("/sightings/all"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setSightings(data);
    } catch (error) {
      console.error("Error refreshing sightings:", error);
      showToast("Failed to refresh sightings", "danger");
    }
  };

  const promoteToAdmin = async (userId) => {
    if (!token) return;
    try {
      const response = await fetch(apiUrl(`/users/${userId}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: "admin" }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      await refreshUsers();
      showToast("User promoted to admin", "success");
    } catch (error) {
      console.error("Error promoting user to admin:", error);
      showToast(`Failed to promote user: ${error.message}`, "danger");
    }
  };

  const demoteToUser = async (userId) => {
    if (!token) return;
    try {
      const response = await fetch(apiUrl(`/users/${userId}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: "user" }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      await refreshUsers();
      showToast("User demoted to user", "info");
    } catch (error) {
      console.error("Error demoting user:", error);
      showToast(`Failed to demote user: ${error.message}`, "danger");
    }
  };

  const deleteUser = async (userId) => {
    if (!token) return;
    try {
      const response = await fetch(apiUrl(`/users/${userId}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      await refreshUsers();
      showToast("User deleted", "danger");
    } catch (error) {
      console.error("Error deleting user:", error);
      showToast(`Failed to delete user: ${error.message}`, "danger");
    }
  };

  const deleteSpecies = async (id) => {
    if (!token) return;
    try {
      const response = await fetch(apiUrl(`/species/${id}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      await refreshSpecies();
      showToast("Species deleted", "danger");
    } catch (error) {
      console.error("Error deleting species:", error);
      showToast(`Failed to delete species: ${error.message}`, "danger");
    }
  };

  const deleteSighting = async (id) => {
    if (!token) return;
    try {
      const response = await fetch(apiUrl(`/sightings/${id}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      await refreshSightings();
      showToast("Sighting deleted", "danger");
    } catch (error) {
      console.error("Error deleting sighting:", error);
      showToast(`Failed to delete sighting: ${error.message}`, "danger");
    }
  };

  // Species editing via modal (full fields)
  const openSpeciesEditor = (s) => {
    setSpeciesEditModal({
      open: true,
      data: {
        species_id: s.species_id,
        common_name: s.common_name || "",
        scientific_name: s.scientific_name || "",
        category: s.category || "",
        conservation_status: s.conservation_status || "",
        avg_depth_range: s.avg_depth_range || "",
        habitat: s.habitat || "",
        image_url: s.image_url || "",
        description: s.description || "",
        size_range: s.size_range || "",
        diet: s.diet || "",
        geographic_range: s.geographic_range || "",
      },
    });
    document.body.style.overflow = "hidden";
  };

  const closeSpeciesEditor = () => {
    setSpeciesEditModal({ open: false, data: null });
    document.body.style.overflow = "";
  };

  const saveSpeciesEditor = async () => {
    if (!speciesEditModal.data) return;
    const id = speciesEditModal.data.species_id;
    if (id) {
      await fetch(apiUrl(`/species/${id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          common_name: speciesEditModal.data.common_name,
          scientific_name: speciesEditModal.data.scientific_name,
          category: speciesEditModal.data.category,
          conservation_status: speciesEditModal.data.conservation_status,
          avg_depth_range: speciesEditModal.data.avg_depth_range,
          habitat: speciesEditModal.data.habitat,
          image_url: speciesEditModal.data.image_url,
          description: speciesEditModal.data.description,
          size_range: speciesEditModal.data.size_range,
          diet: speciesEditModal.data.diet,
          geographic_range: speciesEditModal.data.geographic_range,
        }),
      });
      showToast("Species updated", "success");
    } else {
      await fetch(apiUrl("/species"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          common_name: speciesEditModal.data.common_name,
          scientific_name: speciesEditModal.data.scientific_name,
          category: speciesEditModal.data.category,
          conservation_status: speciesEditModal.data.conservation_status,
          avg_depth_range: speciesEditModal.data.avg_depth_range,
          habitat: speciesEditModal.data.habitat,
          image_url: speciesEditModal.data.image_url,
          description: speciesEditModal.data.description,
          size_range: speciesEditModal.data.size_range,
          diet: speciesEditModal.data.diet,
          geographic_range: speciesEditModal.data.geographic_range,
        }),
      });
      showToast("Species created", "success");
    }
    await refreshSpecies();
    closeSpeciesEditor();
  };

  // Sightings editing via modal
  const openSightingEditor = (s) => {
    setSightingEditModal({
      open: true,
      data: {
        sighting_id: s.sighting_id,
        user_id: s.user_id,
        species_id: s.species_id,
        sighting_date: new Date(s.sighting_date).toISOString().split("T")[0],
        location: s.location,
        depth_meters: s.depth_meters,
        notes: s.notes || "",
      },
    });
    document.body.style.overflow = "hidden";
  };

  const closeSightingEditor = () => {
    setSightingEditModal({ open: false, data: null });
    document.body.style.overflow = "";
  };

  const saveSightingEditor = async () => {
    if (!sightingEditModal.data) return;
    const id = sightingEditModal.data.sighting_id;
    if (id) {
      await fetch(apiUrl(`/sightings/${id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          species_id: sightingEditModal.data.species_id,
          sighting_date: sightingEditModal.data.sighting_date,
          location: sightingEditModal.data.location,
          depth_meters: Number(sightingEditModal.data.depth_meters),
          notes: sightingEditModal.data.notes,
        }),
      });
      showToast("Sighting updated", "success");
    } else {
      await fetch(apiUrl("/sightings"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: sightingEditModal.data.user_id,
          species_id: sightingEditModal.data.species_id,
          sighting_date: sightingEditModal.data.sighting_date,
          location: sightingEditModal.data.location,
          depth_meters: Number(sightingEditModal.data.depth_meters),
          notes: sightingEditModal.data.notes,
        }),
      });
      showToast("Sighting created", "success");
    }
    await refreshSightings();
    closeSightingEditor();
  };

  // Confirmation modal helper
  const openConfirm = (title, message, onConfirm) => {
    setConfirmModal({ open: true, title, message, onConfirm });
    // prevent background scroll
    document.body.style.overflow = "hidden";
  };

  const closeConfirm = () => {
    setConfirmModal({ open: false, title: "", message: "", onConfirm: null });
    document.body.style.overflow = "";
  };

  // Toast helper
  const showToast = (message, type = "info", timeout = 3500) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, timeout);
  };

  if (!me) return <div className="admin-container">Loading...</div>;
  if (me.role !== "admin")
    return <div className="admin-container">Access denied. Admins only.</div>;

  return (
    <div className="admin-container">
      <Bubbles />
      <Navbar />
      <div className="admin-inner">
        <h2>Admin Console</h2>
        <div className="admin-section">
          <h3>Users</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td className="admin-actions">
                    {u.role !== "admin" && (
                      <button
                        className="btn"
                        onClick={() =>
                          openConfirm(
                            "Promote user",
                            `Promote ${u.username} to admin?`,
                            () => {
                              promoteToAdmin(u.id);
                              closeConfirm();
                            }
                          )
                        }
                      >
                        Promote
                      </button>
                    )}
                    {u.role === "admin" && (
                      <button
                        className="btn"
                        onClick={() =>
                          openConfirm(
                            "Demote admin",
                            `Demote ${u.username} to user?`,
                            () => {
                              demoteToUser(u.id);
                              closeConfirm();
                            }
                          )
                        }
                      >
                        Demote
                      </button>
                    )}
                    <button
                      className="btn danger"
                      onClick={() =>
                        openConfirm(
                          "Delete user",
                          `Delete ${u.username}? This cannot be undone.`,
                          () => {
                            deleteUser(u.id);
                            closeConfirm();
                          }
                        )
                      }
                      style={{ marginLeft: 8 }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-section">
          <h3>
            Species{" "}
            <button
              className="btn small"
              style={{ marginLeft: 12 }}
              onClick={() => openSpeciesEditor({})}
            >
              Create
            </button>
          </h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Common Name</th>
                <th>Scientific</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {species.map((s) => (
                <tr key={s.species_id}>
                  <td>{s.species_id}</td>
                  <td>{s.common_name}</td>
                  <td>{s.scientific_name}</td>
                  <td className="admin-actions">
                    <button
                      className="btn"
                      onClick={() => openSpeciesEditor(s)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn danger"
                      onClick={() =>
                        openConfirm(
                          "Delete species",
                          `Delete ${s.common_name}?`,
                          () => {
                            deleteSpecies(s.species_id);
                            closeConfirm();
                          }
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-section">
          <h3>
            Sightings{" "}
            <button
              className="btn small"
              style={{ marginLeft: 12 }}
              onClick={() => openSightingEditor({})}
            >
              Create
            </button>
          </h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Species ID</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sightings.map((s) => (
                <tr key={s.sighting_id}>
                  <td>{s.sighting_id}</td>
                  <td>{s.user_id}</td>
                  <td>
                    {species.find((sp) => sp.species_id === s.species_id)
                      ?.common_name || s.species_id}
                  </td>
                  <td>
                    {s.sighting_date
                      ? new Date(s.sighting_date).toLocaleDateString()
                      : "No date"}
                  </td>
                  <td className="admin-actions">
                    <button
                      className="btn"
                      onClick={() => openSightingEditor(s)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn danger"
                      onClick={() =>
                        openConfirm(
                          "Delete sighting",
                          `Delete sighting ${s.sighting_id}?`,
                          () => {
                            deleteSighting(s.sighting_id);
                            closeConfirm();
                          }
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Species editor modal */}
      {speciesEditModal.open && (
        <div className="modal-overlay">
          <div className="modal-content species-modal">
            <div className="modal-header">
              <h2>
                {speciesEditModal.data.species_id
                  ? "Edit Species"
                  : "Create Species"}
              </h2>
              <p>
                {speciesEditModal.data.species_id
                  ? "Update species information"
                  : "Add a new species to the database"}
              </p>
            </div>

            <div className="sighting-form">
              <div className="form-group">
                <label htmlFor="common_name">Common Name</label>
                <input
                  id="common_name"
                  value={speciesEditModal.data.common_name || ""}
                  onChange={(e) =>
                    setSpeciesEditModal({
                      ...speciesEditModal,
                      data: {
                        ...speciesEditModal.data,
                        common_name: e.target.value,
                      },
                    })
                  }
                  placeholder="e.g., Blue Spotted Stingray"
                />
              </div>

              <div className="form-group">
                <label htmlFor="scientific_name">Scientific Name</label>
                <input
                  id="scientific_name"
                  value={speciesEditModal.data.scientific_name || ""}
                  onChange={(e) =>
                    setSpeciesEditModal({
                      ...speciesEditModal,
                      data: {
                        ...speciesEditModal.data,
                        scientific_name: e.target.value,
                      },
                    })
                  }
                  placeholder="e.g., Taeniura lymma"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  id="category"
                  value={speciesEditModal.data.category || ""}
                  onChange={(e) =>
                    setSpeciesEditModal({
                      ...speciesEditModal,
                      data: {
                        ...speciesEditModal.data,
                        category: e.target.value,
                      },
                    })
                  }
                  placeholder="e.g., Fish, Marine Mammal"
                />
              </div>

              <div className="form-group">
                <label htmlFor="conservation_status">Conservation Status</label>
                <input
                  id="conservation_status"
                  value={speciesEditModal.data.conservation_status || ""}
                  onChange={(e) =>
                    setSpeciesEditModal({
                      ...speciesEditModal,
                      data: {
                        ...speciesEditModal.data,
                        conservation_status: e.target.value,
                      },
                    })
                  }
                  placeholder="e.g., LC, NT, VU"
                />
              </div>

              <div className="form-group">
                <label htmlFor="avg_depth_range">Average Depth Range</label>
                <input
                  id="avg_depth_range"
                  value={speciesEditModal.data.avg_depth_range || ""}
                  onChange={(e) =>
                    setSpeciesEditModal({
                      ...speciesEditModal,
                      data: {
                        ...speciesEditModal.data,
                        avg_depth_range: e.target.value,
                      },
                    })
                  }
                  placeholder="e.g., 1-20m"
                />
              </div>

              <div className="form-group">
                <label htmlFor="habitat">Habitat</label>
                <input
                  id="habitat"
                  value={speciesEditModal.data.habitat || ""}
                  onChange={(e) =>
                    setSpeciesEditModal({
                      ...speciesEditModal,
                      data: {
                        ...speciesEditModal.data,
                        habitat: e.target.value,
                      },
                    })
                  }
                  placeholder="e.g., Coral Reef, Sandy Bottom"
                />
              </div>

              <div className="form-group">
                <label htmlFor="image_url">Image URL</label>
                <input
                  id="image_url"
                  value={speciesEditModal.data.image_url || ""}
                  onChange={(e) =>
                    setSpeciesEditModal({
                      ...speciesEditModal,
                      data: {
                        ...speciesEditModal.data,
                        image_url: e.target.value,
                      },
                    })
                  }
                  placeholder="e.g., /images/species/species-name.jpeg"
                />
              </div>

              <div className="form-group">
                <label htmlFor="size_range">Size Range</label>
                <input
                  id="size_range"
                  value={speciesEditModal.data.size_range || ""}
                  onChange={(e) =>
                    setSpeciesEditModal({
                      ...speciesEditModal,
                      data: {
                        ...speciesEditModal.data,
                        size_range: e.target.value,
                      },
                    })
                  }
                  placeholder="e.g., 30-35 cm disc width"
                />
              </div>

              <div className="form-group">
                <label htmlFor="diet">Diet</label>
                <input
                  id="diet"
                  value={speciesEditModal.data.diet || ""}
                  onChange={(e) =>
                    setSpeciesEditModal({
                      ...speciesEditModal,
                      data: {
                        ...speciesEditModal.data,
                        diet: e.target.value,
                      },
                    })
                  }
                  placeholder="e.g., Carnivore, Omnivore, Herbivore"
                />
              </div>

              <div className="form-group">
                <label htmlFor="geographic_range">Geographic Range</label>
                <input
                  id="geographic_range"
                  value={speciesEditModal.data.geographic_range || ""}
                  onChange={(e) =>
                    setSpeciesEditModal({
                      ...speciesEditModal,
                      data: {
                        ...speciesEditModal.data,
                        geographic_range: e.target.value,
                      },
                    })
                  }
                  placeholder="e.g., Indo-Pacific region"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={speciesEditModal.data.description || ""}
                  onChange={(e) =>
                    setSpeciesEditModal({
                      ...speciesEditModal,
                      data: {
                        ...speciesEditModal.data,
                        description: e.target.value,
                      },
                    })
                  }
                  placeholder="Describe the species..."
                  rows="4"
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="modal-cancel"
                  onClick={closeSpeciesEditor}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="modal-save"
                  onClick={saveSpeciesEditor}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sighting editor modal */}
      {sightingEditModal.open && (
        <div className="modal-overlay">
          <div className="modal-content species-modal">
            <div className="modal-header">
              <h2>
                {sightingEditModal.data.sighting_id
                  ? "Edit Sighting"
                  : "Create Sighting"}
              </h2>
              <p>
                {sightingEditModal.data.sighting_id
                  ? "Update sighting information"
                  : "Add a new sighting to the database"}
              </p>
            </div>

            <div className="sighting-form">
              <div className="form-group">
                <label htmlFor="user_id">User ID</label>
                <input
                  id="user_id"
                  value={sightingEditModal.data.user_id || ""}
                  onChange={(e) =>
                    setSightingEditModal({
                      ...sightingEditModal,
                      data: {
                        ...sightingEditModal.data,
                        user_id: e.target.value,
                      },
                    })
                  }
                  placeholder="Enter user ID"
                />
              </div>

              <div className="form-group">
                <label htmlFor="species_id">Species</label>
                <select
                  id="species_id"
                  value={sightingEditModal.data.species_id || ""}
                  onChange={(e) =>
                    setSightingEditModal({
                      ...sightingEditModal,
                      data: {
                        ...sightingEditModal.data,
                        species_id: Number(e.target.value),
                      },
                    })
                  }
                >
                  <option value="">Select species</option>
                  {species.map((sp) => (
                    <option key={sp.species_id} value={sp.species_id}>
                      {sp.common_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="sighting_date">Date</label>
                <input
                  id="sighting_date"
                  type="date"
                  value={sightingEditModal.data.sighting_date || ""}
                  onChange={(e) =>
                    setSightingEditModal({
                      ...sightingEditModal,
                      data: {
                        ...sightingEditModal.data,
                        sighting_date: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  value={sightingEditModal.data.location || ""}
                  onChange={(e) =>
                    setSightingEditModal({
                      ...sightingEditModal,
                      data: {
                        ...sightingEditModal.data,
                        location: e.target.value,
                      },
                    })
                  }
                  placeholder="Enter location"
                />
              </div>

              <div className="form-group">
                <label htmlFor="depth_meters">Depth (m)</label>
                <input
                  id="depth_meters"
                  type="number"
                  value={sightingEditModal.data.depth_meters || 0}
                  onChange={(e) =>
                    setSightingEditModal({
                      ...sightingEditModal,
                      data: {
                        ...sightingEditModal.data,
                        depth_meters: e.target.value,
                      },
                    })
                  }
                  placeholder="Enter depth in meters"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  value={sightingEditModal.data.notes || ""}
                  onChange={(e) =>
                    setSightingEditModal({
                      ...sightingEditModal,
                      data: {
                        ...sightingEditModal.data,
                        notes: e.target.value,
                      },
                    })
                  }
                  placeholder="Add notes about the sighting..."
                  rows="4"
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="modal-cancel"
                  onClick={closeSightingEditor}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="modal-save"
                  onClick={saveSightingEditor}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm modal */}
      {confirmModal.open && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{confirmModal.title}</h3>
            <div className="modal-body">{confirmModal.message}</div>
            <div className="modal-actions">
              <button
                className="btn danger"
                onClick={() => {
                  confirmModal.onConfirm && confirmModal.onConfirm();
                  closeConfirm();
                }}
              >
                Confirm
              </button>
              <button className="btn" onClick={closeConfirm}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toasts */}
      <div className="toasts">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`}>
            {t.message}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default AdminPage;
