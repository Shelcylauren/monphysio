import React, { useState } from 'react';
import { View, Dimensions, ScrollView, Text } from 'react-native';
import Header from '@/components/Header'; // Vérifie que le chemin est bon

export default function HomeScreen() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isTablet = Dimensions.get('window').width >= 768;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Intégration du Header */}
      <Header isTablet={isTablet} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      {/* Contenu principal de la page */}
      <ScrollView className="p-4">
        <Text className="text-2xl font-bold text-blue-800">Bienvenue sur PhysioConsultation</Text>
        <Text className="mt-2 text-base text-gray-700">
          Cette plateforme vous aide à consulter un spécialiste pour vos douleurs au nerf sciatique,
          obtenir un diagnostic intelligent, et suivre vos traitements facilement.
        </Text>

        {/* Ajoute ici d'autres composants comme Consultation, Exercices, Profil, etc. */}
      </ScrollView>
    </View>
  );
}
