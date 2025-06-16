import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';
const data = [
    { id: 1, instructor: 'Shelcy Leroy', imageUrl: require('@/assets/images/aa.jpg'), duration: '2 hours', description: 'Adipisicing consequat quis eu sit ex ad in. Ullamco nisi ipsum ea tempor nostrud et minim deserunt do. Deserunt nulla ea adipisicing incididunt ea et irure mollit. Non ipsum commodo voluptate ea labore quis ullamco officia exercitation. Pariatur sit excepteur nostrud ea ipsum. Sunt minim enim ea consequat labore.' },   
    { id: 2, instructor: 'Instructor 2', imageUrl: require('@/assets/images/aa.jpg'), duration: '1 hour', description: 'Id reprehenderit veniam consectetur sit non pariatur dolor irure qui ex. Excepteur voluptate do id voluptate id ad commodo elit. Magna ea pariatur nostrud id. Elit nulla cillum non laboris ea ex amet nulla consequat. Lorem voluptate do enim dolore irure duis magna. Ullamco incididunt officia ea ullamco aliquip. Nisi cillum commodo cillum commodo.' },
    { id: 3, instructor: 'Instructor 3', imageUrl: require('@/assets/images/aa.jpg'), duration: '3 hours', description: 'Tempor labore exercitation nisi incididunt ullamco minim ullamco nostrud. Nostrud in elit eu reprehenderit consectetur pariatur aliqua deserunt et commodo laborum magna eiusmod. Proident duis ullamco adipisicing proident eiusmod amet. Mollit voluptate ullamco deserunt eu aliquip id aliquip et ipsum culpa commodo exercitation tempor voluptate.' },
    { id: 4, instructor: 'Instructor 4', imageUrl: require('@/assets/images/aa.jpg'), duration: '2 hours', description: 'Magna irure aliquip officia officia et aute id quis. Reprehenderit esse dolore minim dolor adipisicing consequat. Velit velit tempor exercitation elit laboris ex est cupidatat dolore enim reprehenderit mollit.' },
    { id: 5, instructor: 'Instructor 5', imageUrl: require('@/assets/images/aa.jpg'), duration: '1 hour', description: 'Irure elit officia est consectetur dolor elit sit commodo cupidatat est proident mollit quis sunt. Amet est pariatur nostrud incididunt duis cupidatat do in dolor aliquip. Sunt incididunt aliqua aliquip deserunt voluptate consectetur in officia. Dolor incididunt ut do cupidatat. Quis ex officia id adipisicing.' },
    { id: 6, instructor: 'Instructor 6', imageUrl: require('@/assets/images/aa.jpg'), duration: '3 hours', description: 'Nulla mollit sunt adipisicing laborum. Officia ad amet dolore enim laboris consequat amet eu magna. Dolore do do officia amet ea deserunt excepteur sunt id esse exercitation qui Lorem excepteur. Proident aliqua nulla nostrud culpa cillum commodo exercitation. Officia nulla sunt aliqua proident aliquip laborum ut sit officia sunt. Dolore minim anim Lorem aliquip ipsum consectetur ad elit qui minim. Nisi tempor in aliquip sint enim anim eu.' },
    { id: 7, instructor: 'Instructor 7', imageUrl: require('@/assets/images/aa.jpg'), duration: '2 hours', description: 'Dolor occaecat fugiat proident elit consectetur laboris officia eiusmod in commodo. Duis ex velit non cupidatat occaecat elit laborum dolore dolore mollit dolore ut. Deserunt culpa ipsum aute ad amet. Sint ut proident reprehenderit dolor incididunt excepteur aliqua fugiat ullamco aute aute nulla. Id consequat culpa dolore occaecat ullamco reprehenderit nulla. Magna pariatur ut incididunt magna mollit do ullamco cupidatat culpa qui.' },
    { id: 8, instructor: 'Instructor 8', imageUrl: require('@/assets/images/aa.jpg'), duration: '1 hour', description: 'Dolor aliquip Lorem officia in culpa aute sunt aute pariatur fugiat officia dolor. Duis sunt elit deserunt enim et veniam laboris. Ipsum commodo enim nisi cupidatat laboris officia cupidatat velit aliquip laboris esse laborum cillum exercitation. Laboris Lorem eiusmod ut minim elit cillum. Dolore non qui culpa nostrud ad eu sint consequat ipsum cillum aliquip velit consectetur. Eu proident fugiat adipisicing mollit sint esse sit irure non nulla.' },
]

export default function Recommendation() {
    return (
        <View>
            <Text style={tw`text-lg font-bold text-gray-800`}>Categories</Text>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={tw`p-4 flex-row bg-blue-600 justify-center items-center rounded-lg my-1 w-80 h-[30]`}>
                        <View style={tw`flex-row items-center`}>
                            <Image source={item.imageUrl} style={tw`w-16 h-16 rounded-full`} />
                        </View>
                        <View style={tw`flex-1 ml-4`}>
                            <Text style={tw`text-gray-200 text-xs`}>{item.duration}</Text>
                            <Text style={tw`font-bold text-lg text-white`} ellipsizeMode='tail' numberOfLines={1}>{item.instructor}</Text>
                            <Text style={tw`text-gray-300`} ellipsizeMode='tail' numberOfLines={3}>{ item.description}</Text>
                        </View>
                    </View>
                )}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={tw`gap-4 `}
            />
        </View>
    )
}

const styles = StyleSheet.create({})