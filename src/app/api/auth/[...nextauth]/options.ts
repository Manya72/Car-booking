import type { NextAuthOptions } from "next-auth";
export const options:NextAuthOptions={
    providers:[],
    // pages: {
    //     signIn: '/login',
    //     // signOut: '/auth/signout',
    //     error: '/auth/error', // Error code passed in query string as ?error=
    //     verifyRequest: '/auth/verify-request', // (used for check email message)
    //     newUser: '/signup' // New users will be directed here on first sign in (leave the property out if not of interest)
    //   }
}