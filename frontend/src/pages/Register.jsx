import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Learner' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      alert('Registered Successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-indigo-600">Register</h2>
        <input name="name" onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded" required />
        <input type="email" name="email" onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" required />
        <input type="password" name="password" onChange={handleChange} placeholder="Password" className="w-full border p-2 rounded" required />
        <select name="role" onChange={handleChange} className="w-full border p-2 rounded">
          <option value="Learner">Learner</option>
          <option value="Mentor">Mentor</option>
        </select>
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">Register</button>
      </form>
    </div>
  );
}
