import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, LoginScreen } from '../screens';
import { BelgelerStack } from './belgeler-stack';
import { UrunGirisStack } from './urunGiris-stack';
import { UrunCikisStack } from './urunCikis-stack';
import { UrunSecenekleriScreen } from '../screens/UrunSecenekleri-screen';
import { KategoriStack } from './kategori-stack';
import { StokStack } from './stok-stack';
import { UrunSecenekleriStack } from './urunSecenekleri-stack';

const Stack = createNativeStackNavigator();
export const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home-screen" component={HomeScreen} />
      <Stack.Screen name="login-screen" component={LoginScreen} />
      <Stack.Screen name="belgeler-stack" component={BelgelerStack} />
      <Stack.Screen name="urunGiris-stack" component={UrunGirisStack} />
      <Stack.Screen name="urunCikis-stack" component={UrunCikisStack} />
      <Stack.Screen name="urunSecenekleri-stack" component={UrunSecenekleriStack} />
    </Stack.Navigator>
  );
};
