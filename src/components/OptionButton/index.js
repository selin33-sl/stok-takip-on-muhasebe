import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import style from './style'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const OptionButton = ({ text, backgroundColor, onPress, name }) => {

  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={onPress} style={{ ...style.button, backgroundColor: backgroundColor }} >
      <View>
        <Icon
          name={name}
          size={50}
          color={'#000E36'}

        />
      </View>
      <Text style={style.text} >{text}</Text>
    </TouchableOpacity>
  )
}

export default OptionButton