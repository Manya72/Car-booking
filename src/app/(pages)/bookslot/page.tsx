'use client'
import axios from "axios";
import { useState, useEffect } from "react";
import NavbarUser from '../../components/Navbar/NavBarUser';

interface Availability {
    startTime: string;
    endTime: string;
    location: string;
    date: string;
    carShopOwner: string;
}

export default function BookSlot() {
    const [availabilities, setAvailabilities] = useState<Availability[]>([]);
    const [currentAvailability, setCurrentAvailability] = useState<Availability | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchAvailabilities = async () => {
            try {
                const response = await axios.get('/api/users/addservice');
                setAvailabilities(response.data);
            } catch (error) {
                console.error("Error fetching availabilities", error);
                setErrorMessage("Failed to fetch availabilities, please try again later");
            }
        };
        fetchAvailabilities();
    }, []);
    useEffect(() => {
        const addDetails = async () => {
            try {
        //    const response=await axios.get('/api/users/transferdata')
        // executeDataTransfer()
                
            } catch (error) {
                console.log("error while addind slots",error)
     
        };
    }
        addDetails();
    }, []);
    const bookSlot = async (selectedAvailability: Availability) => {
        try {
            console.log("Booking slot for:", selectedAvailability);
            const response = await axios.post('/api/users/fetchHistory', selectedAvailability);
            const res = await axios.patch('/api/users/addservice', selectedAvailability);
            console.log("Booking successful:", response.data);
            window.location.reload();
        } catch (error) {
            console.error("Error booking slot:", error);
            // Handle booking error here
        }

        // Close the modal after attempting to book the slot
        setShowModal(false);
    };

    return (
        <main className="bg-gray-100 min-h-screen">
            <NavbarUser />
            <div className="max-w-7xl mx-auto py-8 px-4">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Book a Slot from Here</h1>
                {errorMessage && (
                    <div className="mb-4 text-red-600 font-semibold">
                        {errorMessage}
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availabilities.map((availability) => (
                        <div key={availability.date + availability.startTime} className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Service Availability</h2>
                                <p><strong>Date:</strong> {availability.date}</p>
                                <p><strong>Start Time:</strong> {availability.startTime}</p>
                                <p><strong>End Time:</strong> {availability.endTime}</p>
                                <p><strong>Location:</strong> {availability.location}</p>
                                <p><strong>Car Shop Owner:</strong> {availability.carShopOwner}</p>
                            </div>
                            <button
                                className="mt-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 self-left"
                                onClick={() => {
                                    setCurrentAvailability(availability);
                                    setShowModal(true);
                                }}
                            >
                                Book Slot
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md text-center">
                        <p className="mb-4">Do you want to book this service?</p>
                        <button
                            className="bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 mr-2"
                            onClick={() => {
                                if (currentAvailability) {
                                    bookSlot(currentAvailability);
                                } else {
                                    console.error("No availability selected");
                                    // Optionally, provide feedback to the user if no availability is selected
                                }
                            }}
                        >
                            YES
                        </button>
                        <button
                            className="bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600"
                            onClick={() => setShowModal(false)}
                        >
                            NO
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
