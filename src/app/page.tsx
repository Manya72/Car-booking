'use client'
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Image from 'next/image';
import { CheckCircle, ChevronDown, ChevronUp, Menu, Star, X, Twitter, Facebook, Instagram, LifeBuoy } from 'lucide-react';

export default function Home() {
  return (
    <main className="">
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 min-h-screen">
        <div className="container mx-auto px-4 py-8 text-left relative">
          <Navbar />
          
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
            
            <div className="absolute left-0 top-0 h-full w-full bg-gray-200">
              
            </div>
   
            <div className="absolute z-10 right-0 top-0 h-full w-1/3 bg-indigo-200">
              
              <div className="absolute bottom-20 right-12 text-white font-bold text-xl">Carwashing Service</div>
            </div>
            
            <div className="relative z-20 p-8">
             
              <h1 className="mt-28 text-xl font-bold tracking-tight text-indigo-700 md:text-3xl lg:text-5xl">
                Get Your Car Shine Like New
              </h1>
              <div className="mt-8 flex max-w-max items-center space-x-2 rounded-full bg-indigo-100 p-1">
                <div className="rounded-full bg-white p-1 px-2">
                  <p className="text-sm font-medium text-indigo-800">Book your next wash now!</p>
                </div>
                <p className="text-sm font-medium text-indigo-800">Drive in for a sparkling car &rarr;</p>
              </div>
              <p className="mt-8 text-lg text-black">
                Our professional team cares about your car's shine.
              </p>
            </div>
            <footer className="absolute bottom-0 left-0 w-full bg-white py-4 shadow-md z-20">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex space-x-6">
                <Twitter className="w-6 h-6 cursor-pointer text-gray hover:text-indigo-500" />
                <Facebook className="w-6 h-6 cursor-pointer hover:text-indigo-500" />
                <Instagram className="w-6 h-6 cursor-pointer hover:text-indigo-500" />
              </div>
              <div className="flex space-x-6">
                <LifeBuoy className="w-6 h-6 cursor-pointer hover:text-indigo-500" />
                <span className="text-sm">Support</span>
              </div>
            </div>
          </footer>
          </div>

          {/* Footer */}
          
        </div>
      </div>
    </main>
  );
}
