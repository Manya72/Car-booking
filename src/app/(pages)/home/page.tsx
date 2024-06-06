'use client'

import React from 'react'
import { CheckCircle, ChevronDown, ChevronUp, Menu, Star, X } from 'lucide-react'

const menuItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'About',
    href: '#',
  },
  {
    name: 'Contact',
    href: '#',
  },
  {
    name: 'Blogs',
    href: '#',
  },
]

export default function LandinngPageOne() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="w-full">
    <header className="relative w-full border-b bg-white pb-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        <div className="inline-flex items-center space-x-2">
          <span>
            {/* Replace with your car wash logo SVG */}
            <img src="final.jpeg" alt="Car Wash Logo" className="h-8 w-8" />
          </span>
          <span className="font-bold"></span>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            {/* Update menu items as per your system */}
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/book-appointment">Contact</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>
        <div className="hidden lg:block">
          <button
            type="button"
            className="rounded-md bg-indigo-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
           Login/Signup
          </button>
        </div>
        <div className="lg:hidden">
          {/* Replace with your mobile menu toggle */}
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            {/* Mobile menu content */}
            {/* Update menu items as per your system */}
            <nav className="grid gap-y-4">
              <a href="/" className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50">Home</a>
              <a href="/services" className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50">Services</a>
              <a href="/book-appointment" className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50">Book Appointment</a>
              <a href="/about" className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50">About Us</a>
            </nav>
            {/* Button for mobile */}
            <button
              type="button"
              className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Book Now
            </button>
          </div>
        )}
      </div>
    </header>
 
  
      {/* Hero Section */}
      <div className="relative w-full bg-white">
  <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
    <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
      <div className="mt-8 flex max-w-max items-center space-x-2 rounded-full bg-indigo-100 p-1">
        <div className="rounded-full bg-white p-1 px-2">
          <p className="text-sm font-medium text-indigo-800">Book your next wash now!</p>
        </div>
        <p className="text-sm font-medium text-indigo-800">Drive in for a sparkling car &rarr;</p>
      </div>
      <h1 className="mt-8 text-3xl font-bold tracking-tight text-indigo-900 md:text-4xl lg:text-6xl">
        Get Your Car Shine Like New
      </h1>
      <p className="mt-8 text-lg text-gray-700">
        Our professional team cares about your car's shine.
      </p>
      {/* Form for email subscription */}
      <form action="" className="mt-8 flex items-start space-x-2">
        <div>
          <input
            className="flex w-full rounded-md border border-indigo-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-300 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="email"
            placeholder="Enter your email"
            id="email"
          ></input>
          <p className="mt-2 text-sm text-gray-500">We'll keep you updated about our latest offers!</p>
        </div>
        <div>
          <button
            type="button"
            className="rounded-md bg-indigo-400 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Subscribe
          </button>
        </div>
      </form>
    </div>
    {/* Image section */}
    <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6">
      <img
        className="aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] lg:h-[450px] xl:aspect-[4/3] xl:h-[600px]"
        src="medium.jpeg"
        alt="Car Wash"
      />
    </div>
  </div>
</div>


     {/* Features Section */}
<div className="mx-auto my-32 max-w-7xl px-2 lg:px-8">
  <div className="grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
    <div>
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
      
        <svg
          className="h-9 w-9 text-indigo-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 16"
          stroke="currentColor"
        >
          <path
            // strokeLinecap="round"
            // strokeLinejoin="round"
            strokeWidth="1"
            d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"
            // d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5"
          />
          <path   d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"></path>
        </svg>
      </div>
      <h3 className="mt-8 text-lg font-semibold text-black">Convenient Booking</h3>
      <p className="mt-4 text-sm text-gray-600">
        Easily book your car wash appointments online at your convenience.
      </p>
    </div>
    <div>
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
        <svg
          className="h-9 w-9 text-indigo-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>
      <h3 className="mt-8 text-lg font-semibold text-black">Efficient Service</h3>
      <p className="mt-4 text-sm text-gray-600">
        Experience fast and efficient car wash services to get back on the road quickly.
      </p>
    </div>
    <div>
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
        <svg
          className="h-9 w-9 text-indigo-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 16"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"
          />
        </svg>
      </div>
      <h3 className="mt-8 text-lg font-semibold text-black">Professional Staff</h3>
      <p className="mt-4 text-sm text-gray-600">
        Our experienced team ensures your car receives the best care and attention.
      </p>
    </div>
    <div>
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
        <svg
          className="h-9 w-9 text-indigo-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
      </div>
      <h3 className="mt-8 text-lg font-semibold text-black">Quality Results</h3>
      <p className="mt-4 text-sm text-gray-600">
        We guarantee exceptional results, leaving your car looking clean and shiny every time.
      </p>
    </div>
  </div>
</div>

