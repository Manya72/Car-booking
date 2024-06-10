'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBarAdmin from "@/app/components/Navbar/NavbarAdmin";
interface Service {
  UserName: string;
  carShopOwner: string;
  date: string;
  location: string;
}

export default function Bookings() {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/bookings");
        const fetchedServices = response.data.data;
        console.log(fetchedServices)
        setServices(fetchedServices);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <h1 className="text-center mt-8">Loading...</h1>;
  }

  return (
    <main >
        <NavBarAdmin/>
      <h1 className="pt-4  leading-none tracking-tight md:text-5xl lg:text-4xl dark:text-white text-2xl font-bold mb-8 text-center text-indigo-600">See bookings history here</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-indigo-200">
            <th className="border border-gray-300 py-2 px-4">Index</th>
            <th className="border border-gray-300 py-2 px-4">User Name</th>
            <th className="border border-gray-300 py-2 px-4">Car Shop Owner</th>
            <th className="border border-gray-300 py-2 px-4">Date</th>
            <th className="border border-gray-300 py-2 px-4">Location</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
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