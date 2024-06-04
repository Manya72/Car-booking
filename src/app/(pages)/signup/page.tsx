'use client'
import Navbar from '../../components/Navbar/Navbar';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation"; 


import axios from 'axios'; 
import toast from 'react-hot-toast';

export default function Signup() { 
  const router=useRouter()



  const [user, setuser] = React.useState({
    email: "",
    password: "",
    username: "",
    userType: 'user',
  });
  
  const[buttonDisabled,setButtonDisabled]=React.useState(false)
  const[loading,setloading]=React.useState(false)
  const [signupSuccess, setSignupSuccess] = React.useState(false);  
  const [signupFail, setSignupFail] = React.useState(false);
  const[errorMessage,setErrorMessage]=useState("")
  const onSignup = async () => {
    const { email, password, username, userType } = user;
    if (!email || !password || !username || !userType) {
        setErrorMessage("All fields are mandatory!!");
        return;
    }
    try {
                                                                                                               
      const response=await axios.post('/api/users/signup',user)
      if(response.data.message=="User already exists"){
        console.log("this is the errorr")
        setSignupFail(true)
        return 

      }
  
      setSignupSuccess(true)
    } 
    catch (error) {
      console.log("signup failed")
      
    }   
   

    
  };

  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 && user.username.length>0){
      setButtonDisabled(false)
      
    }
    else{
      setButtonDisabled(true)
    }
 

  },[user])
 
  useEffect(() => {
    if (signupSuccess) {
      console.log("heyy")
      router.push("/login"); 
    }
  }, [signupSuccess, router]);
  useEffect(() => {
    if (signupSuccess) {
      console.log("heyy")
      
    }
  }, [signupFail, router]);
  return (
    <main >
      <Navbar />
      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-20'>
          <form>
            <h4 className='text-2xl mb-7'>
              Signup
            </h4>
            <div className="mb-4">
              <label htmlFor='username'>UserName</label>
              <input
                id='username'
                className="p-0.5 border border-gray-300 rounded-md placeholder-gray-500 text-base w-full" type='text' placeholder='UserName'
                value={user.username}
                onChange={(e) => setuser({ ...user, username: e.target.value })} autoComplete="username"
              />
            </div>
            <div className="mb-4">
              <label htmlFor='email'>Email</label>
              <input id='email' type='text' placeholder='Email' className='p-0.5 border border-gray-300 rounded-md placeholder-gray-500 text-base w-full'
                value={user.email}
                onChange={(e) => setuser({ ...user, email: e.target.value }) } autoComplete="email"
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
              <label htmlFor='password'>Password</label>
              <input id='password' type='password' placeholder='Password' className='p-0.5 border border-gray-300 rounded-md placeholder-gray-500 text-base w-full'
                value={user.password}
                onChange={(e) => setuser({ ...user, password: e.target.value })} autoComplete="new-password"
              />
            </div>
            <div className="flex justify-center mt-5">
              <button type='button' onClick={onSignup}   className={`bg-indigo-600 hover:bg-indigo-500 text-gray-50 font-bold py-2 px-4 rounded ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {buttonDisabled?"No signup" : "Signup"}
              </button>
            </div>
            {errorMessage && (
                        <div className="mb-4 text-red-600 font-semibold">
                            {errorMessage}
                        </div>
                    )}
            <p className='text-sm text-center mt-4'>
              Already Registered ?
              <Link href="/login"
               className='font-medium text-primary underline'>Login
              </Link>
            </p>
            <p>
              {signupFail?'User Already exists':''}
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}