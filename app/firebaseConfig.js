// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJlb-Fwfizb9XthS7zinQg3ADdG3fB6IU",
  authDomain: "words-from-life-5cb26.firebaseapp.com",
  databaseURL: "https://words-from-life-5cb26-default-rtdb.firebaseio.com",
  projectId: "words-from-life-5cb26",
  storageBucket: "words-from-life-5cb26.appspot.com",
  messagingSenderId: "46283445249",
  appId: "1:46283445249:web:80e65ba9bfae3c156bdc00",
  measurementId: "G-QC8ERE85QK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export {database}