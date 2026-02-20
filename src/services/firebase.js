import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { getMessaging } from 'firebase/messaging'; // Import messaging if using web, or use @react-native-firebase/messaging for native

// CONFIGURATION INSTRUCTION:
// Replace the values below with your specific Firebase Project credentials.
// You can find these in the Firebase Console -> Project Settings -> General -> Your Apps.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Export services
export { app, db };
