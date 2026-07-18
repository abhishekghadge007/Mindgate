import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// 🔁 Replace these with your Firebase project's config
const firebaseConfig = {
  apiKey: 'AIzaSyCsHdE0aI9AzR-IpbChMvDX03eO_9PUksA',
  authDomain: 'mindgate-b75ba.firebaseapp.com',
  projectId: 'mindgate-b75ba',
  storageBucket: 'mindgate-b75ba.firebasestorage.app',
  messagingSenderId: '642532679063',
  appId: '1:642532679063:web:ff8e1926c08c58f95f78d2',
  measurementId: "G-LQZQ3YLCT5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
