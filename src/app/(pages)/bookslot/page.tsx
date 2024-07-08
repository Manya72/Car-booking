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
    shopName:string;
    
}

export default function BookSlot() {
    const [ownerSearchQuery, setOwnerSearchQuery] = useState('');
    const [availabilities, setAvailabilities] = useState<Availability[]>([]);
    const [currentAvailability, setCurrentAvailability] = useState<Availability | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [carshops,setcarshops]=useState([])
    const [filteredavailabilities,setfilteredavailabilities]=useState<Availability[]>([]);

    // useEffect(() => {
    //     const fetchAvailabilities = async () => {
    //         try {
    //             const response = await axios.get('/api/users/addservice');
    //             setAvailabilities(response.data);
    //             console.log("availaibilities ____________",response.data)
         
    //         } catch (error) {
    //             console.error("Error fetching availabilities", error);
    //             setErrorMessage("Failed to fetch availabilities, please try again later");
    //         }
    //     };
    //     fetchAvailabilities();
    // }, []);
    useEffect(() => {
        const fetchshop = async () => {
            try {
                const response = await axios.get('/api/users/addservice');
                setAvailabilities(response.data);
                console.log("availaibilities ____________",response.data)
                const shopNames = [...new Set(response.data.map((item: Availability) => item.shopName))];
                setcarshops(shopNames);
            } catch (error) {
                console.error("Error fetching availabilities", error);
                setErrorMessage("Failed to fetch availabilities, please try again later");
            }
        };
        fetchshop();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        setSearchQuery(event.target.value);
        const filtered = availabilities.filter(user => user.carShopOwner.toLowerCase().includes(searchQuery));
        console.log("filtered..........................",filtered)
        setfilteredavailabilities(filtered)
    };

    // const filteredAvailabilities = availabilities.filter((availability) => {
    //     const lowerCaseQuery = searchQuery.toLowerCase();
       
    //     return (
            
    //         availability.shopName.toLowerCase().includes(lowerCaseQuery)
            
    //     );
    // });

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
        <main className="bg-gray-100 min-h-screen flex">
        <div className="flex-1">
          <NavbarUser />
          <div className="max-w-7xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Car Wash</h1>
            {errorMessage && (
              <div className="mb-4 text-red-600 font-semibold">
                {errorMessage}
              </div>
            )}
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex-1">
                {(searchQuery? filteredavailabilities:availabilities).map((availability) => (
                  <div
                    key={availability.date + availability.startTime}
                    className={`bg-white p-4 rounded-lg shadow-md flex flex-row mb-5 justify-between w-full ${availability.discount ? 'border-4 border-indigo-500 transition-transform duration-300 transform hover:scale-105' : ''}`}
                  >
                    <img src="/wash.jpg" alt="Car Wash" className="w-1/3 h-auto object-cover rounded-lg mr-4" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl text-indigo-800 font-semibold">{availability.shopName}</h2>
                        <p className="text-sm text-gray-600">Owner: {availability.carShopOwner}</p>
                      </div>
                      <p className="text-indigo-500"><strong> {new Date(availability.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</strong></p>

                      <p><strong>Start Time:</strong> {availability.startTime}</p>
                    
                      <p className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" className="bi bi-geo-alt mr-2" viewBox="0 0 16 16">
                          <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                          <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                        </svg> 
                        {availability.location}
                      </p>
                      {availability.discount && (
                        <p className="text-indigo-400"><strong>Discount:</strong> {availability.discount}</p>
                      )}
                      <div className="flex mb-4">
                        <div className="w-1/2">
                          <ul className="list-none space-y-1">
                            <li className="flex items-center text-green-600">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                              </svg>
                              <p className="ml-2 text-sm">Dashboard & Tyre Polish</p>
                            </li>
                            <li className="flex items-center text-green-600">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                              </svg>
                              <p className="ml-2 text-sm">Carwash</p> 
                            </li>
                          </ul>
                        </div>
                        <div className="w-1/2">
                          <ul className="list-none space-y-1">
                            <li className="flex items-center text-green-600">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                              </svg>
                              <p className="ml-2 text-sm">Cleansing</p>
                            </li>
                            <li className="flex items-center text-green-600">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                              </svg>
                              <p className="ml-2 text-sm">Interior vaccuming</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* <button type="button" class=">Default</button> */}
                      <button
                        className=" text-blue-700 hover:text-white border border-indigo-700 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center me-2 mb-0 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-300 dark:focus:ring-blue-400"
                        onClick={() => {
                          setCurrentAvailability(availability);
                          setShowModal(true);
                        }}
                      >
                        Book Slot
                      </button>
                      <div className="flex items-center w-28 ml-96 right-2 text-right text-xs px-2 py-1 bg-gray-200 text-gray-600">
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
  </svg> 
  <span className="ml-1">Takes 1 hour</span>
</div>

                    </div>
                  </div>
                ))}
              </div>
              <div className="hidden md:block md:w-1/3 bg-white p-6 rounded-lg shadow-md sticky top-0 h-screen">
                <h2 className="text-xl font-semibold mb-4">Search by Car Shop </h2>
                <input
                  type="text"
                  placeholder="Search by Shop"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mb-4"
                />
                <div>
                <div className="mt-4 grid grid-cols-2 gap-4">
    <h3 className="text-lg font-semibold text-indigo-800 mb-2 col-span-3">Available Shops:</h3>
    {carshops.map((shop, index) => (
        <div key={index} className="p-4 bg-gray-800 border border-gray-200 rounded-lg transition duration-300 hover:bg-gray-500 hover:border-gray-100 hover:shadow-xl cursor-pointer">
        <p className="text-white">{shop}</p>
    </div>
    
    ))}
</div>

                  {/* {carShopOwners.map((owner) => (
                    <p key={owner} className="text-gray-800">{owner}</p>
                  ))} */}
                </div>
              </div>
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
        </div>
      </main>
      );
    }      