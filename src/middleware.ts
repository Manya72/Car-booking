// middleware.ts

import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from './app/lib/auth';


export async function middleware(request: NextRequest) {
    let token = request.cookies.get('token')?.value || '';
    const path = request.nextUrl.pathname;

    try {
        // Verify token and decode user information
        const decodedToken = await verifyAuth(token);

        // Handle specific paths and user types
        switch (path) {
            // Dashboard paths for different user types
            case '/dashboard':
            case '/bookslot':
            case '/users':
            case '/adminhome':
            case '/bookings':
            case '/userdashboard':
                if (decodedToken.userType === 'carShopOwner') {
                    return NextResponse.redirect(new URL('/shopownerdashboard', request.nextUrl));
                }
                break;

            // Shop owner dashboard and related paths
            case '/shopownerdashboard':
            case '/addslot':
                if (decodedToken.userType === 'user') {
                    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
                }
                break;

            // Admin dashboard and related paths
            case '/adminhome':
                if (decodedToken.userType === 'admin') {
                    return NextResponse.redirect(new URL('/adminhome', request.nextUrl));
                }
                break;

            default:
                break;
        }
    } catch (error) {
        console.error('Failed to decode token:', error);
        // Token verification failed, handle unauthorized access
        console.log("Token verification failed. Redirecting to login page.");
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    // Handle public paths and redirections
    const isPublicPath = path === '/login' || path === '/signup';

    if (isPublicPath && token) {
        // Redirect authenticated users to appropriate dashboard based on userType
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl)); // Default redirect for authenticated users
    }

    if (!isPublicPath && !token) {
        // Redirect unauthenticated users to login page for protected paths
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    // Allow access to public paths without token
    if (isPublicPath) {
        return;
    }
}

// Configuration defining paths to apply middleware
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
        '/userdashboard'
    ]
};
