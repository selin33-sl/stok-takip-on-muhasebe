
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { KategoriScreen } from '../screens/kategori-screen';

const Stack = createNativeStackNavigator();

export const KategoriStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="kategori-screen" component={KategoriScreen} />
        </Stack.Navigator>
    )
}







