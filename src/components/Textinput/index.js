import { View, Text, TextInput } from 'react-native'
import React from 'react'
import style from './style'

export const Textinput = ({ placeholder, value, setValue, top, keyboardType, error, message, secureText }) => {

  console.log(error, "XXXXXXXXXXXXXXXXXXXXXXXX");

  return (
    <View >
      <TextInput style={{ ...style.textInput, top: top, borderColor: error ? 'red' : '#000E36', }}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={'grey'}
        keyboardType={keyboardType}
        secureTextEntry={secureText}

      />
      {error && <Text style={style.errorText}>{message}</Text>}

    </View>

  )
}

