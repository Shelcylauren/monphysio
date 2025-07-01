import { ScrollView, Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useUserAuth } from '@/store/useUserAuth'
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons'
import tw from 'twrnc'
import { router } from 'expo-router'

// Define interfaces for data types
interface User {
  name: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  emergencyContact: string;
}

interface MedicalHistoryItem {
  id: number;
  condition: string;
  since: string;
}

interface Appointment {
  id: number;
  date: string;
  time: string;
  therapist: string;
}

interface ProgressSummary {
  painLevel: number;
  mobilityScore: number;
  sessionsCompleted: number;
  lastAssessment: string;
}

// Define component props interfaces
interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
}

interface ListItemProps {
  icon: React.ReactNode;
  text: string;
  subtext?: string;
}

export default function Profile(): React.JSX.Element {
    const closeSessionToggle = useUserAuth((state) => state.toggleHasOnboarded)

    {/*useUserAuth((state) => state.user) ||*/ }
    const user: User =  {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        dob: "January 15, 1985",
        address: "123 Main Street, Anytown",
        emergencyContact: "Jane Doe (+1 555-987-6543)"
    }
    
    // Example data - in a real app, fetch from API/database
    const medicalHistory: MedicalHistoryItem[] = [
        { id: 1, condition: "Lower Back Pain", since: "2022" },
        { id: 2, condition: "Shoulder Tendinitis", since: "2023" }
    ]
    
    const upcomingAppointments: Appointment[] = [
        { id: 1, date: "July 5, 2025", time: "10:00 AM", therapist: "Dr. Smith" },
        { id: 2, date: "July 12, 2025", time: "11:30 AM", therapist: "Dr. Johnson" }
    ]
    
    const progressSummary: ProgressSummary = {
        painLevel: 3,
        mobilityScore: 7,
        sessionsCompleted: 8,
        lastAssessment: "June 28, 2025"
    }

    const handleCloseSession = (): void => {
        // Logic to close the session goes here
        closeSessionToggle() // Toggle the onboarding state
    }

    const ProfileSection: React.FC<ProfileSectionProps> = ({ title, children }) => (
        <View style={tw`p-4 mx-4 mb-6 bg-white shadow-sm rounded-xl`}>
            <Text style={tw`mb-2 text-xl font-bold text-blue-800`}>{title}</Text>
            {children}
        </View>
    )

    const ListItem: React.FC<ListItemProps> = ({ icon, text, subtext }) => (
        <View style={tw`flex-row items-center pb-2 mb-3 border-b border-gray-100`}>
            <View style={tw`items-center justify-center w-10 h-10 mr-3 bg-blue-100 rounded-full`}>
                {icon}
            </View>
            <View style={tw`flex-1`}>
                <Text style={tw`font-medium text-gray-800`}>{text}</Text>
                {subtext && <Text style={tw`text-sm text-gray-500`}>{subtext}</Text>}
            </View>
        </View>
    )

    return (
        <ScrollView style={tw`flex-1 bg-gray-50`} showsVerticalScrollIndicator={false}>
            {/* Header section with profile photo */}
            <View style={tw`items-center pt-12 pb-4 mb-4 bg-blue-600`}>
                <View style={tw`w-24 h-24 mb-2 overflow-hidden bg-white border-2 border-white rounded-full shadow-md`}>
                    <Image 
                        source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
                        style={tw`w-full h-full`}
                        resizeMode="cover"
                    />
                </View>
                <Text style={tw`text-2xl font-bold text-white`}>{user.name}</Text>
                <Text style={tw`text-blue-100`}>{user.email}</Text>
            </View>

            {/* Personal Information */}
            <ProfileSection title="Personal Information">
                <ListItem 
                    icon={<MaterialIcons name="phone" size={20} color="#3b82f6" />}
                    text={user.phone}
                    subtext="Mobile"
                />
                <ListItem 
                    icon={<MaterialIcons name="cake" size={20} color="#3b82f6" />}
                    text={user.dob}
                    subtext="Date of Birth"
                />
                <ListItem 
                    icon={<MaterialIcons name="home" size={20} color="#3b82f6" />}
                    text={user.address}
                    subtext="Address"
                />
                <ListItem 
                    icon={<MaterialIcons name="contact-phone" size={20} color="#3b82f6" />}
                    text={user.emergencyContact}
                    subtext="Emergency Contact"
                />
            </ProfileSection>

            {/* Medical History */}
            <ProfileSection title="Medical History">
                {medicalHistory.map(item => (
                    <ListItem 
                        key={item.id}
                        icon={<FontAwesome5 name="notes-medical" size={18} color="#3b82f6" />}
                        text={item.condition}
                        subtext={`Since ${item.since}`}
                    />
                ))}
                <TouchableOpacity 
                    style={tw`flex-row items-center p-2 mt-2 rounded-lg bg-blue-50`}
                    onPress={() => router.push('/(screens)/medical-history')}
                >
                    <Ionicons name="document-text" size={18} color="#3b82f6" />
                    <Text style={tw`ml-2 font-medium text-blue-600`}>View Complete Medical History</Text>
                </TouchableOpacity>
            </ProfileSection>

            {/* Upcoming Appointments */}
            <ProfileSection title="Upcoming Appointments">
                {upcomingAppointments.map(appt => (
                    <ListItem 
                        key={appt.id}
                        icon={<MaterialIcons name="event" size={20} color="#3b82f6" />}
                        text={`${appt.date} at ${appt.time}`}
                        subtext={`With ${appt.therapist}`}
                    />
                ))}
                <TouchableOpacity 
                    style={tw`flex-row items-center justify-center p-3 mt-2 bg-blue-600 rounded-lg`}
                    onPress={() => router.push('/appointment')}
                >
                    <Text style={tw`font-medium text-white`}>Book New Appointment</Text>
                </TouchableOpacity>
            </ProfileSection>

            {/* Progress Summary */}
            <ProfileSection title="Your Progress">
                <View style={tw`flex-row flex-wrap justify-between`}>
                    <View style={tw`w-5/12 p-3 mb-3 bg-blue-50 rounded-xl`}>
                        <Text style={tw`text-xl font-bold text-blue-800`}>{progressSummary.painLevel}/10</Text>
                        <Text style={tw`text-gray-600`}>Current Pain Level</Text>
                    </View>
                    <View style={tw`w-5/12 p-3 mb-3 bg-blue-50 rounded-xl`}>
                        <Text style={tw`text-xl font-bold text-blue-800`}>{progressSummary.mobilityScore}/10</Text>
                        <Text style={tw`text-gray-600`}>Mobility Score</Text>
                    </View>
                    <View style={tw`w-5/12 p-3 bg-blue-50 rounded-xl`}>
                        <Text style={tw`text-xl font-bold text-blue-800`}>{progressSummary.sessionsCompleted}</Text>
                        <Text style={tw`text-gray-600`}>Sessions Completed</Text>
                    </View>
                    <View style={tw`w-5/12 p-3 bg-blue-50 rounded-xl`}>
                        <Text style={tw`text-sm text-xl font-bold text-blue-800`}>{progressSummary.lastAssessment}</Text>
                        <Text style={tw`text-gray-600`}>Last Assessment</Text>
                    </View>
                </View>
                <TouchableOpacity 
                    style={tw`flex-row items-center justify-center p-2 mt-4 border border-blue-300 rounded-lg`}
                    onPress={() => router.push('/(screens)/patient-progress')}
                >
                    <MaterialIcons name="trending-up" size={20} color="#3b82f6" />
                    <Text style={tw`ml-2 font-medium text-blue-600`}>View Detailed Progress</Text>
                </TouchableOpacity>
            </ProfileSection>

            {/* Account Settings */}
            <ProfileSection title="Account Settings">
                <TouchableOpacity style={tw`flex-row items-center py-3`} onPress={() => router.push('/edit-profile')}>
                    <MaterialIcons name="edit" size={22} color="#3b82f6" />
                    <Text style={tw`ml-3 text-gray-800`}>Edit Profile</Text>
                    <MaterialIcons name="chevron-right" size={22} color="#9ca3af" style={tw`ml-auto`} />
                </TouchableOpacity>
                
                <TouchableOpacity style={tw`flex-row items-center py-3`} onPress={() => router.push('/(screens)/notification-settings')}>
                    <MaterialIcons name="notifications" size={22} color="#3b82f6" />
                    <Text style={tw`ml-3 text-gray-800`}>Notification Settings</Text>
                    <MaterialIcons name="chevron-right" size={22} color="#9ca3af" style={tw`ml-auto`} />
                </TouchableOpacity>
                
                <TouchableOpacity style={tw`flex-row items-center py-3`} onPress={() => router.push('/(screens)/privacy-security')}>
                    <MaterialIcons name="security" size={22} color="#3b82f6" />
                    <Text style={tw`ml-3 text-gray-800`}>Privacy & Security</Text>
                    <MaterialIcons name="chevron-right" size={22} color="#9ca3af" style={tw`ml-auto`} />
                </TouchableOpacity>
                
                <TouchableOpacity style={tw`flex-row items-center py-3`} onPress={() => router.push('/(screens)/help-support')}>
                    <MaterialIcons name="help" size={22} color="#3b82f6" />
                    <Text style={tw`ml-3 text-gray-800`}>Help & Support</Text>
                    <MaterialIcons name="chevron-right" size={22} color="#9ca3af" style={tw`ml-auto`} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={tw`flex-row items-center px-2 py-3 mt-3 rounded-lg bg-red-50`}
                    onPress={handleCloseSession}
                >
                    <MaterialIcons name="logout" size={22} color="#f87171" />
                    <Text style={tw`ml-3 font-medium text-red-500`}>Sign Out</Text>
                </TouchableOpacity>
            </ProfileSection>

            {/* App version */}
            <View style={tw`items-center pb-8`}>
                <Text style={tw`text-xs text-gray-400`}>MonPhysio v1.0.0</Text>
            </View>
        </ScrollView>
    )
}