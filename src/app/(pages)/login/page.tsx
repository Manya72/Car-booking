'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import statement
import axios from 'axios';
import Navbar from '@/app/components/Navbar/Navbar';
import { signIn } from 'next-auth/react';

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
      console.log("response fromPOST login",response)
      if (response.data.status === 400) {
        setErrorMessage("Incorrect login credentials i.e. userHandle/email or password!");
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
      <div className="flex flex-col items-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-20">
          
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
            <p className="text-sm  mt-4">
          
            <Link href="/resetpassword" className="font-medium text-primary underline">
             Forgot Password
            </Link>
          </p>
            </div>

            <div className=" flex justify-center mt-5">
              <button
                type="button"
                onClick={onlogin}
                className={`bg-indigo-600  w-full hover:bg-indigo-500 text-gray-50 font-bold py-2 px-4 rounded ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
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
    </main>
  );
}
