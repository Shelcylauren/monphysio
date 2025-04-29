import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'

const availableDoctors = [
    { id: '1', name: 'Dr. John Doe', isOnline: true, imageURl: require('@/assets/images/doctors/black-female.jpg') }, 
    { id: '2', name: 'Dr. Jane Smith', isOnline: false, imageURl: require('@/assets/images/doctors/black-man-sitting.jpg') },
    { id: '3', name: 'Dr. Emily Johnson', isOnline: true, imageURl: require('@/assets/images/doctors/black-man-standing.jpg') },
    { id: '4', name: 'Dr. Michael Brown', isOnline: false, imageURl: require('@/assets/images/doctors/black-man.jpg') },
    { id: '5', name: 'Dr. Sarah Davis', isOnline: true, imageURl: require('@/assets/images/doctors/black-man-sitting.jpg') },
    { id: '6', name: 'Dr. David Wilson', isOnline: false, imageURl: require('@/assets/images/doctors/black-female.jpg') },
    { id: '7', name: 'Dr. Laura Garcia', isOnline: true, imageURl: require('@/assets/images/doctors/black-man-standing.jpg') },
    { id: '8', name: 'Dr. James Martinez', isOnline: false, imageURl: require('@/assets/images/doctors/black-man-sitting.jpg') },
    { id: '9', name: 'Dr. Patricia Rodriguez', isOnline: true, imageURl: require('@/assets/images/doctors/black-female.jpg') },
    { id: '10', name: 'Dr. Robert Lee', isOnline: false, imageURl: require('@/assets/images/doctors/black-man-sitting.jpg') },
]

export default function AvailableDoctors() {
    return (
        <View style={tw`relative`}>
            <View style={tw`flex-row items-center justify-between`}>
                <Text style={tw`text-lg font-bold text-gray-800`}>Live Doctors</Text>
                <Text style={tw`text-base font-bold text-blue-800`}>View All</Text>
            </View>
            <FlatList
                data={availableDoctors}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={tw`gap-1 px-2`}
                renderItem={({ item }) => {
                    if (!item.isOnline) return null;
                    return (
                        <View style={[tw`relative items-end p-1 my-2 overflow-visible bg-blue-200 shadow-md rounded-3xl`, { width: 100, height: 100 }]}>
                            {/* absolute blue status circle */}
                            <View style={tw`absolute z-10 w-5 h-5 ${item.isOnline ? 'bg-green-500' : 'bg-red-500'} border-2 border-white rounded-full -top-1 -right-1`} />
                            <Image style={tw`w-full h-full rounded-2xl`} source={item.imageURl} />
                        </View>
                    );
                }}
                keyExtractor={item => item.id}
            />
        </View>
    )
}