import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import style from './style'

export const TextinputContainer = ({ onChangeText, value, text, numberOfLines, editable, keyboardType, onPress, icon, required }) => {

  return (
    <View style={style.inputContainer} >

      <Text style={style.text} >{text} </Text>
      {required ? <Text style={style.star} >*</Text> : null}

      <TextInput
        style={style.textinput}
        value={value}
        onChangeText={onChangeText}
        numberOfLines={numberOfLines}
        editable={editable}
        multiline
        keyboardType={keyboardType}

      />
      {icon ? (
        <TouchableOpacity onPress={onPress} style={style.iconContainer}>
          <Icon name="camera" size={24} color="black" style={style.cameraIcon} />
        </TouchableOpacity>
      ) : (null)}

    </View>
  )
}
