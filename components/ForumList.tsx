import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import tw from 'twrnc';

// Define TypeScript interfaces
interface ForumPost {
    id: string;
    title: string;
    description: string;
    author: {
        name: string;
        avatar: string;
        role?: string;
    };
    category: string;
    likes: number;
    comments: number;
    timeAgo: string;
    isLiked?: boolean;
    isSaved?: boolean;
    tags?: string[];
}

import type { RefreshControlProps } from 'react-native';

interface ForumListProps {
    category?: string;
    searchQuery?: string;
    onScroll?: any;
    refreshControl?: React.ReactElement<RefreshControlProps>;
}

// Enhanced sample data
const forumPosts: ForumPost[] = [
    {
        id: '1',
        title: 'Tips for managing shoulder pain after rotator cuff surgery',
        description: 'I had rotator cuff surgery 3 weeks ago and I\'m experiencing some discomfort during my recovery. What strategies have worked for others to manage pain while sleeping and during daily activities?',
        author: {
            name: 'Michael J.',
            avatar: 'https://randomuser.me/api/portraits/men/91.jpg',
            role: 'Patient'
        },
        category: 'recovery',
        likes: 24,
        comments: 8,
        timeAgo: '2 hours ago',
        isLiked: false,
        tags: ['surgery', 'shoulder', 'pain management']
    },
    {
        id: '2',
        title: 'Lower back strengthening exercises that worked for me',
        description: 'After 6 months of chronic lower back pain, these specific exercises from my physio have made a huge difference. Thought I\'d share my routine and progress with everyone here!',
        author: {
            name: 'Sarah L.',
            avatar: 'https://randomuser.me/api/portraits/women/69.jpg',
            role: 'Patient'
        },
        category: 'exercise',
        likes: 56,
        comments: 12,
        timeAgo: '1 day ago',
        isLiked: true,
        tags: ['back pain', 'exercises', 'success story']
    },
    {
        id: '3',
        title: 'How often should I do my prescribed home exercises?',
        description: 'My physio gave me a set of exercises to do at home but wasn\'t specific about frequency. Should I do them every day? Multiple times per day? Looking for advice from those who\'ve been through rehab.',
        author: {
            name: 'Alex T.',
            avatar: 'https://randomuser.me/api/portraits/men/83.jpg',
        },
        category: 'exercise',
        likes: 18,
        comments: 14,
        timeAgo: '3 days ago',
        tags: ['home exercise', 'frequency', 'rehab']
    },
    {
        id: '4',
        title: 'Nutrition tips for reducing inflammation after knee surgery',
        description: 'I\'m 2 weeks post-op from ACL reconstruction and looking for dietary recommendations to help with recovery and reducing inflammation. Any foods that particularly helped or hurt your recovery?',
        author: {
            name: 'Jessica M.',
            avatar: 'https://randomuser.me/api/portraits/women/92.jpg',
        },
        category: 'nutrition',
        likes: 32,
        comments: 19,
        timeAgo: '4 days ago',
        isLiked: false,
        tags: ['nutrition', 'inflammation', 'knee', 'ACL']
    },
    {
        id: '5',
        title: 'Managing pain flare-ups with chronic tendinopathy',
        description: 'I\'ve been dealing with Achilles tendinopathy for over a year now. Most days are manageable but occasionally I get severe flare-ups. What strategies help you manage these unpredictable episodes?',
        author: {
            name: 'Robert K.',
            avatar: 'https://randomuser.me/api/portraits/men/16.jpg',
            role: 'Patient'
        },
        category: 'pain',
        likes: 41,
        comments: 23,
        timeAgo: '1 week ago',
        tags: ['tendinopathy', 'flare-ups', 'chronic pain']
    },
    {
        id: '6',
        title: 'Success story: How I recovered from frozen shoulder',
        description: 'After a year of struggling with adhesive capsulitis (frozen shoulder), I want to share my journey and what finally worked for me. It was a long process but I now have almost full range of motion again!',
        author: {
            name: 'Linda W.',
            avatar: 'https://randomuser.me/api/portraits/women/88.jpg',
        },
        category: 'recovery',
        likes: 89,
        comments: 34,
        timeAgo: '2 weeks ago',
        isLiked: true,
        isSaved: true,
        tags: ['frozen shoulder', 'success story', 'recovery']
    },
];

