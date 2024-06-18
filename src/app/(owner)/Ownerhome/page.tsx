'use client'
import axios from "axios";
import { useState, useEffect } from "react";
import NavbarOwner from "@/app/components/Navbar/NavbarOwner";

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
}

export default function Ownerhome() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users/fetchHistory');
        const fetchedServices = response.data;
        setServices(fetchedServices);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchData();
  }, []);

  const getStatusCount = (status: string) => {
    try {
      
    } catch (error) {
      
    }
    return services.filter(service => service.status === status).length;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="bg-gray-100 min-h-screen">
      <NavbarOwner />
      <div className="container mx-auto px-8 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600">Home</h1>
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
           
          
            <div className="pl-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="green" className="bi bi-car-front-fill  items-right" viewBox="0 0 16 16">
  <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z"/>
</svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Services Completed</h2>
            <p className="text-green-600 text-2xl">{getStatusCount('Done')}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <div className="pl-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="red" className="bi bi-car-front-fill  items-right" viewBox="0 0 16 16">
  <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z"/>
</svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Services Canceled</h2>
            <p className="text-red-600 text-2xl">{getStatusCount('Canceled')}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <div className="pl-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="blue" className="bi bi-car-front-fill  items-right" viewBox="0 0 16 16">
  <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z"/>
</svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Services Pending</h2>
            <p className="text-blue-600 text-2xl">{getStatusCount('Pending')}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <div className="pl-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentcolor" className="bi bi-car-front-fill  items-right" viewBox="0 0 16 16">
  <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z"/>
</svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Services In Progress</h2>
            <p className="text-grey-600 text-2xl">{getStatusCount('In Progress')}</p>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">Recent Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service._id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{service.date}</h2>
              <p className="text-gray-600"><span className="font-semibold text-gray-800">Start Time:</span> {service.startTime}</p>
              <p className="text-gray-600"><span className="font-semibold text-gray-800">End Time:</span> {service.endTime}</p>
              <p className="text-gray-600"><span className="font-semibold text-gray-800">Car Shop Owner:</span> {service.carShopOwner}</p>
              <p className="text-gray-600"><span className="font-semibold text-gray-800">Location:</span> {service.location}</p>
              <p className="text-gray-600"><span className="font-semibold text-gray-800">Status:</span> {service.status}</p>
              {service.review && (
                <p className="text-gray-600"><span className="font-semibold text-gray-800">Review:</span> {service.review}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
