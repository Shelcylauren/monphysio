
// Header.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  ScrollView,
} from 'react-native';
import { Menu, X, User, ChevronDown } from 'lucide-react-native';

// Define props interface for TypeScript
interface HeaderProps {
  isTablet: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

// Define the navigation item type
interface NavItem {
  label: string;
  hasDropdown: boolean;
  dropdownItems?: string[];
}

// Define the navigation items outside the component
const navItems: NavItem[] = [
  { label: 'Home', hasDropdown: false },
  { label: 'About', hasDropdown: false },
  { label: 'Services', hasDropdown: true, 
    dropdownItems: ['Physical Therapy', 'Rehabilitation', 'Sport Recovery'] },
  { label: 'Treatments', hasDropdown: true, 
    dropdownItems: ['Manual Therapy', 'Massage', 'Electrotherapy', 'Exercise Programs'] },
  { label: 'Type of Diseases', hasDropdown: true, 
    dropdownItems: ['Back Pain', 'Joint Issues', 'Sports Injuries', 'Neurological'] },
  { label: 'Consultation', hasDropdown: false },

  { label: 'Medical Experts', hasDropdown: false },
  { label: 'Premium Account', hasDropdown: false },
  { label: 'Contacts', hasDropdown: false }
];

// Export component with proper props typing
export default function Header({ isTablet, isMenuOpen, toggleMenu }: HeaderProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showAuthOptions, setShowAuthOptions] = useState(false);

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const toggleAuthOptions = () => {
    setShowAuthOptions(!showAuthOptions);
  };

  return (
    <View className="w-full z-50 bg-blue-50 shadow-md">
      {/* Top Header Bar */}
      <View className="px-4 py-3">
        <View className="flex-row justify-between items-center">
          {/* Logo and Title */}
          <View className="flex-row items-center space-x-2">
            <Image
              source={require('@/assets/images/human-muscles.jpg')} // Replace with your actual image path
              className="w-12 h-12 rounded-lg"
              resizeMode="contain"
            />
            <Text className="text-blue-800 font-bold text-xl">PhysioConsult</Text>
          </View>
          
          {/* Mobile Menu Toggle */}
          {!isTablet && (
            <TouchableOpacity 
              onPress={toggleMenu} 
              className="p-2 bg-blue-100 rounded-lg"
            >
              {isMenuOpen ? (
                <X size={24} color="#1E40AF" />
              ) : (
                <Menu size={24} color="#1E40AF" />
              )}
            </TouchableOpacity>
          )}
          
          {/* Tablet User Profile Button */}
          {isTablet && (
            <TouchableOpacity 
              onPress={toggleAuthOptions}
              className="p-2 bg-blue-100 rounded-full"
            >
              <User size={24} color="#1E40AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {/* Tablet Navigation */}
      {isTablet && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 8, paddingHorizontal: 16 }}
        >
          {navItems.map((item, index) => (
            <View key={index} className="mr-2 relative">
              <TouchableOpacity
                onPress={() => item.hasDropdown && toggleDropdown(item.label)}
                className="flex-row items-center space-x-1 py-2 px-3 bg-blue-100 rounded-xl"
              >
                <Text className="text-blue-800 font-medium">{item.label}</Text>
                
                {item.hasDropdown && (
                  <Animated.View
                    style={{
                      transform: [{ 
                        rotate: activeDropdown === item.label ? '180deg' : '0deg' 
                      }]
                    }}
                  >
                    <ChevronDown size={16} color="#1E40AF" />
                  </Animated.View>
                )}
              </TouchableOpacity>
              
              {/* Dropdown menu for tablet */}
              {item.hasDropdown && activeDropdown === item.label && item.dropdownItems && (
                <View className="absolute top-full left-0 mt-1 z-10 bg-white shadow-lg rounded-lg min-w-full">
                  {item.dropdownItems.map((dropItem, idx) => (
                    <TouchableOpacity 
                      key={idx}
                      className="px-4 py-2"
                    >
                      <Text className="text-blue-700">{dropItem}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      )}
      
      {/* Mobile Menu (Expanded) */}
      {!isTablet && isMenuOpen && (
        <View className="bg-white border-t border-blue-100">
          {navItems.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                onPress={() => item.hasDropdown && toggleDropdown(item.label)}
                className="flex-row justify-between items-center px-4 py-3 border-b border-blue-50"
              >
                <Text className="text-blue-800 font-medium">{item.label}</Text>
                
                {item.hasDropdown && (
                  <Animated.View
                    style={{
                      transform: [{ 
                        rotate: activeDropdown === item.label ? '180deg' : '0deg' 
                      }]
                    }}
                  >
                    <ChevronDown size={18} color="#1E40AF" />
                  </Animated.View>
                )}
              </TouchableOpacity>
              
              {/* Mobile Dropdown Content */}
              {item.hasDropdown && activeDropdown === item.label && item.dropdownItems && (
                <View className="pl-8 bg-blue-50 py-1">
                  {item.dropdownItems.map((dropItem, idx) => (
                    <TouchableOpacity 
                      key={idx}
                      className="py-2"
                    >
                      <Text className="text-blue-700">{dropItem}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}
          
          {/* Mobile Auth Options */}
          <View className="p-4 space-y-2">
            <TouchableOpacity className="bg-blue-600 py-2 rounded-lg">
              <Text className="text-white text-center font-medium">Login</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="border border-blue-600 py-2 rounded-lg">
              <Text className="text-blue-600 text-center font-medium">Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      {/* Auth Dropdown on Tablet */}
      {isTablet && showAuthOptions && (
        <View className="absolute top-16 right-4 bg-white shadow-lg rounded-lg z-20 min-w-32">
          <TouchableOpacity className="px-4 py-2 border-b border-blue-50">
            <Text className="text-blue-700">Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="px-4 py-2">
            <Text className="text-blue-700">Register</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}