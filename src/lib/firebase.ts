import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC2hFjcYM-eMl-LeU2GTHf-bDS3tEA5VgM",
  authDomain: "gearroom-2f85d.firebaseapp.com",
  projectId: "gearroom-2f85d",
  storageBucket: "gearroom-2f85d.firebasestorage.app",
  messagingSenderId: "837132445657",
  appId: "1:837132445657:web:8bba2b520b2c6c3361dbc8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);