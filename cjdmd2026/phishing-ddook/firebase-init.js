
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBPE8mZh0gFiePRZPDDJWHK6H13mzbE1wo",
  authDomain: "deepcall-3008e.firebaseapp.com",
  projectId: "deepcall-3008e",
  storageBucket: "deepcall-3008e.firebasestorage.app",
  messagingSenderId: "145988688873",
  appId: "1:145988688873:web:53b1e4faf6950817e2c978",
  measurementId: "G-B9B8SF964E"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);