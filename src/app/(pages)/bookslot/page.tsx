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
    discount: string;
}

export default function BookSlot() {
    const [availabilities, setAvailabilities] = useState<Availability[]>([]);
    const [currentAvailability, setCurrentAvailability] = useState<Availability | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);

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

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredAvailabilities = availabilities.filter((availability) => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        return (
            availability.location.toLowerCase().includes(lowerCaseQuery) ||
            availability.carShopOwner.toLowerCase().includes(lowerCaseQuery) ||
            availability.startTime.toLowerCase().includes(lowerCaseQuery) ||
            availability.endTime.toLowerCase().includes(lowerCaseQuery)
        );
    });

    const bookSlot = async (selectedAvailability: Availability) => {
        setLoading(true); // Start loading animation
        try {
            console.log("Booking slot for:", selectedAvailability);
            const response = await axios.post('/api/users/fetchHistory', selectedAvailability);
            const res = await axios.patch('/api/users/addservice', selectedAvailability);
            console.log("Booking successful:", response.data);
          
            window.location.reload();
            alert("Your slot has been successfully booked! Please check your mail for the details.");
        } catch (error) {
            console.error("Error booking slot:", error);
            // Handle booking error here
        } finally {
            setLoading(false); // Stop loading animation
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
                <div className="flex justify-end mb-8">
                    <input
                        type="text"
                        placeholder="Search by Location, Owner, Time..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAvailabilities.map((availability) => (
                        <div key={availability.date + availability.startTime} className={`bg-white p-6 rounded-lg shadow-md flex flex-col justify-between ${availability.discount ? 'border-4 border-indigo-500 transition-transform duration-300 transform hover:scale-105' : ''}`}>
                            <div>
                                <h2 className="text-xl font-semibold mb-2">Service Availability</h2>
                                <p><strong>Date:</strong> {availability.date}</p>
                                <p><strong>Start Time:</strong> {availability.startTime}</p>
                                <p><strong>End Time:</strong> {availability.endTime}</p>
                                <p><strong>Location:</strong> {availability.location}</p>
                                <p><strong>Car Shop Owner:</strong> {availability.carShopOwner}</p>
                                {availability.discount && (
                                    <p className="text-indigo-400"><strong>Discount:</strong> {availability.discount}</p>
                                )}
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
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM2 12a10 10 0 0010 10v-4a6 6 0 01-6-6H2z"
                                    ></path>
                                 
                                </svg>
                            </div>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}
