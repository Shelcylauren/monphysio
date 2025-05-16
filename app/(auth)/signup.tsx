import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import tw from 'twrnc';
import CustomTextInput from '@/components/CustomInputText';
import { MaterialIcons } from '@expo/vector-icons';

interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
}

export default function signup() {
    const emailRef = React.useRef<TextInput>(null);
    const passwordRef = React.useRef<TextInput>(null);
    const confirmPasswordRef = React.useRef<TextInput>(null);
    const [formData, setFormData] = React.useState<FormData>({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (name: keyof FormData, value: string) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
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
                            onSubmitEditing={() => passwordRef.current?.focus()}
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
                            onSubmitEditing={() => passwordRef.current?.focus()}
                            returnKeyType="next"
                        />
                    </View>
                    <View style={tw`w-full`}>
                        <CustomTextInput
                            // ref={confirmPasswordRef}
                            label="Confirm Password*"
                            placeholder="Re-enter your password"
                            secureTextEntry
                            type="password"
                            leftIcon={<MaterialIcons name="lock" size={20} color="#4B5563" />}
                            value={formData.confirmPassword}
                            onChangeText={(text) => handleChange('confirmPassword', text)}
                            // error={errors.confirmPassword}
                            // touched={touched.confirmPassword}
                            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                            returnKeyType="done"
                        />
                    </View>
                    <Link href="/consultForm" asChild>
                        <TouchableOpacity style={tw`w-full px-6 py-3 mt-2 bg-blue-600 rounded-full`}>
                            <Text style={tw`text-base italic font-medium text-center text-white`}>
                                Sign up
                            </Text>
                        </TouchableOpacity>
                    </Link>
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
