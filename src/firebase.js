import { initializeApp }from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyALpAQPE2viQOCz6B7uYNpCzWn1ptFjaWU",
  authDomain: "chatsweep.firebaseapp.com",
  projectId: "chatsweep",
  storageBucket: "chatsweep.appspot.com",
  messagingSenderId: "546815797166",
  appId: "1:546815797166:web:ce590a5b739191185c4a3f",
  measurementId: "G-RZ6YEZFT4E"
};

export const auth = getAuth(initializeApp(firebaseConfig));