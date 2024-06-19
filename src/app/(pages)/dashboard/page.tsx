'use client';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import NavbarUser from '../../components/Navbar/NavBarUser';

interface User {
  _id: string;
  date: string;
  carShopOwner: string;
  startTime: string;
  endTime: string;
  location: string;
  review: string;
  status: string;
}

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [review, setReview] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users/fetchHistory');
        const fetchedUsers: User[] = response.data;
        setUsers(fetchedUsers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const handleReviewClick = (userId: string) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };

  const handleSubmitReview = async () => {
    try {
      if (selectedUserId) {
        await axios.patch(`/api/users/submitreview`, { userId: selectedUserId, review });
        const updatedUsers = users.map(user =>
          user._id === selectedUserId ? { ...user, review } : user
        );
        setUsers(updatedUsers);
        setShowModal(false);
        setReview('');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review. Please try again.');
    }
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
              <div key={user._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{moment(user.date).format('MMMM Do YYYY')}</h2>
                <p className="text-gray-600"><span className="font-semibold text-gray-800">Start Time:</span> {user.startTime}</p>
                <p className="text-gray-600"><span className="font-semibold text-gray-800">End Time:</span> {user.endTime}</p>
                <p className="text-gray-600"><span className="font-semibold text-gray-800">Car Shop Owner:</span> {user.carShopOwner}</p>
                <p className="text-gray-600"><span className="font-semibold text-gray-800">Location:</span> {user.location}</p>
                {user.review ? (
                  <p className="text-gray-600"><span className="font-semibold text-gray-800">Your Review:</span> {user.review}</p>
                ) : (
                  <div className="mt-auto self-left">
                    <button onClick={() => handleReviewClick(user._id)} className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      Give Review
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No user data available</p>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <h2 className="text-2xl mb-4">Submit Review</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-4"
              rows={5}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here..."
              required
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
              onClick={handleSubmitReview}
            >
              Submit
            </button>
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
