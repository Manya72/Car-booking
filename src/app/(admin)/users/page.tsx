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
  const [DeleteModal, setDeleteModal] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "user" | "carShopOwner">("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/users");
        const fetchedUsers = response.data.data.filter((user: User) => !user.isAdmin)
        // const fetchedUsers = response.data.data;
        setUsers(fetchedUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (username: string) => {
    try {
      const response = await axios.delete(`/api/admin/deleteuser/${username}`);
      if (response.status === 200) {
        setUsers(usersdata.filter(user => user.username !== username));
      }
      setDeleteModal(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) {
    return <h1 className="text-center mt-8">Loading...</h1>;
  }

  const filteredUsers = usersdata.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || user.userType === filter;
    return matchesSearch && matchesFilter;
  });

  const carShopOwnersCount = usersdata.filter(user => user.userType === "carShopOwner").length;
  const customersCount = usersdata.filter(user => user.userType === "user").length;
  const totalUsersCount = usersdata.length;
  const activeUsersCount = usersdata.filter(user => user.isActive).length; // Assuming there's an isActive property

  return (
    <main>
      <NavBarAdmin />
      <div className="p-4">
        <h2 className="leading-none tracking-tight md:text-5xl lg:text-4xl dark:text-white text-2xl font-bold text-indigo-600 mb-8">Manage Users</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-indigo-100 p-4 rounded shadow-md">
            <h3 className="font-semibold text-lg">Car Shop Owners vs Customers</h3>
            <p>Car Shop Owners: {carShopOwnersCount}</p>
            <p>Customers: {customersCount}</p>
          </div>
          <div className="bg-indigo-100 p-4 rounded shadow-md">
            <h3 className="font-semibold text-lg">Total Users vs Active Users</h3>
            <p>Total Users: {totalUsersCount}</p>
            <p>Active Users: {activeUsersCount}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <button className={`px-4 py-2 mr-2 ${filter === "all" ? "bg-indigo-500 text-white" : "bg-gray-200"}`} onClick={() => setFilter("all")}>All</button>
            <button className={`px-4 py-2 mr-2 ${filter === "user" ? "bg-indigo-500 text-white" : "bg-gray-200"}`} onClick={() => setFilter("user")}>Customers</button>
            <button className={`px-4 py-2 ${filter === "carShopOwner" ? "bg-indigo-500 text-white" : "bg-gray-200"}`} onClick={() => setFilter("carShopOwner")}>Car Shop Owners</button>
          </div>
          <div className="max-w-md  border">
            <div className="flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-indigo-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                className="peer h-full w-full outline-none text-sm text-indigo-800 pr-2"
                type="text"
                id="search"
                placeholder="Search users..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="w-full p-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-indigo-200">
                <th className="border border-gray-300 py-2 px-4">Index</th>
                <th className="border border-gray-300 py-2 px-4">Username</th>
                <th className="border border-gray-300 py-2 px-4">Email</th>
                <th className="border border-gray-300 py-2 px-4">Role</th>
                <th className="border border-gray-300 py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 py-2 px-4">{index + 1}</td>
                  <td className="border border-gray-300 py-2 px-4">{user.username}</td>
                  <td className="border border-gray-300 py-2 px-4">{user.email}</td>
                  <td className="border border-gray-300 py-2 px-4">{user.userType === "carShopOwner" ? "Car Shop Owner" : "Customer"}</td>
                  <td className="border border-gray-300 py-2 px-4">
                    <button onClick={() => setDeleteModal(user)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkred" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {DeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md text-center">
              <p className="mb-4 font-bold">Are you sure you want to delete this user?</p>
              <button
                className="bg-indigo-300 text-white py-2 px-3 rounded hover:bg-indigo-600 mr-2"
                onClick={() => deleteUser(DeleteModal.username)}
              >
                YES
              </button>
              <button
                className="bg-indigo-300 text-white py-2 px-3 rounded hover:bg-indigo-600"
                onClick={() => setDeleteModal(null)}
              >
                NO
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
