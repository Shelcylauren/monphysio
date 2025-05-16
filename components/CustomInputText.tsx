import React, { useState, forwardRef, Ref } from 'react';
import {
    TextInput,
    Text,
    View,
    StyleSheet,
    TextInputProps,
    TouchableOpacity
} from 'react-native';
import tw from 'twrnc';
import { MaterialIcons } from '@expo/vector-icons';

interface CustomTextInputProps extends TextInputProps {
    label?: string;
    error?: string;
    showClearButton?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    touched?: boolean;
    containerStyle?: string;
    labelStyle?: string;
    inputStyle?: string;
    errorStyle?: string;
    type?: 'default' | 'password';
}

const CustomTextInput = forwardRef<TextInput, CustomTextInputProps>(({
    label,
    error,
    showClearButton = true,
    leftIcon,
    rightIcon,
    touched,
    containerStyle = '',
    labelStyle = '',
    inputStyle = '',
    errorStyle = '',
    secureTextEntry,
    value,
    type = 'default',
    onChangeText,
    ...props
}, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(secureTextEntry);

    const showError = !!error && touched;

    return (
        <View style={tw`mb-4 ${containerStyle}`}>
            {label && (
                <Text style={tw`text-gray-700 font-medium mb-1 ${labelStyle}`}>
                    {label}
                </Text>
            )}

            <View style={tw`relative flex-row items-center`}>
                {leftIcon && (
                    <View style={tw`absolute z-10 left-2`}>
                        {leftIcon}
                    </View>
                )}

                <TextInput
                    ref={ref}
                    style={
                        tw`border rounded-lg px-4 py-3 bg-gray-100 text-gray-800 w-full
                        ${leftIcon ? 'pl-10' : ''}
                        ${(rightIcon || showClearButton || secureTextEntry) ? 'pr-10' : ''}
                        ${isFocused ? 'border-blue-500' : 'border-gray-300'}
                        ${showError ? 'border-red-500' : ''}
                        ${inputStyle}`
                    }
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={hidePassword}
                    {...props}
                />

                {value && showClearButton && type === 'default' && (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={tw`absolute z-10 right-2`}
                        onPress={() => onChangeText?.('')}
                    >
                        <MaterialIcons name="cancel" size={20} color="#9CA3AF" />
                    </TouchableOpacity>
                )}

                {secureTextEntry && (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={tw`absolute z-10 right-2`}
                        onPress={() => setHidePassword(!hidePassword)}
                    >
                        <MaterialIcons
                            name={hidePassword ? 'visibility' : 'visibility-off'}
                            size={20}
                            color="#9CA3AF"
                        />
                    </TouchableOpacity>
                )}

                {rightIcon && !showClearButton && !secureTextEntry && (
                    <View style={tw`absolute z-10 right-2`}>
                        {rightIcon}
                    </View>
                )}
            </View>

            {showError && (
                <Text style={tw`text-red-500 text-sm mt-1 ${errorStyle}`}>
                    {error}
                </Text>
            )}
        </View>
    );
});

export default CustomTextInput;