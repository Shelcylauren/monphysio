import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import tw from 'twrnc';

export default function signup() {
    return (
        <>
            {/* Absolute View */}
            <View style={tw`absolute left-0 right-0 bg-white shadow-lg top-[25%] rounded-2xl mx-6 z-10`} >
                {/* Content */}
                <View style={tw`items-center p-6 `}>
                    <Text style={tw`text-2xl font-semibold text-center text-gray-500`}>
                        Signup to Join
                    </Text>

                    {/* Text input View */}
                    <View style={tw`w-full mt-6`}>
                        <Text style={tw`text-base font-medium text-gray-500`}>
                            Email
                        </Text>
                        <View style={tw`pt-2 border-b border-gray-300`}>
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
                        <View style={tw`pt-2 border-b border-gray-300`}>
                            <TextInput
                                placeholder="Enter your password"
                                secureTextEntry
                                style={tw`text-base text-gray-500`}
                            />
                        </View>
                    </View>
                    <View style={tw`w-full mt-6`}>
                        <Text style={tw`text-base font-medium text-gray-500`}>
                            Confirm Password
                        </Text>
                        <View style={tw`pt-2 border-b border-gray-300`}>
                            <TextInput
                                placeholder="Confirm your password"
                                secureTextEntry
                                style={tw`text-base text-gray-500`}
                            />
                        </View>
                    </View>
                    <Link href="/" asChild>
                        <TouchableOpacity style={tw`w-full px-6 py-3 mt-6 bg-blue-600 rounded-full`}>
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
