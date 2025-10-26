import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { apiUrl } from '../api';
import '../styles/species.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [species, setSpecies] = useState([]);
  const [sightings, setSightings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [uRes, sRes, siRes] = await Promise.all([
          fetch(apiUrl('/users'), { headers: { Authorization: `Bearer ${token}` } }),
          fetch(apiUrl('/species')),
          fetch(apiUrl('/sightings'), { headers: { Authorization: `Bearer ${token}` } })
        ]);

        if (uRes.ok) setUsers(await uRes.json());
        if (sRes.ok) setSpecies(await sRes.json());
        if (siRes.ok) setSightings(await siRes.json());
      } catch (err) {
        console.error('Error loading admin data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [token]);

  const promoteUser = async (id, promoteToAdmin) => {
    try {
      const res = await fetch(apiUrl(`/users/${id}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ role: promoteToAdmin ? 'admin' : 'user' })
      });
      if (res.ok) {
        const updated = await res.json();
        setUsers(users.map(u => (u.id === id ? updated : u)));
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to update user');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update user');
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      const res = await fetch(apiUrl(`/users/${id}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) setUsers(users.filter(u => u.id !== id));
      else alert('Failed to delete user');
    } catch (err) {
      console.error(err);
      alert('Failed to delete user');
    }
  };

  const deleteSpecies = async (id) => {
    if (!window.confirm('Delete this species?')) return;
    try {
      const res = await fetch(apiUrl(`/species/${id}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) setSpecies(species.filter(s => s.species_id !== id));
      else alert('Failed to delete species');
    } catch (err) {
      console.error(err);
      alert('Failed to delete species');
    }
  };

  const deleteSighting = async (id) => {
    if (!window.confirm('Delete this sighting?')) return;
    try {
      const res = await fetch(apiUrl(`/sightings/${id}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) setSightings(sightings.filter(si => si.sighting_id !== id));
      else alert('Failed to delete sighting');
    } catch (err) {
      console.error(err);
      alert('Failed to delete sighting');
    }
  };

  if (loading) return <div><Navbar /><div style={{padding:20}}>Loading admin data...</div><Footer/></div>;

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h1>Admin Dashboard</h1>
        <section>
          <h2>Users</h2>
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
                    {u.role !== 'admin' ? (
                      <button onClick={() => promoteUser(u.id, true)}>Promote</button>
                    ) : (
                      <button onClick={() => promoteUser(u.id, false)}>Demote</button>
                    )}
                    <button onClick={() => deleteUser(u.id)} style={{marginLeft:10}}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2>Species</h2>
          <div className="species-grid">
            {species.map(s => (
              <div key={s.species_id} style={{border:'1px solid #ccc', padding:10, margin:6}}>
                <h4>{s.common_name}</h4>
                <p><em>{s.scientific_name}</em></p>
                <button onClick={() => { window.location.href = `/species` }}>Edit</button>
                <button onClick={() => deleteSpecies(s.species_id)} style={{marginLeft:10}}>Delete</button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Sightings</h2>
          <table className="admin-table">
            <thead>
              <tr><th>ID</th><th>User</th><th>Species</th><th>Date</th><th>Location</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {sightings.map(si => (
                <tr key={si.sighting_id}>
                  <td>{si.sighting_id}</td>
                  <td>{si.user_id}</td>
                  <td>{si.Species ? si.Species.common_name : si.species_id}</td>
                  <td>{new Date(si.sighting_date).toLocaleDateString()}</td>
                  <td>{si.location}</td>
                  <td>
                    <button onClick={() => { window.location.href = `/sightings/${si.sighting_id}` }}>Edit</button>
                    <button onClick={() => deleteSighting(si.sighting_id)} style={{marginLeft:10}}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;
