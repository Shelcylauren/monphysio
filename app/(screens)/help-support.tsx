import React, { useState } from 'react';
import { 
  View, Text, ScrollView, TouchableOpacity, 
  SafeAreaView, StatusBar, TextInput,
  StyleSheet, Linking, Alert 
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, AntDesign, Feather } from '@expo/vector-icons';
import tw from 'twrnc';
import { router } from 'expo-router';
import { useUserAuth } from '@/store/useUserAuth';

// Define interfaces
interface SupportSection {
  id: string;
  title: string;
  items: SupportItem[];
}

interface SupportItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  expanded: boolean;
}

// Component for section headers
const SectionHeader: React.FC<{title: string}> = ({ title }) => (
  <View style={tw`mb-3`}>
    <Text style={tw`text-lg font-bold text-blue-800`}>{title}</Text>
  </View>
);

// Support option card component
const SupportCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  onPress: () => void;
  isPrimary?: boolean;
}> = ({ title, description, icon, onPress, isPrimary = false }) => (
  <TouchableOpacity 
    style={tw`flex-row items-center p-4 mb-3 bg-white border ${isPrimary ? 'border-blue-300 bg-blue-50' : 'border-gray-200'} rounded-lg shadow-sm`}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={tw`items-center justify-center w-12 h-12 mr-4 ${isPrimary ? 'bg-blue-200' : 'bg-gray-100'} rounded-full`}>
      {icon}
    </View>
    <View style={tw`flex-1`}>
      <Text style={tw`mb-1 text-base font-medium ${isPrimary ? 'text-blue-800' : 'text-gray-800'}`}>{title}</Text>
      <Text style={tw`text-sm ${isPrimary ? 'text-blue-600' : 'text-gray-600'}`}>{description}</Text>
    </View>
    <MaterialIcons name="chevron-right" size={24} color={isPrimary ? "#3b82f6" : "#9ca3af"} />
  </TouchableOpacity>
);

// FAQ accordion item component
const FAQAccordion: React.FC<{
  item: FAQItem;
  onToggle: (id: string) => void;
}> = ({ item, onToggle }) => (
  <View style={tw`mb-2 overflow-hidden bg-white border border-gray-200 rounded-lg`}>
    <TouchableOpacity 
      style={tw`flex-row items-center justify-between p-4`}
      onPress={() => onToggle(item.id)}
      activeOpacity={0.7}
    >
      <Text style={tw`flex-1 text-base font-medium text-gray-800`}>{item.question}</Text>
      <Ionicons 
        name={item.expanded ? "chevron-up" : "chevron-down"} 
        size={22} 
        color="#3b82f6" 
      />
    </TouchableOpacity>
    
    {item.expanded && (
      <View style={tw`p-4 border-t border-gray-100 bg-gray-50`}>
        <Text style={tw`text-gray-700`}>{item.answer}</Text>
      </View>
    )}
  </View>
);

