import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function SearchBar() {
    return (
        <View style={tw`bg-white flex-row justify-between bg-gray-200 rounded-2xl px-4 items-center mb-4`}>
            <View style={tw`flex-row gap-2 items-center flex-1`}>
                <AntDesign name="search1" size={24} color="black" />
                <TextInput style={tw`grow w-3/4 h-15`} placeholder="Search..." />
            </View>
            <AntDesign name="filter" size={24} color="black" />
        </View>
    )
}
