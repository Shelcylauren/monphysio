import { db } from '@/Firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Alert } from 'react-native';


// Custom hook to check if a user email is already registered
// This hook can be used in the signup process to validate email uniqueness
const useCheckUserEmail = () => {
    const usersRef = collection(db, "users");
    const checkUserEmail = async (email: string) => {
        //Check if email is already taken
        const q = query(usersRef, where("email", "==", email.toLocaleLowerCase()));
        const querySnapshot = await getDocs(q);
        console.log("querySnapshot:", querySnapshot.empty);

        if (!querySnapshot.empty) {
            // Email found
            return true;
        }
        // Email not found
        return false;
    }

    return { checkUserEmail }
}

export default useCheckUserEmail;
