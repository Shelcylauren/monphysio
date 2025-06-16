// router.push('/(tabs)/Chatbot');

import { Text, View } from 'react-native'
import React from 'react'
import ForumHeader from '@/Components/ForumHeader'
import ForumList from '@/Components/ForumList'
import tw from 'twrnc'
import BGCircle from '@/Components/BGCircle'

export default function Forum() {
    return (
        <View className="relative flex-1 px-4 bg-white">
            {/* Top Abosolute position gray circle */}
            <BGCircle />
            <Text className="my-2 text-2xl font-bold text-blue-800">Explore Forum</Text>
            <ForumHeader />
            <ForumList />
            {/* Bottom Abosolute position gray circle */}
            <BGCircle position='bottom-right' />
        </View>
    )
}
