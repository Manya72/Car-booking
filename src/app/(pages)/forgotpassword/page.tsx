// pages/reset.js
'use client'
import axios from "axios";
import React, { useState } from "react";

export default function Reset() {
  const [user, setUser] = useState({
    email: "",
 
  });
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async () => {
    try {
      const response=await axios.post('/api/users/forgotpassword',{email:user.email})
      console.log("response from forgot",response.data)
      if(response.data.status===400){
        setErrorMessage(response.data.message)
      }
    } catch (error) {
      
    }
  }
  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

          <div className="mb-4">
            {/* <label htmlFor="email" className="block text-gray-700">
             Enter Email to Reset Password
            </label> */}
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })
             }
             placeholder="Enter Your Email.."
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          {errorMessage && (
                  <div style={{ padding: "4px", color: "red", marginBottom: "10px" }}>
                    {errorMessage}
                  </div>
                )}
          <button
         
            className="w-full bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
            onClick={()=>{
              onSubmit()
            }}
          >
            Submit
          </button>
      
      </div>
    </main>
  );
}
