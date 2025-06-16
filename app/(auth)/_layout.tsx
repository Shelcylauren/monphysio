import AuthFooter from '@/Components/AuthFooter';
import AuthHeader from '@/Components/AuthHeader';
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
