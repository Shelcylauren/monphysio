import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import tw from 'twrnc';
import Header from '@/components/Header'; // Assure-toi que le chemin est correct

export default function Index() {
  const [isTablet, setIsTablet] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const screenWidth = Dimensions.get('window').width;
    setIsTablet(screenWidth >= 768);
  }, []);

  return (
    <View style={tw`flex-1`}>
      {/* Header en haut de la page */}
      <Header isTablet={isTablet} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      <ImageBackground
        source={{ uri: 'https://i.imgur.com/aa.jpg' }}
        resizeMode="cover"
        style={tw`flex-1 justify-center items-center`}
        imageStyle={tw`opacity-90`}
      >
        <View style={tw`bg-white/80 p-6 rounded-2xl shadow-lg items-center`}>
          <Text style={tw`text-2xl font-semibold text-gray-800 text-center italic`}>
            Welcome To PhysioConsultation
          </Text>
          <Text style={tw`text-lg text-gray-600 mt-2 text-center italic`}>
            We are delighted to have you among us
          </Text>

          <Link href="/(tabs)/consultation" asChild>
            <TouchableOpacity style={tw`mt-6 bg-blue-600 px-6 py-3 rounded-full`}>
              <Text style={tw`text-white text-base font-medium italic`}>
                Aller à la Consultation
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ImageBackground>
    </View>
  );
}
