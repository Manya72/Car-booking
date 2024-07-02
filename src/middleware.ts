// import { getToken } from 'next-auth/jwt'
import { NextResponse,NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt";
import { verifyAuth } from './app/lib/auth'; 



// import jwt from 'jsonwebtoken';
export async function middleware(request: NextRequest) {
  



console.log('Cron job scheduled to run daily at 12:00 AM.');

  let token = null;
  let decodedToken=null
  const path=request.nextUrl.pathname
  token=request.cookies.get('token')?.value|| ''
  try {
    
    if(path==='/dashboard' || path==='/bookslot' || path==='/users' || path==='/adminhome' ||
      path==='/bookings' || path==='/userdashboard' ){
      decodedToken = await verifyAuth(token)
      if(decodedToken.userType==='carShopOwner'){
        return NextResponse.redirect(new URL('/Ownerhome',request.nextUrl))

      }     
   
    }
    if(path==='/shopownerdashboard' || path==='/addslot' || path==='/users' || path==='/adminhome' ||
      path==='/bookings' || path==='/Ownerhome'
    ){
  
      
      decodedToken = await verifyAuth(token)
      if(decodedToken.userType==='user'){
        return NextResponse.redirect(new URL('/dashboard',request.nextUrl))

      }     
  
    }

    if(path==='/shopownerdashboard' || path==='/addslot' || path==='/dashboard' || path==='/bookslot' || path==='/bookslot'
      || path==='/userdashboard' || path==='/Ownerhome'
     
    ){
  
      
      decodedToken = await verifyAuth(token)
      if(decodedToken.userType==='admin'){
        return NextResponse.redirect(new URL('/adminhome',request.nextUrl))

      }     
  
    }
    token=request.cookies.get('token')?.value|| ''
    
    
  } catch (error) {
    console.error('Failed to decode token:', error);
    // Token verification failed, handle unauthorized access
    console.log("Token verification failed. Redirecting to login page.");
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }


 
  const isPublicPath=path==='/login' || path=== '/signup'
  const userpaths=path==='/dashboard' || path==='/shopownerdashboard' 
  const ownerpaths=path==='/addslot' || path==='/bookslot'
  const home=path==='/'
  //  token=request.cookies.get('token')?.value|| ''

if(home){
  return
} 

  if(isPublicPath && token){
    decodedToken = await verifyAuth(token)
    if(decodedToken.userType==='user'){
      return NextResponse.redirect(new URL('/dashboard',request.nextUrl))

    }  
    if(decodedToken.userType==='carShopOwner'){
      return NextResponse.redirect(new URL('/dashboard',request.nextUrl))

    }  
    if(decodedToken.userType==="admin"){
      return NextResponse.redirect(new URL('/adminhome',request.nextUrl))

    }
      return NextResponse.redirect(new URL('/shopownerdashboard',request.nextUrl))
  }
  if(!isPublicPath && !token){
      return NextResponse.redirect(new URL('/login',request.nextUrl))
  }
 
}

export const config = {
matcher: [
  '/',
  '/login',
  '/signup',
  '/dashboard',
  '/shopownerdashboard',
  '/bookslot',
  '/addslot',
  '/profile',
  '/adminhome',
  '/users',
  '/bookings',
  '/userdashboard',
  '/Ownerhome'
]
}