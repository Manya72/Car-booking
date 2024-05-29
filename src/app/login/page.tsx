'use client'
import Navbar from '../components/Navbar/Navbar';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios'
export default  function login() {
  const router=useRouter()
  const[buttonDisabled,setButtonDisabled]=React.useState(false)
  const [signupSuccess, setSignupSuccess] = React.useState(false);
  const[user,setuser]=React.useState({
    email:"",
    password:""
  })
  const onlogin=async ()=>{
    setSignupSuccess(true)
    try {
      
      const response=await axios.post("/api/users/login",user)
      
      setSignupSuccess(true)
      
      
    } catch (error:any) {
      console.log("error",error)
      
    }
    

  }
  
  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 ){
    
      setButtonDisabled(false)
      
    }
    else{
      setButtonDisabled(true)
    }
 

  },[user])

  useEffect(() => {
    if (signupSuccess) {
      console.log("heyy")
      router.push("/profile"); 
    }
  }, [signupSuccess, router]);


    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-14">
  <Navbar />
  <div className='flex flex-col items-center mt-28'>
    <div className='w-96 border rounded bg-white px-7 py-20'>
      <form>
        <h4 className='text-2xl mb-7'>
          Login
        </h4>

        <div className="mb-4">
          <label htmlFor='email'>Email</label>
          <input id='email' type='text' placeholder='Email' className='p-0.5 border border-gray-300 rounded-md placeholder-gray-500 text-base w-full'
            value={user.email}
            onChange={(e) => setuser({ ...user, email: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' placeholder='Password' className='p-0.5 border border-gray-300 rounded-md placeholder-gray-500 text-base w-full'
            value={user.password}
            onChange={(e) => setuser({ ...user, password: e.target.value })}
          />
        </div>

        <div className="flex justify-center mt-5">
            
          <button type='button' onClick={onlogin}  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' >
          {buttonDisabled?"no login" :"login"}
          </button>
        </div>
      </form>
  
  
             
              <p className='text-sm text-center mt-4'>
                   Not Registered ?{""} 
                   <Link href="/signup" 
               className='font-medium text-primary underline'>Create and Account</Link> 
                   </p>
                   
              {/* <Link to="/signup" 
               className='font-medium text-primary underline'>Create an Account</Link> </p> */}
  
  </div>
  </div>
  
   
      </main>
    );
  }
  
  