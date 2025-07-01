import React, { useState } from 'react';
import {
  StyleSheet, Image, Platform, View, Text, ScrollView,
  TouchableOpacity, Linking, Dimensions, FlatList
} from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/Usercoloscheme';
import tw from 'twrnc';
import { router } from 'expo-router';

// Clinic data - In a real app, you might fetch this from an API
const clinicData = {
  name: "MonPhysio Rehabilitation Center",
  tagline: "Professional care for your recovery journey",
  address: "123 Therapy Street, Wellness City, CA 90210",
  phone: "(800) 555-1234",
  email: "info@monphysio.com",
  website: "https://www.monphysio.com",
  hours: [
    { day: "Monday - Friday", hours: "8:00 AM - 7:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 2:00 PM" },
    { day: "Sunday", hours: "Closed" }
  ],
  location: {
    latitude: 34.052235,
    longitude: -118.243683,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  },
  about: "MonPhysio is a premier physiotherapy and rehabilitation clinic dedicated to helping patients recover from injury, manage chronic conditions, and improve their overall physical wellbeing. Our team of licensed professionals uses evidence-based treatments and personalized care plans to achieve the best outcomes for our patients.",
  services: [
    { 
      id: "1", 
      name: "Physiotherapy", 
      icon: "hand-holding-medical", 
      description: "Expert manual therapy and rehabilitation exercises customized to your needs." 
    },
    { 
      id: "2", 
      name: "Sports Rehabilitation", 
      icon: "running", 
      description: "Specialized programs for athletes to return to sport quickly and safely." 
    },
    { 
      id: "3", 
      name: "Pain Management", 
      icon: "heartbeat", 
      description: "Comprehensive approach to managing chronic and acute pain conditions." 
    },
    { 
      id: "4", 
      name: "Post-surgical Rehab", 
      icon: "hospital", 
      description: "Recovery programs designed for optimal healing after surgical procedures." 
    },
    { 
      id: "5", 
      name: "Ergonomic Assessment", 
      icon: "chair", 
      description: "Workplace evaluations to prevent injury and improve comfort." 
    },
    { 
      id: "6", 
      name: "Massage Therapy", 
      icon: "spa", 
      description: "Therapeutic massage to relieve muscle tension and promote healing." 
    }
  ],
  staff: [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      role: "Lead Physiotherapist",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      specialties: "Sports Injuries, Spinal Rehabilitation",
      education: "DPT, University of California"
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      role: "Senior Physiotherapist",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      specialties: "Manual Therapy, Neurological Rehabilitation",
      education: "PhD in Physical Therapy, Stanford University"
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      role: "Sports Rehabilitation Specialist",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      specialties: "Athletic Injuries, Return-to-Sport Programs",
      education: "MSc Sports Medicine, UCLA"
    }
  ],
  testimonials: [
    {
      id: "1",
      name: "Robert M.",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      text: "After my knee replacement, the team at MonPhysio was instrumental in my recovery. I'm now back to hiking and enjoying an active lifestyle!",
      rating: 5
    },
    {
      id: "2",
      name: "Jessica L.",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      text: "I've struggled with chronic back pain for years. The personalized treatment plan from Dr. Johnson has made a tremendous difference in my daily life.",
      rating: 5
    },
    {
      id: "3",
      name: "David K.",
      image: "https://randomuser.me/api/portraits/men/41.jpg",
      text: "As a competitive runner, I needed specialized care for my recurring ankle injury. The sports rehab program here got me back to racing in half the expected time.",
      rating: 5
    }
  ],
  gallery: [
    { id: "1", image: require('@/assets/images/ss.jpg'), caption: "Reception Area" },
    { id: "2", image: require('@/assets/images/ss.jpg'), caption: "Treatment Room" },
    { id: "3", image: require('@/assets/images/ss.jpg'), caption: "Exercise Facility" },
    { id: "4", image: require('@/assets/images/ss.jpg'), caption: "Hydrotherapy Pool" }
  ]
};

// Add these interfaces at the top of your file
interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface StaffMember {
  id: string;
  name: string;
  role: string;
  image: string;
  specialties: string;
  education: string;
}

interface TestimonialItem {
  id: string;
  name: string;
  image: string;
  text: string;
  rating: number;
}

