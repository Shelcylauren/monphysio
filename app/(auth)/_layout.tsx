import AuthFooter from '@/components/AuthFooter';
import AuthHeader from '@/components/AuthHeader';
import { Slot, Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function Layout() {
    return (
        <>
            {/* Hide status bar */}
            {/* <StatusBar hidden/> */}
            <Stack.Screen
                options={{
                    headerShown: false,
                    // contentStyle: { backgroundColor: '#fff' },
                }}
            />
            <AuthHeader />
            <Slot />
            <AuthFooter />
        </>
    );
}
