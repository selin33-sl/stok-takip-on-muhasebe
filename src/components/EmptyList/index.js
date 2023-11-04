import { View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import style from './style'


export const EmptyList = ({ iconName, text }) => {
    return (
        <View style={style.container}>
            <Icon name={iconName} size={70} color='#B7B7B7' />
            <Text style={style.text} >{text}</Text>
        </View>
    )
}

