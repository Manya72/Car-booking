'use client'
import React, { useEffect, useState } from "react";
import NavbarUser from "@/app/components/Navbar/NavBarUser";
import axios from "axios";

export default function Userprofile() {
  // Dummy data for 
  const [userdata,setuserdata]=useState("")
  useEffect(() => {
    const fetchProfile = async () => {
      try {
   const response=await axios.get("/api/users/userdetails")
   console.log("userdataa",response.data.data)
   setuserdata(response.data.data)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchProfile();
  }, []);

  const userProfile = {
    name: userdata.username,
    email: userdata.email,
    contact: userdata.Contact,
    // Replace with actual image URL or import statement
    profilePicture: "https://via.placeholder.com/150",
  };

  return (
    <main>
      <NavbarUser />
      <div className="flex justify-center mt-20 h-96 ">
        <div className="bg-white rounded-lg shadow-lg p-6 flex" style={{ maxWidth: "600px" }}>
          <div className="mr-6">
            <img
              className="rounded-full w-32 h-32"
              src='/profile.jpg'
              alt="Profile"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold">{userProfile.name}</h2>
            <p className="text-gray-600">{userProfile.email}</p>
            <p className="text-gray-600">{userProfile.contact}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