const ForumList: React.FC<ForumListProps> = ({
    category = 'all',
    searchQuery = '',
    onScroll,
    refreshControl
}) => {
    // Filter posts based on category and search query
    const filteredPosts = forumPosts.filter(post => {
        const matchesCategory = category === 'all' || post.category === category;
        const matchesSearch = searchQuery === '' ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    const handlePostPress = (postId: string): void => {
        // router.push(`/(screens)/forum-post/${postId}`);
    };

    const handleLike = (postId: string): void => {
        console.log(`Liked post: ${postId}`);
        // In a real app, you would update state or make an API call
    };

    const handleComment = (postId: string): void => {
        // router.push(`/(screens)/forum-post/${postId}?focus=comments`);
    };

    const handleSave = (postId: string): void => {
        console.log(`Saved post: ${postId}`);
        // In a real app, you would update state or make an API call
    };

    const handleAuthorPress = (authorName: string): void => {
        console.log(`View profile: ${authorName}`);
        // In a real app, navigate to author profile
    };

    const renderTags = (tags?: string[]): React.ReactNode => {
        if (!tags || tags.length === 0) return null;

        return (
            <View style={tw`flex-row flex-wrap mt-2`}>
                {tags.slice(0, 3).map((tag, index) => (
                    <View key={index} style={tw`px-2 py-1 mb-1 mr-2 bg-gray-100 rounded-full`}>
                        <Text style={tw`text-xs text-gray-600`}>#{tag}</Text>
                    </View>
                ))}
                {tags.length > 3 && (
                    <Text style={tw`self-center text-xs text-gray-500`}>+{tags.length - 3} more</Text>
                )}
            </View>
        );
    };

    return (
        <Animated.FlatList
            data={filteredPosts}
            keyExtractor={(item) => item.id}
            contentContainerStyle={tw`pt-2 pb-20`}
            onScroll={onScroll}
            scrollEventThrottle={16}
            refreshControl={refreshControl}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
                <View style={tw`items-center justify-center px-4 py-12`}>
                    <Ionicons name="search" size={48} color="#cbd5e1" />
                    <Text style={tw`mt-4 text-lg text-center text-gray-500`}>
                        No posts found matching your criteria
                    </Text>
                    <Text style={tw`mt-1 text-sm text-center text-gray-400`}>
                        Try adjusting your search or category filters
                    </Text>
                </View>
            }
            renderItem={({ item, index }) => (
                <Animated.View
                    entering={FadeInDown.delay(100 * index).springify().damping(14)}
                    style={tw`mx-4 mb-4 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl`}
                >
                    {/* Author info */}
                    <View style={tw`flex-row items-center p-3 border-b border-gray-100`}>
                        <TouchableOpacity
                            style={tw`flex-row items-center`}
                            onPress={() => handleAuthorPress(item.author.name)}
                            activeOpacity={0.7}
                        >
                            <Image
                                source={{ uri: item.author.avatar }}
                                style={tw`w-10 h-10 rounded-full`}
                            />
                            <View style={tw`ml-2`}>
                                <Text style={tw`font-medium text-gray-800`}>{item.author.name}</Text>
                                {item.author.role && (
                                    <Text style={tw`text-xs text-gray-500`}>{item.author.role}</Text>
                                )}
                            </View>
                        </TouchableOpacity>
                        <Text style={tw`ml-auto text-xs text-gray-500`}>{item.timeAgo}</Text>
                    </View>

                    {/* Post content */}
                    <TouchableOpacity
                        style={tw`p-4`}
                        onPress={() => handlePostPress(item.id)}
                        activeOpacity={0.7}
                    >
                        <Text style={tw`mb-2 text-lg font-bold text-gray-800`}>{item.title}</Text>
                        <Text style={tw`text-gray-600`} numberOfLines={4}>{item.description}</Text>

                        {/* Tags */}
                        {renderTags(item.tags)}
                    </TouchableOpacity>

                    {/* Category badge */}
                    <View style={tw`absolute top-0 right-0 px-2 py-1 bg-blue-500 rounded-bl-lg`}>
                        <Text style={tw`text-xs font-medium text-white`}>{item.category}</Text>
                    </View>

                    {/* Action bar */}
                    <View style={tw`flex-row items-center justify-between p-2 bg-gray-50`}>
                        <View style={tw`flex-row`}>
                            <TouchableOpacity
                                style={tw`flex-row items-center px-3 py-1 mr-2`}
                                onPress={() => handleLike(item.id)}
                            >
                                <FontAwesome5
                                    name="heart"
                                    size={16}
                                    color={item.isLiked ? "#ef4444" : "#9ca3af"}
                                    solid={item.isLiked}
                                />
                                <Text style={tw`ml-1 text-sm ${item.isLiked ? 'text-red-500' : 'text-gray-500'}`}>{item.likes}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={tw`flex-row items-center px-3 py-1`}
                                onPress={() => handleComment(item.id)}
                            >
                                <FontAwesome5 name="comment" size={16} color="#9ca3af" />
                                <Text style={tw`ml-1 text-sm text-gray-500`}>{item.comments}</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={tw`px-3 py-1`}
                            onPress={() => handleSave(item.id)}
                        >
                            <FontAwesome5
                                name="bookmark"
                                size={16}
                                color={item.isSaved ? "#3b82f6" : "#9ca3af"}
                                solid={item.isSaved}
                            />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}
        />
    );
};

export default ForumList;