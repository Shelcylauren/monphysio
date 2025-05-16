import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';
import './../global.css';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark"/>
      <Stack>
        {/* Toutes les autres pages n'auront pas de header par défaut 
          mais sera activer dans le _layout d (tabs) */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* index = page d'accueil, pas de header */}
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="consultForm" options={{ headerShown: false }} />

      </Stack>
    </>
  );
}
