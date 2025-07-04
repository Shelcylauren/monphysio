import React from 'react'; 
import { SafeAreaView, SectionList, View, Animated, Pressable } from 'react-native'; 
import HomeHeader from '@/components/HomeHeader';
import SearchBar from '@/components/SearchBar';
import Recommendation from '@/components/Recommendation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { router } from 'expo-router';
import { Brain } from 'lucide-react-native';

// Import article data
import { data as articleData } from '@/components/Article';

export default function Index() {    
  const insets = useSafeAreaInsets();
  const pulseAnim = React.useRef(new Animated.Value(1)).current;
  
  // Create pulse animation for the floating button
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
  
  // Handle AI assistant button press
  const handleAIPress = () => {
    router.push('/(screens)/chatbot');
  };
  
  // Prepare sections for SectionList
  const sections = [
    {
      title: "recommendations",
      data: [{ id: "recommendations" }],
      renderItem: () => <Recommendation />
    },
    {
      title: "Physiotherapy & Rehabilitation Articles",
      data: articleData.map((article: any) => ({
        ...article,
        id: article.id.toString(),
      })),
      renderItem: ({ item }:any) => (
        <TouchableOpacity 
          style={tw`flex-row h-40 gap-4 p-4 my-2 overflow-hidden bg-white border-l-4 border-blue-500 shadow-md rounded-xl`}
          // onPress={() => router.push(`/article/${item.id}`)}
          activeOpacity={0.9}
        >
          <View style={tw`justify-between flex-1`}>
            {/* Category Tag - New Addition */}
            <View style={tw`self-start px-2 py-0.5 mb-1 bg-blue-100 rounded-full`}>
              <Text style={tw`text-xs font-medium text-blue-700`}>Technique</Text>
            </View>
            
            <View style={tw`flex-1`}>
              <Text style={tw`text-lg font-bold text-gray-800`} ellipsizeMode='tail' numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={tw`mt-1 text-gray-600`} ellipsizeMode='tail' numberOfLines={3}>
                {item.description}
              </Text>
            </View>
            
            {/* Author with icon */}
            <View style={tw`flex-row items-center mt-1`}>
              <View style={tw`w-5 h-5 mr-2 overflow-hidden bg-gray-200 rounded-full`}>
                {/* You could add an author avatar here */}
                <Text style={tw`text-xs leading-5 text-center text-gray-500`}>✎</Text>
              </View>
              <Text style={tw`text-sm text-gray-500`}>{item.author}</Text>
            </View>
          </View>
          
          {/* Right image with overlay gradient */}
          <View style={tw`relative w-24 overflow-hidden rounded-xl`}>
            <Image 
              source={item.imageUrl} 
              style={tw`w-full h-full`}
              resizeMode="cover"
            />
            <View style={tw`absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent`}></View>
          </View>
        </TouchableOpacity>
      )
    }
  ];

  return (     
    <SafeAreaView className="flex-1 bg-white"> 
      {/* Fixed Header Section */}
      <View className="z-10 px-4 bg-white">
        <HomeHeader />
        <SearchBar />
      </View>
      
      {/* Scrollable Content with SectionList */}
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => (
          section.title !== "recommendations" ? (
            <Text style={tw`mt-4 mb-2 text-lg font-bold text-gray-800`}>
              {section.title}
            </Text>
          ) : null
        )}
        renderSectionFooter={({ section }) => (
          section.title !== "recommendations" ? (
            <View style={tw`h-5 mb-2`}>
              <Text style={tw`text-base text-center text-gray-400`}>
                Explore our latest rehabilitation techniques
              </Text>
            </View>
          ) : null
        )}
      />
      
      {/* Floating AI Assistant Button */}
      <Animated.View
        style={[
          tw`absolute z-50 bg-blue-600 rounded-full shadow-2xl right-6 bottom-10`,
          {
            transform: [{ scale: pulseAnim }],
            shadowColor: '#3b82f6',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 8,
            elevation: 8,
          },
        ]}
      >
        <Pressable
          style={tw`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-500`}
          onPress={handleAIPress}
          android_ripple={{ color: 'rgba(255,255,255,0.3)', borderless: true, radius: 32 }}
          accessibilityLabel="Open AI physiotherapy assistant"
          accessibilityHint="Opens a virtual AI assistant to help with physiotherapy questions"
          accessibilityRole="button"
        >
          <Brain size={28} color="#ffffff" strokeWidth={2} />
        </Pressable>
      </Animated.View>
    </SafeAreaView>   
  ); 
}
