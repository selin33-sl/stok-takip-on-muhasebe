import { View, Text, Image } from 'react-native';
import React from 'react';
import style from './style';

export const SplashScreen = () => {
  return (
    <View style={style.container} >
      <View style={style.innerContainer} >
        <View
          style={style.textContainer}>
          <Text
            style={style.text}>
            Cepte Stok
          </Text>
        </View>
        <Image source={require('../../assets/stok-takip-programi.png')} style={style.image} />
        <Text
          style={{ ...style.text1, fontSize: 20 }}>
          Pengona Yazılım
        </Text>
      </View>
    </View>
  );
};
