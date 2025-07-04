import { auth } from "@/Firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import useHandleError from "./useHandleError";
import { useState } from "react";
import { useGlobalStore } from "@/store/globalStore";


const useSigninWithEmailAndPassword = () => {
    const [loading, setLoading] = useState(false);
    const { handleError } = useHandleError();
    const router = useRouter();

    // const { setUser } = useGlobalStore();
    const setUser = useGlobalStore(state => state.setUser);

    const signin = async (email: string, password: string) => {
        if (!email || !password) {
            // showToast('Please fill in all fields!', 'error');
            return false;
        }
        try {
            setLoading(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // Signed in
            const user = userCredential.user;
            //check if user email is verified
            // if (!user.emailVerified) {
            //     // showToast('Please verify your email before signing in!', 'error');
            //     Alert.alert(
            //         'Email Verification Required',
            //         'Please verify your email before signing in.',
            //         [
            //             {
            //                 text: 'OK',
            //                 onPress: () => console.log('OK Pressed'),
            //             },
            //         ],
            //         { cancelable: false }
            //     );
            //     // Redirect to email verification page
            //     // router.push('/(auth)/emailVerification');
            // } else {
            //     // User is signed in, redirect to home page
            //     router.replace('/');
            // }


            // Set user in global store
            setUser(user);

            // Redirect to home page
            router.replace('/');
        } catch (error: unknown) {
            // Handle error using custom error handler
            handleError(error);
            return error;
        } finally {
            setLoading(false);
        }
    };

    return { signin, loading };
}

export default useSigninWithEmailAndPassword;