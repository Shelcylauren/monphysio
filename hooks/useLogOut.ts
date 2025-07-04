import { signOut } from 'firebase/auth';
import { auth } from '@/Firebase/firebase';
import { useGlobalStore } from '@/store/globalStore';

export default function useLogOut() {
    // No need to get these from the store as Firebase will trigger the auth state change

    const logout = async () => {
        try {
            await signOut(auth);
            // The auth state listener will update the store automatically
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return { logout };
}