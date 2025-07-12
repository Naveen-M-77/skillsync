import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const [availability, setAvailability] = useState([]);
  const [slot, setSlot] = useState({ day: 'Monday', from: '', to: '' });

  const token = localStorage.getItem('token');

  // Fetch current user
  useEffect(() => {
    if (!token) return;
    axios
      .get('http://localhost:5000/api/protected', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => setError('Auth error'));
  }, []);

  // Fetch mentor skills
  useEffect(() => {
    if (!token || user?.role !== 'Mentor') return;
    axios
      .get('http://localhost:5000/api/mentor/skills', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSkills(res.data))
      .catch(() => console.log('No skills yet'));
  }, [user]);

  // Fetch mentor availability
  useEffect(() => {
    if (!token || user?.role !== 'Mentor') return;
    axios
      .get('http://localhost:5000/api/mentor/availability', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAvailability(res.data))
      .catch(() => console.log('No availability yet'));
  }, [user]);

  // Handle skill form submit
  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/mentor/skills', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({ name: '', description: '' });

      const res = await axios.get('http://localhost:5000/api/mentor/skills', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSkills(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add skill');
    }
  };

  // Handle availability form submit
  const handleAvailabilitySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/mentor/availability', slot, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSlot({ day: 'Monday', from: '', to: '' });

      const res = await axios.get('http://localhost:5000/api/mentor/availability', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAvailability(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add availability');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">Dashboard</h2>

      {error && <p className="text-red-500">{error}</p>}

      {user && (
        <>
          <p className="mb-2"><strong>Name:</strong> {user.name}</p>
          <p className="mb-6"><strong>Role:</strong> {user.role}</p>
        </>
      )}

      {user?.role === 'Mentor' && (
        <>
          {/* Skill Form */}
          <form onSubmit={handleSkillSubmit} className="bg-white p-4 rounded shadow space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-gray-700">Add New Skill</h3>
            <input
              type="text"
              placeholder="Skill name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border p-2 rounded"
              required
            />
            <textarea
              placeholder="Skill description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
              Add Skill
            </button>
          </form>

          {/* Skill List */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Your Skills</h3>
            {skills.length === 0 ? (
              <p className="text-gray-500">No skills added yet.</p>
            ) : (
              <ul className="space-y-2">
                {skills.map((skill) => (
                  <li key={skill._id} className="bg-gray-100 p-3 rounded">
                    <h4 className="font-bold">{skill.name}</h4>
                    <p className="text-sm text-gray-600">{skill.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Availability Form */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Set Availability</h3>

            <form onSubmit={handleAvailabilitySubmit} className="bg-white p-4 rounded shadow space-y-4 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <select
                  value={slot.day}
                  onChange={(e) => setSlot({ ...slot, day: e.target.value })}
                  className="border p-2 rounded"
                >
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                <input
                  type="time"
                  value={slot.from}
                  onChange={(e) => setSlot({ ...slot, from: e.target.value })}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="time"
                  value={slot.to}
                  onChange={(e) => setSlot({ ...slot, to: e.target.value })}
                  className="border p-2 rounded"
                  required
                />
              </div>
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                Add Slot
              </button>
            </form>

            {/* Availability List */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Your Availability</h4>
              {availability.length === 0 ? (
                <p className="text-gray-500">No availability added yet.</p>
              ) : (
                <ul className="space-y-2">
                  {availability.map((a) => (
                    <li key={a._id} className="bg-gray-100 p-3 rounded">
                      <span>{a.day}: {a.from} – {a.to}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
