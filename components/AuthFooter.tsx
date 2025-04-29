import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';

export default function AuthFooter() {

    // get year
    const year = new Date().getFullYear()
    return (
        <View style={tw`relative justify-end overflow-hidden bg-white h-1/2`}>
            {/* Abosolute position gray circle */}
            <View style={tw`absolute -bottom-[100px] -left-[100px] right-0 w-[250px] h-[250px] bg-white border-[30px] border-gray-200 rounded-full`} />
            {/* footer text */}
            <Text style={tw`p-4 mb-4 text-sm text-center text-gray-500`}>
                © {year} Shelcy. All rights reserved.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({})