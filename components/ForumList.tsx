import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'

// Sample data for the forum list
const data = [
    { id: '1', title: 'Veniam fugiat reprehenderit sint labore.', describetion: 'Ea ex ea esse deserunt proident magna ea do. Ex voluptate nulla aliqua sint Lorem proident ex pariatur ullamco non ut ad ad. Qui pariatur aute commodo ea do pariatur sit voluptate ea tempor velit culpa. Qui anim id deserunt ea. Culpa irure incididunt nisi eu occaecat dolor labore cillum quis. Proident labore qui reprehenderit Lorem dolor nulla dolore eiusmod consectetur ad ex exercitation eiusmod. Elit laborum minim occaecat mollit officia consectetur exercitation aliqua esse deserunt Lorem Lorem nostrud dolor.' },
    { id: '2', title: 'Occaecat adipisicing tempor eu incididunt elit nulla sint tempor esse.', describetion: 'Mollit ea reprehenderit nostrud est eu mollit aliquip est mollit deserunt. Amet pariatur reprehenderit esse eu ea sit magna occaecat cillum non commodo veniam culpa. Quis laboris exercitation occaecat exercitation ullamco id cupidatat reprehenderit aute in irure exercitation. Aliquip non esse enim laboris id laboris. Culpa duis dolore adipisicing est consectetur reprehenderit cillum laboris duis deserunt aliquip amet. Et incididunt non et irure dolor sunt id id cillum reprehenderit nisi eu. Ex veniam laboris ut reprehenderit.' },
    { id: '3', title: 'Proident est enim commodo ipsum ipsum deserunt est non ipsum.', describetion: 'Cillum mollit dolore labore eu voluptate nisi nostrud qui exercitation. Consectetur cillum quis tempor laborum labore ea voluptate id do. Occaecat in cupidatat dolore duis magna pariatur qui excepteur.' },
    { id: '4', title: 'Adipisicing adipisicing fugiat exercitation in excepteur consectetur quis.', describetion: 'Reprehenderit mollit consequat deserunt ea mollit laboris laborum voluptate sit anim amet ut fugiat pariatur. Do laborum enim cupidatat anim fugiat enim laborum. Laboris velit nulla et pariatur cupidatat culpa quis. Excepteur id occaecat nisi occaecat consectetur ea tempor aliqua qui proident.' },
    { id: '5', title: 'Officia veniam sit ad irure velit commodo et velit veniam sint esse.', describetion: 'Esse laborum aute culpa commodo. Proident pariatur id ex cupidatat dolore adipisicing dolor elit excepteur est ea esse in aute. Ad qui mollit consequat aute minim esse sit dolor Lorem consequat sunt laborum occaecat. Fugiat ad dolor velit irure culpa et dolore commodo velit. Velit nulla excepteur adipisicing eu ullamco quis sint eiusmod aliqua mollit.' },
    { id: '6', title: 'Reprehenderit laborum qui magna nisi tempor adipisicing excepteur in aliqua ipsum exercitation nostrud nostrud Lorem.', describetion: 'Eiusmod consequat do sint culpa eiusmod culpa veniam. Incididunt ullamco culpa aliqua reprehenderit fugiat mollit ea ea. Cillum cillum eiusmod occaecat non ea labore laborum ut eu ea ut. Aliquip pariatur cillum in esse laborum proident sint laboris nostrud eiusmod. Excepteur duis esse officia non exercitation mollit tempor cillum cillum laboris mollit commodo adipisicing ullamco. Nulla incididunt deserunt deserunt ea esse laboris elit est incididunt culpa tempor ullamco. Ullamco et eiusmod reprehenderit ex non commodo ipsum id sint.' },
    { id: '7', title: 'Labore labore et cupidatat reprehenderit nostrud est consequat.', describetion: 'Esse cupidatat pariatur enim sint exercitation Lorem duis reprehenderit. Adipisicing adipisicing eu commodo reprehenderit aute sint ea mollit sint cupidatat esse. Qui est reprehenderit labore consectetur irure irure Lorem ullamco. Qui tempor cupidatat consequat cillum labore elit excepteur ipsum. Magna ex sunt excepteur aute incididunt reprehenderit esse dolor aute. Adipisicing dolore ullamco laboris sunt consequat ut exercitation mollit irure aliquip ad ullamco dolore amet.' },
    { id: '8', title: 'Sunt cupidatat laborum minim aliqua mollit nisi ad aliqua et eiusmod.', describetion: 'Quis velit veniam irure cupidatat et. Nisi veniam sit in magna pariatur ea cupidatat aute dolore consequat ullamco elit non. Est pariatur reprehenderit sunt ipsum excepteur do. Quis consequat labore duis cupidatat dolore deserunt officia do nulla magna irure. Aute ad non et est.' },
]

export default function ForumList() {
    return (
        <View style={tw`z-10 flex-1 mt-2`}>
            <Text style={tw`text-xl font-bold text-gray-800`}>ForumList</Text>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={tw`p-4 bg-blue-200 rounded-lg shadow`}>
                        <View style={tw`flex-1`}>
                            <Text style={tw`text-lg font-bold text-gray-800`} ellipsizeMode='tail' numberOfLines={1}>{item.title}</Text>
                            <Text style={tw`text-gray-600`} ellipsizeMode='tail' numberOfLines={4}>{item.describetion}</Text>
                        </View>
                    </View>

                )}
                keyExtractor={item => item.id}
                contentContainerStyle={tw`gap-4 py-4 px-2`}
            />
        </View>
    )
}

const styles = StyleSheet.create({})