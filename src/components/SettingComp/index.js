import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import style from './style'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export const SettingComp = ({ name, text, backgroundColor, color, onPress }) => {
    return (
        <TouchableOpacity style={{ ...style.container, backgroundColor: backgroundColor }} onPress={onPress} >
            <View style={style.innerContainer}>
                <View style={style.iconTextContainer}>
                    <Icon name={name} size={25} color={'grey'} />
                    <Text style={{ ...style.text, color: color }}>{text}</Text>
                </View>

                <View style={style.icon}>
                    <Icon name={'chevron-right'} size={40} color={color} />

                </View>
            </View>

        </TouchableOpacity>
    )
}
