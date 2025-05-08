// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDHWCXPf2VqQ-mcFOqNhan0y9Mv2P1SxFs",
  authDomain: "crud-base-datos.firebaseapp.com",
  projectId: "crud-base-datos",
  storageBucket: "crud-base-datos.firebasestorage.app",
  messagingSenderId: "416148195451",
  appId: "1:416148195451:web:c30051f49b9c861ebcfade",
  measurementId: "G-T5MQ417RDJ"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
export const db = getFirestore(app);
export const auth = getAuth(app);