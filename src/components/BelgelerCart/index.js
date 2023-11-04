import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import style from './style'

export const BelgelerCart = ({ tarih, type, isim, description, backgroundColor, onPress }) => {
  return (
    <TouchableOpacity style={{ ...style.cart, backgroundColor: backgroundColor }} onPress={onPress} >
      <Text style={style.tarih} >Tarih:{tarih} </Text>
      <Text style={style.type}>{type}</Text>
      <View style={style.container} >
        <Text style={style.name}>{isim}</Text>
        <Text style={style.ozellik}>({description})</Text>
      </View>


    </TouchableOpacity>

  )
}
