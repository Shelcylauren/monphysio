// router.push('/(tabs)/Chatbot');

import { Text, View } from 'react-native'
import React from 'react'

export default function Chatbot() {
    return (
        <View className="flex-1 bg-blue-50 p-4">
            <Text className="text-3xl font-bold text-blue-800 mb-6">Chatbot</Text>
            <Text className="text-lg text-gray-700 mb-4">Posez vos questions sur la douleur au nerf sciatique.</Text>
        </View>
    )
}
