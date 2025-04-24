import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';
import './../global.css';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor='#eff6ff' />
      <Stack>
        

        {/* Toutes les autres pages n'auront pas de header par défaut 
          mais sera activer dans le _layout d (tabs) */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* index = page d'accueil, pas de header */}
        <Stack.Screen name="index" options={{ headerShown: false }} />


        {/* Ajoute ici d'autres pages si tu veux personnaliser leurs titres/options */}
      </Stack>
    </>
  );
}
