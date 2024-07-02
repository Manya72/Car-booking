'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter,usePathname } from 'next/navigation';
import { useState } from 'react';

function NavBar() {
  const router=useRouter()
  const [navbar, setNavbar] = useState(false);
  
  const pathname1 = usePathname()
  const isActive = (pathname) => {
	
    return pathname1 === pathname ? 'text-indigo-700' : 'text-gray-500';
  };
  const handlesignup=()=>{
    router.push("/signup")


    
  }
  const handleLogin=()=>{
    router.push("/login")


  }
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
               
			<li className={`md:px-4 md:py-2 hover:text-indigo-400 ${isActive('/')}`}>
      <div className="absolute top-13 left-5 text-indigo-800 font-bold text-2xl z-50">CarWash</div>
              <Link href="/">Home</Link>
            </li>
            <li className={`md:px-4 md:py-2 hover:text-indigo-400 ${isActive('/aboutus')}`}>
              <Link href="/aboutus">About</Link>
            </li>
            {/* <li className={`md:px-4 md:py-2 hover:text-indigo-400 ${isActive('/explore')}`}>
              <Link href="/explore">Explore</Link>
            </li> */}
            <li className={`md:px-4 md:py-2 hover:text-indigo-400 ${isActive('/contact')}`}>
              <Link href="/contact">Contact</Link>
            </li>
			</ul>
		</div>
    {/* <div className="absolute z-0 right-1 left-0 top-8 h-1/2 w-1/3 bg-indigo-200">
              
             
            </div> */}
            
		<div class="order-2 md:order-3 z-10 ">
    {/* <button onClick={handlesignup} class="px-4 py-2 bg-indigo-700 hover:bg-indigo-500 text-gray-50 rounded-xl flex items-center gap-2"> */}
    <div class="flex gap-2 ">
      <Link href="/signup" class="px-2 py-1 hover:text-indigo-400 text-black-50 rounded-lg">
        Signup
      </Link>
      <Link href="/login" class="px-2 py-1 hover:text-indigo-400 text-black-50 rounded-lg">
        Login
      </Link>
    </div>

		</div>
	</div>
</nav>
    
  );
}

export default NavBar;
