import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
// import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0DjpyvoIvVAjp2kcmIU9D5BENlhNNnHQ",
  authDomain: "simple-notes-firebase-55d45.firebaseapp.com",
  projectId: "simple-notes-firebase-55d45",
  storageBucket: "simple-notes-firebase-55d45.appspot.com",
  messagingSenderId: "528442986194",
  appId: "1:528442986194:web:bbb1bbb42a333c13ffe70b",
  measurementId: "G-K6X0Q59YPZ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// Get a reference to the database service
export const database = firebase.database();

export default firebase;
