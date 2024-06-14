'use client'
import React from 'react';
import NavBarAdmin from '../../components/Navbar/NavbarAdmin';

export default function pageadmin() {
  // Placeholder data
  const totalUsers = 8;
  const totalCarShopOwners = 2;
  const totalOrdersToday = 5;
  const totalRevenueToday = "$500";

  return (
    <main className="min-h-screen bg-gray-100">
      <NavBarAdmin />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Welcome Admin</h1>
        
        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Users Summary */}
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Users</h2>
            <p className="text-3xl font-bold text-indigo-600">{totalUsers}</p>
            <p className="text-sm text-gray-500">Total number of users</p>
          </div>

          {/* Car Shop Owners Summary */}
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Car Shop Owners</h2>
            <p className="text-3xl font-bold text-indigo-600">{totalCarShopOwners}</p>
            <p className="text-sm text-gray-500">Total number of car shop owners</p>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Website Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xl font-bold text-gray-800">Orders Today</p>
              <p className="text-3xl font-bold text-indigo-600">{totalOrdersToday}</p>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-800">Revenue Today</p>
              <p className="text-3xl font-bold text-indigo-600">{totalRevenueToday}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
