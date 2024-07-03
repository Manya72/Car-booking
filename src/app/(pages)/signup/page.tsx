'use client';
import Navbar from '../../components/Navbar/Navbar';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import Image from 'next/image';
import { validate } from 'email-validator';
export default function Signup() {
  const router = useRouter();
  const [user, setuser] = React.useState({
    email: "",
    password: "",
    username: "",
    userType: 'user',
    password_confirmation: "",
    ShopName:"",
    Address:"",
    Contact:"",
    // OwnerId:"",
    hours:""
  });

  const [otp, setOtp] = React.useState("");
  const [showOtpInput, setShowOtpInput] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const [signupSuccess, setSignupSuccess] = React.useState(false);
  const [signupFail, setSignupFail] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isValidEmailFormat = (email:any) => {
    return validate(email);
  };
  const onSignup = async () => {
    if (user.password !== user.password_confirmation) {
      setErrorMessage("Passwords do not match");
      return;
    }
    const { email, password, username, userType } = user;
    if (!email || !password || !username || !userType) {
      setErrorMessage("All fields are mandatory!!");
      return;
    }
    if (!isValidEmailFormat(email)) {
      setErrorMessage("Invalid email format. Please enter a valid email.");
      return;
    }
    try {
      const response = await axios.post('/api/users/signup', user);
      console.log("response from the signupppp route.ts",response)
      if (response.data.success) {
        setShowOtpInput(true);
        console.log("sudshvhsvffvJfs")
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.log("signup failed", error);
      setErrorMessage("Signup failed");
    }
  };

  const onVerifyOtp = async () => {
    try {
      const response = await axios.post('/api/users/verify-otp', { email: user.email, otp });
      console.log("this is the response from the api of otp",response.data.status)
      if (response.data.success) {
        setSignupSuccess(true);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.log("OTP verification failed", error);
      setErrorMessage("OTP verification failed");
    }
  };

  useEffect(() => {
    if (signupSuccess) {
      router.push("/login");
    }
  }, [signupSuccess, router]);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <main>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-100 mt-10 mb-10">
        <div className="flex w-3/4 bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Left side with background image and welcome message */}
          <div className="relative w-1/2 bg-indigo-600">
            <Image
              src="/login.jpg" // Replace with the path to your background image
              alt="Background Image"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              quality={100}
              className="opacity-70"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-8">
              <h2 className="text-4xl font-bold mb-4">Welcome!</h2>
              <p className="text-lg">Create an account to get started.</p>
            </div>
          </div>
          {/* Right side with signup form */}
          <div className="w-1/2 flex flex-col justify-center items-center p-8">
            <div className="w-full max-w-md">
              <form>
                <h4 className="text-2xl mb-7">Signup</h4>
                <div className="mb-4">
                  <label htmlFor="username">UserName</label>
                  <input
                    id="username"
                    className="p-0.5 border border-gray-300 rounded-md placeholder-gray-500 text-base w-full"
                    type="text"
                    placeholder="UserName"
                    value={user.username}
                    onChange={(e) => setuser({ ...user, username: e.target.value })}
                    autoComplete="username"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="text"
                    placeholder="Email"
                    className="p-0.5 border border-gray-300 rounded-md placeholder-gray-500 text-base w-full"
                    value={user.email}
                    onChange={(e) => setuser({ ...user, email: e.target.value })}
                    autoComplete="email"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="userType">User Type</label>
                  <select
                    id="userType"
                    className="p-0.5 border border-gray-300 rounded-md placeholder-gray-500 text-base w-full"
                    value={user.userType}
                    onChange={(e) => setuser({ ...user, userType: e.target.value })}
                  >
                    <option value="user">User</option>
                    <option value="carShopOwner">Car Shop Owner</option>
                  </select>
                </div>
                <div className="mb-4">
                      <label htmlFor="Contact">Contact</label>
                      <input
                        id="Contact"
                        type="text"
                        placeholder="Contact"
                        className="p-0.5 border border-gray-300 rounded-md placeholder-gray-500 text-base w-full"
                        value={user.Contact}
                        onChange={(e) => setuser({ ...user, Contact: e.target.value })}
                      />
                    </div>
                {user.userType==='carShopOwner' &&
                (
                  <>
                  <div className="mb-4">
                      <label htmlFor="shopName">Shop Name</label>
                      <input
                        id="shopName"
                        type="text"
                        placeholder="Shop Name"
                        className="p-0.5 border border-gray-300 rounded-md placeholder-gray-500 text-base w-full"
                        value={user.ShopName}
                        onChange={(e) => setuser({ ...user, ShopName: e.target.value })}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="Address">Address</label>
                      <input
                        id="Address"
                        type="text"
                        placeholder="Address"
                        className="p-0.5 border border-gray-300 rounded-md placeholder-gray-500 text-base w-full"
                        value={user.Address}
                        onChange={(e) => setuser({ ...user, Address: e.target.value })}
                      />
                    </div>
                 
                    {/* <div className="mb-4">
                      <label htmlFor="OwnerId">Owner-Id</label>
                      <input
                        id="OwnerId"
                        type="text"
                        placeholder="OwnerId"
                        className="p-0.5 border border-gray-300 rounded-md placeholder-gray-500 text-base w-full"
                        value={user.OwnerId}
                        onChange={(e) => setuser({ ...user, OwnerId: e.target.value })}
                      />
                    </div> */}
                    <div className="mb-4">
                      <label htmlFor="hours">Working hours</label>
                      <input
                        id="hours"
                        type="text"
                        placeholder="Working-Hours"
                        className="p-0.5 border border-gray-300 rounded-md placeholder-gray-500 text-base w-full"
                        value={user.hours}
                        onChange={(e) => setuser({ ...user, hours: e.target.value })}
                      />
                    </div>
                    {user.hours &&(
<>
                      
</>
                    )}
                  </>
                )}
                <div className="mb-4">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="p-0.5 border border-gray-300 rounded-md placeholder-gray-500 text-base w-full"
                    value={user.password}
                    onChange={(e) => setuser({ ...user, password: e.target.value })}
                    autoComplete="new-password"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="confirmpassword">Confirm Password</label>
                  <input
                    id="confirmpassword"
                    type="password"
                    placeholder="Password"
                    className="p-0.5 border border-gray-300 rounded-md placeholder-gray-500 text-base w-full"
                    value={user.password_confirmation}
                    onChange={(e) => setuser({ ...user, password_confirmation: e.target.value })}
                    autoComplete="new-password"
                  />
                </div>
                {errorMessage && (
                  <div className="mb-4 text-red-600 font-semibold">
                    {errorMessage}
                  </div>
                )}
                <div className="flex justify-center mt-5">
                  <button
                    type="button"
                    onClick={onSignup}
                    className={`bg-indigo-600 w-full hover:bg-indigo-500 text-gray-50 font-bold py-2 px-4 rounded ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {buttonDisabled ? "No signup" : "Signup"}
                  </button>
                </div>
                <p className="text-sm text-center mt-4">
                  Already Registered?{" "}
                  <Link href="/login" className="font-medium text-primary underline">Login</Link>
                </p>
              </form>
              {showOtpInput && (
                <div className="mt-6">
                  <h4 className="text-2xl mb-4">Verify OTP</h4>
                  <div className="mb-4">
                    <label htmlFor="otp">OTP</label>
                    <input
                      id="otp"
                      type="text"
                      placeholder="Enter OTP"
                      className="p-0.5 border border-gray-300 rounded-md placeholder-gray-500 text-base w-full"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-center mt-5">
                    <button
                      type="button"
                      onClick={onVerifyOtp}
                      className={`bg-indigo-600 w-full hover:bg-indigo-500 text-gray-50 font-bold py-2 px-4 rounded ${!otp ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      Verify OTP
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
