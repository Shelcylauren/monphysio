import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'
import tw from 'twrnc';
import CustomTextInput from '@/components/CustomInputText';
import { MaterialIcons } from '@expo/vector-icons';
import { doc, setDoc } from '@firebase/firestore';
import { UserProfile } from '@/constants/types';
import { createUserWithEmailAndPassword, User } from 'firebase/auth';
import { getErrorMessage } from '@/hooks/useErrorMessage';
import { auth, db } from '@/Firebase/firebase';
import useSignUpWithEmailAndPassword from '@/hooks/useSignUpWithEmailAndPassword';

interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
}

interface FormErrors {
    email?: string;
    password?: string;
    confirmPassword?: string;
}

// const createUserProfile = async (user: User): Promise<void> => {
//   try {
//     const userProfile: UserProfile = {
//       uid: user.uid,
//       email: user.email!,
//       createdAt: new Date(),
//       displayName: user.displayName || ''
//     };
//     await setDoc(doc(db, 'users', user.uid), userProfile);
//   } catch (error) {
//     console.error('Erreur création du profil:', error);
//   }
// };

// export const signUpUser = async (email: string, password: string): Promise<User> => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;
//     await createUserProfile(user);
//     return user;
//   } catch (error: any) {
//     throw new Error(getErrorMessage(error.code));
//   }
// };

export default function signup() {
    const emailRef = React.useRef<TextInput>(null);
    const passwordRef = React.useRef<TextInput>(null);
    const confirmPasswordRef = React.useRef<TextInput>(null);
    const router = useRouter();
    
    const [formData, setFormData] = React.useState<FormData>({
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    const [errors, setErrors] = React.useState<FormErrors>({});
    const [isLoading, setIsLoading] = React.useState(false);

    const { signUp } = useSignUpWithEmailAndPassword();

    const handleChange = (name: keyof FormData, value: string) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        
        // Effacer l'erreur lors de la saisie
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };
    
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        
        // Validation email
        if (!formData.email) {
            newErrors.email = 'Email requis';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email invalide';
        }
        
        // Validation mot de passe
        if (!formData.password) {
            newErrors.password = 'Mot de passe requis';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
        }
        
        // Validation confirmation mot de passe
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirmation requise';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSignUp = async () => {
        if (!validateForm()) return;
        
        setIsLoading(true);
        
        try {
            await signUp({
                email: formData.email,
                password: formData.password,
            });
            Alert.alert(
                'Succès',
                'Compte créé avec succès !',
                [
                    {
                        text: 'OK',
                        // onPress: () => router.push('/consultForm')
                        onPress: () => router.push('/(auth)/what_next')
                    }
                ]
            );
        } catch (error: any) {
            Alert.alert('Erreur', error.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <>
            {/* Absolute View */}
            <View style={tw`absolute left-0 right-0 bg-white shadow-lg top-[25%] rounded-2xl mx-6 z-10`} >
                {/* Content */}
                <View style={tw`items-center p-6 `}>
                    <Text style={tw`text-2xl font-semibold text-center text-gray-500`}>
                        Create an account
                    </Text>
                    <Text style={tw`mt-1 text-sm text-gray-500`}>
                        Join us to get the best experience
                    </Text>

                    {/* Text input View */}
                    <View style={tw`w-full mt-3`}>
                        <CustomTextInput
                            ref={emailRef}
                            label="Email*"
                            placeholder="Ex: example@example.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            leftIcon={<MaterialIcons name="email" size={20} color="#4B5563" />}
                            value={formData.email}
                            onChangeText={(text) => handleChange('email', text)}
                            error={errors.email}
                            returnKeyType="next"
                            onSubmitEditing={() => passwordRef.current?.focus()}
                        />
                    </View>
                    <View style={tw`w-full`}>
                        <CustomTextInput
                            ref={passwordRef}
                            label="Password*"
                            placeholder="Enter your password"
                            secureTextEntry
                            type="password"
                            leftIcon={<MaterialIcons name="lock" size={20} color="#4B5563" />}
                            value={formData.password}
                            onChangeText={(text) => handleChange('password', text)}
                            error={errors.password}
                            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                            returnKeyType="next"
                        />
                    </View>
                    <View style={tw`w-full`}>
                        <CustomTextInput
                            ref={confirmPasswordRef}
                            label="Confirm Password*"
                            placeholder="Re-enter your password"
                            secureTextEntry
                            type="password"
                            leftIcon={<MaterialIcons name="lock" size={20} color="#4B5563" />}
                            value={formData.confirmPassword}
                            onChangeText={(text) => handleChange('confirmPassword', text)}
                            error={errors.confirmPassword}
                            onSubmitEditing={handleSignUp}
                            returnKeyType="done"
                        />
                    </View>
                    
                    <TouchableOpacity 
                        style={tw`w-full px-6 py-3 mt-2 bg-blue-600 rounded-full ${isLoading ? 'opacity-50' : ''}`}
                        onPress={handleSignUp}
                        disabled={isLoading}
                    >
                        <Text style={tw`text-base font-medium text-center text-white`}>
                            {isLoading ? 'Création...' : 'Sign up'}
                        </Text>
                    </TouchableOpacity>
                    
                    <Text style={tw`mt-4 text-sm text-gray-500`}>
                        Already have an account? {" "}
                        <Link href="/(auth)/signin" asChild>
                            <Text style={tw`text-blue-600`}>
                                Sign in
                            </Text>
                        </Link>
                    </Text>
                </View>
            </View>
        </>
    )
}