import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function ConsultationScreen() {
  const router = useRouter();

  return (

    <ScrollView className="flex-1 bg-blue-50 p-4">
      <Text className="text-3xl font-bold text-blue-800 mb-6">Consultation</Text>

      <View className="bg-white p-4 rounded-2xl shadow-md mb-4">
        <Text className="text-lg font-semibold text-gray-800 mb-2">
          Consultation avec notre assistant
        </Text>
        <Text className="text-gray-600">
          Répondez à quelques questions pour que notre IA vous guide vers une solution adaptée à votre douleur au nerf sciatique.
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/chatbot')}
          className="mt-4 bg-blue-600 py-3 px-5 rounded-xl"
        >
          <Text className="text-white text-center font-semibold">Commencer</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-white p-4 rounded-2xl shadow-md mb-4">
        <Text className="text-lg font-semibold text-gray-800 mb-2">
          Voir mes consultations précédentes
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/historique')}
          className="mt-2 bg-gray-200 py-2 px-4 rounded-lg"
        >
          <Text className="text-gray-700 text-center">Voir l’historique</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
