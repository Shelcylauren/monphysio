import React from 'react';
import { Redirect, Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';
import { useUserAuth } from '@/store/useUserAuth';
  

export default function TabLayout() {

  const hasFinishedOnboarding = useUserAuth((state) => state.hasFinishedOnboarding);

  // Redirect to the onboarding screen if the user has not finished onboarding.
  if (!hasFinishedOnboarding) {
    return <Redirect href="/(auth)/signup" />
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="forum"
          options={{
            title: 'Forum',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="wechat" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="consultation"
          options={{
            title: 'Consultation',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="medicinebox" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="clinic"
          options={{
            title: 'Clinic',
            tabBarIcon: ({ color,size }) => (
              <FontAwesome name="hospital-o" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="profile" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
      <StatusBar style="dark" backgroundColor='#fff' />
    </SafeAreaView>
  );
}
