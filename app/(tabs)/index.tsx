import React from 'react'; 
import { SafeAreaView, SectionList, View } from 'react-native'; 
import HomeHeader from '@/components/HomeHeader';
import SearchBar from '@/components/SearchBar';
import Recommendation from '@/components/Recommendation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
// import { router } from 'expo-router';

// Import article data
import { data as articleData } from '@/components/Article';

export default function Index() {    
  const insets = useSafeAreaInsets();
  
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
    </SafeAreaView>   
  ); 
}
