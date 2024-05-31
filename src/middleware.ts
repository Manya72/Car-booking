import { NextResponse,NextRequest } from 'next/server'

 import axios from 'axios';
export async function middleware(request: NextRequest) {
    const path=request.nextUrl.pathname
    const isPublicPath=path==='/login' || path=== '/signup'
    const userpaths=path==='/dashboard' || path==='/shopownerdashboard' 
    const ownerpaths=path==='/addslot' || path==='/bookslot'
    
    const token=request.cookies.get('token')?.value|| ''
  console.log("this is token")
  console.log(isPublicPath)
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/dashboard',request.nextUrl))
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login',request.nextUrl))
    }
    
       console.log( request.cookies.get('token')?.value)
      

    // }
    // const data=jwt.verify(token,process.env.TOKEN_SECRET!)
    // console.log("this is token",data)
//   return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/dashboard',
    '/shopownerdashboard'
  ]
}