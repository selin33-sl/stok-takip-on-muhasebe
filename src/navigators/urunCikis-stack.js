
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CariEkleScreen, StokScreen, UrunCikisScreen, UrunEkleScreen } from '../screens';
import { CarilerScreen } from '../screens/cariler-screen';

const Stack = createNativeStackNavigator();

export const UrunCikisStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="urunCikis-screen" component={UrunCikisScreen} />
      <Stack.Screen name="stok-screen" component={StokScreen} />
      <Stack.Screen name="urunEkle-screen" component={UrunEkleScreen} />
      <Stack.Screen name="cariler-screen" component={CarilerScreen} />
      <Stack.Screen name="cariEkle-screen" component={CariEkleScreen} />


    </Stack.Navigator>
  )
}