interface GalleryImage {
  id: string;
  image: any; // Image from require
  caption: string;
}

interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
}

// Card component for services
const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  return (
    <Animatable.View
      animation="fadeIn"
      duration={600}
      style={tw`w-[48%] p-4 mb-4 bg-white rounded-xl shadow-md`}
    >
      <View style={tw`items-center justify-center mb-3 bg-blue-100 rounded-full w-14 h-14`}>
        <FontAwesome5 name={service.icon} size={24} color="#3b82f6" />
      </View>
      <Text style={tw`mb-1 text-lg font-bold text-gray-800`}>{service.name}</Text>
      <Text style={tw`text-sm text-gray-600`}>{service.description}</Text>
    </Animatable.View>
  );
};

// Staff profile component
const StaffProfile: React.FC<{ staff: StaffMember }> = ({ staff }) => {
  return (
    <Animatable.View
      animation="fadeIn"
      duration={800}
      style={tw`p-4 mb-4 bg-white shadow-md rounded-xl`}
    >
      <View style={tw`flex-row`}>
        <Image
          source={{ uri: staff.image }}
          style={tw`w-20 h-20 mr-4 rounded-full`}
          resizeMode="cover"
        />
        <View style={tw`flex-1`}>
          <Text style={tw`text-lg font-bold text-gray-800`}>{staff.name}</Text>
          <Text style={tw`mb-1 text-blue-600`}>{staff.role}</Text>
          <Text style={tw`text-sm text-gray-600`}>Specialties: {staff.specialties}</Text>
          <Text style={tw`text-xs text-gray-500`}>{staff.education}</Text>
        </View>
      </View>
    </Animatable.View>
  );
};

// Testimonial component
const Testimonial: React.FC<{ testimonial: TestimonialItem, index: number }> = ({ testimonial, index }) => {
  return (
    <Animatable.View
      animation="fadeIn"
      delay={index * 200}
      style={tw`p-4 mx-2 mb-4 bg-white shadow-md h-45 rounded-xl w-70`}
    >
      <View style={tw`flex-row items-center mb-3`}>
        <Image
          source={{ uri: testimonial.image }}
          style={tw`w-12 h-12 mr-3 rounded-full`}
        />
        <View>
          <Text style={tw`font-bold text-gray-800`}>{testimonial.name}</Text>
          <View style={tw`flex-row`}>
            {[...Array(5)].map((_, i) => (
              <Ionicons
                key={i}
                name="star"
                size={16}
                color={i < testimonial.rating ? "#f59e0b" : "#d1d5db"}
              />
            ))}
          </View>
        </View>
      </View>
      <Text style={tw`italic text-gray-600`}>"{testimonial.text}"</Text>
    </Animatable.View>
  );
};

// Gallery item component
const GalleryItem: React.FC<{ item: GalleryImage }> = ({ item }) => {
  return (
    <View style={tw`mr-4`}>
      <Image
        source={item.image}
        style={tw`w-40 h-32 rounded-lg`}
        resizeMode="cover"
      />
      <Text style={tw`mt-1 text-sm text-center text-gray-600`}>{item.caption}</Text>
    </View>
  );
};

// Section header component
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon }) => {
  return (
    <View style={tw`flex-row items-center mb-4`}>
      {icon && <View style={tw`mr-2`}>{icon}</View>}
      <Text style={tw`text-xl font-bold text-blue-800`}>{title}</Text>
    </View>
  );
};

