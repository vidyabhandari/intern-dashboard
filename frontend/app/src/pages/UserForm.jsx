import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    donations: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage
    localStorage.setItem('userName', formData.name);
    localStorage.setItem('userEmail', formData.email);
    localStorage.setItem('userDonations', formData.donations);
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" required onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
      <input type="number" name="donations" placeholder="Total Donations" required onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
