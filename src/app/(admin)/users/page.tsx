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
        console.log("fetchedusers haahsha",fetchedUsers)
        setUsers(fetchedUsers);
        console.log("fetchedusers haahsha",usersdata)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);
   
  const deleteUser = async (username: string) => {
    try {
      const response=await axios.delete(`/api/admin/deleteuser/${username}`);
      console.log("this is the response from the deleteuser finall",response)
      // If successful, update the users list
      if(response.status===200){
        window.location.reload()
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
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
                <th className="border border-gray-300 py-2 px-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersdata.map((user, index) =>
                user.userType === "carShopOwner" ? (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 py-2 px-4">{++carShopOwnerIndex}</td>
                    <td className="border border-gray-300 py-2 px-4">{user.username}</td>
                    <td className="border border-gray-300 py-2 px-4">{user.email}</td>
                    <td className="border border-gray-300 py-2 px-4">   
                    <button onClick={()=>deleteUser(user.username)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                        </button>
                    </td>
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
                <th className="border border-gray-300 py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersdata.map((user, index) =>
                user.userType === "user" ? (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 py-2 px-4">{++customerIndex}</td>
                    <td className="border border-gray-300 py-2 px-4">{user.username}</td>
                    <td className="border border-gray-300 py-2 px-4">{user.email}
                
                    </td>
                    <td className="border border-gray-300 py-2 px-4">   
                      <button onClick={()=>deleteUser(user.username)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                        </button> 
                     </td>
                  
                   
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