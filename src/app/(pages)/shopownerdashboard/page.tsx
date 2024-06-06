'use client'
import React, { useEffect, useState } from 'react';
import NavbarOwner from '../../components/Navbar/NavbarOwner';
import moment from 'moment';
import axios from 'axios'

interface User {
  date: string;
  carShopOwner: string;
  startTime: string;
  endTime: string;
  location: string;
  UserName:string;
}
export default function ownerdashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users/fetchorders');
        const fetchedUsers = response.data;
        setUsers(fetchedUsers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
<NavbarOwner/>

        <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600">Your current orders</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.length > 0 ? (
            users.map((user, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{moment(user.date).format('MMMM Do YYYY')}</h2>
                <p className="text-gray-600"><span className="font-semibold text-gray-800">Start Time:</span> {user.startTime}</p>
                <p className="text-gray-600"><span className="font-semibold text-gray-800">End Time:</span> {user.endTime}</p>
                <p className="text-gray-600"><span className="font-semibold text-gray-800">Car Shop Owner:</span> {user.carShopOwner}</p>
                <p className="text-gray-600"><span className="font-semibold text-gray-800">Location:</span> {user.location}</p>
                <p className="text-gray-600"><span className="font-semibold text-gray-800">Username:</span> {user.UserName}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No user data available</p>
          )}
     
      </div>
  
    </main>
  );
}

