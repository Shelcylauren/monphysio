import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import HapticTab from '@/components/Footer';

import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/Usercoloscheme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          // tabBarButton: HapticTab,
          // tabBarBackground: TabBarBackground,
          // tabBarStyle: Platform.select({
          //   ios: {
          //     position: 'absolute',
          //   },
          //   default: {},
          // }),
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color = "#000" }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="consultation"
          options={{
            title: 'Consultation',
            tabBarIcon: ({ color = "#000" }) => (
              <IconSymbol size={28} name="stethoscope" color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
