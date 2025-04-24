import React from 'react';
import { View, StyleSheet, ScrollView, ViewStyle, ColorValue } from 'react-native';

type ParallaxScrollViewProps = {
  children: React.ReactNode;
  headerBackgroundColor: { light: ColorValue; dark: ColorValue };
  headerImage: React.ReactNode;
};

export default function ParallaxScrollView({
  children,
  headerBackgroundColor,
  headerImage,
}: ParallaxScrollViewProps) {
  return (
    <ScrollView style={[styles.container, { backgroundColor: headerBackgroundColor.light }]}>
      <View style={styles.headerImage}>{headerImage}</View>
      <View style={styles.content}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
});
