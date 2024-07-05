'use client'
import axios from "axios";
import { useState, useEffect } from "react";
import NavbarOwner from "@/app/components/Navbar/NavbarOwner";
import {useRouter} from "next/navigation";
interface Service {
  _id: string;
  UserName: string;
  carShopOwner: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  status: string;
  review: string;
  discount: string;  // Assuming discount is a string, update the type as necessary
}

export default function Ownerhome() {
  const [services, setServices] = useState<Service[]>([]);
  const [data, setdata] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const router=useRouter()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users/addservice');
        const fetchedServices = response.data;
        console.log("the data for my addservice response",fetchedServices

        )
        setdata(fetchedServices);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchservices = async () => {
      try {
        const response = await axios.get('/api/users/fetchHistory');
        const fetchedServices = response.data;
        console.log("fetched data",fetchedServices)
        setServices(fetchedServices);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

fetchservices()
  }, []);

  const getStatusCount = (status: string) => {
    console.log ("service statuss",services)
    return services.filter(service => service.status === status).length;
  };
  
  const getaddedservices = () => {
  return data.length
  };
  const getTodayBookingCount = () => {
    const today = new Date().toISOString().split('T')[0];
    return services.filter(service => service.date === today).length;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="bg-gray-100 min-h-screen">
      <NavbarOwner />
      <div className="container mx-auto px-8 py-8">
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600">Home</h1>
          <div className="text-lg font-semibold text-gray-800 bg-white p-4 rounded-lg shadow-lg flex items-center justify-between">
  <span>Today's Bookings:</span>
  <span className="text-indigo-600">{getTodayBookingCount()}</span>
</div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8 ">
          <div className="bg-white rounded-lg items-center  w-55 shadow-lg row-span-2">
            
            
            
            
            <h2 className="text-xl font-semibold text-center mt-3  text-gray-800 mb-2">Customize your Services</h2>
          <div className="  top-0  mt-7 mr-20 0 ">
    <button className="bg-indigo-500  ml-20 text-white p-4 pr-27 rounded hover:bg-indigo-700 transition duration-300" onClick={()=>router.push('/editServices')} >
  
      Click Here to Edit Added Services
    </button>
    <br></br>
    <button className="bg-indigo-500 text-white p-4 mt-10 ml-20 rounded hover:bg-indigo-700 transition duration-300" onClick={()=>router.push('/shopownerdashboard')}>
      Click Here to Manage Order History
    </button>
  </div>
          </div>
        
  {/* <div className="grid grid-cols-2 gap-6 mb-8"> */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col  items-center">
            <div className="pl-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="green" className="bi bi-car-front-fill items-right" viewBox="0 0 16 16">
                <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Services Completed</h2>
            <p className="text-green-600 text-2xl">{getStatusCount('Done')}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="pl-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="orange" className="bi bi-car-front-fill items-right" viewBox="0 0 16 16">
                <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Services In-progresss</h2>
            <p className="text-orange-600 text-2xl">{getaddedservices()}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="pl-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="blue" className="bi bi-car-front-fill items-right" viewBox="0 0 16 16">
                <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Services Pending</h2>
            <p className="text-blue-600 text-2xl">{getStatusCount('Pending')}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="pl-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="red" className="bi bi-car-front-fill items-right" viewBox="0 0 16 16">
                <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Services Deleted</h2>
            <p className="text-red-600 text-2xl">{getStatusCount('Deleted')}</p>
          </div>
        </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg relative">
  <h1 className="text-3xl font-bold mb-8  text-left text-indigo-600">Recently Added Services</h1>
  
  <table className="min-w-full bg-white mt-4">
    <thead>
      <tr className="bg-indigo-400 text-white">
        <th className="py-2 px-4">Date</th>
        <th className="py-2 px-4">Location</th>
        <th className="py-2 px-4">Start Time</th>
        <th className="py-2 px-4">End Time</th>
        <th className="py-2 px-4">Discount</th>
      </tr>
    </thead>
    <tbody>
      {data.slice(0, 5).map((service) => (
        <tr key={service._id} className="hover:bg-gray-100 transition duration-300">
          <td className="border px-4 py-2">{service.date}</td>
          <td className="border px-4 py-2">{service.location}</td>
          <td className="border px-4 py-2">{service.startTime}</td>
          <td className="border px-4 py-2">{service.endTime}</td>
          <td className="border px-4 py-2">{service.discount || 'N/A'}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {/* </div> */}
    </main>
  );
}