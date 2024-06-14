// // pages/api/auth/[...nextauth].js
// import NextAuth from 'next-auth';
// import Providers from 'next-auth/providers';
// import axios from 'axios';
// export default NextAuth({
//   providers: [
//     Providers.Google({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   pages: {
//     signIn: '/login',
   
//   },
//   callbacks: {
//     async signIn({ user,  email, }) {
//       // first axios request to ascertain if our user exists in our custom DB
//       console.log("daata from the signin callback",user)
//       const response = await axios.post(
//         "http://localhost:3000/api/login",
//         { email: email }
//       );
//       if (response && response.data?.value === true) {
//         // user exists return true passing control to the next callback
//         return true;
//       } else {
//         // second axios call which creates a new user in our database
//         const data = {
//         //   firstName: given_name,
//         //   lastName: profile.family_name,
//           email: email,
//         //   profileUrl: profile.picture,
//         };
//         // const response = await axios.post(
//         // //   "http://localhost:9000/v1/auth/signup",
//         //   data
//         // );
//         // retruns true thereby passing control to the next callback
//         return true;
//       }
//     },
// }
// });
