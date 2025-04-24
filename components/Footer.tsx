import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { Mail, Phone, MessageCircle } from 'lucide-react-native';

export default function Footer() {
  const [message, setMessage] = useState('');

  const handleSendEmail = () => {
    const email = 'support@physioconsult.com';
    const subject = 'Message depuis l’application mobile';
    const body = encodeURIComponent(message);
    const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;

    Linking.openURL(mailtoUrl).catch(() => {
      Alert.alert("Erreur", "Impossible d'ouvrir l'application email.");
    });
  };

  const handleSendWhatsApp = () => {
    const phone = '237655570921'; // sans +
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Erreur", "Impossible d'ouvrir WhatsApp.");
    });
  };

  return (
    <View className="bg-gray-100 px-4 py-6 rounded-t-2xl shadow-md">
      {/* Titre */}
      <View className="mb-4">
        <Text className="text-blue-900 text-xl font-bold">PhysioConsult</Text>
        <Text className="text-gray-600 text-sm">
          Consultations personnalisées pour douleurs sciatiques.
        </Text>
      </View>

      {/* Contact */}
      <View className="space-y-2 mb-4">
        <View className="flex-row items-center space-x-2">
          <Phone size={18} color="#1e40af" />
          <Text className="text-gray-700">+237 655 570 921</Text>
        </View>
        <View className="flex-row items-center space-x-2">
          <Mail size={18} color="#1e40af" />
          <Text className="text-gray-700">support@physioconsult.com</Text>
        </View>
        <TouchableOpacity
          className="flex-row items-center space-x-2"
          onPress={() => Linking.openURL('https://wa.me/237655570921')}
        >
          <MessageCircle size={18} color="#1e40af" />
          <Text className="text-blue-700 underline">Nous contacter via WhatsApp</Text>
        </TouchableOpacity>
      </View>

      {/* Boîte message */}
      <View className="bg-white border border-gray-300 rounded-xl p-3 shadow-sm mb-4">
        <Text className="text-sm text-gray-600 mb-2">
          Vous avez une suggestion ou une question ?
        </Text>
        <TextInput
          multiline
          numberOfLines={3}
          placeholder="Écrivez ici..."
          className="bg-gray-100 rounded-md px-3 py-2 text-gray-800 text-sm"
          value={message}
          onChangeText={setMessage}
        />

        {/* Boutons d’envoi */}
        <View className="flex-row justify-between mt-3 space-x-2">
          <TouchableOpacity
            className="flex-1 bg-blue-600 px-4 py-2 rounded-md"
            onPress={handleSendEmail}
          >
            <Text className="text-white text-center text-sm">Envoyer par Email</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 bg-green-600 px-4 py-2 rounded-md"
            onPress={handleSendWhatsApp}
          >
            <Text className="text-white text-center text-sm">WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer final */}
      <Text className="text-center text-gray-400 text-xs mt-2">
        © {new Date().getFullYear()} PhysioConsult. Tous droits réservés.
      </Text>
    </View>
  );
}
