// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyBBuhzyYhKuSf4qf-Cr1SEfFcW6euludvA",
  authDomain: "xenon-height-280707.firebaseapp.com",
  databaseURL: "https://xenon-height-280707.firebaseio.com",
  projectId: "xenon-height-280707",
  storageBucket: "xenon-height-280707.appspot.com",
  messagingSenderId: "589262774894",
  appId: "1:589262774894:web:aa047946a050b8736f7c7f",
  // Initialize Firebase
  measurementId: "G-03GQV1007V",
});

export const db = getFirestore();
