'use client'
import NavbarOwner from "@/app/components/Navbar/NavbarOwner";
import axios from "axios";
import { useEffect, useState } from "react";

interface Service {
  _id: string;
  UserName: string;
  carShopOwner: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  status: string;
  review: string;
  discount: string;  // Assuming discount is a string, update the type as necessary
}

export default function EditServices() {
  const [data, setData] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users/addservice');
        const fetchedServices = response.data;
        setData(fetchedServices);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <NavbarOwner />
      <h1 className="text-3xl font-bold mb-8 pl-12 pt-2 text-indigo-600">Edit Services</h1>
      
      <div className="container mx-auto px-1 py-2">
        <table className="min-w-full bg-white mt-4">
          <thead>
            <tr className="bg-indigo-400 text-white">
              <th className="py-2 px-4">Location</th>
              <th className="py-2 px-4">Start Time</th>
              <th className="py-2 px-4">End Time</th>
              <th className="py-2 px-4">Discount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((service) => (
              <tr key={service._id} className="hover:bg-gray-100 transition duration-300">
                <td className="border px-4 py-2">{service.location}</td>
                <td className="border px-4 py-2">{service.startTime}</td>
                <td className="border px-4 py-2">{service.endTime}</td>
                <td className="border px-4 py-2">{service.discount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
