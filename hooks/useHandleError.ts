// handle error using switch cases

import { Alert } from 'react-native';
import { FirebaseError } from 'firebase/app';
import { auth } from '@/Firebase/firebase';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';

const useHandleError = () => {
    const router = useRouter();

    const handleError = useCallback((error: unknown) => {
        if (error instanceof FirebaseError) {
            switch (error.code) {
                case 'auth/user-not-found':
                    Alert.alert('User not found. Please check your credentials.', 'error');
                    break;
                case 'auth/wrong-password':
                    Alert.alert('Incorrect password. Please try again.', 'error');
                    break;
                case 'auth/email-already-in-use':
                    Alert.alert('This email is already in use. Please try another one.', 'error');
                    break;
                case 'auth/operation-not-allowed':
                    Alert.alert('Operation not allowed. Please contact support.', 'error');
                    break;
                case 'auth/too-many-requests':
                    Alert.alert('Too many requests. Please try again later.', 'error');
                    break;
                case 'auth/invalid-credential':
                    Alert.alert('Invalid credentials. Please check your input and try again.', 'error');
                    break;
                case 'auth/email-not-verified':
                    Alert.alert('Email not verified. Please verify your email before proceeding.', 'error');
                    // Optionally redirect to email verification page
                    // router.push('/(auth)/emailVerification');
                    break;
                case 'auth/invalid-email':
                    Alert.alert('Invalid email format. Please enter a valid email address.', 'error');
                    break;
                case 'auth/weak-password':
                    Alert.alert('Password is too weak. Please choose a stronger password.', 'error');
                    break;
                default:
                    Alert.alert(`An error occurred: ${error.message}`, 'error');
            }
        } else if (error instanceof Error) {
            Alert.alert(`An error occurred: ${error.message}`, 'error');
        } else {
            Alert.alert('An unexpected error occurred. Please try again later.', 'error');
        }
    }, [router]);

    return { handleError };
};

export default useHandleError;