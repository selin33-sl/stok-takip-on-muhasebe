import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import style from './style'

export const Button = ({ text, width, height, backgroundColor, onPress, borderWidth, color, position }) => {
  return (
    <View style={style.container} >
      <TouchableOpacity style={{ ...style.button, width: width, height: height, backgroundColor: backgroundColor, borderWidth: borderWidth }} onPress={onPress} >
        <Text style={{ ...style.buttonText, color: color }} >{text}</Text>
      </TouchableOpacity>
    </View>
  )
}
