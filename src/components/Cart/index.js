import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import style from './style'

export const Cart = ({ image, name, sk, adet, id, onPress, imageDefault, listeFiyati, red }) => {

  let imageSource;
  if (imageDefault) {
    imageSource = require('../../assets/default-image.jpg');
  } else {
    imageSource = { uri: image };
  }
  try {
    return (
      <TouchableOpacity style={style.cart} onPress={onPress}>


        <View style={{ flexDirection: 'row' }}>

          <Image
            source={imageSource}
            size={30}
            style={style.imageStyle}

          />
          <View style={style.nameContainer} >
            <Text style={style.name} >{name}</Text>
          </View>

        </View>

        <View>

          <View style={style.inner} >
            <Text style={red ? { ...style.adet, color: 'red' } : style.adet} >Adet:{adet}</Text>
            <Text style={style.adet} >Liste Fiyatı: {listeFiyati}TL</Text>
          </View>

        </View>




      </TouchableOpacity>
    )
  } catch (error) {
  }
}
