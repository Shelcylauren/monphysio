import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Modal, Alert } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import AntDesign from '@expo/vector-icons/AntDesign';


interface Doctor {
    id: string;
    name: string;
    specialty: string;
    price: number;
    imageUrl: any; 
    rating: number;
}

interface RenderItemProps {
    item: Doctor;
}

const popularDoctors: Doctor[] = [
    { 
        id: '1', 
        name: 'Dr. John Doe', 
        specialty: 'Rehabilitation', 
        price: 25000, 
        imageUrl: require('@/assets/images/doctors/5-54.jpg'), 
        rating: 4.5 
    },
    { 
        id: '2', 
        name: 'Dr. Jane Smith', 
        specialty: 'Therapeutic Massage', 
        price: 30000, 
        imageUrl: require('@/assets/images/doctors/54.jpg'), 
        rating: 4.0 
    },
    { 
        id: '3', 
        name: 'Dr. Emily Johnson', 
        specialty: 'Physiotherapy', 
        price: 28000, 
        imageUrl: require('@/assets/images/doctors/2525.jpg'), 
        rating: 4.8 
    },
    { 
        id: '4', 
        name: 'Dr. Michael Brown', 
        specialty: 'Osteopathy', 
        price: 35000, 
        imageUrl: require('@/assets/images/doctors/black-man.jpg'), 
        rating: 4.2 
    },
    { 
        id: '5', 
        name: 'Dr. Sarah Davis', 
        specialty: 'Kinesitherapy', 
        price: 32000, 
        imageUrl: require('@/assets/images/doctors/p.jpg'), 
        rating: 4.7 
    },
    { 
        id: '6', 
        name: 'Dr. David Wilson', 
        specialty: 'Acupuncture', 
        price: 38000, 
        imageUrl: require('@/assets/images/doctors/pho.jpg'), 
        rating: 4.3 
    },
    { 
        id: '7', 
        name: 'Dr. Laura Garcia', 
        specialty: 'Reflexology', 
        price: 40000, 
        imageUrl: require('@/assets/images/doctors/black-female.jpg'), 
        rating: 4.6 
    },
]

export default function PopularDoctors(): JSX.Element {
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const formatPrice = (price: number): string => {
        return `${price.toLocaleString()} CFA`;
    };

    const openConsultation = (doctor: Doctor): void => {
        setSelectedDoctor(doctor);
        setModalVisible(true);
    };

    const startConsultation = (): void => {
        if (selectedDoctor) {
            Alert.alert(
                "Starting Consultation",
                `Starting consultation with ${selectedDoctor.name} (${selectedDoctor.specialty}). Redirecting to consultation room...`,
                [
                    {
                        text: "OK",
                        onPress: () => {
                            setModalVisible(false);
                            setSelectedDoctor(null);
                            
                        }
                    }
                ]
            );
        }
    };

    const closeModal = (): void => {
        setModalVisible(false);
        setSelectedDoctor(null);
    };

    const renderDoctorCard = ({ item }: RenderItemProps): JSX.Element => (
        <View style={tw`flex-row justify-between items-center gap-2 h-32 px-3 py-4 bg-blue-50 shadow-sm rounded-xl mb-2 mx-1`}>
            <View style={tw`flex-row flex-1`}>
                <View style={tw`relative w-20 h-full mr-3`}>
                    <Image 
                        style={tw`w-full h-full rounded-3xl`} 
                        source={item.imageUrl}
                        resizeMode="cover"
                    />
                </View>
                <View style={tw`flex-1 justify-center`}>
                    <Text 
                        style={tw`text-lg font-semibold text-gray-800 mb-1`} 
                        ellipsizeMode='tail' 
                        numberOfLines={1}
                    >
                        {item.name}
                    </Text>
                    <Text 
                        style={tw`text-sm text-gray-600 mb-1`} 
                        ellipsizeMode='tail' 
                        numberOfLines={1}
                    >
                        Specialty: {item.specialty}
                    </Text>
                    <Text 
                        style={tw`text-sm text-gray-600 mb-2`} 
                        ellipsizeMode='tail' 
                        numberOfLines={1}
                    >
                        Price: {formatPrice(item.price)} / hour
                    </Text>
                    <View style={tw`flex-row items-center`}>
                        <AntDesign name="star" size={16} color="#FFD700" />
                        <Text style={tw`text-sm font-semibold text-gray-800 ml-1`}>
                            {item.rating}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={tw`justify-center`}>
                <TouchableOpacity
                    style={tw`px-4 py-3 bg-blue-600 rounded-lg shadow-sm`}
                    onPress={() => openConsultation(item)}
                    activeOpacity={0.7}
                >
                    <Text style={tw`text-white text-xs font-semibold text-center`}>
                        Consult Now
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={tw`relative flex-1 mt-2`}>
            <View style={tw`flex-row items-center justify-between mb-4 px-2`}>
                <Text style={tw`text-xl font-bold text-gray-800`}>Popular</Text>
                <TouchableOpacity>
                    <Text style={tw`text-base font-bold text-blue-600`}>View All</Text>
                </TouchableOpacity>
            </View>
            
            <FlatList<Doctor>
                data={popularDoctors}
                contentContainerStyle={tw`px-1 pb-4`}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <Text style={tw`text-base text-center text-gray-400 py-8`}>
                        No Doctors Found
                    </Text>
                }
                renderItem={renderDoctorCard}
                keyExtractor={(item: Doctor) => item.id}
            />

            {/* Consultation Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
                    <View style={tw`bg-white rounded-2xl p-6 mx-4 w-11/12 max-w-md shadow-2xl`}>
                        <Text style={tw`text-xl font-bold text-gray-800 text-center mb-4`}>
                            Start Consultation
                        </Text>
                        
                        {selectedDoctor && (
                            <View style={tw`mb-6`}>
                                <Text style={tw`text-gray-600 text-center mb-3`}>
                                    You are about to start a consultation with:
                                </Text>
                                
                                <View style={tw`bg-blue-50 rounded-xl p-4 mb-4`}>
                                    <Text style={tw`text-lg font-semibold text-gray-800 text-center mb-2`}>
                                        {selectedDoctor.name}
                                    </Text>
                                    <Text style={tw`text-gray-600 text-center mb-1`}>
                                        <Text style={tw`font-semibold`}>Specialty:</Text> {selectedDoctor.specialty}
                                    </Text>
                                    <Text style={tw`text-gray-600 text-center mb-1`}>
                                        <Text style={tw`font-semibold`}>Rate:</Text> {formatPrice(selectedDoctor.price)} / hour
                                    </Text>
                                    <View style={tw`flex-row items-center justify-center mt-2`}>
                                        <AntDesign name="star" size={16} color="#FFD700" />
                                        <Text style={tw`text-gray-800 font-semibold ml-1`}>
                                            {selectedDoctor.rating}
                                        </Text>
                                    </View>
                                </View>
                                
                                <Text style={tw`text-gray-500 text-center text-sm`}>
                                    The consultation will be conducted via video or chat according to your preferences.
                                </Text>
                            </View>
                        )}
                        
                        <View style={tw`flex-row gap-3`}>
                            <TouchableOpacity
                                style={tw`flex-1 bg-gray-500 py-3 px-4 rounded-lg`}
                                onPress={closeModal}
                                activeOpacity={0.7}
                            >
                                <Text style={tw`text-white font-semibold text-center`}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                style={tw`flex-1 bg-green-600 py-3 px-4 rounded-lg`}
                                onPress={startConsultation}
                                activeOpacity={0.7}
                            >
                                <Text style={tw`text-white font-semibold text-center`}>
                                    Start Consultation
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}