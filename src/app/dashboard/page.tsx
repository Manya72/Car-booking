'use client'
import React, { useEffect, useState } from 'react';
import NavbarUser from '../components/Navbar/NavbarUser';
import moment from 'moment';
import axios from 'axios'

interface User {
  carType: string;
  date: string;
  carShopOwner:String;
  time:String;
 
}
export default function Dashboard() {

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  


  
  useEffect(() => {
    console.log("heyy")
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
    
  }
  , []);

  if (loading) {
    console.log("heyy")
    return <div>Loading...</div>;
  }

  return (
    <main>
<NavbarUser/>
  
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold mb-4 text-center">User Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div key={index} className="bg-white p-1 rounded-md shadow-md">
              <p >CarType: {user.carType}</p>
              <p>Service Date: {moment(user.date).format('MMMM Do YYYY')}</p>
              <p>Time: {user.time}</p>
              <p>Car Shop Owner: {user.carShopOwner}</p>
              {/* Add more user information as needed */}
            </div>
          ))
        ) : (
          <p>No user data available</p>
        )}
      </div>
    </div>
    </main>
  );
}

