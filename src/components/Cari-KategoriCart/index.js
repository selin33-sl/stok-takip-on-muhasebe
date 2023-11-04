import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import style from './style'

export const CariKategoriCart = ({ name, onPress }) => {
    return (
        <TouchableOpacity style={style.cartContainer} onPress={onPress} >
            <Text style={style.cartText} >{name}</Text>
        </TouchableOpacity>
    )
}

