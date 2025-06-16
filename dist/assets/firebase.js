import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQIPZ5-KOaNhjOGrmr6C2ByVHz36NYg9o",
  authDomain: "showstracker-2af4e.firebaseapp.com",
  projectId: "showstracker-2af4e",
  storageBucket: "showstracker-2af4e.appspot.com",
  messagingSenderId: "423940534789",
  appId: "1:423940534789:web:6b68cd06506c52c1d6e26c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