{/* FAQs */}
<section className="mx-auto max-w-7xl bg-gray-50 px-2 py-10 md:px-0">
  <div>
    <div className="mx-auto max-w-2xl lg:text-center">
      <h2 className="text-3xl font-bold leading-tight text-indigo-900 sm:text-4xl lg:text-5xl">
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
          <span className="flex text-lg font-semibold text-indigo-900">How do I get started?</span>
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
          <span className="flex text-lg font-semibold text-indigo-900">
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
          <span className="flex text-lg font-semibold text-indigo-900">
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
          <span className="flex text-lg font-semibold text-indigo-900">
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


{/* Pricing Section */}
<div className="mx-auto my-12 max-w-7xl md:my-24 lg:my-32">
  <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
    <div className="px-4 py-10 lg:col-span-5 lg:px-0">
      <span className="mb-8 inline-block rounded-full border p-1 px-3 text-xs font-semibold text-indigo-600">
        Pricing that fits your budget
      </span>
      <h1 className="text-3xl font-bold md:text-5xl text-indigo-900">
        Choose the best plan for your car wash needs
      </h1>
      <p className="mt-8 font-medium text-gray-700">
        We offer a variety of plans to suit your requirements, whether you need a one-time wash or regular maintenance.
      </p>
      <div className="mt-8 flex w-full max-w-sm items-center space-x-2">
        <input
          className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="email"
          placeholder="Email"
        ></input>
        <button
          type="button"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo"
        >
          Subscribe
        </button>
      </div>
    </div>
    <div className="flex flex-col items-center justify-center md:flex-row lg:col-span-7">
      <div className="w-full p-5 md:w-1/2">
        <div className="rounded-md border bg-white bg-opacity-90">
          <div className="border-b">
            <div className="px-9 py-7">
              <h3 className="mb-3 text-xl font-bold leading-snug text-indigo-900">Basic Wash</h3>
              <p className="font-medium leading-relaxed text-gray-700">
                Perfect for a quick and thorough clean.
              </p>
            </div>
          </div>
          <div className="px-9 pb-9 pt-8">
            <p className="mb-6 font-medium leading-relaxed text-gray-700">
              Features included:
            </p>
            <ul className="mb-11">
              <li className="mb-4 flex items-center">
                <CheckCircle className="mr-2" size={16} />
                <p className="font-semibold leading-normal text-gray-700">Exterior Wash</p>
              </li>
              <li className="mb-4 flex items-center">
                <CheckCircle className="mr-2" size={16} />
                <p className="font-semibold leading-normal text-gray-700">Interior Vacuum</p>
              </li>
              <li className="mb-4 flex items-center">
                <CheckCircle className="mr-2" size={16} />
                <p className="font-semibold leading-normal text-gray-700">Wheel Cleaning</p>
              </li>
            </ul>
            <p className="mb-6 text-lg font-semibold leading-normal text-gray-700">
              <span>Starting from</span>
              <span className="ml-2 text-gray-900">$19.99</span>
            </p>
            <div className="md:inline-block">
              <button
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-5 md:w-1/2">
        <div className="rounded-md border bg-white bg-opacity-90">
          <div className="border-b">
            <div className="px-9 py-7">
              <h3 className="mb-3 text-xl font-bold leading-snug text-indigo-900">Premium Wash</h3>
              <p className="font-medium leading-relaxed text-gray-700">
                Comprehensive cleaning with added benefits.
              </p>
            </div>
          </div>
          <div className="px-9 pb-9 pt-8">
            <p className="mb-6 font-medium leading-relaxed text-gray-700">
              Features included:
            </p>
            <ul className="mb-11">
              <li className="mb-4 flex items-center">
                <CheckCircle className="mr-2" size={16} />
                <p className="font-semibold leading-normal text-gray-700">Exterior Wash</p>
              </li>
              <li className="mb-4 flex items-center">
                <CheckCircle className="mr-2" size={16} />
                <p className="font-semibold leading-normal text-gray-700">Interior Vacuum</p>
              </li>
              <li className="mb-4 flex items-center">
                <CheckCircle className="mr-2" size={16} />
                <p className="font-semibold leading-normal text-gray-700">Wheel Cleaning</p>
              </li>
              <li className="mb-4 flex items-center">
                <CheckCircle className="mr-2" size={16} />
                <p className="font-semibold leading-normal text-gray-700">Wax & Polish</p>
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2" size={16} />
                <p className="font-semibold leading-normal text-gray-700">Tire Shine</p>
              </li>
            </ul>
            <p className="mb-6 text-lg font-semibold leading-normal text-gray-700">
              <span>Starting from</span>
              <span className="ml-2 text-gray-900">$49.99</span>
            </p>
            <div className="md:inline-block">
              <button
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



{/* Footer */}
<div className="mx-auto mt-12 max-w-7xl">
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
  )
}
