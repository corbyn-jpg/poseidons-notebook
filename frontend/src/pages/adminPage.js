import React, { useEffect, useState } from 'react';
import { apiUrl } from '../api';
import '../styles/admin.css';
import Bubbles from '../components/bubbles';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

function AdminPage() {
  const [me, setMe] = useState(null);
  const [users, setUsers] = useState([]);
  const [species, setSpecies] = useState([]);
  const [sightings, setSightings] = useState([]);
  const token = localStorage.getItem('token');
  const [editingSpeciesId, setEditingSpeciesId] = useState(null);
  const [editingSpeciesData, setEditingSpeciesData] = useState({});
  const [editingSightingId, setEditingSightingId] = useState(null);
  const [editingSightingData, setEditingSightingData] = useState({});

  useEffect(() => {
    if (!token) return;
    fetch(apiUrl('/users/me'), { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => setMe(data))
      .catch(err => console.error(err));

    // Fetch lists (admins only endpoints)
    fetch(apiUrl('/users'), { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));

    fetch(apiUrl('/species'), { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => setSpecies(data))
      .catch(err => console.error(err));

    fetch(apiUrl('/sightings'), { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => setSightings(data))
      .catch(err => console.error(err));
  }, [token]);

  const refreshUsers = async () => {
    const res = await fetch(apiUrl('/users'), { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    setUsers(data);
  };

  const refreshSpecies = async () => {
    const res = await fetch(apiUrl('/species'), { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    setSpecies(data);
  };

  const refreshSightings = async () => {
    const res = await fetch(apiUrl('/sightings'), { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    setSightings(data);
  };

  const promoteToAdmin = async (userId) => {
    if (!token) return;
    await fetch(apiUrl(`/users/${userId}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ role: 'admin' })
    });
    await refreshUsers();
  };

  const demoteToUser = async (userId) => {
    if (!token) return;
    await fetch(apiUrl(`/users/${userId}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ role: 'user' })
    });
    await refreshUsers();
  };

  const deleteUser = async (userId) => {
    if (!token) return;
    await fetch(apiUrl(`/users/${userId}`), { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    setUsers(users.filter(u => u.id !== userId));
  };

  const deleteSpecies = async (id) => {
    if (!token) return;
    await fetch(apiUrl(`/species/${id}`), { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    await refreshSpecies();
  };

  const deleteSighting = async (id) => {
    if (!token) return;
    await fetch(apiUrl(`/sightings/${id}`), { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    await refreshSightings();
  };

  // Species editing
  const startEditSpecies = (s) => {
    setEditingSpeciesId(s.id);
    setEditingSpeciesData({
      common_name: s.common_name || '',
      scientific_name: s.scientific_name || '',
      category: s.category || '',
      conservation_status: s.conservation_status || ''
    });
  };

  const cancelEditSpecies = () => {
    setEditingSpeciesId(null);
    setEditingSpeciesData({});
  };

  const saveEditSpecies = async (id) => {
    await fetch(apiUrl(`/species/${id}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(editingSpeciesData)
    });
    setEditingSpeciesId(null);
    await refreshSpecies();
  };

  // Sightings editing
  const startEditSighting = (s) => {
    setEditingSightingId(s.sighting_id);
    setEditingSightingData({
      species_id: s.species_id,
      sighting_date: s.sighting_date,
      location: s.location,
      depth_meters: s.depth_meters,
      notes: s.notes || ''
    });
  };

  const cancelEditSighting = () => {
    setEditingSightingId(null);
    setEditingSightingData({});
  };

  const saveEditSighting = async (id) => {
    await fetch(apiUrl(`/sightings/${id}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(editingSightingData)
    });
    setEditingSightingId(null);
    await refreshSightings();
  };

  if (!me) return <div className="admin-container">Loading...</div>;
  if (me.role !== 'admin') return <div className="admin-container">Access denied. Admins only.</div>;

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
            <tr><th>ID</th><th>Username</th><th>Email</th><th>Role</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  {u.role !== 'admin' && <button className="btn" onClick={() => promoteToAdmin(u.id)}>Promote</button>}
                  {u.role === 'admin' && <button className="btn" onClick={() => demoteToUser(u.id)}>Demote</button>}
                  <button className="btn danger" onClick={() => deleteUser(u.id)} style={{ marginLeft: 8 }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        <div className="admin-section">
          <h3>Species</h3>
          <table className="admin-table">
          <thead>
            <tr><th>ID</th><th>Common Name</th><th>Scientific</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {species.map(s => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>
                  {editingSpeciesId === s.id ? (
                    <input className="admin-input" value={editingSpeciesData.common_name} onChange={(e) => setEditingSpeciesData({ ...editingSpeciesData, common_name: e.target.value })} />
                  ) : s.common_name}
                </td>
                <td>
                  {editingSpeciesId === s.id ? (
                    <input className="admin-input" value={editingSpeciesData.scientific_name} onChange={(e) => setEditingSpeciesData({ ...editingSpeciesData, scientific_name: e.target.value })} />
                  ) : s.scientific_name}
                </td>
                <td>
                  {editingSpeciesId === s.id ? (
                    <>
                      <button className="btn" onClick={() => saveEditSpecies(s.id)}>Save</button>
                      <button className="btn" onClick={cancelEditSpecies}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="btn" onClick={() => startEditSpecies(s)}>Edit</button>
                      <button className="btn danger" onClick={() => deleteSpecies(s.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        <div className="admin-section">
          <h3>Sightings</h3>
          <table className="admin-table">
          <thead>
            <tr><th>ID</th><th>User</th><th>Species ID</th><th>Date</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {sightings.map(s => (
              <tr key={s.sighting_id}>
                <td>{s.sighting_id}</td>
                <td>{s.user_id}</td>
                <td>
                  {editingSightingId === s.sighting_id ? (
                    <input className="admin-input" value={editingSightingData.species_id} onChange={(e) => setEditingSightingData({ ...editingSightingData, species_id: e.target.value })} />
                  ) : s.species_id}
                </td>
                <td>
                  {editingSightingId === s.sighting_id ? (
                    <input className="admin-input" value={editingSightingData.sighting_date} onChange={(e) => setEditingSightingData({ ...editingSightingData, sighting_date: e.target.value })} />
                  ) : s.sighting_date}
                </td>
                <td>
                  {editingSightingId === s.sighting_id ? (
                    <>
                      <button className="btn" onClick={() => saveEditSighting(s.sighting_id)}>Save</button>
                      <button className="btn" onClick={cancelEditSighting}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="btn" onClick={() => startEditSighting(s)}>Edit</button>
                      <button className="btn danger" onClick={() => deleteSighting(s.sighting_id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminPage;
