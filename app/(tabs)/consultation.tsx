import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import AvailableDoctors from '@/components/AvailableDoctors';
import PopularDoctors from '@/components/PopularDoctors';
import BGCircle from '@/components/BGCircle';

export default function consultation() {
  return (
    <View style={tw`relative flex-1 px-4 bg-white`}>
      <BGCircle position='top-left' color='blue-100' />
      <View style={tw`flex-1 z-10`}>
        <Text className="my-2 text-2xl font-bold text-blue-800">Consultation</Text>
        <AvailableDoctors />
        <PopularDoctors />
      </View>
      <BGCircle position='bottom-right' color='blue-100' />
    </View>
  )
}






{/* <ScrollView className="flex-1 p-4 bg-blue-50">
  

  <View className="p-4 mb-4 bg-white shadow-md rounded-2xl">
    <Text className="mb-2 text-lg font-semibold text-gray-800">
      Consultation avec notre assistant
    </Text>
    <Text className="text-gray-600">
      Répondez à quelques questions pour que notre IA vous guide vers une solution adaptée à votre douleur au nerf sciatique.
    </Text>
    <TouchableOpacity
      onPress={() => router.push('/')}
      className="px-5 py-3 mt-4 bg-blue-600 rounded-xl"
    >
      <Text className="font-semibold text-center text-white">Commencer</Text>
    </TouchableOpacity>
  </View>

  <View className="p-4 mb-4 bg-white shadow-md rounded-2xl">
    <Text className="mb-2 text-lg font-semibold text-gray-800">
      Voir mes consultations précédentes
    </Text>
    <TouchableOpacity
      onPress={() => router.push('/')}
      className="px-4 py-2 mt-2 bg-gray-200 rounded-lg"
    >
      <Text className="text-center text-gray-700">Voir l’historique</Text>
    </TouchableOpacity>
  </View>
</ScrollView> */}
