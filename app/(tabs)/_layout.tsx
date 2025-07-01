import React from 'react';
import { Redirect, Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { useUserAuth } from '@/store/useUserAuth';
// Import Lucide icons
import { 
  Home, 
  MessageSquare, 
  Stethoscope, 
  Building2, 
  UserCircle 
} from 'lucide-react-native';

export default function TabLayout() {
  const hasFinishedOnboarding = useUserAuth((state) => state.hasFinishedOnboarding);

  // Redirect to the onboarding screen if the user has not finished onboarding.
  // if (!hasFinishedOnboarding) {
  //   return <Redirect href="/(auth)/signup" />
  // }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#3b82f6', // Blue color for active tab
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Home size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
        <Tabs.Screen
          name="forum"
          options={{
            title: 'Forum',
            tabBarIcon: ({ color, size }) => (
              <MessageSquare size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
        <Tabs.Screen
          name="consultation"
          options={{
            title: 'Consultation',
            tabBarIcon: ({ color, size }) => (
              <Stethoscope size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
        <Tabs.Screen
          name="clinic"
          options={{
            title: 'Clinic',
            tabBarIcon: ({ color, size }) => (
              <Building2 size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <UserCircle size={size} color={color} strokeWidth={2} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
