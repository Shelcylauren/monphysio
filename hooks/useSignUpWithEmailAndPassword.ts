import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/Firebase/firebase";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import useHandleError from "./useHandleError";
import { Alert } from "react-native";
import useCheckUserEmail from "./useCheckUserEmail";

type SignUpWithEmailAndPasswordProps = {
    email: string;
    password: string;

};
export const useSignUpWithEmailAndPassword = () => {

    const usersCollection = collection(db, 'users');

    const { handleError } = useHandleError();

    const { checkUserEmail } = useCheckUserEmail();
    // const auth = getAuth();

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
            const userDocRef = doc(usersCollection, user.uid);
            await setDoc(userDocRef, {
                email: user.email,
                uid: user.uid,
                createdAt: new Date(),
                displayName: user.displayName || '',
                profilePicture: user.photoURL || '',
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