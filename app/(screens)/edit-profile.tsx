import React, { useState } from 'react';
import { 
  View, Text, ScrollView, TouchableOpacity, TextInput, 
  SafeAreaView, StatusBar, KeyboardAvoidingView, Platform,
  ActivityIndicator, Alert 
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import tw from 'twrnc';
import { router } from 'expo-router';
import { useUserAuth } from '@/store/useUserAuth';
import * as ImagePicker from 'expo-image-picker';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  city: string;
  postcode: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  healthInsurance: string;
  insuranceNumber: string;
  photoURL?: string;
}

export default function EditProfile() {
  // Get user from auth store
  const user = useUserAuth((state) => state?.user);
  const updateUser = useUserAuth((state) => state?.updateUser);

  // Form state
  const [profile, setProfile] = useState<UserProfile>({
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@example.com",
    phone: user?.phone || "+1 (555) 123-4567",
    dob: user?.dob || "January 15, 1985",
    gender: user?.gender || "Male",
    address: user?.address?.split(',')[0] || "123 Main Street",
    city: user?.address?.split(',')[1] || "Anytown",
    postcode: user?.postcode || "12345",
    emergencyContactName: user?.emergencyContact?.split('(')[0].trim() || "Jane Doe",
    emergencyContactPhone: user?.emergencyContact?.match(/\(([^)]+)\)/) ? user.emergencyContact.match(/\(([^)]+)\)/)[1] : "+1 555-987-6543",
    healthInsurance: user?.healthInsurance || "MediCare",
    insuranceNumber: user?.insuranceNumber || "123-45-6789",
    photoURL: user?.photoURL || "https://randomuser.me/api/portraits/men/32.jpg",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Handle form changes
  const handleChange = (field: keyof UserProfile, value: string): void => {
    setProfile(prev => ({ ...prev, [field]: value }));
    // Clear error when field is edited
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    if (!profile.name.trim()) newErrors.name = 'Name is required';
    if (!profile.email.trim()) newErrors.email = 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(profile.email)) newErrors.email = 'Please enter a valid email';
    if (!profile.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!profile.emergencyContactName.trim()) newErrors.emergencyContactName = 'Emergency contact name is required';
    if (!profile.emergencyContactPhone.trim()) newErrors.emergencyContactPhone = 'Emergency contact phone is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle image selection
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets[0].uri) {
        setProfile(prev => ({ ...prev, photoURL: result.assets[0].uri }));
      }
    } catch (error) {
      console.log('Error picking image:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Format the data
      const formattedData = {
        ...profile,
        address: `${profile.address}, ${profile.city}`,
        emergencyContact: `${profile.emergencyContactName} (${profile.emergencyContactPhone})`
      };
      
      // In a real app, you would send this to your API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Update local state
      updateUser(formattedData);
      
      Alert.alert(
        'Success', 
        'Your profile has been updated successfully.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error) {
      console.log('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Input component for consistent styling
  const FormInput = ({ 
    label, 
    value, 
    onChangeText, 
    placeholder, 
    keyboardType = 'default',
    error,
    secureTextEntry = false,
    autoCapitalize = 'sentences',
    editable = true
  }: {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    error?: string;
    secureTextEntry?: boolean;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    editable?: boolean;
  }) => (
    <View style={tw`mb-4`}>
      <Text style={tw`mb-1 text-sm font-medium text-gray-700`}>{label}</Text>
      <TextInput
        style={tw`px-4 py-3 text-base text-gray-700 bg-white border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg ${!editable ? 'bg-gray-100' : ''}`}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        editable={editable}
      />
      {error ? <Text style={tw`mt-1 text-xs text-red-500`}>{error}</Text> : null}
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      {/* Status Bar */}
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* Header */}
      <View style={tw`flex-row items-center p-4 bg-white border-b border-gray-200 shadow-sm`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`p-2 mr-2 rounded-full bg-blue-50`}>
          <Ionicons name="arrow-back" size={24} color="#3b82f6" />
        </TouchableOpacity>
        <Text style={tw`text-xl font-bold text-gray-800`}>Edit Profile</Text>
        {loading && <ActivityIndicator style={tw`ml-auto`} color="#3b82f6" />}
      </View>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
      >
        <ScrollView 
          style={tw`flex-1`}
          contentContainerStyle={tw`p-4`}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Photo */}
          <View style={tw`items-center mb-6`}>
            <View style={tw`relative w-24 h-24 mb-2 overflow-hidden bg-white border-2 border-blue-400 rounded-full shadow-md`}>
              {profile.photoURL ? (
                <View style={tw`w-full h-full`}>
                  <View style={tw`absolute inset-0 items-center justify-center`}>
                    <ActivityIndicator color="#3b82f6" />
                  </View>
                  <View style={tw`w-full h-full overflow-hidden rounded-full`}>
                    <View style={tw`w-full h-full bg-blue-100`} />
                  </View>
                </View>
              ) : null}
            </View>
            
            <TouchableOpacity onPress={pickImage} style={tw`flex-row items-center p-2`}>
              <MaterialIcons name="photo-camera" size={18} color="#3b82f6" />
              <Text style={tw`ml-1 font-medium text-blue-600`}>Change Photo</Text>
            </TouchableOpacity>
          </View>
          
          {/* Personal Information */}
          <View style={tw`mb-6`}>
            <Text style={tw`mb-3 text-lg font-bold text-blue-800`}>Personal Information</Text>
            
            <FormInput
              label="Full Name"
              value={profile.name}
              onChangeText={(text) => handleChange('name', text)}
              placeholder="Enter your full name"
              error={errors.name}
            />
            
            <FormInput
              label="Email Address"
              value={profile.email}
              onChangeText={(text) => handleChange('email', text)}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />
            
            <FormInput
              label="Phone Number"
              value={profile.phone}
              onChangeText={(text) => handleChange('phone', text)}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              error={errors.phone}
            />
            
            <FormInput
              label="Date of Birth"
              value={profile.dob}
              onChangeText={(text) => handleChange('dob', text)}
              placeholder="MM/DD/YYYY"
              error={errors.dob}
            />
            
            <FormInput
              label="Gender"
              value={profile.gender}
              onChangeText={(text) => handleChange('gender', text)}
              placeholder="Enter your gender"
              error={errors.gender}
            />
          </View>
          
          {/* Address */}
          <View style={tw`mb-6`}>
            <Text style={tw`mb-3 text-lg font-bold text-blue-800`}>Address</Text>
            
            <FormInput
              label="Street Address"
              value={profile.address}
              onChangeText={(text) => handleChange('address', text)}
              placeholder="Enter your street address"
              error={errors.address}
            />
            
            <FormInput
              label="City"
              value={profile.city}
              onChangeText={(text) => handleChange('city', text)}
              placeholder="Enter your city"
              error={errors.city}
            />
            
            <FormInput
              label="Postal Code"
              value={profile.postcode}
              onChangeText={(text) => handleChange('postcode', text)}
              placeholder="Enter your postal code"
              error={errors.postcode}
            />
          </View>
          
          {/* Emergency Contact */}
          <View style={tw`mb-6`}>
            <Text style={tw`mb-3 text-lg font-bold text-blue-800`}>Emergency Contact</Text>
            
            <FormInput
              label="Contact Name"
              value={profile.emergencyContactName}
              onChangeText={(text) => handleChange('emergencyContactName', text)}
              placeholder="Enter emergency contact name"
              error={errors.emergencyContactName}
            />
            
            <FormInput
              label="Contact Phone"
              value={profile.emergencyContactPhone}
              onChangeText={(text) => handleChange('emergencyContactPhone', text)}
              placeholder="Enter emergency contact phone"
              keyboardType="phone-pad"
              error={errors.emergencyContactPhone}
            />
          </View>
          
          {/* Health Insurance */}
          <View style={tw`mb-8`}>
            <Text style={tw`mb-3 text-lg font-bold text-blue-800`}>Health Insurance</Text>
            
            <FormInput
              label="Insurance Provider"
              value={profile.healthInsurance}
              onChangeText={(text) => handleChange('healthInsurance', text)}
              placeholder="Enter insurance provider"
              error={errors.healthInsurance}
            />
            
            <FormInput
              label="Policy/Member Number"
              value={profile.insuranceNumber}
              onChangeText={(text) => handleChange('insuranceNumber', text)}
              placeholder="Enter policy number"
              error={errors.insuranceNumber}
            />
          </View>
          
          {/* Save Button */}
          <View style={tw`flex-row mb-10`}>
            <TouchableOpacity 
              style={tw`flex-1 p-4 mr-2 bg-white border border-gray-300 rounded-lg`}
              onPress={() => router.back()}
              disabled={loading}
            >
              <Text style={tw`font-medium text-center text-gray-700`}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={tw`flex-1 ml-2 p-4 rounded-lg bg-blue-600 ${loading ? 'opacity-70' : ''}`}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text style={tw`font-medium text-center text-white`}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
