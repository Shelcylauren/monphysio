import { StyleSheet, Image, Platform } from 'react-native';

import Collapsible from '@/components/Collapsible';

import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/MedicaleForm';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

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
        <ThemedText className="text-lg font-bold mb-2">Clinique</ThemedText>
        <Collapsible title="À propos de la clinique">
          <ThemedText className="text-base mb-2">
            La clinique est un établissement de santé qui offre des soins médicaux et chirurgicaux aux
            patients. Elle peut être spécialisée dans un domaine particulier, comme la pédiatrie,
            l'orthopédie ou la dermatologie.
          </ThemedText>
          <ExternalLink href="https://www.clinic.com"/>
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

