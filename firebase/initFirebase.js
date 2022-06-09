import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDERID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  // apiKey: "AIzaSyDkM0P5jqfCXhMiDC9I_LesqXZ2ErvdYPo",
  // authDomain: "sih-tourism.firebaseapp.com",
  // projectId: "sih-tourism",
  // storageBucket: "sih-tourism.appspot.com",
  // messagingSenderId: "58186954035",
  // appId: "1:58186954035:web:87ae19af7ff190ca29fa46",
  // measurementId: "G-8F9GF6NDMB",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };
