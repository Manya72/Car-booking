// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBE_d7YJSoE7J2DWp89pT_qrVMrsfjXmYE",
  authDomain: "car-wash-e18e5.firebaseapp.com",
  projectId: "car-wash-e18e5",
  storageBucket: "car-wash-e18e5.appspot.com",
  messagingSenderId: "184096762956",
  appId: "1:184096762956:web:977c6b0bcb79d765f218e9",
  measurementId: "G-8BQ48N1SJ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export {app}