export default function Clinic() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [expanded, setExpanded] = useState({
    about: false,
    hours: false
  });

  // Functions to handle direct actions with types
  const handleCall = (): void => {
    Linking.openURL(`tel:${clinicData.phone}`);
  };

  const handleEmail = (): void => {
    Linking.openURL(`mailto:${clinicData.email}`);
  };

  const handleDirections = (): void => {
    const scheme = Platform.select({ ios: 'maps:', android: 'geo:' });
    const url = Platform.select({
      ios: `${scheme}?q=${clinicData.address}`,
      android: `${scheme}0,0?q=${clinicData.address}`
    });
    // Linking.openURL(url);
  };

  const handleBookAppointment = (): void => {
    // router.push('/book-appointment');
  };

  const toggleSection = (section: 'about' | 'hours'): void => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section with Overlay */}
        <View style={tw`relative`}>
          <Image
            source={require('@/assets/images/ss.jpg')}
            style={tw`w-full h-56`}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
            style={tw`absolute inset-0`}
          />
          <View style={tw`absolute bottom-0 left-0 right-0 p-4`}>
            <Animatable.Text 
              animation="fadeInUp" 
              style={tw`text-2xl font-bold text-white`}
            >
              {clinicData.name}
            </Animatable.Text>
            <Animatable.Text 
              animation="fadeInUp" 
              delay={200} 
              style={tw`text-white`}
            >
              {clinicData.tagline}
            </Animatable.Text>
          </View>
        </View>
        
        {/* Quick Action Buttons */}
        <View style={tw`flex-row justify-between px-4 py-2 -mt-5`}>
          <Animatable.View animation="bounceIn" delay={100} style={tw`items-center`}>
            <TouchableOpacity 
              style={tw`items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg`}
              onPress={handleCall}
            >
              <Ionicons name="call" size={28} color="#3b82f6" />
            </TouchableOpacity>
            <Text style={tw`mt-1 text-xs text-gray-600`}>Call</Text>
          </Animatable.View>
          
          <Animatable.View animation="bounceIn" delay={200} style={tw`items-center`}>
            <TouchableOpacity 
              style={tw`items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg`}
              onPress={handleDirections}
            >
              <Ionicons name="location" size={28} color="#3b82f6" />
            </TouchableOpacity>
            <Text style={tw`mt-1 text-xs text-gray-600`}>Directions</Text>
          </Animatable.View>
          
          <Animatable.View animation="bounceIn" delay={300} style={tw`items-center`}>
            <TouchableOpacity 
              style={tw`items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg`}
              onPress={handleEmail}
            >
              <Ionicons name="mail" size={28} color="#3b82f6" />
            </TouchableOpacity>
            <Text style={tw`mt-1 text-xs text-gray-600`}>Email</Text>
          </Animatable.View>
          
          <Animatable.View animation="bounceIn" delay={400} style={tw`items-center`}>
            <TouchableOpacity 
              style={tw`items-center justify-center w-16 h-16 bg-blue-500 rounded-full shadow-lg`}
              onPress={handleBookAppointment}
            >
              <Ionicons name="calendar" size={28} color="white" />
            </TouchableOpacity>
            <Text style={tw`mt-1 text-xs text-gray-600`}>Book</Text>
          </Animatable.View>
        </View>
        
        <View style={tw`px-4 py-6`}>
          {/* About Section */}
          <Animatable.View animation="fadeInUp" style={tw`mb-6`}>
            <TouchableOpacity 
              style={tw`flex-row items-center justify-between mb-2`}
              onPress={() => toggleSection('about')}
            >
              <SectionHeader 
                title="About Our Clinic" 
                icon={<MaterialIcons name="info" size={24} color="#3b82f6" />} 
              />
              <Ionicons 
                name={expanded.about ? "chevron-up" : "chevron-down"} 
                size={24} 
                color="#3b82f6" 
              />
            </TouchableOpacity>
            
            {expanded.about ? (
              <Animatable.View animation="fadeIn" style={tw`p-4 bg-white shadow-sm rounded-xl`}>
                <Text style={tw`leading-6 text-gray-700`}>{clinicData.about}</Text>
              </Animatable.View>
            ) : (
              <View style={tw`p-4 bg-white shadow-sm rounded-xl`}>
                <Text numberOfLines={2} style={tw`leading-6 text-gray-700`}>
                  {clinicData.about}
                </Text>
                <Text style={tw`mt-1 text-sm text-blue-600`}>Read more</Text>
              </View>
            )}
          </Animatable.View>
          
          {/* Services Section */}
          <Animatable.View animation="fadeInUp" delay={200} style={tw`mb-6`}>
            <SectionHeader 
              title="Our Services" 
              icon={<MaterialIcons name="medical-services" size={24} color="#3b82f6" />} 
            />
            <View style={tw`flex-row flex-wrap justify-between`}>
              {clinicData.services.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </View>
          </Animatable.View>
          
          {/* Staff Section */}
          <Animatable.View animation="fadeInUp" delay={300} style={tw`mb-6`}>
            <SectionHeader 
              title="Our Team" 
              icon={<MaterialIcons name="people" size={24} color="#3b82f6" />} 
            />
            {clinicData.staff.map(person => (
              <StaffProfile key={person.id} staff={person} />
            ))}
          </Animatable.View>
          
          {/* Hours & Location - Updated without map */}
          <Animatable.View animation="fadeInUp" delay={400} style={tw`mb-6`}>
            <TouchableOpacity
              style={tw`flex-row items-center justify-between mb-2`}
              onPress={() => toggleSection('hours')}
            >
              <SectionHeader
                title="Hours & Location"
                icon={<MaterialIcons name="schedule" size={24} color="#3b82f6" />}
              />
              <Ionicons
                name={expanded.hours ? "chevron-up" : "chevron-down"}
                size={24}
                color="#3b82f6"
              />
            </TouchableOpacity>

            {expanded.hours ? (
              <Animatable.View animation="fadeIn" style={tw`overflow-hidden bg-white shadow-sm rounded-xl`}>
                <View style={tw`p-4 border-b border-gray-100`}>
                  {clinicData.hours.map((item, index) => (
                    <View key={index} style={tw`flex-row justify-between mb-2`}>
                      <Text style={tw`font-medium text-gray-700`}>{item.day}</Text>
                      <Text style={tw`text-gray-600`}>{item.hours}</Text>
                    </View>
                  ))}
                </View>

                <View style={tw`p-4`}>
                  <Text style={tw`mb-2 font-medium text-gray-800`}>Address:</Text>
                  <Text style={tw`mb-4 text-gray-600`}>{clinicData.address}</Text>
                  
                  {/* Location image instead of map */}
                  <View style={tw`h-40 mb-2 overflow-hidden bg-gray-100 rounded-lg`}>
                    <Image
                      source={require('@/assets/images/ss.jpg')}
                      style={tw`w-full h-full`}
                      resizeMode="cover"
                    />
                    <View style={tw`absolute inset-0 items-center justify-center bg-black bg-opacity-30`}>
                      <Text style={tw`mb-2 text-lg font-bold text-white`}>Visit Our Clinic</Text>
                    </View>
                  </View>
                  
                  <TouchableOpacity 
                    style={tw`flex-row items-center justify-center p-3 mt-2 bg-blue-100 rounded-lg`}
                    onPress={handleDirections}
                  >
                    <Ionicons name="navigate" size={18} color="#3b82f6" />
                    <Text style={tw`ml-1 font-medium text-blue-600`}>Get Directions</Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            ) : (
              <View style={tw`p-4 bg-white shadow-sm rounded-xl`}>
                <View style={tw`flex-row justify-between mb-2`}>
                  <Text style={tw`font-medium text-gray-700`}>Today's Hours:</Text>
                  <Text style={tw`text-gray-600`}>8:00 AM - 7:00 PM</Text>
                </View>
                <Text style={tw`text-sm text-blue-600`}>View all hours and location</Text>
              </View>
            )}
          </Animatable.View>
          
          {/* Testimonials */}
          <Animatable.View animation="fadeInUp" delay={500} style={tw`mb-6`}>
            <SectionHeader 
              title="Patient Testimonials" 
              icon={<MaterialIcons name="star-rate" size={24} color="#3b82f6" />} 
            />
            <FlatList
              data={clinicData.testimonials}
              renderItem={({ item, index }) => <Testimonial testimonial={item} index={index} />}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={tw`py-2`}
            />
          </Animatable.View>
          
          {/* Gallery */}
          <Animatable.View animation="fadeInUp" delay={600} style={tw`mb-6`}>
            <SectionHeader 
              title="Our Facility" 
              icon={<MaterialIcons name="photo-library" size={24} color="#3b82f6" />} 
            />
            <FlatList
              data={clinicData.gallery}
              renderItem={({ item }) => <GalleryItem item={item} />}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={tw`py-2`}
            />
          </Animatable.View>
          
          {/* Book Appointment Button */}
          <Animatable.View animation="fadeInUp" delay={700} style={tw`mb-10`}>
            <TouchableOpacity 
              style={tw`p-4 bg-blue-600 shadow-md rounded-xl`}
              onPress={handleBookAppointment}
            >
              <Text style={tw`font-bold text-center text-white`}>Book an Appointment</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </ScrollView>
    </View>
  );
}