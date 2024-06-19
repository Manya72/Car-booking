'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBarAdmin from "@/app/components/Navbar/NavbarAdmin";

interface Service {
  UserName: string;
  carShopOwner: string;
  date: string;
  location: string;
  status: "completed" | "inProgress"; // Assuming status field in your service interface
}

export default function Bookings() {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/bookings");
        const fetchedServices = response.data.data;
        setServices(fetchedServices);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchData();
  }, []);

  const filteredServices = services.filter(service =>
    service.UserName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const countCompleted = services.filter(service => service.status === "completed").length;
  const countInProgress = services.filter(service => service.status === "inProgress").length;

  if (loading) {
    return <h1 className="text-center mt-8">Loading...</h1>;
  }

  return (
    <main className="min-h-screen">
      <NavBarAdmin />
      <h1 className="pt-4 leading-none tracking-tight md:text-5xl lg:text-4xl dark:text-white text-2xl font-bold mb-8 text-center text-indigo-600">
        Manage Services
      </h1>

      {/* Summary section */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-indigo-100 p-4 rounded shadow-md">
          <h3 className="font-semibold text-lg">Services Status</h3>
          <p>Services Completed: {countCompleted}</p>
          <p>Services In Progress: {countInProgress}</p>
        </div>
      </div>

      {/* Filter and Search bar */}
      <div className="flex items-center justify-between mb-4 px-4">
        {/* Filter bar */}
        <div className="flex items-center space-x-4">
          <label htmlFor="filter" className="font-bold">
            Filter:
          </label>
          <select
            id="filter"
            className="border border-gray-300 rounded-md py-1 px-2"
            // Add filter functionality if needed
          >
            {/* Options for filtering */}
          </select>
        </div>
        {/* Search bar */}
        <div className="ml-auto">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md py-1 px-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-indigo-200">
            <th className="border border-gray-300 py-2 px-4">Index</th>
            <th className="border border-gray-300 py-2 px-4">Booked by</th>
            <th className="border border-gray-300 py-2 px-4">Car Shop Owner</th>
            <th className="border border-gray-300 py-2 px-4">Date</th>
            <th className="border border-gray-300 py-2 px-4">Location</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map((service, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="border border-gray-300 py-2 px-4">{index + 1}</td>
              <td className="border border-gray-300 py-2 px-4">{service.UserName}</td>
              <td className="border border-gray-300 py-2 px-4">{service.carShopOwner}</td>
              <td className="border border-gray-300 py-2 px-4">{service.date}</td>
              <td className="border border-gray-300 py-2 px-4">{service.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
