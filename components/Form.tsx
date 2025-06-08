import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import tw from 'twrnc';

export default function PhysiotherapyForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    address: '',
    insurance: '',
    insuranceNumber: '',
    referral: '',
    occupation: '',
    emergencyContact: '',
    emergencyPhone: '',
    pathology: '',
    painLocation: '',
    painLevel: '1',
    painStart: '',
    painFrequency: '',
    symptomsDescription: '',
    factorsWorsening: '',
    factorsImproving: '',
    previousTreatments: '',
    medicalHistory: '',
    surgeries: '',
    medications: '',
  });

  const pathologies = ['Rééducation', 'Ostéopathie', 'Massage'];
  const painLocations = [
    {
      category: 'Articulations',
      locations: ['Épaule', 'Coude', 'Poignet', 'Hanche', 'Genou', 'Cheville'],
    },
    {
      category: 'Colonne vertébrale',
      locations: ['Cou', 'Dos', 'Taille'],
    },
    {
      category: 'Autres',
      locations: ['Scoliose'],
    },
  ];

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.pathology || !formData.painLocation) {
      Alert.alert('Champs manquants', 'Veuillez remplir tous les champs obligatoires (*)');
      return;
    }

    console.log('Formulaire soumis:', formData);
    Alert.alert('Merci', 'Votre physiothérapeute examinera vos informations.');
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

        {[
          { label: 'Prénom *', field: 'firstName', placeholder: 'Votre prénom' },
          { label: 'Nom *', field: 'lastName', placeholder: 'Votre nom' },
          { label: 'Date de naissance', field: 'dateOfBirth', placeholder: 'JJ/MM/AAAA' },
          { label: 'Téléphone', field: 'phone', placeholder: 'Votre numéro', keyboardType: 'phone-pad' },
          { label: 'Email', field: 'email', placeholder: 'Votre email', keyboardType: 'email-address' },
          { label: 'Adresse', field: 'address', placeholder: 'Votre adresse' },
          { label: 'Profession', field: 'occupation', placeholder: 'Votre profession' },
          { label: 'Personne à contacter en urgence', field: 'emergencyContact', placeholder: 'Nom de la personne' },
          { label: 'Téléphone de la personne à contacter', field: 'emergencyPhone', placeholder: 'Numéro', keyboardType: 'phone-pad' },
        ].map((input, idx) => (
          <View key={idx}>
            <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>{input.label}</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-md p-2 mb-4`}
              value={formData[input.field as keyof typeof formData]}
              onChangeText={(text) => handleChange(input.field, text)}
              placeholder={input.placeholder}
              keyboardType={input.keyboardType as any}
            />
          </View>
        ))}
      </View>

      <View style={tw`bg-white p-4 mb-6 rounded-lg shadow`}>
        <Text style={tw`text-lg font-semibold text-blue-700 mb-4 border-b pb-2`}>
          Informations Médicales
        </Text>

        <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>Assurance</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-md p-2 mb-4`}
          value={formData.insurance}
          onChangeText={(text) => handleChange('insurance', text)}
          placeholder="Nom de l'assurance"
        />

        <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>Numéro de l'assurance</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-md p-2 mb-4`}
          value={formData.insuranceNumber}
          onChangeText={(text) => handleChange('insuranceNumber', text)}
          placeholder="Numéro de police"
        />

        <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>Référé par</Text>
        <TextInput
          style={tw`border border-gray-300 rounded-md p-2 mb-4`}
          value={formData.referral}
          onChangeText={(text) => handleChange('referral', text)}
          placeholder="Médecin, autre thérapeute, etc."
        />
      </View>

      
      <View style={tw`bg-white p-4 mb-6 rounded-lg shadow`}>
        <Text style={tw`text-lg font-semibold text-blue-700 mb-4 border-b pb-2`}>
          Détails de la Douleur et Pathologie *
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
              <Text
                style={tw`text-center ${
                  formData.pathology === item ? 'text-white font-bold' : 'text-gray-700'
                }`}
              >
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

        {[
          { label: 'Niveau de douleur (1-10)', field: 'painLevel', keyboardType: 'numeric' },
          { label: 'Début des symptômes', field: 'painStart', placeholder: 'Depuis quand avez-vous mal ?' },
          { label: 'Fréquence des douleurs', field: 'painFrequency', placeholder: 'Ex: tous les jours, occasionnellement' },
          { label: 'Description des symptômes', field: 'symptomsDescription' },
          { label: 'Facteurs aggravants', field: 'factorsWorsening' },
          { label: 'Facteurs améliorants', field: 'factorsImproving' },
        ].map((input, idx) => (
          <View key={idx}>
            <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>{input.label}</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-md p-2 mb-4`}
              value={formData[input.field as keyof typeof formData]}
              onChangeText={(text) => handleChange(input.field, text)}
              placeholder={input.placeholder}
              keyboardType={input.keyboardType as any}
            />
          </View>
        ))}
      </View>

     
      <View style={tw`bg-white p-4 mb-6 rounded-lg shadow`}>
        <Text style={tw`text-lg font-semibold text-blue-700 mb-4 border-b pb-2`}>
          Antécédents Médicaux
        </Text>

        {[
          { label: 'Traitements précédents', field: 'previousTreatments', placeholder: 'Avez-vous reçu des traitements ?' },
          { label: 'Antécédents médicaux', field: 'medicalHistory', placeholder: 'Maladies chroniques, allergies' },
          { label: 'Chirurgies', field: 'surgeries', placeholder: 'Chirurgies passées' },
          { label: 'Médicaments actuels', field: 'medications', placeholder: 'Traitements en cours' },
        ].map((input, idx) => (
          <View key={idx}>
            <Text style={tw`text-sm font-medium text-gray-700 mb-1`}>{input.label}</Text>
            <TextInput
              multiline
              numberOfLines={3}
              style={tw`border border-gray-300 rounded-md p-2 mb-4`}
              value={formData[input.field as keyof typeof formData]}
              onChangeText={(text) => handleChange(input.field, text)}
              placeholder={input.placeholder}
            />
          </View>
        ))}
      </View>

   
      <TouchableOpacity
        onPress={handleSubmit}
        style={tw`bg-blue-600 py-3 rounded-lg shadow-md`}
      >
        <Text style={tw`text-center text-white text-lg font-bold`}>Soumettre</Text>
      </TouchableOpacity>

      <Text style={tw`text-gray-500 mt-4 text-center text-xs`}>
         Champs obligatoires
      </Text>
    </ScrollView>
  );
}
