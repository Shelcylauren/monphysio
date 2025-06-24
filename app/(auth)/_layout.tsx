import AuthFooter from '@/components/AuthFooter';
import AuthHeader from '@/components/AuthHeader';
import { Slot, Stack } from 'expo-router';

export default function Layout() {
    return (
        <>
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
