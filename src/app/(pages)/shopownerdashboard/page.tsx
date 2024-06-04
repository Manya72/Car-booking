'use client'
import React, { useEffect, useState } from 'react';
import NavbarOwner from '../../components/Navbar/NavbarOwner';
import moment from 'moment';
import axios from 'axios'


export default function ownerdashboard() {

  

  return (
    <main>
<NavbarOwner/>
    <br></br>
    <br></br>
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold mb-4 text-center">Your current Orders</h1>
{/* 
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.length > 0 ? (
          users.map((user, index) => (
            <div key={index} className="bg-white p-1 rounded-md shadow-md">
              <p >CarType: {user.carType}</p>
              <p>Service Date: {moment(user.date).format('MMMM Do YYYY')}</p>
              <p>Time: {user.time}</p>
              <p>Car Shop Owner: {user.carShopOwner}</p>
             
            </div>
          ))
        ) : (
          <p>No user data available</p>
        )}
      </div> */}
    </div>
    </main>
  );
}

