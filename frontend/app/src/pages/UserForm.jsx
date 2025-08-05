import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const UserForm = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem('userName');
  const email = localStorage.getItem('userEmail');
  const referralCode = name ? `${name.toLowerCase()}2025` : '';

  const [donations, setDonations] = useState('');

  useEffect(() => {
    if (!name || !email) {
      toast.error('No user info found. Please login.');
      navigate('/');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          referralCode,
          totalDonations: parseFloat(donations),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.msg || 'Error saving user');
        return;
      }

      localStorage.setItem('userDonations', donations);
      localStorage.setItem('referralCode', referralCode);
      toast.success('User Info Saved!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Submit Error:', err);
      toast.error('Server error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Complete Your Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              value={name}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-800 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-800 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Total Donations (₹)</label>
            <input
              type="number"
              name="donations"
              placeholder="Enter total donations"
              required
              value={donations}
              onChange={(e) => setDonations(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
