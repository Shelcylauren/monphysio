import { View, Platform, StatusBar, ViewStyle } from 'react-native';
import Constants from 'expo-constants';

interface StatusBarBackgroundProps {
    backgroundColor: string;
}

export default function StatusBarBackground({
    backgroundColor
}: StatusBarBackgroundProps) {
    // Calculate status bar height
    const statusBarHeight = Platform.select({
        android: StatusBar.currentHeight,
        ios: Constants.statusBarHeight,
        default: 0
    });

    // Create styles with TypeScript typing
    const containerStyle: ViewStyle = {
        backgroundColor,
        height: statusBarHeight,
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000
    };

    return <View style={containerStyle} />;
}