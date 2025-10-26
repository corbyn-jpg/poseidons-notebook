import React, { useEffect, useState } from 'react';
import { apiUrl } from '../api';
import '../styles/authStyles.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [species, setSpecies] = useState([]);
  const [sightings, setSightings] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  let currentUser = null;
  try { currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null; } catch(e){ currentUser = null }

  // Prevent non-admins from using this page (client-side guard)
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div style={{ padding: 20 }}>
        <h2>Admin access required</h2>
        <p>You must be logged in as an admin to view this page.</p>
      </div>
    );
  }

  const authHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : ''
  });

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [uRes, sRes, siRes] = await Promise.all([
        fetch(apiUrl('/users'), { headers: authHeaders() }),
        fetch(apiUrl('/species'), { headers: authHeaders() }),
        fetch(apiUrl('/sightings'), { headers: authHeaders() })
      ]);

      if (!uRes.ok) throw new Error('Failed to fetch users');
      if (!sRes.ok) throw new Error('Failed to fetch species');
      if (!siRes.ok) throw new Error('Failed to fetch sightings');

      const [uData, sData, siData] = await Promise.all([uRes.json(), sRes.json(), siRes.json()]);
      setUsers(uData);
      setSpecies(sData);
      setSightings(siData);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch admin data. Are you logged in as admin?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Promote a user to admin
  const promoteToAdmin = async (id) => {
    try {
      const res = await fetch(apiUrl(`/users/${id}`), {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ role: 'admin' })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to promote');
      alert('User promoted to admin');
      fetchAll();
    } catch (err) {
      console.error(err);
      alert('Failed to promote user');
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      const res = await fetch(apiUrl(`/users/${id}`), { method: 'DELETE', headers: authHeaders() });
      if (!res.ok) throw new Error('Delete failed');
      alert('User deleted');
      fetchAll();
    } catch (err) {
      console.error(err);
      alert('Failed to delete user');
    }
  };

  // Species actions
  const deleteSpecies = async (id) => {
    if (!window.confirm('Delete this species?')) return;
    try {
      const res = await fetch(apiUrl(`/species/${id}`), { method: 'DELETE', headers: authHeaders() });
      if (!res.ok) throw new Error('Delete failed');
      alert('Species deleted');
      fetchAll();
    } catch (err) {
      console.error(err);
      alert('Failed to delete species');
    }
  };

  // Quick create species (prompts)
  const createSpecies = async () => {
    const common_name = window.prompt('Common name');
    if (!common_name) return;
    const scientific_name = window.prompt('Scientific name') || '';
    const category = window.prompt('Category') || '';
    const conservation_status = window.prompt('Conservation status') || '';

    try {
      const res = await fetch(apiUrl('/species'), {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ common_name, scientific_name, category, conservation_status })
      });
      if (!res.ok) throw new Error('Create failed');
      alert('Species created');
      fetchAll();
    } catch (err) {
      console.error(err);
      alert('Failed to create species');
    }
  };

  // Edit species (simple prompt-based edit)
  const editSpecies = async (s) => {
    const common_name = window.prompt('Common name', s.common_name) || s.common_name;
    const scientific_name = window.prompt('Scientific name', s.scientific_name) || s.scientific_name;
    const category = window.prompt('Category', s.category) || s.category;
    const conservation_status = window.prompt('Conservation status', s.conservation_status) || s.conservation_status;

    try {
      const res = await fetch(apiUrl(`/species/${s.id}`), {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ common_name, scientific_name, category, conservation_status })
      });
      if (!res.ok) throw new Error('Update failed');
      alert('Species updated');
      fetchAll();
    } catch (err) {
      console.error(err);
      alert('Failed to update species');
    }
  };

  // Delete sighting
  const deleteSighting = async (id) => {
    if (!window.confirm('Delete this sighting?')) return;
    try {
      const res = await fetch(apiUrl(`/sightings/${id}`), { method: 'DELETE', headers: authHeaders() });
      if (!res.ok) throw new Error('Delete failed');
      alert('Sighting deleted');
      fetchAll();
    } catch (err) {
      console.error(err);
      alert('Failed to delete sighting');
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      {loading && <p>Loading...</p>}

      <section>
        <h2>Users</h2>
        <table>
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
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  {u.role !== 'admin' && <button onClick={() => promoteToAdmin(u.id)}>Promote</button>}
                  <button onClick={() => deleteUser(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Species</h2>
        <button onClick={createSpecies}>Create species</button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Common name</th>
              <th>Scientific name</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {species.map(s => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.common_name}</td>
                <td>{s.scientific_name}</td>
                <td>{s.category}</td>
                <td>
                  <button onClick={() => editSpecies(s)}>Edit</button>
                  <button onClick={() => deleteSpecies(s.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Sightings</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Species</th>
              <th>Date</th>
              <th>Location</th>
              <th>Depth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sightings.map(si => (
              <tr key={si.sighting_id || si.id}>
                <td>{si.sighting_id || si.id}</td>
                <td>{si.user_id}</td>
                <td>{si.Species ? si.Species.common_name : si.species_id}</td>
                <td>{si.sighting_date}</td>
                <td>{si.location}</td>
                <td>{si.depth_meters}</td>
                <td>
                  <button onClick={() => deleteSighting(si.sighting_id || si.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminPage;
