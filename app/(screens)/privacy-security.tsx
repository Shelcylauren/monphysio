import React, { useState } from 'react';
import { 
  View, Text, ScrollView, TouchableOpacity, 
  SafeAreaView, StatusBar, Switch, 
  StyleSheet, Platform, Alert 
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import tw from 'twrnc';
import { router } from 'expo-router';
import { useUserAuth } from '@/store/useUserAuth';

// Define interfaces for privacy settings
interface PrivacySetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  icon: React.ReactNode;
}

interface PrivacyGroup {
  title: string;
  description: string;
  settings: PrivacySetting[];
}

// Component for section headers
const SectionHeader: React.FC<{title: string; description: string}> = ({ title, description }) => (
  <View style={tw`mb-4`}>
    <Text style={tw`text-lg font-bold text-blue-800`}>{title}</Text>
    <Text style={tw`text-sm text-gray-600`}>{description}</Text>
  </View>
);

// Component for individual privacy settings with toggle
const SettingToggleItem: React.FC<{
  setting: PrivacySetting;
  onToggle: (id: string, value: boolean) => void;
}> = ({ setting, onToggle }) => (
  <View style={tw`flex-row items-center justify-between p-3 mb-3 bg-white border border-gray-200 rounded-lg`}>
    <View style={tw`flex-row items-center flex-1`}>
      <View style={tw`items-center justify-center w-10 h-10 mr-3 bg-blue-100 rounded-full`}>
        {setting.icon}
      </View>
      <View style={tw`flex-1 mr-2`}>
        <Text style={tw`font-medium text-gray-800`}>{setting.title}</Text>
        <Text style={tw`text-sm text-gray-600`}>{setting.description}</Text>
      </View>
    </View>
    <Switch
      value={setting.enabled}
      onValueChange={(value) => onToggle(setting.id, value)}
      trackColor={{ false: '#d1d5db', true: '#bfdbfe' }}
      thumbColor={setting.enabled ? '#3b82f6' : '#9ca3af'}
      ios_backgroundColor="#d1d5db"
    />
  </View>
);

// Component for settings with navigation (arrow)
const SettingNavItem: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  onPress: () => void;
}> = ({ title, description, icon, onPress }) => (
  <TouchableOpacity 
    style={tw`flex-row items-center justify-between p-3 mb-3 bg-white border border-gray-200 rounded-lg`}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={tw`flex-row items-center flex-1`}>
      <View style={tw`items-center justify-center w-10 h-10 mr-3 bg-blue-100 rounded-full`}>
        {icon}
      </View>
      <View style={tw`flex-1 mr-2`}>
        <Text style={tw`font-medium text-gray-800`}>{title}</Text>
        <Text style={tw`text-sm text-gray-600`}>{description}</Text>
      </View>
    </View>
    <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
  </TouchableOpacity>
);

