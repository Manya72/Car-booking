// import { getToken } from 'next-auth/jwt'
import { NextResponse,NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt";
import { verifyAuth } from './app/lib/auth'; 
// import jwt from 'jsonwebtoken';
export async function middleware(request: NextRequest) {
  let token = null;
  let decodedToken=null
  const path=request.nextUrl.pathname
  token=request.cookies.get('token')?.value|| ''
  try {
    if(path==='/dashboard' || path==='/bookslot' ){
      decodedToken = await verifyAuth(token)
      if(decodedToken.userType==='carShopOwner'){
        return NextResponse.redirect(new URL('/shopownerdashboard',request.nextUrl))

      }     
            
      console.log(decodedToken.userType)
    }
    if(path==='/shopownerdashboard' || path==='/addslot' ){
  
      
      decodedToken = await verifyAuth(token)
      if(decodedToken.userType==='user'){
        return NextResponse.redirect(new URL('/dashboard',request.nextUrl))

      }     
            
      console.log(decodedToken.userType)
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
      return NextResponse.redirect(new URL('/dashboard',request.nextUrl))
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
  '/profile'
]
}