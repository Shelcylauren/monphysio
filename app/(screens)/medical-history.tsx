import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import tw from 'twrnc';
import { router } from 'expo-router';

// Define interfaces for data types
interface MedicalCondition {
  id: string;
  condition: string;
  since: string;
  details: string;
  status: 'Active' | 'In treatment' | 'Managed';
}

interface Surgery {
  id: string;
  procedure: string;
  date: string;
  details: string;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
}

interface Allergy {
  id: string;
  allergen: string;
  reaction: string;
}

interface TherapySession {
  id: string;
  type: string;
  facility: string;
  dates: string;
  notes: string;
}

// Define component props interfaces
interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

interface HistoryItemProps {
  title: string;
  subtitle: string;
  details: string;
  status?: 'Active' | 'In treatment' | 'Managed' | null;
}

export default function MedicalHistory() {
  // Example data - in real app, fetch from database/API
  const [medicalConditions] = useState<MedicalCondition[]>([
    { id: '1', condition: 'Lower Back Pain', since: '2022', details: 'Disc herniation L4-L5', status: 'Active' },
    { id: '2', condition: 'Shoulder Tendinitis', since: '2023', details: 'Right rotator cuff', status: 'In treatment' },
    { id: '3', condition: 'Knee Arthritis', since: '2021', details: 'Mild osteoarthritis', status: 'Managed' },
  ]);

  const [surgeries] = useState<Surgery[]>([
    { id: '1', procedure: 'Knee Arthroscopy', date: 'May 2020', details: 'Meniscus repair' },
    { id: '2', procedure: 'Appendectomy', date: 'March 2015', details: 'Laparoscopic procedure' },
  ]);

  const [medications] = useState<Medication[]>([
    { id: '1', name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed for pain' },
    { id: '2', name: 'Diclofenac Gel', dosage: 'Topical application', frequency: 'Twice daily' },
    { id: '3', name: 'Vitamin D', dosage: '1000 IU', frequency: 'Daily' },
  ]);

  const [allergies] = useState<Allergy[]>([
    { id: '1', allergen: 'Penicillin', reaction: 'Rash' },
    { id: '2', allergen: 'Adhesive tape', reaction: 'Skin irritation' },
  ]);

  const [previousTherapy] = useState<TherapySession[]>([
    { id: '1', type: 'Physical Therapy', facility: 'City Rehab Center', dates: 'Jan-Mar 2023', notes: '12 sessions for back pain' },
    { id: '2', type: 'Massage Therapy', facility: 'Wellness Clinic', dates: 'Nov 2022', notes: '4 sessions' },
  ]);

  // Section component for better organization
  const Section: React.FC<SectionProps> = ({ title, children, icon }) => (
    <View style={tw`mx-4 mb-6 bg-white shadow-md rounded-xl`}>
      <View style={tw`flex-row items-center p-4 border-b border-gray-200`}>
        <View style={tw`items-center justify-center w-10 h-10 mr-3 bg-blue-100 rounded-full`}>
          {icon}
        </View>
        <Text style={tw`text-lg font-bold text-blue-800`}>{title}</Text>
      </View>
      <View style={tw`p-4`}>
        {children}
      </View>
    </View>
  );

  // Improved Item component with expandable details - better padding and contrast
  const HistoryItem: React.FC<HistoryItemProps> = ({ title, subtitle, details, status = null }) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    
    return (
      <TouchableOpacity 
        style={tw`mb-4 pb-1 border border-gray-200 rounded-lg ${expanded ? 'bg-blue-50' : 'bg-white'}`}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <View style={tw`flex-row items-center justify-between p-3`}>
          <View style={tw`flex-1 pr-2`}>
            <Text style={tw`text-base font-medium text-gray-800`}>{title}</Text>
            <Text style={tw`mt-1 text-sm text-gray-500`}>{subtitle}</Text>
          </View>
          <View style={tw`flex-row items-center`}>
            {status && (
              <View style={tw`px-3 py-1 mr-2 rounded-full ${
                status === 'Active' ? 'bg-red-100' : 
                status === 'In treatment' ? 'bg-yellow-100' : 'bg-green-100'
              }`}>
                <Text style={tw`text-xs font-bold ${
                  status === 'Active' ? 'text-red-700' : 
                  status === 'In treatment' ? 'text-yellow-700' : 'text-green-700'
                }`}>{status}</Text>
              </View>
            )}
            <View style={tw`items-center justify-center w-8 h-8 bg-blue-100 rounded-full`}>
              <Ionicons 
                name={expanded ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#1e40af" 
              />
            </View>
          </View>
        </View>
        
        {expanded && (
          <View style={tw`p-4 mx-3 mb-3 bg-white border border-gray-200 rounded-md shadow-sm`}>
            <Text style={tw`leading-5 text-gray-700`}>{details}</Text>
          </View>
        )}
      </TouchableOpacity>
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
        <Text style={tw`text-xl font-bold text-gray-800`}>Medical History</Text>
      </View>
      
      <ScrollView 
        style={tw`flex-1`} 
        contentContainerStyle={tw`py-4`}
        showsVerticalScrollIndicator={false}
      >
        {/* Current Conditions */}
        <Section 
          title="Current Conditions" 
          icon={<FontAwesome5 name="heartbeat" size={18} color="#3b82f6" />}
        >
          {medicalConditions.map(item => (
            <HistoryItem
              key={item.id}
              title={item.condition}
              subtitle={`Since ${item.since}`}
              details={item.details}
              status={item.status}
            />
          ))}
          <TouchableOpacity 
            style={tw`flex-row items-center justify-center p-3 mt-3 border border-blue-300 rounded-lg bg-blue-50`}
          >
            <Ionicons name="add-circle" size={18} color="#3b82f6" />
            <Text style={tw`ml-2 font-medium text-blue-600`}>Add Condition</Text>
          </TouchableOpacity>
        </Section>

        {/* Surgeries & Procedures */}
        <Section 
          title="Surgeries & Procedures" 
          icon={<FontAwesome5 name="hospital" size={18} color="#3b82f6" />}
        >
          {surgeries.map(item => (
            <HistoryItem
              key={item.id}
              title={item.procedure}
              subtitle={item.date}
              details={item.details}
            />
          ))}
        </Section>

        {/* Medications */}
        <Section 
          title="Current Medications" 
          icon={<FontAwesome5 name="pills" size={18} color="#3b82f6" />}
        >
          {medications.map(item => (
            <HistoryItem
              key={item.id}
              title={item.name}
              subtitle={`${item.dosage} - ${item.frequency}`}
              details="Take with food. Avoid alcohol while taking this medication."
            />
          ))}
        </Section>

        {/* Allergies */}
        <Section 
          title="Allergies" 
          icon={<FontAwesome5 name="allergies" size={18} color="#3b82f6" />}
        >
          {allergies.map(item => (
            <HistoryItem
              key={item.id}
              title={item.allergen}
              subtitle={`Reaction: ${item.reaction}`}
              details="Avoid all products containing this allergen"
            />
          ))}
        </Section>

        {/* Previous Physical Therapy */}
        <Section 
          title="Previous Therapy" 
          icon={<MaterialIcons name="fitness-center" size={18} color="#3b82f6" />}
        >
          {previousTherapy.map(item => (
            <HistoryItem
              key={item.id}
              title={item.type}
              subtitle={`${item.facility}, ${item.dates}`}
              details={item.notes}
            />
          ))}
        </Section>

        {/* Pain History - Visual representation */}
        <Section 
          title="Pain History" 
          icon={<FontAwesome5 name="file-medical-alt" size={18} color="#3b82f6" />}
        >
          <Text style={tw`mb-4 text-gray-700`}>
            Pain tracking data available from previous sessions:
          </Text>
          
          {/* Improved pain history visualization */}
          <View style={tw`flex-row justify-between p-3 mb-3 border border-blue-100 rounded-lg bg-blue-50`}>
            <Text style={tw`font-medium text-gray-700`}>January 2025</Text>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`mr-2 font-medium text-gray-700`}>Pain level: 7/10</Text>
              <View style={tw`w-20 h-4 overflow-hidden bg-gray-200 rounded-full`}>
                <View style={tw`h-full bg-red-500 w-14`} />
              </View>
            </View>
          </View>
          
          <View style={tw`flex-row justify-between p-3 mb-3 border border-blue-100 rounded-lg bg-blue-50`}>
            <Text style={tw`font-medium text-gray-700`}>March 2025</Text>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`mr-2 font-medium text-gray-700`}>Pain level: 5/10</Text>
              <View style={tw`w-20 h-4 overflow-hidden bg-gray-200 rounded-full`}>
                <View style={tw`w-10 h-full bg-yellow-500`} />
              </View>
            </View>
          </View>
          
          <View style={tw`flex-row justify-between p-3 mb-3 border border-blue-100 rounded-lg bg-blue-50`}>
            <Text style={tw`font-medium text-gray-700`}>June 2025</Text>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`mr-2 font-medium text-gray-700`}>Pain level: 3/10</Text>
              <View style={tw`w-20 h-4 overflow-hidden bg-gray-200 rounded-full`}>
                <View style={tw`w-6 h-full bg-green-500`} />
              </View>
            </View>
          </View>
          
          <TouchableOpacity 
            style={tw`items-center justify-center p-4 mt-4 bg-blue-600 rounded-lg shadow-sm`} 
            // onPress={() => router.push('/pain-tracking')}
          >
            <Text style={tw`font-medium text-white`}>View Detailed Pain History</Text>
          </TouchableOpacity>
        </Section>
        
        {/* Bottom spacing */}
        <View style={tw`h-10`} />
      </ScrollView>
    </SafeAreaView>
  );
}
