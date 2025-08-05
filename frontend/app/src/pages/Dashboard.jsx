import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  const donations = localStorage.getItem('userDonations');

  if (!userName || !userEmail || !donations) {
    return <div>No user data found. Please go back and fill the form.</div>;
  }

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/dashboard/${userEmail}`);
        const data = await res.json();
        console.log("Dashboard Fetch Response:", res.status, data);

        if (res.ok) {
          setUserData(data);
        } else {
          toast.error(data.msg || 'Failed to load dashboard data');
        }
      } catch (err) {
        console.error('Dashboard error: ', err);
      }
    };

    if (userEmail) {
      fetchDashboardData();
      console.log("userEmail",userEmail);
    }
  }, [userEmail]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logged out!');
    navigate('/');
  };

  const displayName = userData?.name || userName;
  const displayDonations = userData?.totalDonations || donations;
  const displayReferralCode = userData?.referralCode || `${userName.toLowerCase()}2025`;

  return (
    <div>
      <h1>Welcome, {displayName}!</h1>

      <div>
        <p><strong>Referral code: </strong>{displayReferralCode}</p>
        <p><strong>Total Donations Raised: </strong>₹{displayDonations}</p>
      </div>

      <div>
        <h2>Rewards & Unlockables</h2>
        <ul>
          <li>Badge for first donation</li>
          <li>Unlock reward at ₹10,000</li>
          <li>Bonus at ₹25,000</li>
        </ul>
      </div>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
