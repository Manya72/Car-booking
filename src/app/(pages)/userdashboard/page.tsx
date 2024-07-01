'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import NavbarUser from '../../components/Navbar/NavBarUser';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Service {
  _id: string;
  date: string;
  carShopOwner: string;
  status: string;
  discount?: string;
}

const COLORS = ['#23511E', '#a0aec0', '#e53e3e']; // Indigo, Gray, Red

export default function userdashboard() {
  const [services, setServices] = useState<Service[]>([]);

  const [services1, setServices1] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users/fetchHistory');
        const fetchedServices: Service[] = response.data;
        console.log("fetched for the new dashboard", fetchedServices);
        setServices(fetchedServices);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get('/api/users/addservice');
        const fetchedServices: Service[] = response.data;
        // console.log("fetched for the new dashboard", fetchedServices);
        setServices1(fetchedServices);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchData1();
  }, []);
  console.log("service dvhdandv",services)
  const completedServices = services.filter(service => service.status === 'Done').length;
  const pendingServices = services.filter(service => service.status === 'Pending').length;
  const deletedServices = services.filter(service => service.status === 'Deleted').length;

  const chartData = [
    { name: 'Completed', value: completedServices },
    { name: 'Pending', value: pendingServices },
    { name: 'Deleted', value: deletedServices },
  ];

  const recentBookings = services.slice(0, 5);
  const discounts = services1.filter(service => service.discount);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="bg-gray-100 min-h-screen">
      <NavbarUser />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600">User Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg md:col-span-1 lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4 text-indigo-600">Discounts</h2>
            {discounts.length > 0 ? (
              discounts.map(service => (
                <div key={service._id} className="mb-4">
                  <p className="text-gray-800"><span className="font-semibold">Date:</span> {new Date(service.date).toLocaleDateString()}</p>
                  <p className="text-gray-800"><span className="font-semibold">Car Shop Owner:</span> {service.carShopOwner}</p>
                  <p className="text-indigo-600 font-semibold">Discount: {service.discount}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-800">No discounts available at the moment.</p>
            )}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg md:col-span-2 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-indigo-600">Service Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <button
              onClick={() => router.push('/dashboard')}
              className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Manage Services
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">Recent Booked Services</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-black text-white">Date</th>
                <th className="py-2 px-4 bg-black text-white">Car Shop Owner</th>
                <th className="py-2 px-4 bg-black text-white">Status</th>
                <th className="py-2 px-4 bg-black text-white">Discount</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map(service => (
                <tr key={service._id} className="text-center">
                  <td className="py-2 px-4 border-b border-gray-200">{new Date(service.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{service.carShopOwner}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{service.status}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{service.discount ? service.discount : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
