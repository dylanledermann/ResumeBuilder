// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; //fb database
import { getAuth } from "firebase/auth"; //fb authentication
import { getStorage } from "firebase/storage";//firebase storage
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGpyGmqgoPbx_Wq0gl_t1WBOA0v0hCRsY",
  authDomain: "resumebuilder-c5e3a.firebaseapp.com",
  projectId: "resumebuilder-c5e3a",
  storageBucket: "resumebuilder-c5e3a.firebasestorage.app",
  messagingSenderId: "226713722771",
  appId: "1:226713722771:web:c4be19714c1d680d77d266",
  measurementId: "G-HWPSV11TR4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);

const storage = getStorage(app)

export { app, analytics, db, auth, storage };