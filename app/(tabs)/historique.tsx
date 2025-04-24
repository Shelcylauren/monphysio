import { ScrollView, Text, View } from 'react-native'
import React from 'react'

export default function Historique() {
    return (
        <ScrollView className="flex-1 bg-blue-50 p-4">
            <View>
                <Text className="text-3xl font-bold text-blue-800 mb-6">Historique</Text>
            </View>
            {/* Add more content here as needed */}
            <View className="bg-white p-4 rounded-2xl shadow-md mb-4">
                <Text className="text-lg font-semibold text-gray-800 mb-2">
                    Consultation du 12 Janvier 2023
                </Text>
                <Text className="text-gray-600">
                    Détails de la consultation concernant la douleur au nerf sciatique.
                </Text>
            </View>
            <View className="bg-white p-4 rounded-2xl shadow-md mb-4">
                <Text className="text-lg font-semibold text-gray-800 mb-2">
                    Consultation du 5 Février 2023
                </Text>
                <Text className="text-gray-600">
                    Détails de la consultation concernant les douleurs lombaires.
                </Text>
            </View>
        </ScrollView>
    )
}