import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import tw from 'twrnc';

export default function HomeHeader() {
    return (
        <View style={tw`flex-row bg-white items-center justify-between pt-2 mb-4`}>
            <View style={tw`flex-1`}>
                <Text style={tw`text-lg text-gray-500`}>👋 Hello</Text>
                <Text style={tw`text-3xl font-bold`}>Shelcy</Text>
            </View>
            <View style={[tw`relative items-end p-2 overflow-visible bg-white shadow-md rounded-2xl`, { width: 50, height: 50 }]}>
                {/* absolute blue status circle */}
                <View style={tw`absolute z-10 w-5 h-5 bg-blue-500 border-2 border-white rounded-full -top-1 -right-1`} />
                <Image style={tw`w-[40px] h-[40px] rounded-2xl`} source={require('@/assets/images/human-muscles.jpg')} />
            </View>
        </View>
    );
}
