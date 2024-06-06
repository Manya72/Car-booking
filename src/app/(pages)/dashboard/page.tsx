'use client'
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import NavbarUser from '../../components/Navbar/NavBarUser';

interface User {
  id: string;
  date: string;
  carShopOwner: string;
  startTime: string;
  endTime: string;
  location: string;
}

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users/fetchHistory');
        const fetchedUsers = response.data;
        setUsers(fetchedUsers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const handleReview = (userId: string) => {
    // Implement review functionality
    console.log(`Review for user with ID: ${userId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="bg-gray-100 min-h-screen">
      <NavbarUser />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600">User Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{moment(user.date).format('MMMM Do YYYY')}</h2>
                <p className="text-gray-600"><span className="font-semibold text-gray-800">Start Time:</span> {user.startTime}</p>
                <p className="text-gray-600"><span className="font-semibold text-gray-800">End Time:</span> {user.endTime}</p>
                <p className="text-gray-600"><span className="font-semibold text-gray-800">Car Shop Owner:</span> {user.carShopOwner}</p>
                <p className="text-gray-600"><span className="font-semibold text-gray-800">Location:</span> {user.location}</p>
                <button onClick={() => handleReview(user.id)} className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Give Review</button>
                {/* You can add other actions/buttons here */}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No user data available</p>
          )}
        </div>
      </div>
    </main>
  );
}
