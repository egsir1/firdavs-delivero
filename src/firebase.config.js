import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCHrmGvThE4j29ATJXWm2l2w8MTgd0x0IA",
  authDomain: "food-order-4be36.firebaseapp.com",
  databaseURL: "https://food-order-4be36-default-rtdb.firebaseio.com",
  projectId: "food-order-4be36",
  storageBucket: "food-order-4be36.appspot.com",
  messagingSenderId: "776672593957",
  appId: "1:776672593957:web:46d27916033a8033f017cc",
  measurementId: "G-G0HPLCRJL5",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);

const storage = getStorage(app);

export { app, firestore, storage };
