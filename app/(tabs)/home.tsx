import React, { useState } from 'react'; 
import { SafeAreaView, ScrollView, View, Text, useWindowDimensions } from 'react-native'; 
import Header from '../../components/Header'; 
import Footer from '../../components/Footer';  

export default function Index() {   
  const [isMenuOpen, setIsMenuOpen] = useState(false);   
  const { width } = useWindowDimensions();   
  const isTablet = width >= 768;    
  
  const toggleMenu = () => {     
    setIsMenuOpen(!isMenuOpen);   
  };    
  
  return (     
    <SafeAreaView className="flex-1 bg-blue-50">       
      {/* Header */}       
      <Header isTablet={isTablet} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />        
      
      {/* Contenu principal */}       
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4 pt-6">         
        <Text className="text-2xl text-blue-900 font-bold mb-3">Bienvenue sur PhysioConsultation 👋</Text>         
        <Text className="text-base text-gray-700 mb-6">           
          Une plateforme de suivi, consultation et traitement intelligent pour les douleurs liées au nerf sciatique.         
        </Text>          
        
        {/* Ajoute ici d'autres sections (ex: boutons vers Consultation, Exercices, etc.) */}         
        <View className="h-32" />       
      </ScrollView>        
      
      {/* Footer */}       
      <Footer />     
    </SafeAreaView>   
  ); 
}
