// firebase.ts
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBAhq9ZxlfocpsakI9PodA6GR8800fvDvc",
  authDomain: "monphysio-116b8.firebaseapp.com",
  projectId: "monphysio-116b8",
  storageBucket: "monphysio-116b8.appspot.com",
  messagingSenderId: "869657830408",
  appId: "1:869657830408:web:38baeec1045eec41b61dbd",
  measurementId: "G-GDTRB2D0KB"
};


const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);


export { auth, db, app };
