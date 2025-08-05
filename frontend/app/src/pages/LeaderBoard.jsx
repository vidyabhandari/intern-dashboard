import React, { useEffect, useState } from 'react';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const currentUserEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/user/all`);
        const data = await res.json();
        if (res.ok) setUsers(data);
        else console.error("Failed to fetch leaderboard");
      } catch (err) {
        console.error("Server error", err);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Leaderboard</h1>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Referral Code</th>
              <th className="p-2 border">Donations (₹)</th>
            </tr>
          </thead>
          <tbody>
            {users
              .sort((a, b) => b.totalDonations - a.totalDonations)
              .map((user, index) => {
                const isCurrentUser = user.email === currentUserEmail;
                return (
                  <tr
                    key={user.email}
                    className={`hover:bg-gray-50 ${
                      isCurrentUser ? 'bg-yellow-100 font-semibold text-indigo-700' : ''
                    }`}
                  >
                    <td className="p-2 border">{index + 1}</td>
                    <td className="p-2 border">{user.name}</td>
                    <td className="p-2 border">{user.referralCode}</td>
                    <td className="p-2 border">₹{user.totalDonations}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
