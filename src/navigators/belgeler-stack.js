import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BelgelerScreen } from '../screens/belgeler-screen';
import { BelgeDetayScreen, CariEkleScreen, StokScreen, UrunDetayScreen, UrunEkleScreen } from '../screens';
import { CarilerScreen } from '../screens/cariler-screen';
import { CariDetay, CariDetayScreen } from '../screens/cariDetay-screen';

const Stack = createNativeStackNavigator();
export const BelgelerStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="belgeler-screen" component={BelgelerScreen} />
      <Stack.Screen name="belgelerDetay-screen" component={BelgeDetayScreen} />
      <Stack.Screen name="cariler-screen" component={CarilerScreen} />
      <Stack.Screen name="cariEkle-screen" component={CariEkleScreen} />
      <Stack.Screen name="cariDetay-screen" component={CariDetayScreen} />
      <Stack.Screen name="urunDetay-screen" component={UrunDetayScreen} />
      <Stack.Screen name="stok-screen" component={StokScreen} />
      <Stack.Screen name="urunEkle-screen" component={UrunEkleScreen} />

    </Stack.Navigator>
  )
}









