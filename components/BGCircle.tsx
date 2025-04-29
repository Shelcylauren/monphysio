import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';

type Props = {
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    color?: string;
}

export default function BGCircle({ position='top-left', color ='gray-100' }: Props) {
    const positionStyles = {
        'top-left': tw`-top-[100px] -left-[100px] right-0`,
        'top-right': tw` -top-[100px] -right-[100px]`,
        'bottom-left': tw` -bottom-[100px] -left-[100px] right-0`,
        'bottom-right': tw`-bottom-[100px] -right-[100px]`,
    };

    return (
        <View style={[positionStyles[position], tw`absolute w-[250px] h-[250px] bg-transparent border-[30px] ${color ? `border-${color}` : 'border-gray-100'} rounded-full z-auto`]} />
    )
}
