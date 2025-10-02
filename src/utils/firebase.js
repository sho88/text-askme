import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, set, get, update, remove } from 'firebase/database' // Firebase RealTimeDatabase

/**
 * Migrating over to FireStore as of 16th August 2025
 */
import { getFirestore } from "firebase/firestore"; // Firebase FireStore
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBV2sUOt0NY9EuPrQk3eUThNv-zwTJprBg",
  authDomain: "first-project-7cb87.firebaseapp.com",
  databaseURL: "https://first-project-7cb87.firebaseio.com",
  projectId: "first-project-7cb87",
  storageBucket: "first-project-7cb87.appspot.com",
  messagingSenderId: "915111200842",
  appId: "1:915111200842:web:63be87adfdccb67518beb3",
};

// @TODO: Be sure to come back to this and keep the keys away...
// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   databaseURL: process.env.DATABASE_URL,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
// };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const firestoreDatabase = getFirestore(app);
const storage = getStorage(app);

export {
  app,
  database,
  firestoreDatabase,
  storage,
  get,
  push,
  ref,
  storageRef,
  remove,
  set,
  update,
  uploadBytesResumable,
  getDownloadURL,
  getDatabase,
};
