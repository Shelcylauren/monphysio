
import {Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function Layout() {
    return (
        <>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
                />
            <Stack.Screen name="chatbot" options={{ headerShown: false }} />
            <Stack.Screen name="appointment" options={{ headerShown: false }} />
            <Stack.Screen name="pocket_doctor" options={{ headerShown: false }} />
            <Stack.Screen name="diagnostic" options={{ headerShown: false }} />
            <Stack.Screen name="payment" options={{ headerShown: false }} />
            <Stack.Screen name="userProfile" options={{ headerShown: false }} />
            <Stack.Screen name="treatment" options={{ headerShown: false }} />
            <Stack.Screen name="medical-history" options={{ headerShown: false }} />
            <Stack.Screen name="edit-profile" options={{ headerShown: false }} />
            <Stack.Screen name="medical-history" options={{ headerShown: false }} />
            <Stack.Screen name="notification-settings" options={{ headerShown: false }} />
                {/* <StatusBar hidden={true} /> */}


        </>
    );
}