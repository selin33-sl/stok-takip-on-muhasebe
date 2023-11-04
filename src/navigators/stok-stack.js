
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StokScreen, UrunEkleScreen } from '../screens';
import { UrunDetayScreen } from '../screens/urunDetay-screen';
import { UrunSecenekleriScreen } from '../screens/UrunSecenekleri-screen';

const Stack = createNativeStackNavigator();

export const StokStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="stok-screen" component={StokScreen} />
      <Stack.Screen name="urunDetay-screen" component={UrunDetayScreen} />
      <Stack.Screen name="urunEkle-screen" component={UrunEkleScreen} />
    </Stack.Navigator>
  )
}







