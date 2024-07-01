'use client'
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Image from 'next/image';
import { CheckCircle, ChevronDown, ChevronUp, Menu, Star, X } from 'lucide-react';

export default function Home() {
  return (
    <main className="">
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 min-h-screen">
        <div className="container mx-auto px-4 py-8 text-left relative"> {/* Add relative positioning here */}
          <Navbar /> {/* Navbar component should render above other content */}
          
          <div className="absolute right-0 top-0 mt-40 mr-40 w-1/3 h-full z-20 ">
            <Image
              src="/pg.png"
              width={590}
              height={420}
              alt="Picture"
              className='zomm'
            />
          </div>
          <div className="w-full h-16 mb-20 bg-white rounded-lg relative min-h-screen">
            {/* Background Image */}
            
            {/* White Overlay */}
            <div className="absolute left-0 top-0 h-full w-full bg-white"></div>
            
            {/* Purple Overlay */}
            <div className="absolute z-10 right-0 top-0 h-full w-1/3 bg-indigo-200"></div> {/* Increase z-index value to 10 or more */}
            
            {/* Content */}
            <div className="relative z-20 p-8"> {/* Increase z-index value to 20 or more */}
              <div className="mt-8 flex max-w-max items-center space-x-2 rounded-full bg-indigo-100 p-1">
                <div className="rounded-full bg-white p-1 px-2">
                  <p className="text-sm font-medium text-indigo-800">Book your next wash now!</p>
                </div>
                <p className="text-sm font-medium text-indigo-800">Drive in for a sparkling car &rarr;</p>
              </div>
              <h1 className="mt-8 text-xl font-bold tracking-tight text-indigo-700 md:text-3xl lg:text-5xl">
                Get Your Car Shine Like New
              </h1>
              <p className="mt-8 text-lg text-black">
                Our professional team cares about your car's shine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
