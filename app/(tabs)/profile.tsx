import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useUserAuth } from '@/store/useUserAuth'

export default function Profile() {
    const closeSessionToggle = useUserAuth((state) => state.toggleHasOnboarded)
    const handleCloseSession = () => {
        // Logic to close the session goes here
        closeSessionToggle() // Toggle the onboarding state
    }
    return (
        <View>
            <View>
                <Text className="mb-6 text-3xl font-bold text-blue-800">Profile</Text>
            </View>
            <TouchableOpacity
                className="p-2 mx-6 mb-4 bg-blue-600 shadow-md rounded-2xl"
                onPress={() => handleCloseSession()}
                activeOpacity={0.8}
            >
                <Text className="text-lg text-center font-semibold text-white">
                    fermer la session
                </Text>
            </TouchableOpacity>
        </View>
    )
}