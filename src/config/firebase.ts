import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Debug environment variables
console.log('Checking Firebase environment variables...');
console.log('import.meta.env:', import.meta.env);

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Log each config value (without sensitive data)
console.log('Firebase Config:', {
  apiKey: config.apiKey ? 'Present' : 'Missing',
  authDomain: config.authDomain ? 'Present' : 'Missing',
  projectId: config.projectId ? 'Present' : 'Missing',
  storageBucket: config.storageBucket ? 'Present' : 'Missing',
  messagingSenderId: config.messagingSenderId ? 'Present' : 'Missing',
  appId: config.appId ? 'Present' : 'Missing'
});

// Initialize Firebase
console.log('Initializing Firebase...');
const app = initializeApp(config);
console.log('Firebase app initialized');

// Initialize Firebase services
console.log('Initializing Firebase services...');
export const auth = getAuth(app);
console.log('Auth service initialized');

export const db = getFirestore(app);
console.log('Firestore service initialized');

export const storage = getStorage(app);
console.log('Storage service initialized');

export default app; 