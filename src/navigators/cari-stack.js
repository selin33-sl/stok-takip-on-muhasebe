import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BelgeDetayScreen, CariEkleScreen, CariScreen, StokScreen, UrunEkleScreen } from '../screens';
import { CariDetayScreen } from '../screens/cariDetay-screen';
import { CariGecmisIslemlerScreen } from '../screens/cari-gecmis-islemler-screen';


const Stack = createNativeStackNavigator();

export const CariStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="cari-screen" component={CariScreen} />
      <Stack.Screen name="cariDetay-screen" component={CariDetayScreen} />
      <Stack.Screen name="cariEkle-screen" component={CariEkleScreen} />
      <Stack.Screen name="cariGecmisIslemler-screen" component={CariGecmisIslemlerScreen} />
      <Stack.Screen name="belgelerDetay-screen" component={BelgeDetayScreen} />
      <Stack.Screen name="stok-screen" component={StokScreen} />
      <Stack.Screen name="urunEkle-screen" component={UrunEkleScreen} />

    </Stack.Navigator>
  )
}




