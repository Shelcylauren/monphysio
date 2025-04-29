import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';

const data = [
    { id: 1, title: 'Magna reprehenderit aliquip non cupidatat voluptate id fugiat laboris.', description: 'Ullamco cillum laborum sunt nulla cillum tempor quis do ut. Ullamco qui ad mollit aute duis eu. Id dolor sint exercitation reprehenderit excepteur adipisicing anim irure aliquip. Non ad minim tempor minim laboris velit aliqua cupidatat ea esse deserunt. Voluptate reprehenderit sunt ullamco sunt in eu in fugiat ipsum nisi.', imageUrl: require('@/assets/images/aa.jpg'), author: 'Dr. Shelcy Roy' },
    { id: 2, title: 'Aliqua aliquip elit aliquip eu.', description: 'Quis sunt reprehenderit non cillum ad ullamco veniam excepteur consectetur in ipsum sit Lorem et. Non ad nisi in veniam occaecat deserunt incididunt nulla et quis elit nisi amet officia. Do cillum adipisicing irure ut minim non esse cupidatat et officia labore ex.', imageUrl: require('@/assets/images/aa.jpg'), author: 'Dr. Kenito Benito' },
    { id: 3, title: 'Voluptate qui ex voluptate amet sint duis.', description: 'Ipsum nulla elit exercitation laboris occaecat commodo laboris laborum proident adipisicing aliquip veniam velit. Sunt fugiat est nulla reprehenderit tempor occaecat. Sit anim Lorem aute velit est sunt voluptate tempor dolor eu aliquip Lorem duis.', imageUrl: require('@/assets/images/aa.jpg'), author: 'Dr. Emma Noussi' },
    { id: 4, title: 'Veniam id occaecat anim ea sint deserunt laborum.', description: 'Nostrud dolor ad amet nostrud elit incididunt Lorem cupidatat consectetur. Eu dolor aute culpa deserunt consectetur culpa elit in quis excepteur ex cillum. Tempor tempor eu voluptate et ipsum sit fugiat eiusmod dolore exercitation. Aute pariatur ullamco exercitation mollit. Consequat pariatur dolor adipisicing non et enim ipsum mollit.', imageUrl: require('@/assets/images/aa.jpg'), author: 'Dr. Emma Noussi' },
]

export default function Article() {
    return (
        <View style={tw`flex-1`}>
            <Text style={tw`text-lg font-bold text-gray-800`}>{data.length > 0 ? 'Article' : ''}</Text>
            <FlatList
                data={data}
                renderItem={({ item, index }) => (
                    <View key={index} style={tw`flex-row gap-4 h-40 p-4 my-2 bg-indigo-200 shadow rounded-2xl`}>
                        <View style={tw`flex-1 justify-between`}>
                            <View style={tw`flex-1`}>
                                <Text style={tw`text-lg font-semibold text-gray-800`} ellipsizeMode='tail' numberOfLines={1}>{item.title}</Text>
                                <Text style={tw`font-bold text-white`} ellipsizeMode='tail' numberOfLines={4}>{item.description}</Text>
                            </View>
                            <Text style={tw`text-gray-500`}>{item.author}</Text>
                        </View>
                        <View style={tw`flex-row items-center w-24 bg-white rounded-3xl shadow`}>
                            <Image source={item.imageUrl} style={tw`w-full h-full rounded-3xl`} />
                        </View>
                    </View>
                )}
                contentContainerStyle={tw`gap-1 px-2`}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={<Text style={tw`text-base text-center text-gray-400`}>No Articles Found</Text>}
                ListFooterComponent={() => (
                    <View style={tw`h-5 mb-2`} >
                        <Text style={tw`text-base text-center text-gray-400`}>No more articles</Text>
                    </View>
                )}
                horizontal={false}
            />
        </View>
    )
}
