// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8weyBcrR_uli9di0ykNYXcNfPr0nk_5o",
  authDomain: "noodle-box-b4ca1.firebaseapp.com",
  projectId: "noodle-box-b4ca1",
  storageBucket: "noodle-box-b4ca1.firebasestorage.app",
  messagingSenderId: "128754325374",
  appId: "1:128754325374:web:794a06234c70e8b4da052f",
  measurementId: "G-HEPVYQF0PS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app);
export { storage, db };
