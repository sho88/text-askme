import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, set, get, update, remove } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBV2sUOt0NY9EuPrQk3eUThNv-zwTJprBg",
  authDomain: "first-project-7cb87.firebaseapp.com",
  databaseURL: "https://first-project-7cb87.firebaseio.com",
  projectId: "first-project-7cb87",
  storageBucket: "first-project-7cb87.appspot.com",
  messagingSenderId: "915111200842",
  appId: "1:915111200842:web:63be87adfdccb67518beb3"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

export { app, database, get, push, ref, remove, set, update };
