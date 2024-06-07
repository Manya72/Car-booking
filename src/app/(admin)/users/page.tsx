'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBarAdmin from "@/app/components/Navbar/NavbarAdmin";
interface User {
  username: string;
  email: string;
  userType: string;
}

export default function Users() {
  const [usersdata, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/users");
        const fetchedUsers = response.data.data;
        setUsers(fetchedUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <h1 className="text-center mt-8">Loading...</h1>;
  }

  let carShopOwnerIndex = 0;
  let customerIndex = 0;

  return (
    <main >
        <NavBarAdmin/>
      <h2 className="pt-4  leading-none tracking-tight md:text-5xl lg:text-4xl dark:text-white text-2xl font-bold mb-8 text-center text-indigo-600">Users</h2>
      <div className="flex flex-row">
        <div className="w-1/2 p-4">
          <h3 className="text-lg text-center font-semibold mb-2">Car Shop Owners</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-indigo-200">
                <th className="border border-gray-300 py-2 px-4">Index</th>
                <th className="border border-gray-300 py-2 px-4">Username</th>
                <th className="border border-gray-300 py-2 px-4">Email</th>
              </tr>
            </thead>
            <tbody>
              {usersdata.map((user, index) =>
                user.userType === "carShopOwner" ? (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 py-2 px-4">{++carShopOwnerIndex}</td>
                    <td className="border border-gray-300 py-2 px-4">{user.username}</td>
                    <td className="border border-gray-300 py-2 px-4">{user.email}</td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        </div>
        <div className="w-1/2 p-4">
          <h3 className="text-lg text-center font-semibold mb-2">Customers</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-indigo-200">
                <th className="border border-gray-300 py-2 px-4">Index</th>
                <th className="border border-gray-300 py-2 px-4">Username</th>
                <th className="border border-gray-300 py-2 px-4">Email</th>
              </tr>
            </thead>
            <tbody>
              {usersdata.map((user, index) =>
                user.userType === "user" ? (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 py-2 px-4">{++customerIndex}</td>
                    <td className="border border-gray-300 py-2 px-4">{user.username}</td>
                    <td className="border border-gray-300 py-2 px-4">{user.email}</td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
