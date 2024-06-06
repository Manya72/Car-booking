'use client'
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Image from 'next/image';
import { AuthOptions, getServerSession } from 'next-auth';

export default async function Home() {


  return (
    <main className="bg-cover bg-center min-h-screen" 
    >
       <div> 
                 
            </div> 
      <div className=" bg-opacity-50 min-h-screen">
        <Navbar />
     

        <div className="container mx-auto px-4 py-8 text-center ">
          <h1 className="text-4xl font-bold mb-4">Welcome to [Car Wash Name]!</h1>
          <p className="text-lg mb-4">
            This is Car - wash booking System.
          </p>
          <p className="text-lg mb-4">
            Book your car wash online in a few simple steps. Sign up for an account for
            faster booking and convenient access to your booking history (optional).
          </p>
       
          
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg mt-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-around items-center text-gray-900">
              <div className="text-center mb-4 md:mb-0">
                <p className="text-2xl font-semibold">4.7/5</p>
                <p>Based on 150,000+ Reviews</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold">15 Lacs+</p>
                <p>Cars Serviced and Repaired</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
