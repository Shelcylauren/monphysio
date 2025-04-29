import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Link } from 'expo-router';
import tw from 'twrnc';
import { useUserAuth } from '@/store/useUserAuth';

export default function Signin() {
    const hasOnboarded = useUserAuth((state) => state.toggleHasOnboarded);

    const handleSignin = () => {
        console.log("Signin button pressed");
        hasOnboarded(); // Toggle the onboarding state
    }

    return (
        <>
            {/* Absolute View */}
            <View style={tw`absolute left-0 right-0 bg-white shadow-lg top-[25%] rounded-2xl mx-6 z-10`} >
                {/* Content */}
                <View style={tw`items-center p-6 `}>
                    <Text style={tw`text-2xl font-semibold text-center text-gray-500`}>
                        Signin to Join
                    </Text>

                    {/* Text input View */}
                    <View style={tw`w-full mt-6`}>
                        <Text style={tw`text-base font-medium text-gray-500`}>
                            Email
                        </Text>
                        <View style={tw`py-2 border-b border-gray-300`}>
                            <TextInput
                                placeholder="Enter your email"
                                style={tw`text-base text-gray-500`}
                            />
                        </View>
                    </View>
                    <View style={tw`w-full mt-6`}>
                        <Text style={tw`text-base font-medium text-gray-500`}>
                            Password
                        </Text>
                        <View style={tw`py-2 border-b border-gray-300`}>
                            <TextInput
                                placeholder="Enter your password"
                                secureTextEntry
                                style={tw`text-base text-gray-500`}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={tw`w-full px-6 py-3 mt-6 bg-blue-600 rounded-full`}
                        onPress={() => handleSignin()}
                        activeOpacity={0.8}
                    >
                        <Text style={tw`text-base italic font-medium text-center text-white`}>
                            Sign in
                        </Text>
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
