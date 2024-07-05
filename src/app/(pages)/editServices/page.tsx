'use client'
import axios from "axios";
import { useEffect, useState } from "react";
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
  discount: string;  // Assuming discount is a string, update the type as necessary
}

export default function EditServices() {
  const [data, setData] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<Service | null>(null);
  const [editModal, setEditModal] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Service | null>(null);
  const [searchDate,setsearchDate]=useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users/addservice');
        const fetchedServices = response.data;
        setData(fetchedServices);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchData();
  }, []);

  const deleteService = async (id: string) => {
    try {
      await axios.delete(`/api/users/deleteservice/${id}`);
      window.location.reload();
      setDeleteModal(null);
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleEditClick = (service: Service) => {
    setEditModal(service);
    setFormData(service);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const updateService = async () => {
    if (formData) {
      try {
        await axios.put(`/api/users/deleteservice/${formData._id}`, formData);
        window.location.reload();
        setEditModal(null);
      } catch (error) {
        console.error('Error updating service:', error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Options for discount percentages
  const discountOptions = ["0%", "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"];

  return (
    <main>
      <NavbarOwner />
      <h1 className="text-3xl font-bold mb-8 pl-12 pt-2 text-indigo-600">Edit Services</h1>
  
      <div className="container mx-auto px-1 py-2">
        <div className="flex justify-between items-center">
          <div></div> {/* Empty div for alignment */}
          <input
            type="text"
            placeholder="Search by Date"
            onChange={(e) => setsearchDate(e.target.value)}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
  
        <table className="min-w-full bg-white mt-4">
          <thead>
            <tr className="bg-indigo-400 text-white">
              <th className="py-2 px-4">Location</th>
              <th className="py-2 px-19">Start Time</th>
              <th className="py-2 px-18">End Time</th>
              <th className="py-2 px-4">Discount</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((service) => service.date.includes(searchDate))
              .map((service) => (
                <tr key={service._id} className="hover:bg-gray-100 transition duration-300">
                  <td className="border px-4 py-2">{service.location}</td>
                  <td className="border px-4 py-2">{service.startTime}</td>
                  <td className="border px-4 py-2">{service.endTime}</td>
                  <td className="border px-4 py-2">{service.discount || 'N/A'}</td>
                  <td className="border px-4 py-2">{service.date}</td>
                  <td className="border px-4 py-2">
                    <div className="flex space-x-2">
                      <button onClick={() => handleEditClick(service)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="black"
                          className="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                      </button>
                      <button onClick={() => setDeleteModal(service)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="red"
                          className="bi bi-trash-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
  
        {deleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md text-center">
              <p className="mb-4 font-bold">Are you sure you want to delete this service?</p>
              <button
                className="bg-indigo-300 text-white py-2 px-3 rounded hover:bg-indigo-600 mr-2"
                onClick={() => deleteService(deleteModal._id)}
              >
                YES
              </button>
              <button
                className="bg-indigo-300 text-white py-2 px-3 rounded hover:bg-indigo-600"
                onClick={() => setDeleteModal(null)}
              >
                NO
              </button>
            </div>
          </div>
        )}
  
        {editModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-2xl mb-4">Edit Service</h2>
              <div className="mb-4">
                <label className="block text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData?.location || ''}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Start Time</label>
                <input
                  type="text"
                  name="startTime"
                  value={formData?.startTime || ''}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">End Time</label>
                <input
                  type="text"
                  name="endTime"
                  value={formData?.endTime || ''}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Discount (%)</label>
                <select
                  name="discount"
                  value={formData?.discount || ''}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Select Discount</option>
                  {discountOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date</label>
                <input
                  type="text"
                  name="date"
                  value={formData?.date || ''}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-indigo-300 text-white py-2 px-3 rounded hover:bg-indigo-600"
                  onClick={updateService}
                >
                  Save
                </button>
                <button
                  className="bg-indigo-300 text-white py-2 px-3 rounded hover:bg-indigo-600"
                  onClick={() => setEditModal(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}  