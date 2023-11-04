import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { BelgeDetayScreen, BelgelerScreen, CariEkleScreen, CariScreen, HomeScreen, LoginScreen, SettingsScreen, StokScreen, UrunCikisScreen, UrunDetayScreen, UrunEkleScreen, UrunGirisScreen } from '../screens';
import { CarilerScreen } from '../screens/cariler-screen';
import { CariDetayScreen } from '../screens/cariDetay-screen';
import { CariGecmisIslemlerScreen } from '../screens/cari-gecmis-islemler-screen';

const Stack = createNativeStackNavigator();

export const FullStack = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name="home-screen" component={HomeScreen} />
            <Stack.Screen name="login-screen" component={LoginScreen} />
            <Stack.Screen name="belgeler-screen" component={BelgelerScreen} />
            <Stack.Screen name="belgelerDetay-screen" component={BelgeDetayScreen} />
            <Stack.Screen name="cariler-screen" component={CarilerScreen} />
            <Stack.Screen name="cariDetay-screen" component={CariDetayScreen} />
            <Stack.Screen name="urunDetay-screen" component={UrunDetayScreen} />
            <Stack.Screen name="stok-screen" component={StokScreen} />
            <Stack.Screen name="cari-screen" component={CariScreen} />
            <Stack.Screen name="cariEkle-screen" component={CariEkleScreen} />
            <Stack.Screen name="cariGecmisIslemler-screen" component={CariGecmisIslemlerScreen} />
            <Stack.Screen name="settings-screen" component={SettingsScreen} />
            <Stack.Screen name="urunEkle-screen" component={UrunEkleScreen} />
            <Stack.Screen name="urunCikis-screen" component={UrunCikisScreen} />
            <Stack.Screen name="urunGiris-screen" component={UrunGirisScreen} />

        </Stack.Navigator>
    )
}
