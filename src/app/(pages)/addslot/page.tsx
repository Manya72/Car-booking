'use client'
import axios from "axios";
import NavbarUser from "../../components/Navbar/NavbarOwner";
import { useState,useEffect } from "react";

export default function ManageTimings() {
    const [AvailabilityDetails, setAvailaiblityDetails] = useState({
        startTime: "",
        endTime: "",
        location: "",
        date: ""
    });
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    const [statusMessage, setStatusMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isdetails, setIsDetails] = useState(false);
    const[isApproved,setisapproved]=useState(false)
    useEffect(() => {
        const fetchShopDetails = async () => {
            try {
                const response = await axios.get('/api/users/approveShop');
            
          
              
                    const shopDetails = response.data.data[0];
                    if(shopDetails){
                  
                        if(shopDetails.isApproved===true){
                            setisapproved(true)
                        }
                        else{
                            setisapproved(false)
                        }
                    
                        setIsDetails(true)
                    }else{
              
                        setIsDetails(false)
                    }
          
                     // Set isdetails to true once details are fetched
                   
                

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching shop details:', error);
                setStatusMessage('Error fetching shop details');
                setIsLoading(false);
            }
        };

        fetchShopDetails();
    }, []);
    const handleSave = async () => {
        const { startTime, endTime, location, date } = AvailabilityDetails;
        if (!startTime || !endTime || !location || !date) {
            setErrorMessage("All fields are mandatory!!");
            return;
        }

        const formattedStartTime = formatTimeWithAMPM(startTime);
        const formattedEndTime = formatTimeWithAMPM(endTime);

        try {
            const response = await axios.post('/api/users/addservice', {
                ...AvailabilityDetails,
                startTime: formattedStartTime,
                endTime: formattedEndTime
            });
            console.log("This is response from addservice", response.data);
            setShowModal(true);
            setAvailaiblityDetails({
                startTime: "",
                endTime: "",
                location: "",
                date: ""
            });
        } catch (error) {
            console.error("Error adding service", error);
            setErrorMessage("Failed to add service, please try again");
        }
    };

    const formatTimeWithAMPM = (time:any) => {
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours);
        const suffix = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
        return `${hours}:${minutes} ${suffix}`;
    };

    return (
        <main className="bg-gray-100 min-h-screen">
            <NavbarUser />
            <div className="max-w-4xl mx-auto py-8 px-4">
                <h1 className="text-3xl font-semibold text-gray-800 mb-4">Manage Timings</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    {isdetails && isApproved ? (
                        <>
                            <h2 className="text-xl font-semibold mb-4">Set Availability</h2>
    
                            <div className="mb-4">
                                <label htmlFor="date" className="block text-sm font-semibold">Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    className="w-full py-2 px-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-indigo-500"
                                    value={AvailabilityDetails.date}
                                    onChange={(e) => setAvailaiblityDetails({ ...AvailabilityDetails, date: e.target.value })}
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
                                        onChange={(e) => setAvailaiblityDetails({ ...AvailabilityDetails, startTime: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="end-time" className="block text-sm font-semibold">End Time</label>
                                    <input
                                        type="time"
                                        id="end-time"
                                        className="w-full py-2 px-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-indigo-500"
                                        value={AvailabilityDetails.endTime}
                                        onChange={(e) => setAvailaiblityDetails({ ...AvailabilityDetails, endTime: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="location" className="text-sm font-semibold">Location</label>
                                <input
                                    className="w-full py-2 px-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-indigo-500"
                                    type="text"
                                    id="location"
                                    value={AvailabilityDetails.location}
                                    onChange={(e) => setAvailaiblityDetails({ ...AvailabilityDetails, location: e.target.value })}
                                />
                            </div>
                            <div className="mt-6">
                                <button
                                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                    onClick={handleSave}
                                >
                                    Add Service
                                </button>
                            </div>
                            {errorMessage && (
                                <div className="mb-4 text-red-600 font-semibold">
                                    {errorMessage}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex items-center p-4 mb-4 text-sm text-red-500 rounded-lg bg-red-50">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                {!isdetails ? (
                                    <>
                                        <span className="font-medium">Update your profile</span> from the profile section to add services.
                                    </>
                                ) : (
                                    <>
                                        <span className="font-medium">Wait for approval!</span> You have to wait until the admin approves your shop details.
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
    
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md text-center">
                        <h2 className="text-2xl font-semibold mb-4">Success!</h2>
                        <p className="mb-4">Service added successfully!</p>
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}    