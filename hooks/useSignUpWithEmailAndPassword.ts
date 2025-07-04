import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/Firebase/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import useHandleError from "./useHandleError";
import { Alert } from "react-native";
import useCheckUserEmail from "./useCheckUserEmail";
import { useGlobalStore } from "@/store/globalStore";

type SignUpWithEmailAndPasswordProps = {
    email: string;
    password: string;
};


export const useSignUpWithEmailAndPassword = () => {

    const usersCollection = collection(db, 'users');

    const { handleError } = useHandleError();

    const { checkUserEmail } = useCheckUserEmail();

    // Global state
  const setUser = useGlobalStore(state => state.setUser);
  const setUserData = useGlobalStore(state => state.setUserData);

    const signUp = async ({ email, password}: SignUpWithEmailAndPasswordProps) => {

        try {
            // Check if email is already taken
            const isEmailTaken = await checkUserEmail(email);
            if (isEmailTaken) {
                // handleError(new Error('Email is already taken.'));
                Alert.alert('Email is already taken. Please use a different email address.');
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            // if (!newUser && error) {
            //     console.log(user)
            //     console.log("Error from throw", error)
            //     showToast(error, 'error');
            //     throw new Error(error);
            // }

            //create user document in firestore
            //create user document in Firestore
            const userDocRef = doc(usersCollection, user.uid);
            await setDoc(userDocRef, {
                email: user.email,
                uid: user.uid,
                createdAt: new Date(),
                displayName: user.displayName || '',
                profilePicture: user.photoURL || '',
            });

            // Update global state
            setUser(user);
            setUserData({
                name: user.displayName || '',
                email,
                role: 'patient',
                createdAt: new Date()
            });
            return user;
        } catch (error) {
            // Handle error using custom error handler
            handleError(error);
        }
    };

    return { signUp };
};



export default useSignUpWithEmailAndPassword;