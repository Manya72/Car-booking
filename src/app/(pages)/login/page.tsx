'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import statement for useRouter
import axios from 'axios';
import Navbar from '@/app/components/Navbar/Navbar';
import Image from 'next/image';
import {validate} from 'email-validator'
export default function Login() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const isValidEmailFormat = (email:any) => {
    return validate(email);
  };
  const onLogin = async () => {
    const { email, password } = user;
    if (!email || !password) {
      setErrorMessage("All fields are mandatory!!");
      return;
    }
    if (!isValidEmailFormat(email)) {
      setErrorMessage("Invalid email format. Please enter a valid email.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/users/login", user);
      if (response.data.error === "User is not verified") {
        setErrorMessage(response.data.error);
        setShowOtpInput(true);
      } else {
        handleResponseData(response);
      }
    } catch (error) {
      console.log("Login error:", error);
      setErrorMessage("Login failed. Please try again.");
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onVerifyOtp = async () => {
    try {
      const response = await axios.post('/api/users/verify-otp', { email: user.email, otp });
      if (response.data.success) {
        setVerified(true);
        onLogin(); // Proceed with login after OTP verification
      } else {
        setErrorMessage(response.data.message || "OTP verification failed.");
      }
    } catch (error) {
      console.log("OTP verification error:", error);
      setErrorMessage("OTP verification failed. Please try again.");
    }
  };

  const handleResponseData = (data:any) => {
    const userType = data.data.data.userType;
    if (userType === "admin") {
      router.push("/adminhome");
    } else if (userType === "user") {
      router.push("/userdashboard");
    } else {
      router.push("/Ownerhome");
    }
  };

  return (
    <main>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="flex w-3/4 bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Left side with background image and welcome message */}
          <div className="relative w-1/2 bg-indigo-600">
            <Image
              src="/login.jpg" // Replace with the path to your background image
              alt=""
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              quality={100}
              className="opacity-70"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-8">
              <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
              <p className="text-lg">Log in to access your account and start exploring.</p>
            </div>
          </div>
          {/* Right side with login form */}
          <div className="w-1/2 flex flex-col justify-center items-center p-8">
            <div className="w-full max-w-md">
              <form>
                <h4 className="text-2xl mb-7">Login</h4>
                {errorMessage && (
                  <div style={{ border: "1px solid red", padding: "5px", color: "red", marginBottom: "10px" }}>
                    {errorMessage}
                  </div>
                )}
                <div className="mb-4">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="text"
                    placeholder="Email"
                    className="p-0.5 border border-gray-300 rounded-md placeholder-gray-500 text-base w-full"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="p-0.5 border border-gray-300 rounded-md placeholder-gray-500 text-base w-full"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                  />
                  <p className="text-sm mt-4">
                    <Link href="/resetpassword" className="font-medium text-primary underline">
                      Forgot Password
                    </Link>
                  </p>
                </div>
                <div className="flex justify-center mt-5">
                  <button
                    type="button"
                    onClick={onLogin}
                    className={`bg-indigo-600 w-full hover:bg-indigo-500 text-gray-50 font-bold py-2 px-4 rounded ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </div>
              </form>
              <p className="text-sm text-center mt-4">
                Not Registered?{" "}
                <Link href="/signup" className="font-medium text-primary underline">
                  Create an Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      {showOtpInput && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <h4 className="text-2xl mb-4">Verify OTP</h4>
            {errorMessage && (
              <div style={{ border: "1px solid red", padding: "5px", color: "red", marginBottom: "10px" }}>
                {errorMessage}
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="otp">Enter the OTP sent to your mail</label>
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
        </div>
      )}
    </main>
  );
}
