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
  status: string;
  _id: string;
  review: string;
}

export default function OwnerDashboard() {
  const reasons = [
    'Insufficient staff available to perform the service',
    'The service was added due to an error or misunderstanding',
    'Necessary resources or parts are unavailable',
    'The user failed to make the payment or payment was declined',
  ];

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reason, setReason] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);
  const [review, setReview] = useState('');
  const [deleting, setDeleting] = useState(false); // State for managing delete loading
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users/fetchorders');
        const fetchedUsers = response.data.map((user: User) => ({
          ...user,
        }));
        setUsers(fetchedUsers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteService = async () => {
    if (!selectedUserId || !selectedUsername) return;

    try {
      setDeleting(true); // Start loading
      const response = await axios.post('/api/users/fetchorders', { id: selectedUserId, username: selectedUsername, reason: reason });
      console.log("Delete service response:", response.data);
      window.location.reload(); // Reload the page after successful delete
    } catch (error) {
      console.error('Error deleting service:', error);
    } finally {
      setDeleting(false); // Stop loading
    }
  };

  const handleStatusChange = async () => {
    if (!selectedUserId) return;
    const updatedUsers = users.map(user => user._id === selectedUserId ? { ...user, status: 'Done' } : user);
    setUsers(updatedUsers);
    setShowModal(false);
    try {
      const response = await axios.patch('/api/users/fetchorders', { _id: selectedUserId, status: 'Done' });
      console.log('Status updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.filter(user => user.UserName.toLowerCase().includes(term));
    setFilteredUsers(filtered);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="text-indigo-600 text-xl">Loading...</div>
    </div>;
  }

  return (
    <main className='bg-indigo-50 min-h-screen'>
      <NavbarOwner />
      <div className="flex justify-between items-center px-6 pt-10">
        <h1 className="leading-none tracking-tight md:text-5xl lg:text-3xl dark:text-white text-xl font-bold mb-5 text-center text-indigo-600">
          Your Order History
        </h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search by username..."
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={searchTerm}
            onChange={handleSearch}
          />
          </div>
        </div>
      <div className="overflow-x-auto  p-6 rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-indigo-200">
          <thead className="bg-indigo-100">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                #
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Start Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                End Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Username
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(searchTerm ? filteredUsers : users).map((user, index) => (
              <tr key={index} className="hover:bg-gray-100 transition duration-200">
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{moment(user.date).format('MMMM Do YYYY')}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.startTime}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.endTime}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.UserName}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${user.status === 'Done' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}`}>
                  {user.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.status !== 'Done' ? (
                    <>
                      <button
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={() => {
                          setSelectedUserId(user._id);
                          handleStatusChange()
                          setShowModal(true);
                        }}
                      >
                        Mark as Done
                      </button>
                      <button
                        className="text-indigo-600 hover:text-indigo-900 ml-4"
                        onClick={() => {
                          setSelectedUserId(user._id);
                          setSelectedUsername(user.UserName);
                          setShowDeleteModal(true);
                        }}
                      >
                        Delete the service
                      </button>
                    </>
                  ) : (
                    <button className="text-indigo-600 hover:text-indigo-900" onClick={() => {
                      if (user.review !== '') {
                        setReview(user.review);
                      } else {
                        console.log('No review available');
                      }
                    }}>
                      {user.review !== '' ? 'See review' : 'No review yet'}
                    </button>
                  )}
                  {showModal && selectedUserId === user._id && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
                      <div className="bg-white p-6 rounded shadow-md text-center">
                        <p className="mb-4">Is the service completed?</p>
                        <button
                          className="bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 mr-2"
                          onClick={handleStatusChange}
                        >
                          YES
                        </button>
                        <button
                          className="bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600"
                          onClick={() => setShowModal(false)}
                        >
                          NO
                        </button>
                      </div>
                    </div>
                  )}
                  {review !== '' && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
                      <div className="bg-white p-8 rounded shadow-md text-center">
                        <p className="text-gray-700 mb-4">{review}</p>
                        <button
                          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                          onClick={() => setReview('')}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                  {showDeleteModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
                      <div className="bg-white p-16 rounded shadow-md text-center">
                        <div className='mb-4'>
                          <label htmlFor="reasons" className="block text-xl text-left font-bold text-red-700 mb-2">Select an appropriate reason..</label>
                          <select className="block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            id="reasons" value={reason} onChange={(e) => setReason(e.target.value)} required>
                            <option value="" disabled>Select a reason from here...</option>
                            {reasons.map((reason, index) => (
                              <option key={index} value={reason}>
                                {reason}
                              </option>
                            ))}
                          </select>
                        </div>
                        <p className='text-xl font-bold text-red-700 mb-4'>Confirm Delete?</p>
                        {deleting ? (
                          <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                          </div>
                        ) : (
                          <>
                            <button
                              className="bg-indigo-500 text-white py-2 px-7 rounded hover:bg-indigo-700 mr-2"
                              onClick={handleDeleteService}
                            >
                              Yes
                            </button>
                            <button
                              className="bg-indigo-500 text-white py-2 px-7 rounded hover:bg-indigo-700"
                              onClick={() => setShowDeleteModal(false)}
                            >
                              NO
                            </button>
                          </>
                        )}
                      </div>
                    </div>
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
