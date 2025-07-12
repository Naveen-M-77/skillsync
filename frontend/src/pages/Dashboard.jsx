import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found');
      return;
    }

    axios.get('http://localhost:5000/api/protected', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      setUser(res.data);
    })
    .catch(err => {
      console.error('Auth error:', err);
      setError('Failed to load user');
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Dashboard</h2>
      
      {error && <p className="text-red-500">{error}</p>}

      {user ? (
        <div className="bg-white p-4 rounded shadow">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      ) : (
        !error && <p className="text-gray-500">Loading user data...</p>
      )}
    </div>
  );
}
