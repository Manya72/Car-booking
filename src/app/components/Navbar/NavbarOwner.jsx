'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

function NavbarOwner() {
  const router = useRouter();
  const pathname1 = usePathname()
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  const isActive = (pathname) => {
    return pathname1 === pathname ? 'text-indigo-700' : 'text-gray-500';
  };

  const handleLogout = async () => {
    try {
      setLogoutLoading(true); // Set loading state to true
      await axios.get('/api/users/logout');
      setLogoutModal(false);
      setTimeout(() => {
        router.push('/');
        
      }, 200);
     
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      // setLogoutLoading(true); // Reset loading state after API call completes
    }
  };

  return (
    <nav className="bg-gray-200 shadow shadow-gray-300 w-200 px-4 md:px-auto">
      <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
        <div className="text-indigo-500 md:order-1">
          {/* Your logo or brand icon */}
        </div>

        <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
          <ul className="flex font-semibold justify-between">
            <li className={`md:px-4 md:py-2 hover:text-indigo-400 ${isActive('/Ownerhome')}`}>
              <Link href="/Ownerhome">Dashboard</Link>
            </li>
            <li className={`md:px-4 md:py-2 hover:text-indigo-400 ${isActive('/addslot')}`}>
              <Link href="/addslot">Add Slot</Link>
            </li>
            <li className={`md:px-4 md:py-2 hover:text-indigo-400 ${isActive('/profile')}`}>
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
        </div>
       
        <div className="order-2 md:order-3">
          <button
            onClick={() => setLogoutModal(true)}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2"
          >
            <span>Logout</span>
          </button>
        </div>

        {logoutModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 ">
            <div className="bg-white p-6 rounded shadow-md text-center ">
              <p className="mb-4 font-bold">Do You Really Want to Logout?</p>
              <button
                className="bg-indigo-300 text-white py-2 px-3 rounded hover:bg-indigo-600 mr-2"
                onClick={() => {
                  handleLogout(); // Call handleLogout function
                  setLogoutLoading(true); // Set loading to true on button click
                }}
                disabled={logoutLoading} // Disable button while logging out
              >
                YES
              </button>
              <button
                className="bg-indigo-300 text-white py-2 px-3 rounded hover:bg-indigo-600"
                onClick={() => setLogoutModal(false)}
              >
                NO
              </button>
              {logoutLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 text-white">
           
                  Logging out...
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavbarOwner;
