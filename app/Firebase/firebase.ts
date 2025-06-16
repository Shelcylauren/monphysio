// firebase.ts
// import { initializeApp } from 'firebase/app';
// import { 
//   getAuth, 
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   User
// } from 'firebase/auth';
// import { 
//   getFirestore, 
//   doc, 
//   setDoc, 
//   getDoc 
// } from 'firebase/firestore';

import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  // User
} from '@react-native-firebase/auth';

// Configuration Firebase - Remplacez par vos propres clés

const firebaseConfig = {
  apiKey: "AIzaSyBAhq9ZxlfocpsakI9PodA6GR8800fvDvc",
  authDomain: "monphysio-116b8.firebaseapp.com",
  projectId: "monphysio-116b8",
  storageBucket: "monphysio-116b8.firebasestorage.app",
  messagingSenderId: "869657830408",
  appId: "1:869657830408:web:38baeec1045eec41b61dbd",
  measurementId: "G-GDTRB2D0KB"
};

// Initialisation Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);

// Types
export interface UserProfile {
  uid: string;
  email: string;
  createdAt: Date;
  displayName?: string;
}

// Fonctions d'authentification
export const signUp = async (email: string, password: string): Promise<any> => {
  try {
    // console.log("Testing 1")
    const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
    const user = userCredential.user;
    
    // Créer le profil utilisateur dans Firestore
    // await createUserProfile(user);
    
    return user;
  } catch (error: any) {
    throw new Error(getErrorMessage(error.code));
  }
};

export const signIn = async (email: string, password: string): Promise<any> => {
  try {
    const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(getErrorMessage(error.code));
  }
};

export const logOut = async (): Promise<void> => {
  try {
    await signOut(getAuth());
  } catch (error: any) {
    throw new Error('Erreur lors de la déconnexion');
  }
};

// Créer le profil utilisateur dans Firestore
// const createUserProfile = async (user: any): Promise<void> => {
//   try {
//     const userProfile: UserProfile = {
//       uid: user.uid,
//       email: user.email!,
//       createdAt: new Date(),
//     };
    
//     await setDoc(doc(db, 'users', user.uid), userProfile);
//   } catch (error) {
//     console.error('Erreur lors de la création du profil:', error);
//   }
// };

// Récupérer le profil utilisateur
// export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
//   try {
//     const docRef = doc(db, 'users', uid);
//     const docSnap = await getDoc(docRef);
    
//     if (docSnap.exists()) {
//       return docSnap.data() as UserProfile;
//     }
//     return null;
//   } catch (error) {
//     console.error('Erreur lors de la récupération du profil:', error);
//     return null;
//   }
// };

// Observer l'état d'authentification
export const onAuthStateChange = (callback: (user: any | null) => void) => {
  return onAuthStateChanged(getAuth(), callback);
};

// Messages d'erreur en français
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