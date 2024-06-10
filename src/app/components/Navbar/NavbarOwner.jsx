
'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter,usePathname } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

function NavbarOwner() {
  const router = useRouter();
  const pathname1 = usePathname()
  const isActive = (pathname) => {
	
    return pathname1 === pathname ? 'text-indigo-700' : 'text-gray-500';
  };

  const handlelogout = async () => {
    try {
      await axios.get('/api/users/logout');
      setTimeout(() => {
		
        router.push('/');
      }, 1000);
    } catch (error) {
      console.error('Logout failed:', error);
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
            <li className={`md:px-4 md:py-2 hover:text-indigo-400 ${isActive('/shopownerdashboard')}`}>
              <Link href="/shopownerdashboard">Dashboard</Link>
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
          <button onClick={handlelogout} className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavbarOwner;
