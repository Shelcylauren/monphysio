import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import './../global.css';
import { ActivityIndicator, StatusBar, Text, View } from 'react-native';
import { useGlobalStore } from '@/store/globalStore';
import { useUserAuth } from '@/store/useUserAuth';

export default function RootLayout() {
  // Get auth state from global store
  const isLoggedIn = useGlobalStore(state => state.isLoggedIn);
  const loading = useGlobalStore(state => state.loading);
  const initializeAuthListener = useGlobalStore(state => state.initializeAuthListener);
  
  // Get first-time user status from your user auth store
  const hasFinishedOnboarding = useUserAuth(state => state.hasFinishedOnboarding);
  const isFirstTimeUser = !hasFinishedOnboarding;

  // Initialize auth listener when the component mounts
  useEffect(() => {
    const unsubscribe = initializeAuthListener();
    
    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Show a loading screen while checking auth state
  if (loading) {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <LoadingScreen />
      </>
    );
  }

  console.log("Auth state:", { isLoggedIn, isFirstTimeUser, loading });

  return (
    <Stack>
      {/* First-time users get onboarding */}
      <Stack.Screen 
        name="onboarding" 
        options={{ headerShown: false }}
        redirect={!isFirstTimeUser && isLoggedIn} 
      />

      {/* Authenticated users get main app */}
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }} 
        redirect={!isLoggedIn}
      />
      
      {/* Additional routes for authenticated users */}
      <Stack.Screen 
        name="consultForm" 
        options={{ headerShown: false }} 
        redirect={!isLoggedIn}
      />

      {/* Ensure that screens in your (screens) folder are protected */}
      <Stack.Screen 
        name="/(screens)/chatbot" 
        options={{ headerShown: false }} 
        redirect={!isLoggedIn}
      />
    </Stack>
  );
}

// Simple loading component
function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#3b82f6" />
      <Text style={{ marginTop: 10 }}>Loading...</Text>
    </View>
  );
}
