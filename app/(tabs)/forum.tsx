import React, { useState, useCallback } from 'react';
import { 
  View, Text, TouchableOpacity, TextInput, 
  FlatList, Platform, StatusBar, RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useAnimatedScrollHandler, 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming, 
  interpolate,
  Extrapolation,
  FadeIn, 
  FadeOut 
} from 'react-native-reanimated';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import ForumList from '@/components/ForumList';
import BGCircle from '@/components/BGCircle';
import tw from 'twrnc';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Define interfaces for better type safety
interface ForumCategory {
  id: string;
  name: string;
  icon: any; // Icon name from MaterialCommunityIcons or Ionicons
}

interface TabProps {
  category: ForumCategory;
  isActive: boolean;
  onPress: (id: string) => void;
}

// Forum categories for the tabs
const forumCategories: ForumCategory[] = [
  { id: 'all', name: 'All Posts', icon: 'apps' },
    { id: 'recovery', name: 'Recovery', icon: 'chart-line' },
  { id: 'exercise', name: 'Exercise', icon: 'run' },
  { id: 'pain', name: 'Pain Management', icon: 'graph' },
    { id: 'nutrition', name: 'Nutrition', icon: 'nutrition' },
];

// Tab component with animations
const CategoryTab: React.FC<TabProps> = ({ category, isActive, onPress }) => {
  return (
    <Animated.View
      entering={FadeIn.delay(100 * parseInt(category.id === 'all' ? '1' : category.id))}
    >
      <TouchableOpacity
        style={tw`px-4 py-2 mr-2 rounded-full ${isActive ? 'bg-blue-500' : 'bg-gray-100'}`}
        onPress={() => onPress(category.id)}
      >
        <View style={tw`flex-row items-center`}>
          <MaterialCommunityIcons 
            name={category.icon} 
            size={16} 
            color={isActive ? '#ffffff' : '#4b5563'} 
          />
          <Text 
            style={tw`ml-1 font-medium ${isActive ? 'text-white' : 'text-gray-600'}`}
          >
            {category.name}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function Forum(): JSX.Element {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  
  // Animation values with Reanimated
  const scrollY = useSharedValue(0);
  const fabScale = useSharedValue(1);
  
  // Scroll handler with Reanimated
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });
  
  // Animated styles
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 80],
      [1, 0.8],
      Extrapolation.CLAMP
    );
    
    return {
      opacity,
    };
  });
  
  const fabAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: fabScale.value }]
    };
  });
  
  // Handle refresh
  const onRefresh = async (): Promise<void> => {
    setIsRefreshing(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };
  
  // Create new post
  const handleNewPost = (): void => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Animate the FAB when pressed
    fabScale.value = withTiming(0.9, { duration: 100 });
    setTimeout(() => {
      fabScale.value = withTiming(1, { duration: 100 });
    //   router.push('/(screens)/create-post');
    }, 100);
  };
  
  // Toggle search
  const toggleSearch = (): void => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery('');
    }
  };

  // Handle category selection
  const handleCategorySelect = useCallback((categoryId: string): void => {
    Haptics.selectionAsync();
    setActiveTab(categoryId);
  }, []);

  // Handle notification press
  const handleNotificationPress = (): void => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // router.push('/(screens)/notifications');
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Background Elements */}
      <BGCircle />
      <BGCircle position='bottom-right' />
      
      {/* Header with Animated Opacity */}
      <Animated.View 
        style={[
          tw`z-10 px-4 pt-2 `,
          headerAnimatedStyle
        ]}
      >
        <View style={tw`flex-row items-center justify-between`}>
          <Text style={tw`text-2xl font-bold text-blue-800`}>Explore Forum</Text>
          
          <View style={tw`flex-row`}>
            <TouchableOpacity 
              style={tw`p-2 mr-2 rounded-full bg-gray-50`}
              onPress={toggleSearch}
            >
              <Ionicons name={showSearch ? "close" : "search"} size={22} color="#3b82f6" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={tw`p-2 rounded-full bg-gray-50`}
              onPress={handleNotificationPress}
            >
              <Ionicons name="notifications" size={22} color="#3b82f6" />
              <View style={tw`absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1`}></View>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Search Bar - Conditionally shown with animations */}
        {showSearch && (
          <Animated.View 
            style={tw`px-2 py-2 mt-2 mb-3 bg-gray-100 rounded-xl`}
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(200)}
          >
            <TextInput
              style={tw`px-3 py-2 text-gray-700`}
              placeholder="Search discussions..."
              value={searchQuery}
              onChangeText={(text: string) => setSearchQuery(text)}
              autoFocus
            />
          </Animated.View>
        )}
        
        {/* Category Tabs with Horizontal Scroll */}
        <FlatList
          data={forumCategories}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={tw`mt-2`}
          contentContainerStyle={tw`pb-2`}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: ForumCategory }) => (
            <CategoryTab
              category={item}
              isActive={activeTab === item.id}
              onPress={handleCategorySelect}
            />
          )}
        />
      </Animated.View>
      
      {/* Forum Content with animated scroll */}
      <ForumList />
      
      {/* Floating Action Button with animation */}
      <Animated.View
        style={[
          tw`absolute z-10 p-4 bg-blue-600 rounded-full shadow-lg`,
          { right: 20, bottom: 20 + insets.bottom },
          fabAnimatedStyle
        ]}
      >
        <TouchableOpacity
          onPress={handleNewPost}
          activeOpacity={0.8}
        >
          <FontAwesome5 name="pen" size={20} color="#ffffff" />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}
