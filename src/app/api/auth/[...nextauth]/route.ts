// import NextAuth, { NextAuthOptions } from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import { NextRequest } from 'next/server';
// import axios from 'axios';

// // Configure NextAuth options
// const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || '',
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
//     }),
//   ],
//   pages: {
//     signIn: '/login',
//   },
//   callbacks: {
//     async signIn({ user, email }) {
//       console.log("data from the sign-in callback", user);
//       return true;
//       // Example logic to handle user sign-in
//     //   try {
//     //     const response = await axios.post(
//     //       "http://localhost:3000/api/users/login",
//     //       { email: email }
//     //     );
//     //     if (response && response.data?.value === true) {
//     //       return true;
//     //     } else {
//     //       const data = { email: email };
//     //       // If needed, add the user creation logic here
//     //       // await axios.post("http://localhost:9000/v1/auth/signup", data);
//     //       return true;
//     //     }
//     //   } catch (error) {
//     //     console.error("Error during sign-in callback", error);
//     //     return false;
//     //   }
//     },
//   },
// //   secret: process.env.JWT_SECRET,
// };

// // Create the NextAuth handler
// const handler = NextAuth(authOptions);

// // Export named handlers for GET and POST requests
// export async function GET(req: NextRequest) {
//   const response = await handler(req);
//   return response;
// }

// export async function POST(req: NextRequest) {
//   const response = await handler(req);
//   return response;
// }
