import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Historique() {
    return (
        <ScrollView className="flex-1 p-4 bg-blue-50">
            <View>
                <Text className="mb-6 text-3xl font-bold text-blue-800">Historique</Text>
            </View>
            {/* Add more content here as needed */}
            <View className="p-4 mb-4 bg-white shadow-md rounded-2xl">
                <Text className="mb-2 text-lg font-semibold text-gray-800">
                    Consultation du 12 Janvier 2023
                </Text>
                <Text className="text-gray-600">
                    Détails de la consultation concernant la douleur au nerf sciatique.
                </Text>
            </View>
            <View className="p-4 mb-4 bg-white shadow-md rounded-2xl">
                <Text className="mb-2 text-lg font-semibold text-gray-800">
                    Consultation du 5 Février 2023
                </Text>
                <Text className="text-gray-600">
                    Détails de la consultation concernant les douleurs lombaires.
                </Text>
            </View>
        </ScrollView>
    )
}
