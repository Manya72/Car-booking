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
  ContactUser: number;
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
<main className="bg-indigo-50 min-h-screen">
  <NavbarOwner />
  <div className="flex justify-between items-start px-6 pt-10">
    <div className="w-3/4">
      <h1 className="leading-none tracking-tight md:text-5xl lg:text-3xl dark:text-white text-xl font-bold mb-5 text-center text-indigo-600">
        Your Order History
      </h1>
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Search by username..."
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <p className="text-lg text-gray-700 font-semibold mb-6">
        Total Orders: {users.length}
      </p>
      <div className="space-y-6">
        {(searchTerm ? filteredUsers : users).map((user, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-indigo-600">Order #{index + 1}</h2>
                <p className="text-gray-700">{moment(user.date).format('MMMM Do YYYY')}</p>
              </div>
              <div className="text-right">
                <p className={`font-bold ${user.status === 'Done' ? 'text-green-600' : 'text-red-600'}`}>
                  {user.status}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-700"><span className="font-bold">Start Time:</span> {user.startTime}</p>
              <p className="text-gray-700"><span className="font-bold">End Time:</span> {user.endTime}</p>
              <p className="text-gray-700"><span className="font-bold">Username:</span> {user.UserName}</p>
              <p className="text-gray-700"><span className="font-bold">Phone number:</span> {user.ContactUser}</p>
            </div>
            <div className="mt-4 flex justify-between items-center">
              {user.status !== 'Done' ? (
                <>
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => {
                      setSelectedUserId(user._id);
                      handleStatusChange();
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
                <button
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => {
                    if (user.review !== '') {
                      setReview(user.review);
                    } else {
                      console.log('No review available');
                    }
                  }}
                >
                  {user.review !== '' ? 'See review' : 'No review yet'}
                </button>
              )}
            </div>
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
                  <div className="mb-4">
                    <label htmlFor="reasons" className="block text-xl text-left font-bold text-red-700 mb-2">
                      Select an appropriate reason..
                    </label>
                    <select
                      className="block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      id="reasons"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select a reason from here...</option>
                      {reasons.map((reason, index) => (
                        <option key={index} value={reason}>
                          {reason}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-xl font-bold text-red-700 mb-4">Confirm Delete?</p>
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
          </div>
        ))}
      </div>
    </div>
    <div className="w-1/4 sticky ml-4 top-4 bottom-4 h-screen bg-white shadow-lg p-4 overflow-y-auto">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">User Reviews</h2>
      {users.map((user, index) => (
        user.review && (
          <div key={index} className="mb-4 p-4 border border-gray-300 rounded">
            <p className="font-semibold text-indigo-600">{user.UserName}</p>
            <p className="text-gray-700">{user.review}</p>
          </div>
        )
      ))}
    </div>
  </div>
</main>
  );
}


