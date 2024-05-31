'use client'
import axios from "axios";
import NavbarUser from "../components/Navbar/NavbarOwner";
import { useState } from "react";

export default function ManageTimings() {
    
    const handleSave=async ()=>{
      try {
        const response=await axios.post('/api/users/addservice',AvailabilityDetails)

        console.log("yhis is response from addservice",response.data)
      } catch (error) {
        
      }

    }
    const [AvailabilityDetails,setAvailaiblityDetails]=useState({
      startTime:"",
      endTime:"",
      location:"",
      date:""
    })


    return (
        <main className="bg-gray-100 min-h-screen">
            <NavbarUser />
            <div className="max-w-4xl mx-auto py-8 px-4">
                <h1 className="text-3xl font-semibold text-gray-800 mb-4">Manage Timings</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Set Availability</h2>
               
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-sm font-semibold">Date</label>
                        <input
                            type="date"
                            id="date"
                            className="w-full py-2 px-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-indigo-500"
                            value={AvailabilityDetails.date}
                            onChange={(e)=>setAvailaiblityDetails({...AvailabilityDetails,date:e.target.value})}
                        />
                    </div>
            
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="start-time" className="block text-sm font-semibold">Start Time</label>
                            <input
                                type="time"
                                id="start-time"
                                className="w-full py-2 px-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-indigo-500"
                                value={AvailabilityDetails.startTime}
                                onChange={(e)=>setAvailaiblityDetails({...AvailabilityDetails,startTime:e.target.value})}
                            />
                        </div>
                        <div>
                            <label htmlFor="end-time" className="block text-sm font-semibold">End Time</label>
                            <input
                                type="time"
                                id="end-time"
                                className="w-full py-2 px-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-indigo-500"
                                value={AvailabilityDetails.endTime}
                                onChange={(e)=>setAvailaiblityDetails({...AvailabilityDetails,endTime:e.target.value})}
                            />
                        </div>
                    </div>
                    <div>
                      <label htmlFor="Location" className="text-sm font-semibold">Location</label>
                      <input className="w-full py-2 px-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-indigo-500"
                      type="text"
                      value={AvailabilityDetails.location}
                      ></input>

                    </div>
                    <div className="mt-6" onClick={handleSave}>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Save Changes</button>
                    </div>
                    
                </div>
                <div className="flex justify-center mt-5">
              {/* <button
                type="button"
               
                className={"bg-indigo-600 hover:bg-indigo-500 text-gray-50 font-bold py-2 px-4 rounded "}
                
              >
              ADD
              </button> */}
            </div>
            </div>
        </main>
    );
}
