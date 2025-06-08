import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';

const data = [
    { 
        id: 1, 
        title: 'Emergency Fracture Reduction', 
        description: 'Expert techniques for quickly realigning bones to their correct position. Modern methods ensure effective reduction with minimal patient trauma and optimal healing outcomes.', 
        imageUrl: require('@/assets/images/aa.jpg'), 
        author: 'Dr. Marie Dubois' 
    },
    { 
        id: 2, 
        title: 'Therapeutic Massage for Recovery', 
        description: 'Specialized manual techniques that boost circulation and accelerate healing after trauma or intense exercise. These methods effectively relieve chronic muscle tension.', 
        imageUrl: require('@/assets/images/aa.jpg'), 
        author: 'Dr. Pierre Martin' 
    },
    { 
        id: 3, 
        title: 'Joint Dislocation Reduction', 
        description: 'Precise procedures to safely relocate dislocated joints while preventing nerve or vascular damage. Emergency intervention requires deep anatomical knowledge.', 
        imageUrl: require('@/assets/images/aa.jpg'), 
        author: 'Dr. Sophie Laurent' 
    },
    { 
        id: 4, 
        title: 'Lymphatic Drainage Therapy', 
        description: 'Gentle techniques that reduce swelling, boost immunity, and accelerate tissue healing. This rhythmic method improves lymphatic circulation and reduces inflammation effectively.', 
        imageUrl: require('@/assets/images/aa.jpg'), 
        author: 'Dr. Jean Moreau' 
    },
]

export default function Article() {
    return (
        <View style={tw`flex-1`}>
            <Text style={tw`text-lg font-bold text-gray-800`}>{data.length > 0 ? 'Physiotherapy & Rehabilitation Articles' : ''}</Text>
            <FlatList
                data={data}
                renderItem={({ item, index }) => (
                    <View key={index} style={tw`flex-row gap-4 h-40 p-4 my-2 bg-indigo-200 shadow rounded-2xl`}>
                        <View style={tw`flex-1 justify-between`}>
                            <View style={tw`flex-1`}>
                                <Text style={tw`text-lg font-semibold text-gray-800`} ellipsizeMode='tail' numberOfLines={1}>{item.title}</Text>
                                <Text style={tw`font-bold text-white`} ellipsizeMode='tail' numberOfLines={4}>{item.description}</Text>
                            </View>
                            <Text style={tw`text-gray-500`}>{item.author}</Text>
                        </View>
                        <View style={tw`flex-row items-center w-24 bg-white rounded-3xl shadow`}>
                            <Image source={item.imageUrl} style={tw`w-full h-full rounded-3xl`} />
                        </View>
                    </View>
                )}
                contentContainerStyle={tw`gap-1 px-2`}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={<Text style={tw`text-base text-center text-gray-400`}>No Articles Found</Text>}
                ListFooterComponent={() => (
                    <View style={tw`h-5 mb-2`} >
                        <Text style={tw`text-base text-center text-gray-400`}>Explore our latest rehabilitation techniques</Text>
                    </View>
                )}
                horizontal={false}
            />
        </View>
    )
}