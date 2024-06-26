// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-Njb56U3C-iSo6k6_7V66f-I3cYgat5Y",
  authDomain: "note-app-authentication.firebaseapp.com",
  projectId: "note-app-authentication",
  storageBucket: "note-app-authentication.appspot.com",
  messagingSenderId: "264825935427",
  appId: "1:264825935427:web:5bc188e366de34bcd866f6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
