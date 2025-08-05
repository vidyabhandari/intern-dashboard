// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newDonation, setNewDonation] = useState('');
  const navigate = useNavigate();

  const userEmail = localStorage.getItem('userEmail');
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/dashboard/${userEmail}`);
        const data = await res.json();
        if (res.ok) {
          setUserData(data);
          localStorage.setItem('userDonations', data.totalDonations);
          localStorage.setItem('referralCode', data.referralCode);
        } else {
          toast.error('Failed to fetch dashboard data');
        }
      } catch (err) {
        console.error(err);
        toast.error('Server error');
      }
    };

    if (userEmail) fetchData();
  }, [userEmail]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logged out!');
    navigate('/');
  };

  const handleEdit = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/user/update-donations`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, totalDonations: parseFloat(newDonation) }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Donations updated!');
        setUserData({ ...userData, totalDonations: newDonation });
        localStorage.setItem('userDonations', newDonation);
        setIsEditing(false);
        setNewDonation('');
      } else {
        toast.error(data.msg || 'Update failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Server error');
    }
  };

  if (!userData) return <div>Loading dashboard...</div>;

  return (
    <div className='min-h-screen flex items-center justify-center gap-20 p-6 md:p-10 bg-[#F0FDF4]'>
      <div className='w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-gray-300'>
        <h1 className='text-2xl font-bold mb-4 text-center'>
          Welcome, {userData.name || userName}!
          </h1>
      <p className='mb-2'>
        <strong>Referral Code:</strong> {userData.referralCode}
      </p>

      <p className='mb-4'>
        <strong>Total Donations:</strong>{' '}
        {isEditing ? (
          <span className='flex gap-2 items-center'>
            ₹<input
              type="number"
              value={newDonation}
              onChange={(e) => setNewDonation(e.target.value)}
              className='border px-2 py-1 rounded w-24'
            />
            <button 
              onClick={handleEdit} 
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >Save
            </button>
            <button onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
              >Cancel</button>
          </span>
        ) : (
          <>
            ₹{userData.totalDonations}{' '}
            <button onClick={() => setIsEditing(true)} 
              className="ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >Edit</button>
          </>
        )}
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Rewards & Unlockables</h2>
      <ul className="list-disc pl-5 space-y-1 mb-6">
        <li>Badge for first donation</li>
        <li>Unlock reward at ₹10,000</li>
        <li>Bonus at ₹25,000</li>
      </ul>

      <button onClick={handleLogout}
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
      >Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
