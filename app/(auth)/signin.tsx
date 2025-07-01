import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Link, router } from 'expo-router';
import tw from 'twrnc';
import { useUserAuth } from '@/store/useUserAuth';
import CustomTextInput from '@/components/CustomInputText';
import { MaterialIcons } from '@expo/vector-icons';
import { getErrorMessage } from '@/hooks/useErrorMessage';
import { auth } from '@/Firebase/firebase';
import { signInWithEmailAndPassword, User } from 'firebase/auth';
import useSigninWithEmailAndPassword from '@/hooks/useSigninWithEmailAndPassword';

interface FormData {
    email: string;
    password: string;
}



export default function Signin() {
    const emailRef = React.useRef<TextInput>(null);
    const passwordRef = React.useRef<TextInput>(null);
    const confirmPasswordRef = React.useRef<TextInput>(null);
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });
    const hasOnboarded = useUserAuth((state) => state.toggleHasOnboarded);

    const { signin, loading } = useSigninWithEmailAndPassword()

    const handleSignin = async () => {
        // console.log("Signin button pressed");
        // router.push('/(screens)/pocket_doctor');
        
        await signin(formData.email, formData.password)
        router.push('/(auth)/what_next');

    }

    const handleChange = (name: keyof FormData, value: string) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(`Updated ${name}: ${value}`);
    };

    return (
        <>
            {/* Absolute View */}
            <View style={tw`absolute left-0 right-0 bg-white shadow-lg top-[25%] rounded-2xl mx-6 z-10`} >
                {/* Content */}
                <View style={tw`items-center p-6 `}>
                    <Text style={tw`text-2xl font-semibold text-center text-gray-500`}>
                        Login to your account
                    </Text>
                    <Text style={tw`mt-1 text-sm text-gray-500`}>
                        welcome back to your account
                    </Text>

                    {/* Text input View */}
                    <View style={tw`w-full mt-3`}>
                        <CustomTextInput
                            // ref={emailRef}
                            label="Email*"
                            placeholder="Ex: example@example.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            leftIcon={<MaterialIcons name="email" size={20} color="#4B5563" />}
                            value={formData.email}
                            onChangeText={(text) => handleChange('email', text)}
                            // error={errors.email}
                            // touched={touched.email}
                            returnKeyType="next"
                        />
                    </View>
                    <View style={tw`w-full`}>
                        <CustomTextInput
                            // ref={passwordRef}
                            label="Password*"
                            placeholder="Enter your password"
                            secureTextEntry
                            type="password"
                            leftIcon={<MaterialIcons name="lock" size={20} color="#4B5563" />}
                            value={formData.password}
                            onChangeText={(text) => handleChange('password', text)}
                            // error={errors.password}
                            // touched={touched.password}
                            returnKeyType="next"
                            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                        />
                    </View>

                    <TouchableOpacity
                        style={tw`w-full px-6 py-3 mt-2 bg-blue-600 rounded-full`}
                        onPress={() => handleSignin()}
                        activeOpacity={0.8}
                        disabled={loading}
                    >
                        {
                            loading ? (
                                <Text style={tw`font-semibold text-center text-white`}>
                                    Signing in...
                                </Text>
                            ) : (
                                <Text style={tw`font-semibold text-center text-white`}>
                                    Sign In
                                </Text>
                            )
                        }
                    </TouchableOpacity>
                    <Text style={tw`mt-4 text-sm text-gray-500`}>
                        Don't have an account? {" "}
                        <Link href="/(auth)/signup" asChild>
                            <Text style={tw`text-blue-600`}>
                                Sign up
                            </Text>
                        </Link>
                    </Text>
                </View>
            </View>
        </>
    );
}