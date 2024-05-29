'use client'
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import moment from 'moment';

export default function Dashboard() {

  const mockBookingHistory = [
    {
      _id: '1',
      carType: 'SUV',
      carShopOwner: 'Manya',
      date: '2024-05-30',
      time: '10:00 AM',
      timeRequired: '1 hour'
    },
    {
      _id: '2',
      carType: 'Sedan',
      carShopOwner: 'Hemang',
      date: '2024-05-31',
      time: '11:00 AM',
      timeRequired: '45 minutes'
    }
    ,
    {
      _id: '2',
      carType: 'Sedan',
      carShopOwner: 'Soban',
      date: '2024-05-31',
      time: '11:00 AM',
      timeRequired: '45 minutes'
    }
    // Add more mock data as needed
  ];

  const [bookingHistory, setBookingHistory] = useState(mockBookingHistory);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-32">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Your Carwash Service Booking History</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookingHistory.map((booking) => (
            <div key={booking._id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
              <div className="p-6">
                <p className="text-lg font-semibold mb-2 text-gray-700"><span className="font-bold text-gray-900">Car Type:</span> {booking.carType}</p>
                <p className="text-lg font-semibold mb-2 text-gray-700"><span className="font-bold text-gray-900">Car Shop Owner:</span> {booking.carShopOwner}</p>
                <p className="text-lg font-semibold mb-2 text-gray-700"><span className="font-bold text-gray-900">Date:</span> {moment(booking.date).format('MMM D, YYYY')}</p>
                <p className="text-lg font-semibold mb-2 text-gray-700"><span className="font-bold text-gray-900">Time:</span> {booking.time}</p>
                <p className="text-lg font-semibold mb-2 text-gray-700"><span className="font-bold text-gray-900">Time Required:</span> {booking.timeRequired}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