export default function PrivacySecurity() {
  // const user = useUserAuth((state) => state.user);
  
  // Privacy settings groups
  const [privacyGroups, setPrivacyGroups] = useState<PrivacyGroup[]>([
    {
      title: "Account Security",
      description: "Protect your account and personal information",
      settings: [
        {
          id: "biometric_login",
          title: "Biometric Login",
          description: "Use fingerprint or Face ID to access your account",
          enabled: true,
          icon: <FontAwesome5 name="fingerprint" size={20} color="#3b82f6" />
        },
        {
          id: "two_factor_auth",
          title: "Two-Factor Authentication",
          description: "Require a verification code when logging in from new devices",
          enabled: false,
          icon: <MaterialIcons name="security" size={20} color="#3b82f6" />
        },
        {
          id: "stay_logged_in",
          title: "Stay Logged In",
          description: "Keep you signed in on this device",
          enabled: true,
          icon: <MaterialIcons name="login" size={20} color="#3b82f6" />
        }
      ]
    },
    {
      title: "Data Privacy",
      description: "Control how your health information is used",
      settings: [
        {
          id: "anonymous_analytics",
          title: "Anonymous Analytics",
          description: "Share anonymous usage data to improve app experience",
          enabled: true,
          icon: <MaterialIcons name="analytics" size={20} color="#3b82f6" />
        },
        {
          id: "treatment_sharing",
          title: "Treatment Data Sharing",
          description: "Allow your therapist to share your treatment data with healthcare providers",
          enabled: true,
          icon: <FontAwesome5 name="hospital-user" size={20} color="#3b82f6" />
        },
        {
          id: "research_participation",
          title: "Research Participation",
          description: "Allow anonymized data to be used for medical research",
          enabled: false,
          icon: <FontAwesome5 name="microscope" size={20} color="#3b82f6" />
        }
      ]
    },
    {
      title: "App Permissions",
      description: "Control what the app can access on your device",
      settings: [
        {
          id: "camera_access",
          title: "Camera Access",
          description: "Allow the app to use your camera for exercise tracking",
          enabled: true,
          icon: <MaterialIcons name="camera-alt" size={20} color="#3b82f6" />
        },
        {
          id: "location_access",
          title: "Location Access",
          description: "Allow the app to access your location for clinic directions",
          enabled: true,
          icon: <MaterialIcons name="location-on" size={20} color="#3b82f6" />
        },
        {
          id: "notifications_access",
          title: "Notifications",
          description: "Allow the app to send push notifications",
          enabled: true,
          icon: <MaterialIcons name="notifications" size={20} color="#3b82f6" />
        }
      ]
    }
  ]);

  // Toggle setting on/off
  const toggleSetting = (id: string, value: boolean): void => {
    setPrivacyGroups(prevGroups => 
      prevGroups.map(group => ({
        ...group,
        settings: group.settings.map(setting => 
          setting.id === id ? { ...setting, enabled: value } : setting
        )
      }))
    );
  };

  // Handle Password Change
  const handlePasswordChange = (): void => {
    // router.push('/change-password');
  };

  // Handle Export Data
  const handleExportData = (): void => {
    Alert.alert(
      'Export Personal Data',
      'We will prepare all your personal data and medical history for export. You will receive an email with a download link within 24 hours.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Request Export', onPress: () => Alert.alert('Request Submitted', 'Your data export request has been submitted. You will receive an email shortly.') }
      ]
    );
  };

  // Handle Delete Account
  const handleDeleteAccount = (): void => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone and will permanently delete all your data.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete Account', 
          onPress: () => {
            Alert.alert(
              'Confirm Deletion',
              'Please confirm that you want to permanently delete your account and all associated data.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Yes, Delete My Account', style: 'destructive', onPress: () => Alert.alert('Request Submitted', 'Your account deletion request has been submitted. You will receive confirmation by email.') }
              ]
            );
          }, 
          style: 'destructive' 
        }
      ]
    );
  };

  // Save settings
  const saveSettings = async (): Promise<void> => {
    // In a real app, you would save these settings to a database or API
    Alert.alert('Success', 'Your privacy and security settings have been updated.');
    router.back();
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      {/* Status Bar */}
      <StatusBar backgroundColor="#3b82f6" barStyle="light-content" />
      
      {/* Header */}
      <View style={tw`flex-row items-center p-4 bg-white border-b border-gray-200 shadow-sm`}>
        <TouchableOpacity onPress={() => router.back()} style={tw`p-2 mr-2 rounded-full bg-blue-50`}>
          <Ionicons name="arrow-back" size={24} color="#3b82f6" />
        </TouchableOpacity>
        <Text style={tw`text-xl font-bold text-gray-800`}>Privacy & Security</Text>
      </View>
      
      <ScrollView style={tw`flex-1`} contentContainerStyle={tw`p-4`}>
        {/* Account Security Group */}
        <View style={tw`mb-6`}>
          <SectionHeader title={privacyGroups[0].title} description={privacyGroups[0].description} />
          
          {privacyGroups[0].settings.map((setting) => (
            <SettingToggleItem 
              key={setting.id} 
              setting={setting} 
              onToggle={toggleSetting} 
            />
          ))}
          
          <SettingNavItem
            title="Change Password"
            description="Update your account password"
            icon={<MaterialIcons name="lock" size={20} color="#3b82f6" />}
            onPress={handlePasswordChange}
          />
        </View>
        
        {/* Data Privacy Group */}
        <View style={tw`mb-6`}>
          <SectionHeader title={privacyGroups[1].title} description={privacyGroups[1].description} />
          
          {privacyGroups[1].settings.map((setting) => (
            <SettingToggleItem 
              key={setting.id} 
              setting={setting} 
              onToggle={toggleSetting} 
            />
          ))}
          
          <View style={tw`p-3 mt-1 mb-2 border border-blue-200 rounded-lg bg-blue-50`}>
            <Text style={tw`text-sm text-blue-700`}>
              Your medical data is encrypted and stored securely in compliance with healthcare privacy regulations.
            </Text>
          </View>
        </View>
        
        {/* App Permissions Group */}
        <View style={tw`mb-6`}>
          <SectionHeader title={privacyGroups[2].title} description={privacyGroups[2].description} />
          
          {privacyGroups[2].settings.map((setting) => (
            <SettingToggleItem 
              key={setting.id} 
              setting={setting} 
              onToggle={toggleSetting} 
            />
          ))}
          
          <View style={tw`p-3 mt-1 mb-2 border border-gray-200 rounded-lg bg-gray-50`}>
            <Text style={tw`text-sm text-gray-600`}>
              You can also manage app permissions through your device's settings.
            </Text>
          </View>
        </View>
        
        {/* Data Management */}
        <View style={tw`mb-6`}>
          <SectionHeader 
            title="Data Management" 
            description="Control and manage your personal data stored in our system"
          />
          
          <SettingNavItem
            title="View Privacy Policy"
            description="Read our detailed privacy policy"
            icon={<MaterialIcons name="policy" size={20} color="#3b82f6" />}
            onPress={() => {/*/router.push('/privacy-policy')*/}}
          />
          
          <SettingNavItem
            title="Export Your Data"
            description="Download a copy of all your personal data"
            icon={<MaterialIcons name="download" size={20} color="#3b82f6" />}
            onPress={handleExportData}
          />
          
          <TouchableOpacity 
            style={tw`flex-row items-center p-3 mb-3 border border-red-200 rounded-lg bg-red-50`}
            onPress={handleDeleteAccount}
          >
            <View style={tw`items-center justify-center w-10 h-10 mr-3 bg-red-100 rounded-full`}>
              <MaterialIcons name="delete" size={20} color="#ef4444" />
            </View>
            <View>
              <Text style={tw`font-medium text-red-700`}>Delete Account</Text>
              <Text style={tw`text-sm text-red-600`}>Permanently remove your account and all data</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        {/* Save Button */}
        <TouchableOpacity 
          style={tw`p-4 mb-6 bg-blue-600 rounded-lg shadow-sm`}
          onPress={saveSettings}
        >
          <Text style={tw`font-medium text-center text-white`}>Save Changes</Text>
        </TouchableOpacity>
        
        {/* Information text */}
        <View style={tw`p-4 mb-10 border border-gray-200 rounded-lg bg-gray-50`}>
          <Text style={tw`text-sm text-center text-gray-600`}>
            We are committed to protecting your privacy and security.{'\n\n'}
            If you have any questions or concerns about how we handle your data, please contact our privacy officer at privacy@monphysio.com
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}