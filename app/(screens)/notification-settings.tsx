import React, { useState } from 'react';
import { 
  View, Text, ScrollView, TouchableOpacity, 
  SafeAreaView, StatusBar, Switch, 
  StyleSheet, Platform 
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import tw from 'twrnc';
import { router } from 'expo-router';
import { useUserAuth } from '@/store/useUserAuth';

// Define interfaces for notification settings
interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  icon: React.ReactNode;
}

interface NotificationGroup {
  title: string;
  description: string;
  settings: NotificationSetting[];
}

// Component for section headers
const SectionHeader: React.FC<{title: string; description: string}> = ({ title, description }) => (
  <View style={tw`mb-4`}>
    <Text style={tw`text-lg font-bold text-blue-800`}>{title}</Text>
    <Text style={tw`text-sm text-gray-600`}>{description}</Text>
  </View>
);

// Component for individual notification settings
const NotificationItem: React.FC<{
  setting: NotificationSetting;
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

export default function NotificationSettings() {
  // Default notification settings - in a real app, fetch from user preferences in database
  const [notificationGroups, setNotificationGroups] = useState<NotificationGroup[]>([
    {
      title: "Appointment Notifications",
      description: "Control notifications related to your scheduled appointments",
      settings: [
        {
          id: "appointment_reminder",
          title: "Appointment Reminders",
          description: "Receive reminders before your scheduled appointments",
          enabled: true,
          icon: <MaterialIcons name="event" size={20} color="#3b82f6" />
        },
        {
          id: "appointment_change",
          title: "Schedule Changes",
          description: "Get notified when an appointment is rescheduled or cancelled",
          enabled: true,
          icon: <MaterialIcons name="update" size={20} color="#3b82f6" />
        },
        {
          id: "appointment_confirmation",
          title: "Appointment Confirmations",
          description: "Receive confirmation after booking an appointment",
          enabled: true,
          icon: <MaterialIcons name="check-circle" size={20} color="#3b82f6" />
        }
      ]
    },
    {
      title: "Exercise & Treatment Notifications",
      description: "Reminders and updates about your exercise program",
      settings: [
        {
          id: "exercise_reminder",
          title: "Exercise Reminders",
          description: "Daily reminders to complete your prescribed exercises",
          enabled: true,
          icon: <MaterialCommunityIcons name="weight-lifter" size={20} color="#3b82f6" />
        },
        {
          id: "new_exercise",
          title: "New Exercise Plans",
          description: "Get notified when your therapist adds new exercises",
          enabled: true,
          icon: <MaterialIcons name="fitness-center" size={20} color="#3b82f6" />
        },
        {
          id: "progress_update",
          title: "Progress Updates",
          description: "Weekly summaries of your rehabilitation progress",
          enabled: true,
          icon: <MaterialIcons name="trending-up" size={20} color="#3b82f6" />
        }
      ]
    },
    {
      title: "Communication Notifications",
      description: "Control how you receive messages and updates",
      settings: [
        {
          id: "therapist_message",
          title: "Therapist Messages",
          description: "Get notified when your therapist sends you a message",
          enabled: true,
          icon: <MaterialIcons name="message" size={20} color="#3b82f6" />
        },
        {
          id: "feedback_request",
          title: "Feedback Requests",
          description: "Requests to provide feedback after sessions",
          enabled: true,
          icon: <MaterialIcons name="rate-review" size={20} color="#3b82f6" />
        }
      ]
    },
    {
      title: "Administrative Notifications",
      description: "Billing and app-related notifications",
      settings: [
        {
          id: "payment_reminder",
          title: "Payment Reminders",
          description: "Get notified about upcoming or overdue payments",
          enabled: true,
          icon: <MaterialIcons name="payment" size={20} color="#3b82f6" />
        },
        {
          id: "app_updates",
          title: "App Updates",
          description: "Information about new features and app improvements",
          enabled: false,
          icon: <MaterialIcons name="system-update" size={20} color="#3b82f6" />
        },
        {
          id: "promotional",
          title: "Promotional Content",
          description: "Special offers and promotions from your clinic",
          enabled: false,
          icon: <MaterialIcons name="local-offer" size={20} color="#3b82f6" />
        }
      ]
    }
  ]);

  // Function to toggle notification settings
  const toggleNotification = (id: string, value: boolean): void => {
    setNotificationGroups(prevGroups => 
      prevGroups.map(group => ({
        ...group,
        settings: group.settings.map(setting => 
          setting.id === id ? { ...setting, enabled: value } : setting
        )
      }))
    );
  };

  // Save notification settings
  const saveSettings = async (): Promise<void> => {
    // In a real app, you would save these settings to a database or API
    // For now, just show a success message
    alert('Notification settings saved successfully!');
    router.back();
  };

  // Master toggle to enable/disable all notifications
  const [masterEnabled, setMasterEnabled] = useState<boolean>(true);
  
  const toggleAllNotifications = (value: boolean): void => {
    setMasterEnabled(value);
    setNotificationGroups(prevGroups =>
      prevGroups.map(group => ({
        ...group,
        settings: group.settings.map(setting => ({ ...setting, enabled: value }))
      }))
    );
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
        <Text style={tw`text-xl font-bold text-gray-800`}>Notification Settings</Text>
      </View>
      
      <ScrollView style={tw`flex-1`} contentContainerStyle={tw`p-4`}>
        {/* Master toggle for all notifications */}
        <View style={tw`p-4 mb-5 bg-white border border-gray-200 rounded-lg shadow-sm`}>
          <View style={tw`flex-row items-center justify-between`}>
            <View style={tw`flex-1`}>
              <Text style={tw`text-lg font-bold text-gray-800`}>All Notifications</Text>
              <Text style={tw`text-sm text-gray-600`}>
                {masterEnabled ? 'Notifications are enabled' : 'All notifications are currently disabled'}
              </Text>
            </View>
            <Switch
              value={masterEnabled}
              onValueChange={toggleAllNotifications}
              trackColor={{ false: '#d1d5db', true: '#bfdbfe' }}
              thumbColor={masterEnabled ? '#3b82f6' : '#9ca3af'}
              ios_backgroundColor="#d1d5db"
              style={Platform.OS === 'ios' ? { transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] } : {}}
            />
          </View>
        </View>
        
        {/* Notification categories */}
        {notificationGroups.map((group, index) => (
          <View key={index} style={tw`mb-6`}>
            <SectionHeader title={group.title} description={group.description} />
            
            {group.settings.map((setting) => (
              <NotificationItem 
                key={setting.id} 
                setting={setting} 
                onToggle={toggleNotification} 
              />
            ))}
          </View>
        ))}
        
        {/* Save Button */}
        <TouchableOpacity 
          style={tw`p-4 mb-10 bg-blue-600 rounded-lg shadow-sm`}
          onPress={saveSettings}
        >
          <Text style={tw`font-medium text-center text-white`}>Save Changes</Text>
        </TouchableOpacity>
        
        {/* Information text */}
        <Text style={tw`mb-10 text-xs text-center text-gray-500`}>
          You can change your notification preferences at any time.{'\n'}
          Some critical notifications related to your treatment may still be sent.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({})