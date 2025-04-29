import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

type RegisterScreenProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1 bg-blue-900 justify-center items-center px-6`}>
        {/* Logo */}
        <View style={tw`mb-8`}>
          <Image
            source={require('@/assets/images/icon.png')} // remplace par ton logo
            style={tw`w-24 h-24`}
            resizeMode="contain"
          />
        </View>

        {/* Formulaire */}
        <View style={tw`bg-white p-6 rounded-2xl w-full`}>
          <Text style={tw`text-xl font-bold text-center text-gray-800 mb-4`}>Create an account</Text>

          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#999"
            style={tw`border border-gray-300 rounded-lg px-4 py-3 mb-4 text-gray-800`}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            style={tw`border border-gray-300 rounded-lg px-4 py-3 mb-4 text-gray-800`}
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            secureTextEntry
            style={tw`border border-gray-300 rounded-lg px-4 py-3 mb-6 text-gray-800`}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity
            style={tw`bg-blue-900 py-3 rounded-lg mb-4`}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={tw`text-white text-center font-semibold`}>Register</Text>
          </TouchableOpacity>

          <Text style={tw`text-center text-gray-600`}>
            Already have an account?
            <Text
              style={tw`text-yellow-500 font-semibold`}
              onPress={() => navigation.navigate('Login')}
            >
              {' '}Sign in
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
