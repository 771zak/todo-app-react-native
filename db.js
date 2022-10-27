// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBDy0Ip8mFT2WhYiZkofq6_E_G1B-BG1ZY",
	authDomain: "todos-272ba.firebaseapp.com",
	projectId: "todos-272ba",
	storageBucket: "todos-272ba.appspot.com",
	messagingSenderId: "608837118207",
	appId: "1:608837118207:web:35d61f1fed84142c9104ca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
