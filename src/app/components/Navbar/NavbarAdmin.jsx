'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter,usePathname } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
export default function NavBarAdmin() {
  const router=useRouter()

  const pathname1 = usePathname()
  const [LogoutModal,setShowLogoutModal]=useState(false)
  const isActive = (pathname) => {
	
    return pathname1 === pathname ? 'text-indigo-700' : 'text-gray-500';
  };

  const handleLogout = async () => {
	try {
		await axios.get('/api/users/logout')
		setTimeout(() => {
			router.push("/");
		  }, 1000);
		
	} catch (error) {
		
	}
  };
  return (
    
 
<nav class="bg-gray-200 shadow shadow-gray-300 w-200 px-4 md:px-auto">
	<div class="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">

		<div class="text-indigo-500 md:order-1">

			{/* <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24"
				stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
			</svg> */}
		</div>
		<div class="text-gray-500 order-3 w-full md:w-auto md:order-2">
			<ul class="flex font-semibold justify-between">
               
			<li className={`md:px-4 md:py-2 hover:text-indigo-400 ${isActive('/adminhome')}`}>
              <Link href="/adminhome">Home</Link>
            </li>
            <li className={`md:px-4 md:py-2 hover:text-indigo-400 ${isActive('/users')}`}>
              <Link href="/users">Users</Link>
            </li>
            <li className={`md:px-4 md:py-2 hover:text-indigo-400 ${isActive('/bookings')}`}>
              <Link href="/bookings">Slots & Bookings</Link>
            </li>
            {/* <li className={`md:px-4 md:py-2 hover:text-indigo-400 ${isActive('/contact')}`}>
              <Link href="/contact">Settings</Link>
            </li> */}
			</ul>
		</div>
		<div class="order-2 md:order-3">
			<button  onClick={()=>{
                 setShowLogoutModal(true)
                 }} class="px-4 py-2 bg-indigo-700 hover:bg-indigo-500 text-gray-50 rounded-xl flex items-center gap-2">
                
                {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> */}
                {/* <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg> */}
                <span>Logout</span>
            </button>
		</div>
    {LogoutModal &&(
             <div className=" fixed inset-0 flex items-center justify-center bg-opacity-50 ">
             <div className="bg-white p-6 rounded shadow-md text-center ">
               <p className="mb-4 font-bold">Do You Really Want to Logout?</p>
               <button
                 className="bg-indigo-300 text-white py-2 px-3 rounded hover:bg-indigo-600 mr-2"
                 onClick={()=>{
                 handleLogout()
                 }}
               >
                 YES
               </button>
               <button
                 className="bg-indigo-300 text-white py-2 px-3 rounded hover:bg-indigo-600"
                 onClick={() => setShowLogoutModal(false)}
               >
                 NO
               </button>
             </div>
           </div>
        )}
	</div>
</nav>
    
  );
}


