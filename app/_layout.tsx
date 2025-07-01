import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';
import './../global.css';
import StatusBarBackground from '@/components/StatusBarBackground';
import { StatusBar } from 'react-native';

const isLoggedIn: boolean = true;
const isFirstTimeUser: boolean = true; // This should be replaced with actual logic to check if the user is logged in or not

export default function RootLayout() {
  return (
    <Stack>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#1e90ff" /> */}
      <Stack.Protected guard={!isLoggedIn && isFirstTimeUser}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={isLoggedIn}>
        {/* Toutes les autres pages n'auront pas de header par défaut
          mais sera activer dans le _layout d (tabs) */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        {/* index = page d'accueil, pas de header */}
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="consultForm" options={{ headerShown: false }} />

      </Stack.Protected>
    </Stack>
  );
}
