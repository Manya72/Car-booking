'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import statement
import axios from 'axios';
import Navbar from '@/app/components/Navbar/Navbar';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false); // Changed React.useState to useState
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const onlogin = async () => {
    const { email, password } = user;
    if (!email || !password) {
      setErrorMessage("All fields are mandatory!!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/users/login", user);
 
      if (response.data.status === 400) {
        setErrorMessage(response.data.error);
        return;
      }
      setTimeout(() => {
        handleResponseData(response);
      }, 500);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const handleResponseData = (data:any) => {
    if(data.data.data.isAdmin===true ){
      router.push("/adminhome")
    }
    else if (data.data.data.userType === "user") {
      router.push("/dashboard");
    } else {                                                      
      router.push("/shopownerdashboard");
    }
  };

  return (
    <main>
      <Navbar />
      <div className="flex justify-center  items-center min-h-screen bg-gray-100">
        <div className="flex w-3/4  bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Left side with background image and welcome message */}
          <div className="relative w-1/2  bg-indigo-600">
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
                  <div style={{ border: "1px solid red", padding: "5px", color: "red" }}>
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
                    onClick={onlogin}
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
    </main>
  );
}
