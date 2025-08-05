// UserForm.jsx
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
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} disabled />
      <input type="email" value={email} disabled />
      <input
        type="number"
        name="donations"
        placeholder="Total Donations"
        required
        value={donations}
        onChange={(e) => setDonations(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
