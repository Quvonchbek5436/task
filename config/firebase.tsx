
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyDniUN0iY5JykPi7XKMCn0VqaHt0I6YPIE",
    authDomain: "ourtask-fa8f6.firebaseapp.com",
    projectId: "ourtask-fa8f6",
    storageBucket: "ourtask-fa8f6.appspot.com",
    messagingSenderId: "129518343802",
    appId: "1:129518343802:web:047a113b7a35e89bce4dc3",
    measurementId: "G-63C4YD8V8H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()

