// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore, doc, getDoc } from "firebase/firestore";
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

const getNoodleCount = async () => {
  try {
    // Reference to the document you want to fetch
    const docRef = doc(db, "noodle-box", "noodle-count");

    // Fetch the document
    const documentSnapshot = await getDoc(docRef);

    if (documentSnapshot.exists()) {
      return {
        heartNoodle: documentSnapshot.data().heartNoodle,
        smileNoodle: documentSnapshot.data().smileNoodle,
        winkNoodle: documentSnapshot.data().winkNoodle,
      };
    } else {
      console.log("No such document!");
      return null; // Returning null instead of -1
    }
  } catch (error) {
    console.error("Error fetching document: ", error);
    return null; // Returning null on error
  }
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app);
export { storage, db, getNoodleCount };
