import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAjNVg5SY91Ki9OVC-9Wzoumj8Z1x4Gm3A",
  authDomain: "my-stylist-2025.firebaseapp.com",
  projectId: "my-stylist-2025",
  storageBucket: "my-stylist-2025.firebasestorage.app",
  messagingSenderId: "847882480425",
  appId: "1:847882480425:web:a2bcc55bd8ea76a618e538"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app,);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
