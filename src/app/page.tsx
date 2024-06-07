'use client'
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Image from 'next/image';
import { AuthOptions, getServerSession } from 'next-auth';
import { CheckCircle, ChevronDown, ChevronUp, Menu, Star, X } from 'lucide-react'
export default async function Home() {
  return (
    <main className="bg-blue min-h-screen">
      <div></div>
      <div className="bg-opacity-50 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-left">
          <div className="relative w-full bg-black-00">
            <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
              <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
                <div className="mt-8 flex max-w-max items-center space-x-2 rounded-full bg-indigo-100 p-1">
                  <div className="rounded-full bg-white p-1 px-2">
                    <p className="text-sm font-medium text-indigo-800">Book your next wash now!</p>
                  </div>
                  <p className="text-sm font-medium text-indigo-800">Drive in for a sparkling car &rarr;</p>
                </div>
                <h1 className="mt-8 text-align:left text-3xl font-bold tracking-tight text-indigo-700 md:text-4xl lg:text-6xl">
                  Get Your Car Shine Like New
                </h1>
                <p className="mt-8 text-lg text-white">
                  Our professional team cares about your car's shine.
                </p>
              </div>
            </div>
          </div>
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
          <div className="mx-auto mt-12 max-w-7xl ">
          <section className="mx-auto max-w-7xl  px-2 py-10 md:px-0">
  <div className=''>
    <div className="mx-auto max-w-2xl lg:text-center">
      <h2 className="text-3xl font-bold leading-tight text-indigo-700 sm:text-4xl lg:text-5xl">
        Frequently Asked Questions
      </h2>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 lg:mx-auto">
        Here are some common questions about our car wash booking system.
      </p>
    </div>
    <div className="mx-auto mt-8 max-w-3xl space-y-4 md:mt-16">
      <div className="cursor-pointer rounded-md border border-gray-400 shadow-lg transition-all duration-200">
        <button
          type="button"
          className="flex w-full items-center justify-between px-4 py-5 sm:p-6"
        >
          <span className="flex text-lg font-semibold text-indigo-700">How do I get started?</span>
          <ChevronUp className="h-5 w-5 text-indigo-600" />
        </button>
        <div className="px-4 pb-5 sm:px-6 sm:pb-6">
          <p className="text-gray-500">
            To get started, simply create an account on our website, choose your preferred car wash service, and book an appointment at a time that suits you.
          </p>
        </div>
      </div>
      <div className="cursor-pointer rounded-md border border-gray-400 shadow-lg transition-all duration-200">
        <button
          type="button"
          className="flex w-full items-center justify-between px-4 py-5 sm:p-6"
        >
          <span className="flex text-lg font-semibold text-indigo-700">
            What payment methods do you accept?
          </span>
          <ChevronDown className="hidden h-5 w-5 text-indigo-600 md:block" />
        </button>
        <div className="hidden px-4 pb-5 sm:px-6 sm:pb-6">
          <p className="text-gray-500">
            We accept various payment methods including credit/debit cards, PayPal, and online banking.
          </p>
        </div>
      </div>
      <div className="cursor-pointer rounded-md border border-gray-400 shadow-lg transition-all duration-200">
        <button
          type="button"
          className="flex w-full items-center justify-between px-4 py-5 sm:p-6"
        >
          <span className="flex text-lg font-semibold text-indigo-700">
            Can I reschedule my booking?
          </span>
          <ChevronDown className="hidden h-5 w-5 text-indigo-600 md:block" />
        </button>
        <div className="hidden px-4 pb-5 sm:px-6 sm:pb-6">
          <p className="text-gray-500">
            Yes, you can reschedule your booking through our website or mobile app. Just go to your account and modify your appointment details.
          </p>
        </div>
      </div>
      <div className="cursor-pointer rounded-md border border-gray-400 shadow-lg transition-all duration-200">
        <button
          type="button"
          className="flex w-full items-center justify-between px-4 py-5 sm:p-6"
        >
          <span className="flex text-lg font-semibold text-indigo-700">
            Do you offer mobile car wash services?
          </span>
          <ChevronDown className="hidden h-5 w-5 text-indigo-600 md:block" />
        </button>
        <div className="hidden px-4 pb-5 sm:px-6 sm:pb-6">
          <p className="text-gray-500">
            Yes, we offer mobile car wash services where our team comes to your location to wash your car.
          </p>
        </div>
      </div>
    </div>
    <p className="textbase mt-6 text-center text-gray-600">
      Can&apos;t find what you&apos;re looking for?{' '}
      <a href="#" title="" className="font-semibold text-indigo-600 hover:underline">
        Contact our support
      </a>
    </p>
  </div>
</section>
  <footer className="px-4 py-10">
    <div className="flex flex-col md:flex-row md:items-center">
      <span>
        {/* Insert your logo SVG here */}
      </span>
      <div className="mt-4 grow md:ml-12 md:mt-0">
        <p className="text-base font-semibold text-gray-700">
          © 2023 Car Wash Booking System
        </p>
      </div>
    </div>
    <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      <div className="mb-8 lg:mb-0">
        <p className="mb-6 text-lg font-semibold text-indigo-700">Company</p>
        <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
          <li>About Us</li>
          <li>Our History</li>
          <li>Our Team</li>
          <li>Our Vision</li>
          <li>Press Releases</li>
        </ul>
      </div>
      <div className="mb-8 lg:mb-0">
        <p className="mb-6 text-lg font-semibold text-indigo-700">Locations</p>
        <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
          <li>California</li>
          <li>New York</li>
          <li>Florida</li>
          <li>Texas</li>
          <li>Illinois</li>
        </ul>
      </div>
      <div className="mb-8 lg:mb-0">
        <p className="mb-6 text-lg font-semibold text-indigo-700">Services</p>
        <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
          <li>Exterior Wash</li>
          <li>Interior Cleaning</li>
          <li>Full Service</li>
          <li>Wax & Polish</li>
          <li>Detailing</li>
        </ul>
      </div>
      <div className="mb-8 lg:mb-0">
        <p className="mb-6 text-lg font-semibold text-indigo-700">Legal</p>
        <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
          <li>Cookie Policy</li>
          <li>Disclaimer</li>
          <li>Media Policy</li>
        </ul>
      </div>
      <div className="mb-8 lg:mb-0">
        <p className="mb-6 text-lg font-semibold text-indigo-700">Social Links</p>
        <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
          <li>Facebook</li>
          <li>Twitter</li>
          <li>Instagram</li>
          <li>LinkedIn</li>
          <li>YouTube</li>
        </ul>
      </div>
    </div>
  </footer>
</div>
        </div>
      </div>

    </main>
  );
}
