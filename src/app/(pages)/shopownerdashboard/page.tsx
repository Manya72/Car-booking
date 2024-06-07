'use client'
import React, { useEffect, useState } from 'react';
import NavbarOwner from '../../components/Navbar/NavbarOwner';
import moment from 'moment';
import axios from 'axios';

interface User {
  date: string;
  startTime: string;
  endTime: string;
  UserName: string;
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

  const isOneDayFromNow = (date: string): boolean => {
    const today = moment();
    const orderDate = moment(date);
  
    // Check if the order date is before today and within the last 24 hours
    return orderDate.isBefore(today) && today.diff(orderDate, 'hours') < 24;
  };
  
  const handleSeeReview = (date: string) => {
    alert(`Fetching reviews for date: ${date}`);
  };
  
  return (
    <main>
      <NavbarOwner />
      <h1 className=" pt-10 leading-none tracking-tight md:text-5xl lg:text-4xl dark:text-white text-2xl font-bold mb-8 text-center text-indigo-600">Your order History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-indigo-200">
          <thead className="bg-blue-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{moment(user.date).format('MMMM Do YYYY')}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.startTime}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.endTime}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.UserName}</td>
                
                <td className={`px-6 py-4 whitespace-nowrap ${isOneDayFromNow(user.date) ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}`}>
  {isOneDayFromNow(user.date) ? 'Done' : 'Pending'}
</td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {isOneDayFromNow(user.date) && (
                    <button className="text-indigo-600 hover:text-indigo-900" onClick={() => handleSeeReview(user.date)}>
                      See Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
