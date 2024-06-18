'use client';
import React, { useEffect, useState } from 'react';
import NavbarOwner from '../../components/Navbar/NavbarOwner';
import moment from 'moment';
import axios from 'axios';

interface User {
  date: string;
  startTime: string;
  endTime: string;
  UserName: string;
  status: string;
  _id: string;
  review:string
}

export default function OwnerDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const[review,setreview]=useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users/fetchorders');
        const fetchedUsers = response.data.map((user: User) => ({
          ...user,
        }));
        setUsers(fetchedUsers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

 const handledeleteservice=async(id:String)=>{
  try {
    // setSelectedUserId(id)
    const response=await axios.post('/api/users/fetchorders',{id:id})
    
    console.log("for the delete service",response)
    window.location.reload()
  } catch (error) {
    console.log("error")
  }
 }

  const handleStatusChange = async () => {
    if (!selectedUserId) return;
    const updatedUsers = users.map(user => user._id === selectedUserId ? { ...user, status: 'Done' } : user);
    setUsers(updatedUsers);
    setShowModal(false);
    try {
      const response = await axios.patch('/api/users/fetchorders', { _id: selectedUserId, status: 'Done' });
      console.log(response.data);
    } catch (error) {
      console.log('Error updating status', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

 

 

  return (
    <main className='bg-indigo-50'>
      <NavbarOwner />
      <h1 className="pt-10 leading-none tracking-tight md:text-5xl lg:text-4xl dark:text-white text-2xl font-bold mb-8 text-center text-indigo-600">
        Your Order History
      </h1>
      <div className="overflow-x-auto bg-indigo-500">
        <table className="min-w-full divide-y divide-indigo-200">
          <thead className="bg-blue-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{moment(user.date).format('MMMM Do YYYY')}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.startTime}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.endTime}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.UserName}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${user.status === 'Done' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}`}>
                  {user.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                {user.status !== 'Done' ? (
                    <>
                      <button
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={() => {
                          setSelectedUserId(user._id);
                          // setActionType('done');
                          setShowModal(true);
                        }}
                      >
                        Mark as Done
                      </button>
                      <button
                        className="text-indigo-600 hover:text-indigo-900 ml-4"
                        onClick={() => {
                          handledeleteservice(user._id)
                          // setSelectedUserId(user._id);s
                          
                        }}
                      >
                        Delete the service
                      </button>
                    </>
                  ) : (
                    <button className="text-indigo-600 hover:text-indigo-900"  onClick={() => {
                      if (user.review !== '') {
                        
                        setreview(user.review)

                      } else {
                        console.log('No review available');
                        // Optionally show a message or handle other logic if no review is available
                      }
                    }}>
    {user.review !== '' ? 'See review' : 'No review yet'}
  </button>
                  )}
                  {showModal && selectedUserId === user._id && (
                    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
                      <div className="bg-white p-6 rounded shadow-md text-center">
                        <p className="mb-4">Is the service completed?</p>
                        <button
                          className="bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 mr-2"
                          onClick={handleStatusChange}
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
                  {review!='' && (
                    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-md text-center">
                    <p className='text-grey-300'>{review}</p>
                      <button
                        className="bg-blue-500 text-white py-2 px-2 rounded hover:bg-blue-600"
                        onClick={() => setreview('')}
                      >
                        close
                      </button>
                    </div>
                  </div>
                  )}
                </td>
              </tr>
            ))}
             
          </tbody>
        </table>
      </div>
    </main>
  );
}
