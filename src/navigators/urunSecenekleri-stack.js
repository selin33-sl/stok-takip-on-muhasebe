
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { KategoriScreen } from '../screens/kategori-screen';
import { KategoriStack } from './kategori-stack';
import { StokStack } from './stok-stack';
import { UrunSecenekleriScreen } from '../screens/UrunSecenekleri-screen';
import { StokScreen, UrunDetayScreen, UrunEkleScreen } from '../screens';

const Stack = createNativeStackNavigator();

export const UrunSecenekleriStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="urunSecenekleri-screen" component={UrunSecenekleriScreen} />
            <Stack.Screen name="kategori-stack" component={KategoriStack} />
            <Stack.Screen name="stok-stack" component={StokStack} />
            <Stack.Screen name="urunEkle-screen" component={UrunEkleScreen} />
            <Stack.Screen name="stok-screen" component={StokScreen} />
            <Stack.Screen name="urunDetay-screen" component={UrunDetayScreen} />

        </Stack.Navigator>
    )
}







