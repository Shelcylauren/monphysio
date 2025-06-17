// firebase.ts
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';

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
const auth = getAuth(app);
const db = getFirestore(app);


export interface UserProfile {
  uid: string;
  email: string;
  createdAt: Date;
  displayName?: string;
}


export const signUp = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await createUserProfile(user);
    return user;
  } catch (error: any) {
    throw new Error(getErrorMessage(error.code));
  }
};

// 
export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(getErrorMessage(error.code));
  }
};


export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch {
    throw new Error('Erreur lors de la déconnexion');
  }
};


const createUserProfile = async (user: User): Promise<void> => {
  try {
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      createdAt: new Date(),
      displayName: user.displayName || ''
    };
    await setDoc(doc(db, 'users', user.uid), userProfile);
  } catch (error) {
    console.error('Erreur création du profil:', error);
  }
};

// 👁️ Récupération du profil utilisateur
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as UserProfile) : null;
  } catch (error) {
    console.error('Erreur récupération profil:', error);
    return null;
  }
};

// 🎯 État de connexion
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// 💬 Gestion des messages d'erreur
const getErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'Cette adresse email est déjà utilisée';
    case 'auth/weak-password':
      return 'Le mot de passe doit contenir au moins 6 caractères';
    case 'auth/invalid-email':
      return 'Adresse email invalide';
    case 'auth/user-not-found':
      return 'Aucun compte trouvé avec cette adresse email';
    case 'auth/wrong-password':
      return 'Mot de passe incorrect';
    case 'auth/too-many-requests':
      return 'Trop de tentatives. Réessayez plus tard';
    default:
      return 'Une erreur est survenue. Veuillez réessayer';
  }
};


export { auth, db, app };
