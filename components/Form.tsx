import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import tw from 'twrnc';

export default function PhysiotherapyForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    pathology: '',
    painLocation: '',
    painLevel: '1',
    painStart: '',
    previousTreatments: '',
    medicalHistory: '',
    medications: '',
  });

  const pathologies = ["Rééducation", "Ostéopathie", "Massage"];

  const painLocations = [
    { category: "Articulations", locations: ["Épaule", "Coude", "Poignet", "Hanche", "Genou", "Cheville"] },
    { category: "Colonne vertébrale", locations: ["Cou", "Dos", "Taille"] },
    { category: "Autres", locations: ["Scoliose"] }
  ];

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.pathology || !formData.painLocation) {
      Alert.alert("Champs manquants", "Veuillez remplir tous les champs obligatoires (*)");
      return;
    }

    console.log("Formulaire soumis:", formData);
    Alert.alert("Merci", "Votre physiothérapeute examinera vos informations avant votre rendez-vous.");
  };

  return (
    <ScrollView style={tw`bg-blue-50 flex-1`} contentContainerStyle={tw`p-4`}>
      <Text style={tw`text-2xl font-bold text-blue-800 mb-6 text-center`}>
        Consultation de Physiothérapie
      </Text>

         <View style={tw`bg-white p-4 mb-6 rounded-lg shadow`}>
        <Text style={tw`text-lg font-semibold text-blue-700 mb-4 border-b pb-2`}>
          Informations Personnelles
        </Text>

        <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>Prénom *</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-md p-2 mb-4`}
          value={formData.firstName}
          onChangeText={(text) => handleChange('firstName', text)}
          placeholder="Votre prénom"
        />

        <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>Nom *</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-md p-2 mb-4`}
          value={formData.lastName}
          onChangeText={(text) => handleChange('lastName', text)}
          placeholder="Votre nom"
        />

        <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>Date de naissance</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-md p-2 mb-4`}
          value={formData.dateOfBirth}
          onChangeText={(text) => handleChange('dateOfBirth', text)}
          placeholder="JJ/MM/AAAA"
        />

        <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>Téléphone</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-md p-2 mb-4`}
          value={formData.phone}
          onChangeText={(text) => handleChange('phone', text)}
          keyboardType="phone-pad"
          placeholder="Votre numéro"
        />

        <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>Email</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-md p-2`}
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          keyboardType="email-address"
          placeholder="Votre email"
        />
      </View>

      
      <View style={tw`bg-white p-4 mb-6 rounded-lg shadow`}>
        <Text style={tw`text-lg font-semibold text-blue-700 mb-4 border-b pb-2`}>
          Pathologie à traiter *
        </Text>

        <View style={tw`flex-row justify-between mb-4`}>
          {pathologies.map((item) => (
            <TouchableOpacity
              key={item}
              style={tw`flex-1 mx-1 px-3 py-2 rounded-md ${
                formData.pathology === item ? 'bg-blue-600' : 'bg-gray-100'
              }`}
              onPress={() => handleChange('pathology', item)}
            >
              <Text style={tw`text-center ${formData.pathology === item ? 'text-white font-bold' : 'text-gray-700'}`}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>Localisation de la douleur *</Text>
        <View style={tw`border border-gray-300 rounded-md mb-4`}>
          <Picker
            selectedValue={formData.painLocation}
            onValueChange={(value) => handleChange('painLocation', value)}
            style={Platform.OS === 'android' ? tw`text-gray-700` : undefined}
          >
            <Picker.Item label="Sélectionnez une zone" value="" />
            {painLocations.map((group) =>
              group.locations.map((loc) => (
                <Picker.Item key={loc} label={`${group.category} - ${loc}`} value={loc} />
              ))
            )}
          </Picker>
        </View>

        <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>Niveau de douleur (1-10)</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-md p-2 mb-4`}
          keyboardType="numeric"
          value={formData.painLevel}
          onChangeText={(text) => handleChange('painLevel', text)}
        />

        <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>Début des symptômes</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-md p-2`}
          value={formData.painStart}
          onChangeText={(text) => handleChange('painStart', text)}
          placeholder="Depuis quand avez-vous mal ?"
        />
      </View>

      
      <View style={tw`bg-white p-4 mb-6 rounded-lg shadow`}>
        <Text style={tw`text-lg font-semibold text-blue-700 mb-4 border-b pb-2`}>
          Informations médicales
        </Text>

        <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>Traitements précédents</Text>
        <TextInput
          multiline
          numberOfLines={3}
          style={tw`border border-gray-300 rounded-md p-2 mb-4`}
          value={formData.previousTreatments}
          onChangeText={(text) => handleChange('previousTreatments', text)}
          placeholder="Avez-vous déjà reçu des traitements pour ce problème ?"
        />

        <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>Antécédents médicaux</Text>
        <TextInput
          multiline
          numberOfLines={3}
          style={tw`border border-gray-300 rounded-md p-2 mb-4`}
          value={formData.medicalHistory}
          onChangeText={(text) => handleChange('medicalHistory', text)}
          placeholder="Chirurgies, maladies chroniques"
        />

        <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>Médicaments actuels</Text>
        <TextInput
          multiline
          numberOfLines={3}
          style={tw`border border-gray-300 rounded-md p-2`}
          value={formData.medications}
          onChangeText={(text) => handleChange('medications', text)}
          placeholder="Médicaments que vous prenez"
        />
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        style={tw`bg-blue-600 py-3 rounded-lg shadow-md`}
      >
        <Text style={tw`text-center text-white text-lg font-bold`}>
          Soumettre
        </Text>
      </TouchableOpacity>

      <Text style={tw`text-gray-500 mt-4 text-center text-xs`}>
        Champs obligatoires
      </Text>
    </ScrollView>
  );
}
