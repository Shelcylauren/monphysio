// send forgot email to user 
import { useState, useCallback } from 'react';
import { auth } from '@/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import useHandleError from './useHandleError';
import useCheckUserEmail from './useCheckUserEmail';

const usePasswordResetEmail = () => {
    const { handleError } = useHandleError();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { checkUserEmail } = useCheckUserEmail();

    const forgotPassword = useCallback(async (email: string) => {
        if (!email) {
            Alert.alert('Please enter your email address.', 'error');
            return false;
        }

        setLoading(true);

        try {
            const emailExists = await checkUserEmail(email);
            if (!emailExists) {
                Alert.alert('Email not found', 'Please check your email address');
                return false;
            }

            await sendPasswordResetEmail(auth, email);
            Alert.alert('Password reset email sent successfully. Please check your inbox.');
            router.push('/(auth)/forgotPassword');
            return true;
        } catch (error: unknown) {
            handleError(error);
            return false;
        } finally {
            setLoading(false);
        }
    }, [checkUserEmail, handleError, router]);

    return { forgotPassword, loading };
};

export default usePasswordResetEmail;