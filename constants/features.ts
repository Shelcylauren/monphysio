
import { auth, db } from '@/Firebase/firebase';
import { doc, getDoc } from '@firebase/firestore';
import {
  signOut,
  onAuthStateChanged,
  User,
  UserProfile
} from 'firebase/auth';

export const logOut = async (): Promise<void> => {
    try {
        await signOut(auth);
    } catch {
        throw new Error('Erreur lors de la déconnexion');
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