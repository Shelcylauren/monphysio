import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';

export default function AuthHeader() {
    return (
        <View style={tw`relative bg-blue-600 h-1/2`}>
            {/* Upper Image */}
            <View style={tw`overflow-hidden bg-white`}>
                <Image
                    source={require('@/assets/images/aa.jpg')}
                    style={tw`w-full h-full rounded-b-[50px]`}
                    resizeMode="cover"
                />
            </View>
            <StatusBar hidden />
        </View>
    );
}
