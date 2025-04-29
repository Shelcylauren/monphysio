import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';

export default function ForumHeader() {
    return (
        <View style={tw`pb-4 border-b border-gray-300`}>
            <View style={tw`items-center justify-between px-4 py-4 bg-white shadow rounded-xl `}>
                <View style={tw`items-center justify-between w-full pb-1 mb-2 border-b border-blue-300`}>
                    <Image source={require('@/assets/images/aa.jpg')} style={tw`w-24 h-24 rounded-xl`} />
                    <Text style={tw`text-lg font-bold text-center text-blue-800`}>Dr. Shelcy Roy</Text>
                </View>
                <Text style={tw`mb-1 text-base font-semibold text-center text-blue-600 underline`} numberOfLines={2}>Sed do eiusmod tempor incididunt ut</Text>
                <Text style={tw`text-sm text-center text-blue-600`} ellipsizeMode='tail' numberOfLines={3}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
            </View>
        </View>
    )
}
