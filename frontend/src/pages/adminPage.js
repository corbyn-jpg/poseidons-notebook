import React, { useEffect, useState } from 'react';
import { apiUrl } from '../api';

function AdminPage() {
  const [me, setMe] = useState(null);
  const [users, setUsers] = useState([]);
  const [species, setSpecies] = useState([]);
  const [sightings, setSightings] = useState([]);
  const token = localStorage.getItem('token');

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

  const promoteToAdmin = async (userId) => {
    if (!token) return;
    await fetch(apiUrl(`/users/${userId}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ role: 'admin' })
    });
    // refresh users
    const res = await fetch(apiUrl('/users'), { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    setUsers(data);
  };

  const deleteUser = async (userId) => {
    if (!token) return;
    await fetch(apiUrl(`/users/${userId}`), { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    setUsers(users.filter(u => u.id !== userId));
  };

  const deleteSpecies = async (id) => {
    if (!token) return;
    await fetch(apiUrl(`/species/${id}`), { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    setSpecies(species.filter(s => s.id !== id));
  };

  const deleteSighting = async (id) => {
    if (!token) return;
    await fetch(apiUrl(`/sightings/${id}`), { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    setSightings(sightings.filter(s => s.sighting_id !== id));
  };

  if (!me) return <div>Loading...</div>;
  if (me.role !== 'admin') return <div>Access denied. Admins only.</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Console</h2>
      <section>
        <h3>Users</h3>
        <table>
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
                  {u.role !== 'admin' && <button onClick={() => promoteToAdmin(u.id)}>Promote</button>}
                  <button onClick={() => deleteUser(u.id)} style={{ marginLeft: 8 }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h3>Species</h3>
        <table>
          <thead>
            <tr><th>ID</th><th>Common Name</th><th>Scientific</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {species.map(s => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.common_name}</td>
                <td>{s.scientific_name}</td>
                <td>
                  <button onClick={() => deleteSpecies(s.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h3>Sightings</h3>
        <table>
          <thead>
            <tr><th>ID</th><th>User</th><th>Species ID</th><th>Date</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {sightings.map(s => (
              <tr key={s.sighting_id}>
                <td>{s.sighting_id}</td>
                <td>{s.user_id}</td>
                <td>{s.species_id}</td>
                <td>{s.sighting_date}</td>
                <td><button onClick={() => deleteSighting(s.sighting_id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AdminPage;
