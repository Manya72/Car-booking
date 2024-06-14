'use client'
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Image from 'next/image';
import { CheckCircle, ChevronDown, ChevronUp, Menu, Star, X } from 'lucide-react';

export default async function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bg.jpg" // Replace with the path to your background image
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          objectPosition="right"
          quality={100}
          className="opacity-30"
        />
      </div>
      <Navbar />
      <div className="bg-opacity-50 min-h-screen">
        <div className="container mx-auto px-4 py-8 text-left">
          <div className="relative w-full">
            <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
              <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
                <div className="mt-8 flex max-w-max items-center space-x-2 rounded-full bg-indigo-100 p-1">
                  <div className="rounded-full bg-white p-1 px-2">
                    <p className="text-sm font-medium text-indigo-800">Book your next wash now!</p>
                  </div>
                  <p className="text-sm font-medium text-indigo-800">Drive in for a sparkling car &rarr;</p>
                </div>
                <h1 className="mt-8 text-3xl font-bold tracking-tight text-indigo-700 md:text-4xl lg:text-6xl">
                  Get Your Car Shine Like New
                </h1>
                <p className="mt-8 text-lg text-black">
                  Our professional team cares about your car's shine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
