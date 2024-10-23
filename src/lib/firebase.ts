import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyB3TMH7O8blAorHMG6IwWr4nuyJGoZzckw",
  authDomain: "wingman-ai-2fdd5.firebaseapp.com",
  projectId: "wingman-ai-2fdd5",
  storageBucket: "wingman-ai-2fdd5.appspot.com",
  messagingSenderId: "316750622652",
  appId: "1:316750622652:web:b2cf4953e1f338caea45b9",
  measurementId: "G-6H5XK5E72V"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);