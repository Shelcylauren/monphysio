import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Dimensions, Image, TextInput } from 'react-native';
import { Link, useRouter } from 'expo-router';
import tw from 'twrnc';
import Lottie from 'lottie-react-native';

import { StatusBar } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';



export default function Index() {

  const router = useRouter();

  const handleDone = () => {
    console.log("Onboarding completed");
    router.replace('/(auth)/signin')
  }


  const SkipButton = ({ ...props }) => (
    <TouchableOpacity {...props} style={tw`p-4 p-e-6 bg-white rounded-r-full`} activeOpacity={0.8}>
      <Text style={tw`text-blue-600 text-lg font-bold`}>Skip</Text>
    </TouchableOpacity>
  );
  const NextButton = ({ ...props }) => (
    <TouchableOpacity {...props} style={tw`p-4 p-e-6 bg-white rounded-l-full`} activeOpacity={0.8}>
      <Text style={tw`text-blue-600 text-lg font-bold`}>Next</Text>
    </TouchableOpacity>
  );
  const DoneButton = ({ ...props }) => (
    <TouchableOpacity {...props} style={tw`p-4 p-e-6 bg-blue-600 rounded-l-full`} activeOpacity={0.8}>
      <Text style={tw`text-white text-lg font-bold`}>Done</Text>
    </TouchableOpacity>
  );
  return (
    <View style={tw`relative flex-1 bg-white`}>
      <Onboarding
        containerStyles={tw``}
        titleStyles={tw`text-2xl font-bold text-blue-800`}
        subTitleStyles={tw`text-base text-gray-500`}
        controlStatusBar={true}
        bottomBarHeight={90}
        bottomBarHighlight={false}
        DoneButtonComponent={DoneButton}
        NextButtonComponent={NextButton}
        SkipButtonComponent={SkipButton}
        onDone={handleDone}
        onSkip={handleDone}
        skipLabel="Skip"
        // imageContainerStyles={tw`w-full justify-center items-center`}
        pages={[
          {
            backgroundColor: '#a7f3d0',
            image: (
              <View style={tw`w-[300px] h-[400px]`}>
                <Lottie
                  style={{ width: "100%", height: "100%" }}
                  source={require('@/assets/lottieAnime/doctor-checking.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: '#fef3c7',
            image: (
              <View style={tw`w-[300px] h-[400px]`}>
                <Lottie
                  style={{ width: "100%", height: "100%" }}
                  source={require('@/assets/lottieAnime/browse-doctors.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: '#a78bfa',
            image: (
              <View style={tw`w-[300px] h-[400px]`}>
                <Lottie
                  style={{ width: "100%", height: "100%" }}
                  source={require('@/assets/lottieAnime/location-anime.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
        ]}
      />
      <StatusBar hidden />
    </View>
  );
}
