'use client'

import React from 'react'
import { Menu, X, MapPin } from 'lucide-react'
import NavBar from '@/app/components/Navbar/Navbar'
const menuItems = [
  {
    name: 'Home',
    href: '#',
  },
  {
    name: 'About',
    href: '#',
  },
  {
    name: 'Contact',
    href: '#',
  },
]

const locations = [
  {
    title: 'Bengaluru Office',
    timings: 'Mon-Sat 9am to 5pm.',
    address: '100, Electronic City Phase-1, Bengaluru, Karnataka 560100 IN',
  },
  {
    title: 'Head Office',
    timings: 'Mon-Sat 9am to 5pm.',
    address: '12th Main Rd, Indiranagar, Bengaluru, Karnataka 560008 IN',
  },
  {
    title: 'Karnataka Office',
    timings: 'Mon-Sat 9am to 5pm.',
    address: '42, Residency Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560025 IN',
  },
]

export default function AboutPageOne() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div>
  <NavBar/>
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-bold text-indigo-700">About CarWashPro</h2>
          <p className="mt-4 ">
            Welcome to CarWashPro, your premier destination for all your car wash needs. Our mission is to provide top-notch car wash services with the convenience of online booking. With CarWashPro, you can easily schedule your car wash, choose from a variety of services, and visit our locations at your convenience.
          </p>
          <p className="mt-4">
            Our state-of-the-art facilities and experienced staff ensure that your car receives the best care possible. Whether you need a quick wash or a detailed cleaning, CarWashPro is here to make your car look its best.
          </p>
          <p className="mt-4">
            Thank you for choosing CarWashPro. We look forward to serving you!
          </p>
        </div>
      </section>
     
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          {/* <h2 className="text-2xl font-bold">Our Locations</h2> */}
          {/* <div className="mt-8 space-y-8">
            {locations.map((location) => (
              <div key={location.title}>
                <MapPin className="mt-1 text-gray-500" />
                <div>
                  <h3 className="text-lg font-medium">{location.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{location.timings}</p>
                  <p className="mt-1 text-sm">{location.address}</p>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </section>
    </div>
  )
}
``