export default function HelpSupport() {
  // const user = useUserAuth((state) => state.user);
  const [supportMessage, setSupportMessage] = useState<string>('');

  // Toggle FAQ items
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      id: '1',
      question: 'How do I book a new appointment?',
      answer: 'You can book a new appointment by going to the Appointments tab and tapping on "Book New Appointment". Select your preferred therapist, date, and time slot, then confirm your booking.',
      expanded: false
    },
    {
      id: '2',
      question: 'How can I track my exercise progress?',
      answer: 'Your prescribed exercises can be found in the Exercises tab. Mark each exercise as completed after you perform them. You can view your overall compliance and progress in the Progress tab.',
      expanded: false
    },
    {
      id: '3',
      question: 'How do I message my therapist?',
      answer: 'You can message your therapist directly from your appointment details screen or from the Messages tab. Your therapist typically responds within 24 hours on business days.',
      expanded: false
    },
    {
      id: '4',
      question: 'How do I update my insurance information?',
      answer: 'You can update your insurance information by going to Profile > Edit Profile > Health Insurance section. Enter your new insurance provider and policy number, then save your changes.',
      expanded: false
    },
    {
      id: '5',
      question: 'What should I do if I need to cancel an appointment?',
      answer: 'You can cancel an appointment by going to the Appointments tab, selecting the appointment you wish to cancel, and tapping "Cancel Appointment". Please note that cancellations within 24 hours may incur a fee as per our cancellation policy.',
      expanded: false
    }
  ]);

  const toggleFAQ = (id: string): void => {
    setFaqItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, expanded: !item.expanded } : item
      )
    );
  };

  // Support sections data
  const supportOptions: SupportSection[] = [
    {
      id: 'contact',
      title: 'Contact Support',
      items: [
        {
          id: 'chat',
          title: 'Live Chat Support',
          description: 'Chat with our support team (Mon-Fri, 9AM-5PM)',
          icon: <Ionicons name="chatbubble-ellipses" size={24} color="#3b82f6" />,
          action: () => router.push('/') ///live-chat
        },
        {
          id: 'email',
          title: 'Email Support',
          description: 'Send us an email and we\'ll respond within 24 hours',
          icon: <MaterialIcons name="email" size={24} color="#3b82f6" />,
          action: () => Linking.openURL('mailto:support@monphysio.com?subject=Support%20Request')
        },
        {
          id: 'phone',
          title: 'Phone Support',
          description: 'Call us directly (Mon-Fri, 9AM-5PM)',
          icon: <MaterialIcons name="phone" size={24} color="#3b82f6" />,
          action: () => Linking.openURL('tel:+18005551234')
        }
      ]
    },
    {
      id: 'resources',
      title: 'Resources & Guides',
      items: [
        {
          id: 'tutorial',
          title: 'App Tutorial',
          description: 'Learn how to use all features of the app',
          icon: <Ionicons name="play-circle" size={24} color="#3b82f6" />,
          action: () => router.push('/') ///app-tutorial
        },
        {
          id: 'exercises',
          title: 'Exercise Library',
          description: 'Browse our complete library of therapy exercises',
          icon: <MaterialIcons name="fitness-center" size={24} color="#3b82f6" />,
          action: () => router.push('/') ///exercise-library
        },
        {
          id: 'recovery',
          title: 'Recovery Tips',
          description: 'Helpful resources for your rehabilitation journey',
          icon: <FontAwesome5 name="book-medical" size={22} color="#3b82f6" />,
          action: () => router.push('/') ///recovery-resources
        }
      ]
    }
  ];

  // Handle support message submission
  const handleSendMessage = (): void => {
    if (!supportMessage.trim()) {
      Alert.alert('Error', 'Please enter a message before submitting.');
      return;
    }

    // In a real app, you would send this to your support system
    Alert.alert(
      'Message Sent',
      'Thank you for contacting us. A support representative will respond to your inquiry within 24 hours.',
      [{ text: 'OK', onPress: () => setSupportMessage('') }]
    );
  };

  // Handle emergency situations
  const handleEmergency = (): void => {
    Alert.alert(
      'Medical Emergency',
      'If you are experiencing a medical emergency, please call emergency services immediately.',
      [
        { text: 'Call Emergency Services', onPress: () => Linking.openURL('tel:911') },
        { text: 'Cancel', style: 'cancel' }
      ]
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
        <Text style={tw`text-xl font-bold text-gray-800`}>Help & Support</Text>
      </View>
      
      <ScrollView style={tw`flex-1`} contentContainerStyle={tw`p-4`} showsVerticalScrollIndicator={false}>
        {/* Emergency Help */}
        <TouchableOpacity 
          style={tw`flex-row items-center p-4 mb-5 border border-red-200 rounded-lg bg-red-50`}
          onPress={handleEmergency}
        >
          <View style={tw`items-center justify-center w-12 h-12 mr-4 bg-red-100 rounded-full`}>
            <FontAwesome5 name="first-aid" size={24} color="#ef4444" />
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw`mb-1 text-base font-medium text-red-700`}>Medical Emergency?</Text>
            <Text style={tw`text-sm text-red-600`}>Get immediate help for urgent medical situations</Text>
          </View>
          <Feather name="alert-circle" size={24} color="#ef4444" />
        </TouchableOpacity>
        
        {/* Contact Support Section */}
        <View style={tw`mb-6`}>
          <SectionHeader title={supportOptions[0].title} />
          
          {supportOptions[0].items.map((item, index) => (
            <SupportCard 
              key={item.id}
              title={item.title}
              description={item.description}
              icon={item.icon}
              onPress={item.action}
              isPrimary={index === 0}
            />
          ))}
        </View>
        
        {/* Message Support Form */}
        <View style={tw`p-4 mb-6 bg-white border border-gray-200 rounded-lg`}>
          <Text style={tw`mb-3 text-lg font-medium text-gray-800`}>Send us a message</Text>
          <TextInput
            style={tw`p-3 mb-3 text-gray-700 border border-gray-300 rounded-lg bg-gray-50`}
            placeholder="Describe your issue or question..."
            multiline
            numberOfLines={4}
            value={supportMessage}
            onChangeText={setSupportMessage}
          />
          <TouchableOpacity 
            style={tw`p-3 bg-blue-600 rounded-lg`}
            onPress={handleSendMessage}
          >
            <Text style={tw`font-medium text-center text-white`}>Submit</Text>
          </TouchableOpacity>
        </View>
        
        {/* Resources Section */}
        <View style={tw`mb-6`}>
          <SectionHeader title={supportOptions[1].title} />
          
          {supportOptions[1].items.map(item => (
            <SupportCard 
              key={item.id}
              title={item.title}
              description={item.description}
              icon={item.icon}
              onPress={item.action}
            />
          ))}
        </View>
        
        {/* Frequently Asked Questions */}
        <View style={tw`mb-6`}>
          <SectionHeader title="Frequently Asked Questions" />
          
          {faqItems.map(item => (
            <FAQAccordion 
              key={item.id}
              item={item}
              onToggle={toggleFAQ}
            />
          ))}
          
          <TouchableOpacity 
            style={tw`flex-row items-center justify-center p-3 mt-2`}
            // onPress={() => router.push('/faq')}
          >
            <Text style={tw`font-medium text-blue-600`}>View All FAQs</Text>
            <MaterialIcons name="chevron-right" size={20} color="#3b82f6" />
          </TouchableOpacity>
        </View>
        
        {/* Clinic Information */}
        <View style={tw`p-4 mb-10 bg-white border border-gray-200 rounded-lg`}>
          <Text style={tw`mb-2 text-lg font-medium text-gray-800`}>Your Clinic</Text>
          
          <View style={tw`flex-row items-center mb-2`}>
            <MaterialIcons name="location-on" size={20} color="#3b82f6" style={tw`mr-2`} />
            <Text style={tw`text-gray-700`}>123 Therapy Street, Wellness City</Text>
          </View>
          
          <View style={tw`flex-row items-center mb-2`}>
            <MaterialIcons name="access-time" size={20} color="#3b82f6" style={tw`mr-2`} />
            <Text style={tw`text-gray-700`}>Mon-Fri: 8AM-7PM, Sat: 9AM-2PM</Text>
          </View>
          
          <View style={tw`flex-row items-center mb-4`}>
            <MaterialIcons name="phone" size={20} color="#3b82f6" style={tw`mr-2`} />
            <Text style={tw`text-gray-700`}>(800) 555-1234</Text>
          </View>
          
          <TouchableOpacity 
            style={tw`p-3 border border-blue-300 rounded-lg bg-blue-50`}
            // onPress={() => router.push('/clinic-information')}
          >
            <Text style={tw`font-medium text-center text-blue-600`}>View Clinic Details</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}