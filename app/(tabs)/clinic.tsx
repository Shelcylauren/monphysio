import { StyleSheet, Image, Platform } from 'react-native';

import Collapsible from '@/Components/Collapsible';
import { ExternalLink } from '@/Components/ExternalLink';
import ParallaxScrollView from '@/Components/MedicaleForm';
import { ThemedText } from '@/Components/ThemedText';
import { ThemedView } from '@/Components/ThemedView';
import { IconSymbol } from '@/Components/ui/IconSymbol';

export default function Clinic() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#eff6ff', dark: '#1e3a8a' }}
      headerImage={
        <Image
          source={require('@/assets/images/ss.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
      }
    >
      <ThemedView className="flex-1 px-4" lightColor="#eff6ff" darkColor="#1e3a8a">
        <ThemedText className="text-lg font-bold mb-2">Clinic</ThemedText>
        <Collapsible title="About the Clinic">
          <ThemedText className="text-base mb-2">
            The clinic is a healthcare facility that provides medical and surgical care to patients.
            It may specialize in a specific field such as pediatrics, orthopedics, or dermatology.
          </ThemedText>
          <ExternalLink href="https://www.clinic.com" />
        </Collapsible>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    ...(Platform.OS === 'web' && {
      borderRadius: 20,
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    }),
  },
});
