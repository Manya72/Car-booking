// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgdbFv0gkaB60u2TG_ODrfmiYEYSt6wEE",
  authDomain: "carwash-1cf62.firebaseapp.com",
  projectId: "carwash-1cf62",
  storageBucket: "carwash-1cf62.appspot.com",
  messagingSenderId: "521567641144",
  appId: "1:521567641144:web:2bbe6fd41dbe04288890cd",
  measurementId: "G-BKSHDJQWG9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export {app}