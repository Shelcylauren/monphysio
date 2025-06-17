import React from 'react';
import { View, FlatList, Text, Image } from 'react-native';
import tw from 'twrnc';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const services = [
  {
    id: '1',
    title: 'Rehabilitation',
    icon: 'human-male-board',
    description: 'Targeted exercises to recover after injuries or surgeries.',
  },
  {
    id: '2',
    title: 'Massage Therapy',
    icon: 'hand-heart',
    description: 'Massage techniques to relieve pain and improve circulation.',
  },
  {
    id: '3',
    title: 'Orthopedic Care',
    icon: 'bone',
    description: 'Treatment for musculoskeletal issues involving bones and joints.',
  },
  {
    id: '4',
    title: 'Birth Preparation',
    icon: 'baby-carriage',
    description: 'Exercises and guidance to prepare the body for childbirth.',
  },
  {
    id: '5',
    title: 'Pelvic Floor Rehab',
    icon: 'human-female-female',
    description: 'Strengthening pelvic muscles after childbirth or for prevention.',
  },
];

const data = [
  {
    id: 1,
    instructor: 'Shelcy Leroy',
    imageUrl: require('@/assets/images/aa.jpg'),
    duration: '2 hours',
    description: 'Hands-on physiotherapy sessions focused on personalized recovery.',
  },
  {
    id: 2,
    instructor: 'Instructor 2',
    imageUrl: require('@/assets/images/aa.jpg'),
    duration: '1 hour',
    description: 'One-on-one sessions targeting muscle relaxation and posture.',
  },
  // ... other instructors
];

export default function Recommendation() {
  return (
    <View style={tw`p-4`}>
      {/* Services Section */}
      <Text style={tw`text-lg font-bold text-gray-800 mb-2`}>Services</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`mb-4 gap-4`}
        renderItem={({ item }) => (
          <View style={tw`bg-white rounded-lg w-52 p-4 shadow-md`}>
            <View style={tw`items-center mb-2`}>
              {/* Cast icon name as any to fix TypeScript error */}
              <MaterialCommunityIcons name={item.icon as any} size={32} color="#2563eb" />
              <Text style={tw`text-center text-base font-semibold text-gray-800 mt-1`}>
                {item.title}
              </Text>
            </View>
            <Text style={tw`text-sm text-gray-600 text-center`}>
              {item.description}
            </Text>
          </View>
        )}
      />

      {/* Instructors Section */}
      <Text style={tw`text-lg font-bold text-gray-800 mb-2`}>Instructors</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={tw`p-4 flex-row bg-blue-600 justify-center items-center rounded-lg my-1 w-80 h-[30]`}>
            <Image source={item.imageUrl} style={tw`w-16 h-16 rounded-full`} />
            <View style={tw`flex-1 ml-4`}>
              <Text style={tw`text-gray-200 text-xs`}>{item.duration}</Text>
              <Text style={tw`font-bold text-lg text-white`} numberOfLines={1} ellipsizeMode="tail">
                {item.instructor}
              </Text>
              <Text style={tw`text-gray-300`} numberOfLines={3} ellipsizeMode="tail">
                {item.description}
              </Text>
            </View>
          </View>
        )}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`gap-4`}
      />
    </View>
  );
}
