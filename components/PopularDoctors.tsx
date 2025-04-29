import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import AntDesign from '@expo/vector-icons/AntDesign';

const popularDoctors = [
    { id: '1', name: 'Dr. John Doe', specialty: 'Cardiology', price: 50, imageURl: require('@/assets/images/doctors/black-man.jpg'), rating: 4.5 },
    { id: '2', name: 'Dr. Jane Smith', specialty: 'Dermatology', price: 60, imageURl: require('@/assets/images/doctors/black-man.jpg'), rating: 4.0 },
    { id: '3', name: 'Dr. Emily Johnson Leroy', specialty: 'Pediatrics', price: 55, imageURl: require('@/assets/images/doctors/black-man.jpg'), rating: 4.8 },
    { id: '4', name: 'Dr. Michael Brown', specialty: 'Neurology', price: 70, imageURl: require('@/assets/images/doctors/black-man.jpg'), rating: 4.2 },
    { id: '5', name: 'Dr. Sarah Davis', specialty: 'Orthopedics', price: 65, imageURl: require('@/assets/images/doctors/black-man.jpg'), rating: 4.7 },
    { id: '6', name: 'Dr. David Wilson', specialty: 'Gynecology', price: 75, imageURl: require('@/assets/images/doctors/black-man.jpg'), rating: 4.3 },
    { id: '7', name: 'Dr. Laura Garcia', specialty: 'Psychiatry', price: 80, imageURl: require('@/assets/images/doctors/black-man.jpg'), rating: 4.6 },
]

export default function PopularDoctors() {
    return (
        <View style={tw`relative flex-1 mt-2`}>
            <View style={tw`flex-row items-center justify-between mb-2`}>
                <Text style={tw`text-lg font-bold text-gray-800`}>Popular</Text>
                <Text style={tw`text-base font-bold text-blue-800`}>View All</Text>
            </View>
            <FlatList
                data={popularDoctors}
                contentContainerStyle={tw`gap-4 p-2`}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<Text style={tw`text-base text-center text-gray-400`}>No Doctors Found</Text>}
                renderItem={({ item }) => (
                    <View style={tw`flex-row justify-between gap-1 h-30 px-2 py-4 bg-blue-50 shadow rounded-lg`}>
                        <View style={tw`flex-row flex-1`}>
                            <View style={tw`relative w-20 h-full mr-2`}>
                                <Image style={tw`w-full h-full rounded-3xl`} source={item.imageURl} />
                            </View>
                            <View style={tw`flex-1`}>
                                <Text style={tw`text-lg font-semibold text-gray-800`} ellipsizeMode='tail' numberOfLines={1}>{item.name}</Text>
                                <Text style={tw`text-sm text-gray-600`} ellipsizeMode='tail' numberOfLines={1}>Specialty: {item.specialty}</Text>
                                <Text style={tw`text-sm text-gray-600`} ellipsizeMode='tail' numberOfLines={1}>Price: ${item.price} / hour</Text>
                                <View style={tw`flex-row items-center`}>
                                    <AntDesign name="star" size={18} color="#FFD700" />
                                    <Text style={tw`text-sm font-semibold text-gray-800 ml-1`}>{item.rating}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={tw``}>
                            <TouchableOpacity
                                style={tw`px-4 py-2 bg-blue-600 rounded-lg`}
                                onPress={() => console.log(`Booking ${item.name}`)}
                                activeOpacity={0.7}
                            >
                                <Text style={tw`text-white text-xs font-semibold`}>Book Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}
