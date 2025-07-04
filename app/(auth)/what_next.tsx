import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import tw from 'twrnc';
import { Sparkles } from 'lucide-react-native';


export default function whatNext() {

    const handleSimpleConsultation = () => {
        router.push('/consultForm');
    };

    const handleSmartConsultation = () => {
        router.push('/chatbot');
    };

    const handleConsultLater = () => {
        router.push('/(tabs)')
    };
    

    return (
        <>
            {/* Absolute View */}
            <View style={tw`absolute left-0 right-0 bg-white shadow-lg top-[35%] rounded-2xl mx-6 z-10`} >
                {/* Content */}
                <View style={tw`items-center p-6 `}>
                    <Text style={tw`text-2xl font-semibold text-center text-gray-500`}>
                        Welcome to Physio Consultation
                    </Text>
                    <Text style={tw`mt-1 text-sm text-center text-gray-500`}>
                        This platform helps you consult a specialist for your sciatic nerve pain, Get an intelligent diagnosis, and follow your treatments easily.
                    </Text>

                    {/* Button View */}
                    <View style={tw`flex-col w-full gap-2 mt-6`}>
                        <TouchableOpacity
                            style={tw`w-full px-6 py-3 mt-2 bg-blue-600 rounded-full`}
                            onPress={() => handleSimpleConsultation()}
                            activeOpacity={0.8}
                        >
                            <Text style={tw`text-base italic font-medium text-center text-white`}>
                            Simple consultation
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={tw`flex-row justify-center w-full px-6 py-3 mt-2 bg-white border border-blue-600 rounded-full`}
                            onPress={() => handleSmartConsultation()}
                            activeOpacity={0.8}
                        >
                            <Text style={tw`mr-4 text-base italic font-medium text-center text-blue-600`}>
                                AI consultation 
                            </Text>
                            <View style={tw`ml-2`}>
                                {/* Simple AI/robot SVG icon */}
                                <Sparkles size={24} color="#2563eb" strokeWidth={2} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={tw`w-full px-6 py-3 mt-2 bg-white rounded-full`}
                            onPress={() => handleConsultLater()}
                            activeOpacity={0.8}
                        >
                            <Text style={tw`text-base italic font-medium text-center text-blue-600 underline`}>
                                Consult later 
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
}