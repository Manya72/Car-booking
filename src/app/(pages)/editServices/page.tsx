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
              <th className="py-2 px-19">Start Time</th>
              <th className="py-2 px-18">End Time</th>
              <th className="py-2 px-4">Discount</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((service) => (
              <tr key={service._id} className="hover:bg-gray-100 transition duration-300">
                <td className="border px-4 py-2">{service.location}</td>
                <td className="border px-4 py-2">{service.startTime}</td>
                <td className="border px-4 py-2">{service.endTime}</td>
                {!service.discount && (
                   <td className="border px-4 py-2">N/A</td>
                )}
                {service.discount && (
                   <td className="border px-4 py-2">{service.discount}</td>
                )}
                {/* <td className="border px-4 py-2">{service.discount}</td> */}
                <td className="border px-4 py-2">{service.date}</td>
                
                <td className="border px-4 py-2">
                            <div className="flex space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                </svg>
                            </div>
                        </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
