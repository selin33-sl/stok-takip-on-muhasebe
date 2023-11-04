import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import style from './style'

export const Options = ({ text, onPress, backgroundColor }) => {
  return (

    <TouchableOpacity style={{ ...style.option, backgroundColor: backgroundColor }} onPress={onPress} >
      <Text style={style.buttonText} >{text}</Text>
    </TouchableOpacity>


  )
}
