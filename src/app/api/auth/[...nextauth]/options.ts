// import type { AuthOptions, NextAuthOptions } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import Email from "next-auth/providers/email";
// export const authoptions:AuthOptions={
//     pages:{
//         signIn:'/login'
//     },
//     providers:[
//         Credentials({
//             name:"Next Auth",
//             credentials:{
//                 email:{
//                     label:"Email",
//                     type:"email",
//                     placeholder:"Enter your Email"
//                 },
//                 password:{
//                     label:"Password",
//                     type:"password"
//                 }
//             }
//             ,
//             async authorize(credentials, req) {
//                 const user = { id: "1", name: "J Smith", email:credentials?.email }

//                 if (user) {
//                   // Any object returned will be saved in `user` property of the JWT
//                   return user
//                 } else {
//                   // If you return null then an error will be displayed advising the user to check their details.
//                   return null
          
//                   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//                 }
//             },
//         })
//     ],
//     // pages: {
//     //     signIn: '/login',
//     //     // signOut: '/auth/signout',
//     //     error: '/auth/error', // Error code passed in query string as ?error=
//     //     verifyRequest: '/auth/verify-request', // (used for check email message)
//     //     newUser: '/signup' // New users will be directed here on first sign in (leave the property out if not of interest)
//     //   }
// }