'use client'
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-cover min-h-screen bg-gradient-to-b from-gray-300 to-indigo-300 ">
      <Navbar />

      {/* Background Image */}
      <div className="relative ">
        <Image
          src="/pg.png"
          width={690}
          height={820}
          alt="Picture"
          className='zoom'
        />
      </div>

      {/* Four Square Cards in 2 Columns and 2 Rows */}
      <div className=" relative left-8 w-2/3 bg-white  text-black py-3">
      <div className="container mx-auto grid grid-cols-4 gap-9">
  {/* Service Card 1 */}
  <div className="bg-orange-100 p-4 ml-3 text-gray-500 text-center transition duration-300 ease-in-out transform hover:bg-orange-200 hover:shadow-lg hover:scale-110">
    <Image
      src="/ext.png"
      alt="Car Icon"
      width={28}
      height={28}
      className="ml-16 mt-2"
    />
    <h3 className="text-sm font-bold mb-2">Exterior Wash</h3>
  </div>

  {/* Service Card 2 */}
  <div className="bg-orange-100 p-4 text-gray-500 text-center transition duration-300 ease-in-out transform hover:bg-orange-200 hover:shadow-lg hover:scale-110">
    <Image
      src="/eng.png"
      alt="Car Icon"
      width={32}
      height={32}
      className="ml-16 mt-1"
    />
    <h3 className="text-sm font-bold mb-2">Engine Cleaning</h3>
  </div>

  {/* Service Card 3 */}
  <div className="bg-orange-100 p-4 ml-3 text-gray-500 text-center transition duration-300 ease-in-out transform hover:bg-orange-200 hover:shadow-lg hover:scale-110">
    <Image
      src="/det.png"
      alt="Car Icon"
      width={28}
      height={28}
      className="ml-16 mt-1"
    />
    <h3 className="text-sm font-bold mb-2">Interior Detailing</h3>
  </div>

  {/* Service Card 4 */}
  <div className="bg-orange-100 p-4 mr-3 text-gray-500 text-center transition duration-300 ease-in-out transform hover:bg-orange-200 hover:shadow-lg hover:scale-110">
    <Image
      src="/hl.png"
      alt="Car Icon"
      width={32}
      height={32}
      className="mx-auto mt-1 transition-transform duration-300 ease-in-out transform hover:scale-110"
    />
    <h3 className="text-sm font-bold mb-2">Headlight Restoration</h3>
  </div>

  {/* Service Card 5 */}
  <div className="bg-orange-100 p-4 ml-3 text-gray-500 text-center transition duration-300 ease-in-out transform hover:bg-orange-200 hover:shadow-lg hover:scale-110">
    <Image
      src="/door.png"
      alt="Car Icon"
      width={28}
      height={28}
      className="ml-16 mt-1"
    />
    <h3 className="text-sm font-bold mb-2">Glass Cleaning</h3>
  </div>

  {/* Service Card 6 */}
  <div className="bg-orange-100 p-4 text-gray-500 text-center transition duration-300 ease-in-out transform hover:bg-orange-200 hover:shadow-lg hover:scale-110">
    <Image
      src="/uw.png"
      alt="Car Icon"
      width={36}
      height={36}
      className="ml-16 mt-0"
    />
    <h3 className="text-sm font-bold mb-2">Under Wash</h3>
  </div>

  {/* Service Card 7 */}
  <div className="bg-orange-100 p-4 mr-3 text-gray-500 text-center transition duration-300 ease-in-out transform hover:bg-orange-200 hover:shadow-lg hover:scale-110">
    <Image
      src="/polish.png"
      alt="Car Icon"
      width={32}
      height={32}
      className="ml-16 mt-1"
    />
    <h3 className="text-sm font-bold mb-2">Waxing & Polishing</h3>
  </div>

  {/* Service Card 8 */}
  <div className="bg-orange-100 p-4 mr-3 text-gray-500 text-center transition duration-300 ease-in-out transform hover:bg-orange-200 hover:shadow-lg hover:scale-110">
    <Image
      src="/tire.png"
      alt="Car Icon"
      width={32}
      height={32}
      className="ml-16 mt-1"
    />
    <h3 className="text-sm font-bold mb-2">Tire & Rim Cleaning</h3>
  </div>



          {/* Service Card 4 */}
         
        </div>
        
      </div>
 
      {/* Sticky Card on the Right */}
      <div className="fixed right-0 top-0 mt-20 mr-10 w-1/4 h-screen bg-orange-50 text-black p-8 flex flex-col justify-">
  <h2 className="text-4xl text-indigo-400 font-bold">Best Place for Car Wash...</h2>
  <p className="text-lg text-gray-600 font-semibold mt-3">Book your next wash now!</p>
  <div className="flex justify-center mt-5">
  <button
    type="button"
    className={`bg-indigo-500 w-full text-gray-50 text-4xl font-semibold h-40 py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-indigo-600 hover:scale-125`}
  >
    Signup to Book Services
  </button>
</div>

  {/* Stats Section */}
  <div className="mt-12">
  <div className="flex items-center mb-6">
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-star-fill text-yellow-500 mr-3" viewBox="0 0 16 16">
      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694v.001z"/>
    </svg>
    <p className="text-lg text-gray-600 font-semibold">4.8 <span className="text-xs">(Based on 250 reviews)</span></p>
  </div>

    <div className="flex items-center mb-6">
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-emoji-heart-eyes text-red-500 mr-3" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
      <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5"/>
    </svg>
    <p className="text-lg text-gray-600 font-semibold">10,000+ Happy Customers</p>
  </div>
  </div>

  {/* Additional Text */}
  
</div> 

    </div>
  );
}
